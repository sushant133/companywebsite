import "server-only";

import bcrypt from "bcryptjs";
import { z } from "zod";

/**
 * Cost 12 is the current sensible default: roughly a quarter of a second on
 * commodity hardware, which is slow enough to matter to an attacker and fast
 * enough for a login form.
 */
const BCRYPT_ROUNDS = 12;

export const passwordSchema = z
  .string()
  .min(10, "Use at least 10 characters")
  .max(200, "That is longer than 200 characters")
  .refine((v) => /[a-z]/.test(v), "Include a lowercase letter")
  .refine((v) => /[A-Z]/.test(v), "Include an uppercase letter")
  .refine((v) => /[0-9]/.test(v), "Include a number");

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Burns roughly the same time as a real comparison when the account does not
 * exist, so response timing does not reveal which emails are registered.
 */
export async function fakeVerify(): Promise<void> {
  await bcrypt.compare(
    "not-a-real-password",
    "$2b$12$C6UzMDM.H6dfI/f/IKcEe.wCcVJdlDlPYCUvVTaB8YFXpJmTF5jHy",
  );
}
