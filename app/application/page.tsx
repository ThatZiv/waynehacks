// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import Back from "@/components/Back";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Messages from "../../components/messages";
import { redirect } from "next/navigation";
import React, { cache } from "react";
import { Application } from "@/misc/application";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import { majors } from "@/misc/majors";
import Splitter from "@/components/Splitter";
import { SupabaseFunctions } from "@/misc/functions";
import constants from "@/misc/constants";

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
      "/login?message=You must be logged in to register.&next=/application"
    );
  const whacks = new SupabaseFunctions(supabase);
  const canRegister = await whacks.getConfigValue("canRegister");
  if (!canRegister) redirect("/?message=Applications are currently closed.");
  //@ts-expect-error we handle if its null
  const application = (await getApplication()).data[0] as
    | Application
    | undefined;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 text-white">
        <Back />
        <WayneHacksLogo />

        <h2 className="lg:text-4xl md:text-3xl text-2xl text-center font-sans">
          {/* TODO: fixed roboto font now showing up */}
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
              {application.status?.status === "cancelled" && <RegisterForm />}
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
            </div>
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
    <div className="relative flex flex-col group shadow-lg rounded-lg border border-gray-700 p-5 hover:border-foreground">
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
        <p className="opacity-70">{props.subtitle}</p>
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
          <p className="text-gray-400 text-xs">
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
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
    >
      <label className="text-md text-white" htmlFor="full_name">
        Full name
      </label>
      <input
        name="full_name"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="John Doe"
        required
      />
      <label className="text-md text-white" htmlFor="graduation_year">
        Graduation year
      </label>
      <input
        name="graduation_year"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="2025"
        required
      />
      <label className="text-md text-white" htmlFor="university">
        College/University
      </label>
      <select
        name="university"
        required
        className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 appearance-none text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-6"
      >
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

      <label className="text-md text-white" htmlFor="major">
        Major
      </label>
      <select
        name="major"
        required
        className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 appearance-none text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-6"
      >
        <option value="" disabled selected>
          Select your major
        </option>
        {majors.map((major: string) => (
          <option key={major} value={major} className="text-black bg-white">
            {major}
          </option>
        ))}
      </select>
      <label className="text-md text-white" htmlFor="phone_number">
        Phone number
      </label>
      <input
        name="phone_number"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="2485243477"
        required
      />
      <label className="text-md text-white" htmlFor="diet">
        Dietary restrictions
      </label>
      <input
        name="diet"
        className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
        placeholder="Vegan, Kosher, Halal, etc."
      />
      <label className="text-md text-white" htmlFor="student_id">
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
      <button type="submit" className="wh-btn">
        Submit
      </button>
    </form>
  );
}
