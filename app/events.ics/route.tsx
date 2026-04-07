import { generateICS } from "@/misc/events";
import { getSchedule } from "@/misc/functions";

export async function GET(request: Request) {
  const schedule = await getSchedule();
  let response = new Response(generateICS(schedule), { status: 200 });
  response.headers.set("Content-Type", "text/calendar");
  response.headers.set(
    "Content-Disposition",
    "attachment; filename=events.ics",
  );
  return response;
}
