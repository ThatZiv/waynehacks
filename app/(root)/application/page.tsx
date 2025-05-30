// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import Back from "@/components/Back";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { cache } from "react";
import { type Application, shirt_sizes, statusEnum } from "@/misc/application";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import { majors } from "@/misc/majors";
import Splitter from "@/components/Splitter";
import { SupabaseFunctions } from "@/misc/functions";
import constants from "@/misc/constants";
import markdown from "@/misc/markdown";
import Link from "next/link";
import { cancelApplication } from "@/actions/cancelApplication";

export const metadata = {
  title: "WayneHacks Application",
  description: "Register for WayneHacks 2",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Application() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const getApplication = cache(async () => {
    const data = await supabase
      .from("applications")
      .select("*, status(*)")
      .eq("applicant_id", user?.id)
      .limit(1);
    return data;
  });
  if (!user)
    redirect(
      "/login?message=You must be logged in to apply.&next=/application"
    );
  const whacks = new SupabaseFunctions(supabase);
  const canRegister = await whacks.getConfigValue("canRegister");
  //@ts-expect-error we handle if its null
  const application = (await getApplication()).data[0] as
    | Application
    | undefined;
  // if you can't register and you don't have an application, deny
  if (!canRegister && !application)
    redirect("/?message=Applications are currently closed.");
  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 text-dark">
        <Back />
        <WayneHacksLogo />

        <h2 className="wh-subheading">
          {application ? "Your application" : "Register for the event"}
        </h2>
        {application ? (
          <>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-4">
                <Card
                  title={application?.status!.status.toUpperCase()}
                  subtitle={application?.status!.note || "No note provided."}
                  date={new Date(application?.status!.modified_at)}
                  icon={
                    "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  }
                />
              </div>
              {application.status?.status === statusEnum.CANCELLED &&
                canRegister && <RegisterForm />}
              <p className="text-xs text-center">
                If you believe there is anything wrong or have questions
                regarding your application, feel free to{" "}
                <a
                  className="wh-link"
                  target="_blank"
                  href={`mailto:${constants.supportEmail}`}
                >
                  reach out
                </a>{" "}
                to us.
              </p>

              <br />
              {application.status?.status === statusEnum.ACCEPTED && (
                <div className="mx-5 border rounded-lg p-5">
                  <h2 className="wh-subheading md:text-left text-center mt-3 mb-4">
                    Congrats! 🥳🎉
                  </h2>
                  <p>Here are your next steps...</p>
                  <Splitter />
                  <ol className="list-decimal font-thin mx-4 mt-3">
                    <li>
                      Join our{" "}
                      <Link
                        className="wh-link"
                        href={constants.discord}
                        target="_blank"
                      >
                        Discord
                      </Link>{" "}
                      for more updates.
                    </li>
                    <li>
                      Join our hackathon on{" "}
                      <Link
                        href={constants.devpost}
                        className="wh-link"
                        target="_blank"
                      >
                        DevPost
                      </Link>
                      . This is where you will submit your project.
                    </li>
                    <li>
                      Please consider viewing our{" "}
                      <Link
                        href={constants.infoPacket}
                        target="_blank"
                        className="wh-link"
                      >
                        information packet
                      </Link>{" "}
                      for more important details regarding the event.
                    </li>
                  </ol>
                </div>
              )}
            </div>
            {application.status?.status !== statusEnum.CANCELLED &&
              application.status?.status !== statusEnum.REJECTED && (
                // TODO: add a confirmation
                <div className="flex justify-center">
                  <form
                    action={cancelApplication}
                    className="wh-btn w-1/3  bg-red-600 hover:bg-red-700 text-dark hover:animate-pulse text-center"
                  >
                    <input
                      type="hidden"
                      name="applicant_id"
                      value={application.applicant_id}
                    />
                    <button className="w-full text-white h-full text-center">
                      Withdraw application
                    </button>
                  </form>
                </div>
              )}
          </>
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  );
}

function Card(props: {
  title: string;
  subtitle: string;
  icon: string;
  date: Date;
}) {
  return (
    <div className="relative flex flex-col group shadow-md rounded-lg border transition-all border-gray-700 p-5 hover:shadow-xl">
      <span className="flex items-center space-x-3 mb-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80 group-hover:opacity-100"
        >
          <path
            d={props.icon}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="font-bold">{props.title}</h3>
      </span>

      <div className="flex flex-col grow gap-4 justify-between">
        <Splitter />
        <div
          className="opacity-70"
          dangerouslySetInnerHTML={{ __html: markdown.parse(props.subtitle) }}
        />
        <div className="flex justify-between items-center">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg> */}
          <p className="text-gray-600 text-xs">
            Last updated <i>{props.date.toLocaleString()}</i>
          </p>
        </div>
      </div>
    </div>
  );
}

async function RegisterForm() {
  const getUniversities = cache(async () => {
    const data = (await fetch(
      `http://universities.hipolabs.com/search?country=united%20states`,
      { cache: "force-cache" }
    ).then((res) => res.json())) as any[];
    return data.sort((a, b) => a.name.localeCompare(b.name));
  });
  const universities = await getUniversities();
  return (
    <form
      action="/application/register"
      method="post"
      className="flex-1 flex flex-col w-full justify-center gap-2"
    >
      <label className="text-md text-dark" htmlFor="full_name">
        Full name
      </label>
      <input
        name="full_name"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="John Doe"
        required
      />
      <label className="text-md text-dark" htmlFor="graduation_year">
        Graduation year
      </label>
      <input
        name="graduation_year"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="2025"
        required
      />
      <label className="text-md text-dark" htmlFor="university">
        College/University
      </label>
      <select name="university" required className="wh-dropdown">
        <option value="" disabled selected>
          Select your university
        </option>
        {universities.map((uni: any) => (
          <option
            key={uni.name}
            value={uni.name}
            className="text-black bg-white"
          >
            {uni.name} ({uni?.domains.join(", ")})
          </option>
        ))}
      </select>

      <label className="text-md text-dark" htmlFor="major">
        Major
      </label>
      <select name="major" required className="wh-dropdown">
        <option value="" disabled selected>
          Select your major
        </option>
        {majors.map((major: string) => (
          <option key={major} value={major} className="text-black bg-white">
            {major}
          </option>
        ))}
      </select>
      <label className="text-md text-dark" htmlFor="phone_number">
        Phone number
      </label>
      <input
        name="phone_number"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="2485243477"
        required
      />
      <label className="text-md text-dark" htmlFor="diet">
        Dietary restrictions
      </label>
      <input
        name="diet"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="Vegan, Kosher, Halal, etc."
      />
      <label className="text-md text-dark" htmlFor="student_id">
        Student ID{" "}
        <span className="text-xs italic text-gray-400">
          (If you don&apos;t have one, please enter your school email)
        </span>
      </label>
      <input
        name="student_id"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="hh3509"
        required
      />
      <label className="text-md text-dark" htmlFor="shirt_size">
        Shirt Size{" "}
      </label>
      <select name="shirt_size" className="wh-dropdown" required>
        <option value="" disabled selected>
          Select your shirt size
        </option>
        {shirt_sizes.map((size) => (
          <option key={size} value={size} className="text-black bg-white">
            {size}
          </option>
        ))}
      </select>
      {/* tailwind blockquote disclaimer for submitted */}
      <blockquote className="rounded-md text-xs bg-btn-background border text-foreground border-gray-700 p-5 mb-6">
        By submitting this form, you agree to the{" "}
        <Link
          className="wh-link"
          target="_blank"
          href={constants.infoPacket + "#heading=h.xohd6a1b7b23"}
        >
          WayneHacks Hackathon Rules
        </Link>
        . By submitting, you also acknowledge that WayneHacks will{" "}
        <strong>not</strong> be responsible for providing any sort of
        reimbursement, parking, food, and sleeping accommodations due to
        limitations beyond our control.
        <br />
        <br />
        Please consider viewing our{" "}
        <Link href={constants.infoPacket} target="_blank" className="wh-link">
          information packet
        </Link>{" "}
        for more important details regarding the event.
      </blockquote>
      <button type="submit" className="wh-btn">
        Submit
      </button>
    </form>
  );
}
