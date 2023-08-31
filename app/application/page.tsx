// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import Back from "@/components/Back";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Messages from "../login/messages";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Application() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const getApps = async () => {
    const data = await supabase.from("applications").select("applicant_id");
    console.log(data, user?.id);
    return data;
  };
  const addTodo = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");

    if (title) {
      // Create a Supabase client configured to use cookies
      // const supabase = createServerActionClient({ cookies });
      // This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      // await supabase.from("todos").insert({ title });
      // revalidatePath("/server-action-example");
    }
  };
  if (!user) redirect("/login?message=You must be logged in to register.");
  return (
    <div className="animate-in flex flex-col gap-10 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
      <Back />
      <h2 className="text-4xl text-center mr-14 font-extrabold font-['consolas']">
        Application
      </h2>
      {JSON.stringify((await getApps()).data)}
      <form
        action={addTodo}
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        <label className="text-md" htmlFor="full_name">
          Full name
        </label>
        <input
          name="full_name"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          placeholder="John Doe"
        />
      </form>
    </div>
  );
}
