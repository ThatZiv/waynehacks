import Link from "next/link";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import Registered from "@/components/Registered";
import Splitter from "@/components/Splitter";
import FAQ from "@/components/FAQ";
import Announcement from "@/components/Announcement";
import constants from "@/misc/constants";
import Image from "next/image";
import { SupabaseFunctions } from "@/misc/functions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Countdown } from "@/components/Countdown";
import { Sponsors } from "@/components/Sponsors";

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
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-white">
        <div className="flex flex-col items-center mb-2 lg:mb-12">
          <WayneHacksLogo />
          <h1 className="sr-only">WayneHacks</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mt-8">
            Wayne State&apos;s first ever{" "}
            {/* <span className="line-through decoration-4 hover:decoration-red-200">
              in-person
            </span>{" "} */}
            <strong className="underline">in-person</strong> Hackathon.
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
            src="/whacks2-trans.png"
          />
          <p className="text-md text-center">
            WayneHacks is a 24-hour in-person <strong>or</strong> hybrid
            Hackathon at Wayne State University. All majors and skill levels are
            welcome with teams up to four people. Prizes will be awarded to the
            best projects, so be ready!
          </p>
          <div>
            <Countdown />
          </div>
          <div className="grid grid-cols-12 justify-items-center">
            <h2 className="inline-flex col-span-12 md:col-span-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              &nbsp;{" "}
              <strong>
                <a href="/events.ics" className="hover:text-yellow-500">
                  January 13-14, 2024
                </a>
              </strong>
            </h2>
            <h2 className="inline-flex col-span-12 md:col-span-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              &nbsp;{" "}
              <strong>
                <a
                  href={constants.addressURL}
                  target={"_blank"}
                  className="hover:text-yellow-500"
                >
                  Wayne State University
                </a>
                {/* <p className="text-xs invisible md:visible">
                  5105 Anthony Wayne Dr, Detroit, MI 48202
                </p> */}
              </strong>
            </h2>
            <h2 className="inline-flex col-span-12 md:col-span-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                />
              </svg>
              &nbsp; <strong>Prizes</strong>
            </h2>
          </div>
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
            <Link href="/events.ics" target="_blank">
              <button className="bg-yellow-400 inline-flex hover:bg-white text-black py-2 px-4 hover:px-8 transition-all rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                &nbsp; Add to calendar
              </button>
            </Link>
            <Link href={constants.infoPacket} target="_blank">
              <button className="bg-green-700 inline-flex hover:bg-white text-black py-2 px-4 hover:px-8 transition-all rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  color="#000000"
                  viewBox="0 0 24 24"
                >
                  <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
                </svg>
                &nbsp; Info Packet
              </button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="bottom-0 sticky">
        <Announcement />
      </footer>
    </div>
  );
}
