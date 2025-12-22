import Link from "next/link";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import Registered from "@/components/Registered";
import Splitter from "@/components/Splitter";
import FAQ from "@/components/FAQ";
import Announcement from "@/components/Announcement";
import constants from "@/misc/constants";
import Image from "next/image";
import { SupabaseFunctions } from "@/misc/functions";
import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { Countdown } from "@/components/Countdown";
import { Sponsors } from "@/components/Sponsors";
import DevpostLogo from "@/public/devpost.svg";
import ExtraLinks from "@/components/ExtraLinks";
import { FaCalendar, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";

export const revalidate = 30 * 60; // revalidate every 30 min
export const dynamic = "force-static"; // force static caching

// export async function generateMetadata() {
//   // get number people registered
//   const supabase = createServerComponentClient({ cookies });
//   const whacks = new SupabaseFunctions(supabase);
//   const applicants = await whacks.getApplicants();
//   return {
//     description: `WayneHacks is a 24-hour in-person or hybrid Hackathon at Wayne State University.
// There are currently ${applicants} who have applied. All majors and skill levels are welcome with teams up to four people. Prizes will be awarded to the best projects, so register today!`,
//   };
// }

export default async function Index() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-dark">
        <div className="flex flex-col items-center mb-2 lg:mb-12">
          <WayneHacksLogo />
          <h1 className="sr-only">WayneHacks</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mt-8">
            WayneHacks is back for the{" "}
            {/* <span className="line-through decoration-4 hover:decoration-red-200">
              in-person
            </span>{" "} */}
            <strong className="underline">third</strong> time around.
          </p>
          <div className="inline-flex col-span-12 md:col-span-12 mb-6"></div>
          <h2 className="inline-flex col-span-12 md:col-span-12 mb-6">
            <Registered />
          </h2>
        </div>
        <Splitter />

        <div className="flex flex-col gap-8">
          <h2 className="wh-subheading">What is WayneHacks?</h2>
          <Image
            width={200}
            height={200}
            className="mx-auto text-center transition-all duration-500 ease-in-out transform hover:scale-110"
            alt="Wayne Hacks 2 Logo"
            src="/icon.png"
          />
          <p className="text-md text-center">
            WayneHacks is a 24-hour in-person Hackathon at Wayne State
            University. All majors and skill levels are welcome with teams up to
            four people. Prizes will be awarded to the best projects, so be
            ready!
          </p>
          <div>
            <Countdown />
          </div>
          <div className="grid grid-cols-12 justify-items-center">
            <h2 className="inline-flex col-span-12 md:col-span-4">
              <FaCalendar className="w-5 h-5 mt-[1.5px]" />
              &nbsp;{" "}
              <strong>
                <a href="/events.ics" className="hover:wh-link">
                  January 18th, 2025
                </a>
              </strong>
            </h2>
            <h2 className="inline-flex col-span-12 md:col-span-4">
              <FaMapMarkerAlt className="w-5 h-5 mt-[1.5px]" />
              &nbsp;{" "}
              <strong>
                <a
                  href={constants.addressURL}
                  target={"_blank"}
                  className="hover:wh-link"
                >
                  Wayne State University
                </a>
                {/* <p className="text-xs invisible md:visible">
                  5105 Anthony Wayne Dr, Detroit, MI 48202
                </p> */}
              </strong>
            </h2>
            <h2 className="inline-flex col-span-12 md:col-span-4">
              <FaDollarSign className="w-5 h-5 mt-[2.5px]" />
              &nbsp; <strong>Prizes</strong>
            </h2>
          </div>
          {/* Location */}
          <div className="w-full flex flex-col justify-center h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1042.4215331729667!2d-83.07299140727143!3d42.355029612278685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824d2a41779eb09%3A0xee199848d652faba!2sSaint%20Andrew&#39;s%20Memorial%20Episcopal%20Church!5e0!3m2!1sen!2sus!4v1704741253913!5m2!1sen!2sus"
              style={{
                border: 0,
                maxWidth: "100%",
                minHeight: 350,
                borderRadius: 10,
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <Splitter />
          <div className="text-lg  text-center w-full flex flex-col">
            <div className="items-center">
              <h2 className="wh-subheading">Our Sponsors</h2>
              <div className="inline-flex col-span-12 md:col-span-12">
                <Sponsors />
              </div>
            </div>
          </div>
          <Splitter />
          <div className="text-lg font-bold text-center w-full flex flex-col">
            <h2 className="wh-subheading">FAQ</h2>
            <div className="inline-flex col-span-12 md:col-span-12">
              <FAQ />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ExtraLinks />
          </div>
        </div>
      </div>
      <footer className="bottom-0 sticky">
        <Announcement />
      </footer>
    </div>
  );
}
