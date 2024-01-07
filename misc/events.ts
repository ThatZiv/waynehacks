import { createEvents } from "ics";
import constants from "./constants";
export interface Event {
  date: number;
  end?: number;
  name: string;
}

export const generateICS = (eventData: Event[]) => {
  const { error, value } = createEvents(
    eventData.map((event) => {
      let s = new Date(event.date);
      let e = new Date(event.end || event.date); // if no end, assume it's the same as start
      return {
        title: "WayneHacks 2: " + event.name,
        start: [
          s.getFullYear(),
          s.getMonth() + 1,
          s.getDate(),
          s.getHours(),
          s.getMinutes(),
        ],
        end: [
          e.getFullYear(),
          e.getMonth() + 1,
          e.getDate(),
          e.getHours(),
          e.getMinutes(),
        ],
        description: event.name,
        location: constants.address,
        url: process.env.NEXT_PUBLIC_BASE_URL,
        organizer: { name: "WayneHacks Team", email: constants.supportEmail },
        alarms: [{ action: "display", trigger: { minutes: 15, before: true } }],
      };
    })
  );

  if (error) {
    console.error(error);
    return null;
  }
  return value;
};
