import React from "react";
import Splitter from "./Splitter";
import { Blinker, Arapey } from "next/font/google";
import { SparklesCore } from "./ui/sparkles";

const blinker = Blinker({
  subsets: ["latin", "latin-ext"],
  variable: "--font-blinker",
  weight: "400",
});

export default function WayneHacksLogo() {
  return (
    <div className="flex gap-4 justify-center items-center text-dark flex-col -mb-16">
      {/* make a span with content of "2" appear when it is hovered */}
      <h1
        className={`lg:text-8xl md:text-7xl text-5xl text-center mr-14 bg-gradient-to-r from-pink-100 to-sky-100 bg-clip-text text-transparent ${blinker.className}`}
      >
        WayneHacks
        <span
          data-heading="3"
          className="animate-pulse hover:scale-105 text-sky-500 ml-2 absolute spacing-x-2"
        >
          4
        </span>
        <Splitter />
      </h1>

      <div className="inset-0 w-full h-[150px] bg-transparent [mask-image:radial-gradient(250px_200px_at_top,white,transparent_80%)] sm:[mask-image:radial-gradient(400px_200px_at_top,white,transparent_80%)] md:[mask-image:radial-gradient(400px_200px_at_top,white,transparent_80%)]">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={500}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
}
