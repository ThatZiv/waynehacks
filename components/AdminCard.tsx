import { Application, status, statusEnum } from "@/misc/application";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Splitter from "./Splitter";
import constants from "@/misc/constants";

export function createEmailURI(obj: {
  email: string;
  status: string;
  note: string;
  full_name: string;
}) {
  let status = obj.status.toUpperCase();
  let body = encodeURIComponent(
    `Hey ${obj.full_name}, your application has been ${status}.\n\n${obj.note}\n\nBest,\nWayneHacks Team`
  );
  let subject = encodeURIComponent(`WayneHacks Application ${status}`);
  return `mailto:${obj.email}?subject=${subject}&cc=${constants.supportEmail}&body=${body}`;
}

export default async function AdminCard({
  data,
}: {
  data: { applications: Application } & status;
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
  // example: mailto:jsmith@example.com?subject=A%20Test&body=My%20idea%20is%3A%20%0A
  const emailURI = createEmailURI({
    email: data.applications.email,
    status: data.status,
    note: data.note,
    full_name: data.applications.full_name,
  });
  return (
    <div
      style={{
        backgroundColor:
          data.status === statusEnum.ACCEPTED
            ? "#365314"
            : data.status === statusEnum.REJECTED
            ? "#7f1d1d"
            : data.status === statusEnum.CANCELLED
            ? "#854d0e"
            : "black",
      }}
      className={`relative animate-in flex flex-col group shadow-lg rounded-lg border p-5 hover:border-foreground mb-4 text-foreground`}
    >
      <form action="/admin/edit" method="post">
        <input type="hidden" name="applicant_id" value={data.applicant_id} />
        <input type="hidden" name="email" value={data.applications.email} />
        <input
          type="hidden"
          name="full_name"
          value={data.applications.full_name}
        />
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
              href={`mailto:${data.applications.email}`}
            >
              {data.applications.full_name}
            </Link>{" "}
            •{" "}
            <select name="status" className="bg-transparent font-mono">
              {statuses.map((status) => (
                <option
                  className="bg-[#1E1E1E] text-white font-sans"
                  key={status + data.applicant_id}
                  defaultValue={status.toLowerCase()}
                  selected={data.status.toUpperCase() == status}
                >
                  {status}
                </option>
              ))}
            </select>
          </span>
        </span>

        <div className="flex flex-col grow gap-4 justify-between">
          <Splitter />
          <div className="grid grid-cols-8 gap-1">
            <input
              name="note"
              className="rounded-md px-2 py-2 bg-inherit border col-span-8 md:col-span-6"
              placeholder="Please enter a note for the applicant to see."
              defaultValue={data.note}
              required
            />
            <button
              className="bg-[#1E1E1E] text-foreground rounded-lg px-3 py-3 col-span-4 md:col-span-1 text-xs font-bold transition-all hover:bg-foreground hover:text-background"
              type="submit"
            >
              Save
            </button>
            <Link
              className="bg-[#2d3160] text-foreground rounded-lg px-3 py-3 col-span-4 md:col-span-1 text-xs font-bold transition-all text-center hover:bg-foreground hover:text-background"
              target="_blank"
              href={emailURI}
            >
              Email
            </Link>
          </div>
          <div>
            <div className="transition-all ease-in-out duration-300">
              <div className="overflow-x-auto">
                <table className="text-sm min-w-full text-left text-gray-500 dark:text-gray-400 table-auto">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {applicationColumns.map((column) => (
                        <th
                          scope="col"
                          key={column + data.applicant_id}
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
                        <td key={row + data.applicant_id} className="px-6 py-4">
                          {row}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-6">
            {data.applicant_id} • {data.applications.university} • Last updated{" "}
            <i>{new Date(data.modified_at).toLocaleString()}</i>
          </p>
        </div>
      </form>
    </div>
  );
}
