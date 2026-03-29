import { auth } from "@flamingo/auth";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Delegate to Better Auth built-in handler so sign-up behavior and cookies are handled consistently.
  return auth.handler(request);
}
