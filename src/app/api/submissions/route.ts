import { addSubmission } from "@/lib/submissions";
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
  const websiteUrl = cleanString(body.websiteUrl);
  const city = cleanString(body.city);
  const sourcePath = cleanString(body.sourcePath);

  if (!executiveName || !email || !marketingCapacity || !websiteUrl) {
    return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  let normalizedUrl: string;

  try {
    normalizedUrl = new URL(websiteUrl).toString();
  } catch {
    return NextResponse.json({ error: "Please enter a valid website URL." }, { status: 400 });
  }

  const submission = await addSubmission({
    executiveName,
    email,
    marketingCapacity,
    websiteUrl: normalizedUrl,
    city,
    sourcePath,
  });

  return NextResponse.json({ ok: true, submissionId: submission.id });
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}
