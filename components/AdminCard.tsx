import { Application, status } from "@/types/application";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default async function AdminCard({
  data,
  onSubmit,
}: {
  data: { applications: Application } & status;
  onSubmit: string | ((formData: FormData) => void) | undefined;
}) {
  "use server";
  const applicationColumns = Object.keys(data.applications);
  const applicationRows = Object.values(data.applications);
  const statuses = [
    "applied",
    "accepted",
    "rejected",
    "waitlisted",
    "cancelled",
  ].map((status) => status.toUpperCase());
  return (
    <div className="relative animate-in flex flex-col group shadow-lg rounded-lg border p-5 hover:border-foreground text-foreground">
      <form action={onSubmit}>
        <input type="hidden" name="applicant_id" value={data.applicant_id} />
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
              d={
                "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              }
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-bold text-xl">
            <Link
              className="text-blue-500"
              href={`mailto://${data.applications.email}`}
            >
              {data.applications.full_name}
            </Link>{" "}
            •{" "}
            <select name="status" className="bg-transparent">
              {statuses.map((status) => (
                <option
                  className="bg-[#1E1E1E] text-white"
                  key={status + data.applicant_id}
                  value={status.toLowerCase()}
                  selected={data.status.toUpperCase() == status}
                >
                  {status}
                </option>
              ))}
            </select>
          </span>
        </span>

        <div className="flex flex-col grow gap-4 justify-between">
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="grid grid-cols-8 gap-1">
            <input
              name="note"
              className="rounded-md px-2 py-2 bg-inherit border col-span-7"
              placeholder="Please enter a note for the applicant to see."
              defaultValue={data.note}
              required
            />
            <button
              className="bg-[#1E1E1E] text-foreground rounded-lg px-3 py-3 col-span-1 text-xs font-bold transition-all hover:bg-foreground hover:text-background"
              type="submit"
            >
              Save
            </button>
          </div>
          <div className="grid grid-flow-row auto-rows-max">
            <button className="bg-[#1E1E1E] text-foreground rounded-lg px-3 py-3 text-xs font-bold transition-all hover:bg-foreground hover:text-background"></button>
            <div>
              <div className="transition-all ease-in-out duration-300">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        {applicationColumns.map((column) => (
                          <th
                            scope="col"
                            key={column}
                            className="px-6 py-3 font-medium tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {applicationRows.map((row) => (
                          <td className="px-6 py-4">{row}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-6">
              {data.applications.university} • Last updated{" "}
              <i>{new Date(data.modified_at).toLocaleString()}</i>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
