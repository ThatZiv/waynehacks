import constants from "@/misc/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(constants.sponsorPacket, { status: 302 });
}
