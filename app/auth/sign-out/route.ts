import { createServerClient } from "@/lib/supabase";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createServerClient();

  await supabase.auth.signOut();
  revalidateTag("user");
  return NextResponse.redirect(
    `${requestUrl.origin}/?message=You have logged out successfully`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
