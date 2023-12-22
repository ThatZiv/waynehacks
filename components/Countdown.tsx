"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Event {
  date: number;
  name: string;
}

export const Countdown = () => {
  const eventData = useMemo<Event[]>(
    // TODO: make this dynamic OR put in our real schedule here
    () => [
      {
        date: new Date("January 13, 2024 9:00:00").getTime(),
        name: "Check-in",
      },
      {
        date: new Date("January 13, 2024 12:00:00").getTime(),
        name: "Hacking begins",
      },
      {
        date: new Date("January 14, 2024 12:00:00").getTime(),
        name: "Hacking ends",
      },
    ],
    []
  );

  const getHumanReadableDate = useCallback((date: string | number | Date) => {
    // format should be like: Sunday, September 19, 2021, 12:00 PM
    return new Date(date).toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  const [currentEvent, setCurrentEvent] = useState("Loading...");
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const upcomingEvents = eventData.filter((event) => event.date > now);

      if (upcomingEvents.length > 0) {
        const nextEvent = upcomingEvents[0];
        const distance = nextEvent.date - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTime({ days, hours, minutes, seconds });
        setCurrentEvent(nextEvent.name);
      } else {
        // All events have passed
        clearInterval(interval);
        setCurrentEvent("All events passed");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventData]);

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  )
    return null;
  if (!eventData) return null;
  return (
    <Link href="events.ics">
      <div className="flex transition-all animate-in flex-col countdown">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-row gap-12 justify-between items-center md:justify-center ">
            <div className="flex flex-col items-center">
              <p className="text-4xl">{time.days}</p>
              <p className="text-md">Days</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl">{time.hours}</p>
              <p className="text-md">Hours</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl">{time.minutes}</p>
              <p className="text-md">Minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl">{time.seconds}</p>
              <p className="text-md">Seconds</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {/* add a line splitter */}
          <hr className="w-full border-gray-500 border-1 my-2" />

          <div className="text-xs text-gray-500 ">
            <span className="font-extrabold">{currentEvent}</span>
            {` • ${getHumanReadableDate(
              (
                eventData.find((event) => event.name === currentEvent) || {
                  date: new Date().getTime(),
                }
              ).date || ""
            )}`}
          </div>
        </div>
      </div>
    </Link>
  );
};
