import { NextResponse } from "next/server";

// @deprecated
export async function GET(req: Request) {
    const requestUrl = new URL(req.url);
    const searchParams = new URLSearchParams(requestUrl.searchParams);
    const url = searchParams.get("url");
    if (!url || !url.startsWith("mailto://") && !url.startsWith(process.env.NEXT_PUBLIC_BASE_URL as string)) {
        return NextResponse.redirect(`${requestUrl.origin}/`, { status: 400 });
    }
    return NextResponse.redirect(url, { status: 302 });
}