import Link from "next/link";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import Registered from "@/components/Registered";
import Splitter from "@/components/Splitter";
import FAQ from "@/components/FAQ";
import Announcement from "@/components/Announcement";
import AboutUs from "@/components/aboutUs"
import constants from "@/misc/constants";
import Image from "next/image";

export const revalidate = 30 * 60; // revalidate every 30 min
export const dynamic = "force-static"; // force static caching

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-white">
        <div className="flex flex-col items-center mb-2 lg:mb-12">
          <WayneHacksLogo />
          <h1 className="sr-only">WayneHacks</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-10">
            Wayne State&apos;s first ever{" "}
            <strong className="underline">in-person</strong> Hackathon.
          </p>
          <h2 className="inline-flex col-span-12 md:col-span-12">
            <Registered />
          </h2>
        </div>
        <Splitter />

        <div className="flex flex-col gap-8">
          <h2 className="wh-subheading">What is WayneHacks?</h2>
          <Image
            width={250}
            height={250}
            className="mx-auto my-[-80px] text-center transition-all duration-500 ease-in-out transform hover:scale-110"
            alt="Wayne Hacks 2 Logo"
            src="/whacks2-trans.png"
          />
          <p className="text-md text-center">
            WayneHacks is a 24-hour in-person Hackathon at Wayne State
            University. All majors and skill levels are welcome with teams up to
            four people. Prizes will be awarded to the best projects, so be
            ready!
          </p>
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
          <Splitter />
          <AboutUs />
          <Splitter />
          <div className="text-lg font-bold text-center w-full flex flex-col">
            <h2 className="wh-subheading">FAQ</h2>
            <div className="inline-flex col-span-12 md:col-span-12">
              <FAQ />
            </div>
          </div>
        </div>
      </div>
      <footer className="bottom-0 sticky">
        <Announcement />
      </footer>
    </div>
  );
}
