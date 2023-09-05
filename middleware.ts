import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.log(error);
    const projectKey = new URL(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string
    ).host.split(".")[0];
    res.cookies.delete(`sb-${projectKey}-auth-token`);
    return ["error", res];
  }
}
