import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { getGoogleSheetSubmissions } from "@/lib/googleSheets";

export type Submission = {
  id: string;
  createdAt: string;
  executiveName: string;
  email: string;
  marketingCapacity: string;
  websiteUrl: string;
  city?: string;
  sourcePath?: string;
};

export type SubmissionInput = Omit<Submission, "id" | "createdAt">;

const dataDirectory = path.join(process.cwd(), "data");
const submissionsPath = path.join(dataDirectory, "submissions.json");

export async function addSubmission(input: SubmissionInput) {
  const submission: Submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  if (process.env.VERCEL) {
    return submission;
  }

  await ensureStore();

  const submissions = await getSubmissions();
  submissions.unshift(submission);
  await writeFile(submissionsPath, JSON.stringify(submissions, null, 2), "utf8");

  return submission;
}

export async function getSubmissions() {
  try {
    const sheetSubmissions = await getGoogleSheetSubmissions();

    if (sheetSubmissions) {
      return sheetSubmissions;
    }
  } catch (error) {
    console.error("Google Sheets submissions read failed", error);
  }

  if (process.env.VERCEL) {
    return [];
  }

  await ensureStore();

  const raw = await readFile(submissionsPath, "utf8");
  return JSON.parse(raw) as Submission[];
}

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });

  if (!existsSync(submissionsPath)) {
    await writeFile(submissionsPath, "[]", "utf8");
  }
}
