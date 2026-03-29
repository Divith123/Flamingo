import { auth } from "@flamingo/auth";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Delegate to Better Auth built-in handler so cookies and session tokens are managed correctly.
  return auth.handler(request);
}
