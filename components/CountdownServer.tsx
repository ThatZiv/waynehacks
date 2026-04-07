import { getSchedule } from "@/misc/functions";
import { Countdown } from "@/components/Countdown";

export default async function CountdownServer() {
  const schedule = await getSchedule();

  return <Countdown events={schedule} />;
}
