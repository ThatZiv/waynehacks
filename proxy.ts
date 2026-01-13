import type { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/proxy";

export async function proxy(req: NextRequest) {
  return await updateSession(req);
}

export const config = {
  matcher: [
    "/admin/:path*",
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
