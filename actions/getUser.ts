"use server";

import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import React from "react";

export default async function getUser() {
  const supabase = await createServerClient();
  const getUserCached = React.cache(async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (session) return await supabase.auth.getUser();
    return { data: { user: null } };
  });
  const {
    data: { user },
  } = await getUserCached();
  return JSON.stringify(user);
}
