import { addSubmission } from "@/lib/submissions";
import { sendSubmissionEmails } from "@/lib/email";
import { appendSubmissionToGoogleSheet } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const executiveName = cleanString(body.executiveName);
  const email = cleanString(body.email);
  const marketingCapacity = cleanString(body.marketingCapacity);
  const websiteUrl = cleanWebsiteString(body.websiteUrl);
  const city = cleanString(body.city);
  const sourcePath = cleanString(body.sourcePath);

  if (!executiveName || !email || !marketingCapacity) {
    return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const normalizedUrl = normalizeWebsiteUrl(websiteUrl);

  if (websiteUrl && !normalizedUrl) {
    return NextResponse.json({ error: "Please enter a valid website URL." }, { status: 400 });
  }

  const submission = await addSubmission({
    executiveName,
    email,
    marketingCapacity,
    websiteUrl: normalizedUrl ?? "",
    city,
    sourcePath,
  });

  queueSheetAppend(submission);
  await sendEmailWithTimeout(submission);

  return NextResponse.json({ ok: true, submissionId: submission.id });
}

function queueSheetAppend(submission: Awaited<ReturnType<typeof addSubmission>>) {
  void appendSubmissionToGoogleSheet(submission).catch((error) => {
    console.error("Google Sheets submission failed", error);
  });
}

async function sendEmailWithTimeout(submission: Awaited<ReturnType<typeof addSubmission>>) {
  try {
    await Promise.race([
      sendSubmissionEmails(submission),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Submission email timed out.")), 5000),
      ),
    ]);
  } catch (error) {
    console.error("Submission email failed", error);
  }
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

function cleanWebsiteString(value: unknown) {
  const cleaned = cleanString(value);
  const normalized = cleaned
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  if (normalized === "hometechdealer.com") {
    return "";
  }

  return cleaned;
}

function normalizeWebsiteUrl(value: string) {
  if (!value) {
    return "";
  }

  const withProtocol = /^[a-z][a-z\d+\-.]*:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(withProtocol);

    if (!url.hostname.includes(".")) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}
