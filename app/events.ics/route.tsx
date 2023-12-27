import { events } from "@/misc/constants";
import { generateICS } from "@/misc/events";

export async function GET(request: Request) {
  let response = new Response(generateICS(events), { status: 200 });
  response.headers.set("Content-Type", "text/calendar");
  response.headers.set(
    "Content-Disposition",
    "attachment; filename=events.ics"
  );
  return response;
}
