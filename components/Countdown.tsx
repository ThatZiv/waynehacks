"use client";

import { events } from "@/misc/constants";
import { Event } from "@/misc/events";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const defaultEvent = "Loading...";

export const Countdown = () => {
  const eventData = useMemo<Event[]>(
    // TODO: make this dynamic OR put in our real schedule here
    () => events,
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

  const [currentEvent, setCurrentEvent] = useState(defaultEvent);
  const [occurringEvent, setOccurringEvent] = useState<String>(defaultEvent);
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const upcomingEvents = eventData.filter((event) => event.date > now);
      const ongoingEvent = eventData.find(
        (event) => event.date <= now && (event.end ? event.end >= now : false)
      );
      if (upcomingEvents.length > 0) {
        if (ongoingEvent && ongoingEvent.name !== occurringEvent) {
          setOccurringEvent(ongoingEvent.name);
        } else {
          setOccurringEvent(defaultEvent);
        }
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
        // if we are in the interval clear it
        clearInterval(interval);
        setCurrentEvent("This event has ended.");
      }
    };
    const interval = setInterval(tick, 1000);
    tick();

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData]);

  const isComplete =
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;
  // FIXME: at the end of every event, it will indicate that the event has ended
  if (!eventData) return null;
  if (currentEvent === "Loading...") return null;
  return (
    <Link href="/events.ics">
      <div className="flex transition-all animate-in flex-col countdown">
        {!isComplete ? (
          <>
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
            <div className="flex flex-col items-center text-center">
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
                {occurringEvent !== defaultEvent && (
                  <>
                    <hr className="w-full border-gray-500 border-1 my-2" />
                    <span className="animate-pulse">
                      In Progress •{" "}
                      <span className="font-extrabold ">{occurringEvent}</span>
                    </span>
                    {` until ${getHumanReadableDate(
                      (
                        eventData.find(
                          (event) => event.name === occurringEvent
                        ) || {
                          end: new Date().getTime(),
                        }
                      ).end || ""
                    )}`}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-row gap-12 items-center justify-center">
                <h2>This event has ended.</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
