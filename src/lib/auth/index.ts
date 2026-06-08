import { getDb } from "@/lib/db/index";
import * as schema from "@/lib/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { render } from "react-email";
import { getResend } from "@/lib/resend/index";
import ResetPasswordEmailTemplate from "../email/ResetPasswordEmailTemplate";
import VerifyEmailTemplate from "../email/VerifyEmailTemplate";
import WelcomeEmailTemplate from "../email/WelcomeEmailTemplate";

export function getAuth(env: any) {
  const db = getDb(env);
  const resend = getResend(env);
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    baseURL: env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_APP_URL!,
    secret: env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET!,
    // ✅ Email & Password
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      disableSignUp: false,
      autoSignIn: true,
      sendResetPassword: async ({ user, url, token }) => {
        console.log("Reset Url", url);
        // Send reset password email to user
        try {
          const html = await render(
            ResetPasswordEmailTemplate({
              username: user.name,
              resetUrl: url,
              expiresInMinutes: "60",
            }),
          );
          await resend.emails.send({
            from: "Todo App <onboarding@resend.dev>",
            to: user.email,
            subject: "Reset your Todo Application password",
            html,
          });
        } catch (error) {
          console.error("Error sending reset password email:", error);
        }
      },
      resetPasswordTokenExpiresIn: 3600, // 1 hour
    },
    // ✅ Email Verification
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url, token }) => {
        console.log("Verification Url", url);
        // Send verification email to user
        try {
          const html = await render(
            VerifyEmailTemplate({ username: user.name, verifyUrl: url }),
          );
          await resend.emails.send({
            from: "Todo App <onboarding@resend.dev>",
            to: user.email,
            subject: "Verify your email for Todo Application",
            html,
          });
        } catch (error) {
          console.error("Error sending verification email:", error);
        }
        console.log("Verification email sent to:", user.email);
      },
      expiresIn: 3600, // 1 hour
      onEmailVerification: async (user) => {
        const html = await render(
          WelcomeEmailTemplate({ username: user.name }),
        );
        await env.EMAIL_QUEUE.send(
          {
            type: "welcome_email",
            payload: {
              email: user.email,
              name: user.name,
              html,
            },
          },
          {
            delaySeconds: 600, // 10 minutes delay
          },
        );
      },
    },
    // ✅ Social Providers
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID!,
        clientSecret:
          env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET!,
      },
      github: {
        clientId: env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID!,
        clientSecret:
          env.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET!,
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google", "github"],
      },
    },
  });
}
export type Auth = ReturnType<typeof getAuth>;
