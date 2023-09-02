import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    try {
        const e = await request.formData();
        const supabase = createRouteHandlerClient({ cookies });
        const { error } = await supabase
            .from("status")
            .update({
                status: e.get("status"),
                note: e.get("note"),
                modified_at: new Date(),
            })
            .eq("applicant_id", e.get("applicant_id"));
        if (error) throw error
        return NextResponse.redirect(
            `${requestUrl.origin}/admin?tick=${Math.random()}&message=Successfully updated application for: ${e.get(
                "applicant_id"
            )}`, {
            status: 301,
        }
        );
    } catch (err: any) {
        return NextResponse.redirect(`${requestUrl.origin}/admin?error=${err.message}`, {
            status: 301,
        });
    }
    // revalidatePath("/admin");
}