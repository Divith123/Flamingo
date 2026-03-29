import { env } from "@flamingo/env/web";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window === "undefined"
      ? "http://127.0.0.1:4000"
      : env.NEXT_PUBLIC_SERVER_URL,
});
