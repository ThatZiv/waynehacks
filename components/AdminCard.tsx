"use client";
import { Application, StatusApplication, statusEnum } from "@/misc/application";
import Link from "next/link";
import Splitter from "./Splitter";
import constants from "@/misc/constants";
import { useCallback, useEffect, useState } from "react";

export function createEmailURI(obj: {
  email: string;
  status: string;
  note: string;
  full_name: string;
}) {
  let status = obj.status.toUpperCase();
  const nextSteps = `Next Steps: \n\t- View information packet: ${process.env.NEXT_PUBLIC_BASE_URL}/packet
\t- Join Discord: ${process.env.NEXT_PUBLIC_BASE_URL}/discord
\t- Join DevPost: ${process.env.NEXT_PUBLIC_BASE_URL}/devpost
\nTo withdraw your application, visit ${process.env.NEXT_PUBLIC_BASE_URL}/application and click "Withdraw Application"`;
  let body = encodeURIComponent(`Hey ${obj.full_name}, 
Your application has been ${status}.\n\n${obj.note}\n\n${
    status.toLowerCase() === statusEnum.ACCEPTED ? nextSteps : ""
  }Best,\nWayneHacks Team`);
  let subject = encodeURIComponent(`WayneHacks Application ${status}`);
  return `mailto:${obj.email}?subject=${subject}&cc=${constants.supportEmail}&body=${body}`;
}

export default function AdminCard({ data }: { data: StatusApplication }) {
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

  const [isModified, setIsModified] = useState(false);
  const [formData, setFormData] = useState({
    note: data.note,
    status: data.status,
    checked_in: data.checked_in,
  });

  // TODO: refactor the next 3 defs into a custom hook
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      status: value,
    }));
    setIsModified(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsModified(true);
  };

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      if (
        checked &&
        prompt(
          `Are you sure you want to check this person in? By typing 'y' you acknowledged and confirmed ${data.applications.full_name}'s identity (y/n)`
        ) !== "y"
      ) {
        e.preventDefault();
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
      setIsModified(true);
    },
    [data]
  );

  const resetForm = () => {
    setFormData({
      note: data.note,
      status: data.status,
      checked_in: data.checked_in,
    });
    setIsModified(false);
  };
  useEffect(() => {
    // prevent user from leaving page if they have unsaved changes
    const handleBeforeUnload = (e: any) => {
      if (isModified) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isModified]);

  useEffect(() => {
    // reset form data if data changes
    setFormData({
      note: data.note,
      status: data.status,
      checked_in: data.checked_in,
    });
    setIsModified(false);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const resp = await fetch(window.location.origin + "/admin/edit", {
        method: "POST",
        body: formData,
      }); // this mocks a traditional form submission...could've create a server action (i'm lazy)

      if (!resp.ok)
        throw new Error(`Failed to update ${formData.get("applicant_id")}.`);
      const json = await resp.json();
      if (!json.success) throw new Error(json.message);

      alert(json.message);
    } catch (e: any) {
      alert(`Failed to update ${formData.get("applicant_id")}. ` + e.message);
      // refresh page if the changes didn't go through
      if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "development")
        window.location.reload();
      console.error(e);
    }
  };
  if (data.applications.email === "none") {
    // they will need to refresh
    return (
      <div className="text-white p-5 border rounded-lg">
        Please refresh to view this record for id:{" "}
        <Link
          className="wh-link"
          href={`/admin/application/${data.applicant_id}`}
        >
          <pre>{data.applicant_id}</pre>
        </Link>
      </div>
    );
  }
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
      <form onSubmit={handleSubmit}>
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
              href={`/admin/application/${data.applicant_id}`}
            >
              {data.applications.full_name}
            </Link>{" "}
            •{" "}
            <select
              name="status"
              onChange={handleSelectChange}
              className="bg-transparent font-mono"
            >
              {statuses.map((status) => (
                <option
                  className="bg-[#1E1E1E] text-white font-sans"
                  key={status + data.applicant_id}
                  defaultValue={status.toLowerCase()}
                  selected={formData.status.toUpperCase() == status}
                >
                  {status}
                </option>
              ))}
            </select>
            {/* add reset button if modified */}
            {isModified && (
              <button
                onClick={resetForm}
                className="bg-[#1E1E1E] text-foreground rounded-lg px-3 py-3 col-span-4 md:col-span-1 text-xs font-bold transition-all hover:bg-foreground hover:text-background ml-2"
                type="button"
              >
                * Reset changes
              </button>
            )}
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
              value={formData.note}
              onChange={handleInputChange}
              required
            />
            <button
              onClick={() => setIsModified(false)}
              className={`bg-[#1E1E1E] ${
                isModified ? "text-black" : "text-foreground"
              } rounded-lg px-3 py-3 col-span-4 md:col-span-1 text-xs font-bold transition-all hover:bg-foreground hover:text-background ${
                isModified ? "bg-yellow-500" : ""
              }`}
              type="submit"
            >
              {isModified ? "* " : ""}Save
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
              {data.applications ? (
                <div className="overflow-x-auto">
                  <table className="text-sm min-w-full text-left text-gray-500 dark:text-gray-400 table-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        {applicationColumns.map((column) => (
                          <th
                            scope="col"
                            key={column + data.applicant_id + "header"}
                            className="px-6 py-3 font-medium tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {applicationRows.map((row, index) => (
                          <td
                            key={row + data.applicant_id + index.toString()}
                            className="px-6 py-4"
                          >
                            {row}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-white">
                  Please refresh to view this record...
                </p>
              )}
            </div>
          </div>
          <div>
            {/* check in checkbox */}
            <label className="flex items-center space-x-3">
              <span className="font-bold text-lg">Checked in? </span>
              <input
                type="checkbox"
                name="checked_in"
                checked={formData.checked_in}
                onChange={handleCheckboxChange}
                className="rounded-md px-2 py-2 bg-inherit border col-span-8 md:col-span-6"
                defaultChecked={data.checked_in}
              />
            </label>
          </div>
          <p className="text-gray-400 text-xs mt-6">
            {data.applicant_id} • {data.applications.university} • Last updated{" "}
            <i>
              {new Date(data.modified_at).toLocaleString("en-US", {
                timeZone: "America/New_York",
              })}
            </i>
          </p>
        </div>
      </form>
    </div>
  );
}
