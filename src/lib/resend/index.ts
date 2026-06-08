import { Resend } from "resend";

export function getResend(env: any) {
  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY missing!");
  return new Resend(apiKey);
}
