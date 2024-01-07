import { createEvents } from "ics";
export interface Event {
  date: number;
  end?: number;
  name: string;
}

export const generateICS = (eventData: Event[]) => {
  const { error, value } = createEvents(
    eventData.map((event) => {
      let s = new Date(event.date);
      let e = new Date(event.end || event.date + 60 * 60 * 15);
      return {
        title: "WayneHacks2: " + event.name,
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
      };
    })
  );

  if (error) {
    console.error(error);
    return null;
  }
  return value;
};
