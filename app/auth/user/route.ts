import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import React from "react";

export async function GET(request: Request) {
  const supabase = createServerComponentClient({ cookies });
  const getUser = React.cache(async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (session) return await supabase.auth.getUser();
    return { data: { user: null } };
  });
  const {
    data: { user },
  } = await getUser();
  return NextResponse.json(user);
}
