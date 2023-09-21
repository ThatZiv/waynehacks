import Link from "next/link";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import Registered from "@/components/Registered";
import Splitter from "@/components/Splitter";
import FAQ, { FAQProps } from "@/components/FAQ";

export const revalidate = 60 * 2; // revalidate every hour
export const dynamic = "force-dynamic"; // force static (this wont work)

const FAQList = {
  "What is a Hackathon?":
    "A hackathon is an event where programmers get together for a short period of time to collaborate and create a project." +
    "Attending these events and participating is a great resume booster!",

  "I am a beginner and don't know how to code, can I still participate?": `Anyone can participate! We welcome all beginners to experts in development.
    Hackathons are a perfect place to learn new skills and find out what it takes to build an application!`,

  "Can I work alone or in a team?":
    "Teams can consist of 1-4 members. Don't worry if you do not have a team! We will have an event to find team members.",

  "Where do I sign up!": `You must create an account by hitting 'login' at the top of the page and using your school email.
    Then you can register for the event by hitting 'register' at the home page.`,
  "I signed up...now what?":
    "We will send you an email with more information as the event gets closer.",
};

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-2 lg:mb-12">
          <WayneHacksLogo />
          <h1 className="sr-only">WayneHacks</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-10">
            Wayne State's first ever{" "}
            <strong className="underline">in-person</strong> Hackathon.
          </p>
          <h2 className="inline-flex col-span-12 md:col-span-12">
            <Registered />
          </h2>
          <Link
            href="/application"
            className="bg-foreground py-3 px-6 rounded-lg font-mono text-xlg font-bold text-background transition-all hover:bg-[#fc0] hover:px-12"
          >
            Register
          </Link>
        </div>

        <Splitter />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">What is WayneHacks?</h2>
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
              &nbsp; <strong>Date TBD...</strong>
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
                Wayne State University{" "}
                <i className="text-sm">(Building TBD...)</i>
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
              &nbsp; <strong>Prizes TBD...</strong>
            </h2>
          </div>
          <Splitter />
          <div className="text-lg font-bold text-center w-full flex flex-col">
            FAQ
            <div className="inline-flex col-span-12 md:col-span-12">
              <FAQ list={FAQList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
