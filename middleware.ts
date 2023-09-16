import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const revalidate = 0;
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
    const projectKey = new URL(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string
    ).host.split(".")[0];
    res.cookies.delete(`sb-${projectKey}-auth-token`);
  }
  // get all /admin routes 
  // ** CAVEAT TO THIS: https://github.com/vercel/next.js/discussions/43675#discussioncomment-6998182 **
  // ** for some god forsaken reason, next13 caches these middleware so behavior is rly weird.. **
  if (req.nextUrl.pathname.startsWith("/admin")) {

    try {
      // If the user is not logged in, redirect to /login
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const uid = user?.id;
      if (!uid) {
        throw new Error("You must be logged in to view this page");
      }
      let { data: isAdmin, error: isAdminError } = await supabase.rpc(
        "is_admin",
        { uid }
      );
      if (isAdminError) throw isAdminError;
      if (!isAdmin) {
        throw new Error("You must be an admin to view this page");
      }
    } catch (err: any) {
      return NextResponse.redirect(new URL(`/?message=${err.message}`, req.nextUrl));
    }

  }
  return res;
}
