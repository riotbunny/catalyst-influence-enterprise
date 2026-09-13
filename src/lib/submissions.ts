import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

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
  await ensureStore();

  const submissions = await getSubmissions();
  const submission: Submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  submissions.unshift(submission);
  await writeFile(submissionsPath, JSON.stringify(submissions, null, 2), "utf8");

  return submission;
}

export async function getSubmissions() {
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
