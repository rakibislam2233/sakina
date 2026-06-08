import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { Auth } from "./index";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined" ? window.location.origin : ""),
  plugins: [inferAdditionalFields<Auth>()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  requestPasswordReset,
  resetPassword,
  changePassword,
  sendVerificationEmail,
} = authClient;
