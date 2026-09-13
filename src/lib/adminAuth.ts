import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "catalyst_admin";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword();
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createAdminToken() {
  return createHmac("sha256", getSessionSecret()).update(getAdminPassword()).digest("hex");
}

export function isAdminPassword(password: string) {
  const expected = getAdminPassword();

  if (!expected || !password) {
    return false;
  }

  return safeEqual(password, expected);
}

export function isAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  return safeEqual(token, createAdminToken());
}

function safeEqual(input: string, expected: string) {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}
