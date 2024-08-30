import React from "react";
import "../app/flicker.css";
import Splitter from "./Splitter";
import { Blinker, Arapey } from "next/font/google";

const blinker = Blinker({
  subsets: ["latin", "latin-ext"],
  variable: "--font-blinker",
  weight: "400",
});

export default function WayneHacksLogo() {
  return (
    <div className="flex gap-8 justify-center items-center text-dark">
      {/* make a span with content of "2" appear when it is hovered */}
      <h1
        className={`lg:text-8xl md:text-7xl text-5xl text-center mr-14 ${blinker.className}`}
      >
        WayneHacks
        <span
          data-heading="3"
          className="animate-pulse infinite text-rose-700 ml-2 absolute spacing-x-2"
        >
          3
        </span>
        <Splitter />
      </h1>
    </div>
  );
}
