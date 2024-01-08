import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.from("applications").select("*");
  if (error || !data) {
    let failedRes = new Response("No data found", { status: 500 });
    failedRes.headers.set("Content-Type", "text/csv");
    return failedRes;
  }
  let final = Object.keys(data[0]).join(",") + "\n";
  data.map((e: any) => {
    // final += Object.values(e).join(",") + '\n'
    final +=
      Object.values(e)
        .map((e: any) => {
          if (typeof e === "string") {
            return e.replace(/,/g, "");
          }
          return e;
        })
        .join(",") + "\n";
  });
  let res = new Response(final, { status: 200 });
  res.headers.set("Content-Type", "text/csv");
  return res;
}
