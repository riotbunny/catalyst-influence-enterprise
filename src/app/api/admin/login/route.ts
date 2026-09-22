import { createAdminToken, getAdminCookieName, isAdminConfigured, isAdminPassword } from "@/lib/adminAuth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const isHttps = new URL(request.url).protocol === "https:";

  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin password is not configured." }, { status: 500 });
  }

  if (!isAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: getAdminCookieName(),
    value: createAdminToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: isHttps,
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
