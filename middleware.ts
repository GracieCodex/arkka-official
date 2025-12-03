import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware disabled - using client-side locale detection instead
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
