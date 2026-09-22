import { createSign } from "node:crypto";
import type { Submission } from "@/lib/submissions";

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

const sheetsScope = "https://www.googleapis.com/auth/spreadsheets";
const tokenUrl = "https://oauth2.googleapis.com/token";

export function isGoogleSheetsConfigured() {
  return Boolean(
    (getWebhookUrl() && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET) ||
      (getSheetId() && getServiceAccountEmail() && getPrivateKey()),
  );
}

export async function appendSubmissionToGoogleSheet(submission: Submission) {
  if (getWebhookUrl()) {
    await appendSubmissionToWebhook(submission);
    return;
  }

  if (!isGoogleSheetsConfigured()) {
    console.warn("Google Sheets submission skipped: sheet credentials are not configured.");
    return;
  }

  const token = await getAccessToken();
  const range = encodeURIComponent(`${getSheetTab()}!A:J`);
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${getSheetId()}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [submissionToSheetRow(submission)],
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Google Sheets append failed: ${response.status} ${errorText}`);
  }
}

async function appendSubmissionToWebhook(submission: Submission) {
  const response = await fetch(getWebhookUrl() as string, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET,
      submission,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Google Sheets webhook failed: ${response.status} ${errorText}`);
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

  if (!result?.ok) {
    throw new Error(`Google Sheets webhook failed: ${result?.error ?? "Unknown error"}`);
  }
}

export async function getGoogleSheetSubmissions(): Promise<Submission[] | null> {
  if (getWebhookUrl()) {
    return getWebhookSubmissions();
  }

  if (!isGoogleSheetsConfigured()) {
    return null;
  }

  const token = await getAccessToken();
  const range = encodeURIComponent(`${getSheetTab()}!A2:J`);
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${getSheetId()}/values/${range}?majorDimension=ROWS`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Google Sheets read failed: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as { values?: string[][] };
  return (data.values ?? [])
    .map(sheetRowToSubmission)
    .filter((submission): submission is Submission => Boolean(submission))
    .reverse();
}

async function getWebhookSubmissions() {
  const webhookUrl = getWebhookUrl();
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    return null;
  }

  const url = new URL(webhookUrl);
  url.searchParams.set("secret", webhookSecret);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Google Sheets webhook read failed: ${response.status} ${errorText}`);
  }

  const result = (await response.json()) as { ok?: boolean; submissions?: Submission[]; error?: string };

  if (!result.ok || !Array.isArray(result.submissions)) {
    throw new Error(`Google Sheets webhook read failed: ${result.error ?? "Unknown error"}`);
  }

  return result.submissions.reverse();
}

function submissionToSheetRow(submission: Submission) {
  return [
    submission.createdAt,
    submission.id,
    submission.executiveName,
    submission.email,
    submission.marketingCapacity,
    submission.websiteUrl,
    submission.city ?? "",
    submission.sourcePath ?? "",
    "New",
    "",
  ];
}

function sheetRowToSubmission(row: string[]): Submission | null {
  const [createdAt, id, executiveName, email, marketingCapacity, websiteUrl, city, sourcePath] = row;

  if (!createdAt || !id || !executiveName || !email) {
    return null;
  }

  return {
    id,
    createdAt,
    executiveName,
    email,
    marketingCapacity: marketingCapacity ?? "",
    websiteUrl: websiteUrl ?? "",
    city: city ?? "",
    sourcePath: sourcePath ?? "",
  };
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);

  if (cachedAccessToken && cachedAccessToken.expiresAt - 60 > now) {
    return cachedAccessToken.token;
  }

  const assertion = createJwtAssertion(now);
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const tokenResponse = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !tokenResponse.access_token) {
    throw new Error(
      `Google token request failed: ${tokenResponse.error_description ?? tokenResponse.error ?? response.status}`,
    );
  }

  cachedAccessToken = {
    token: tokenResponse.access_token,
    expiresAt: now + (tokenResponse.expires_in ?? 3600),
  };

  return cachedAccessToken.token;
}

function createJwtAssertion(now: number) {
  const serviceAccountEmail = getServiceAccountEmail();
  const privateKey = getPrivateKey();

  if (!serviceAccountEmail || !privateKey) {
    throw new Error("Google Sheets credentials are not configured.");
  }

  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: serviceAccountEmail,
      scope: sheetsScope,
      aud: tokenUrl,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsignedToken = `${header}.${payload}`;
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(privateKey);

  return `${unsignedToken}.${base64UrlEncode(signature)}`;
}

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getSheetId() {
  return process.env.GOOGLE_SHEET_ID;
}

function getWebhookUrl() {
  return process.env.GOOGLE_SHEETS_WEBHOOK_URL;
}

function getSheetTab() {
  return process.env.GOOGLE_SHEET_TAB ?? "Submissions";
}

function getServiceAccountEmail() {
  return process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
}

function getPrivateKey() {
  return process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
}
