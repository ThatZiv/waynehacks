"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDesc = searchParams.get("error_description"); // usually from auth callback from supabase
  const message = searchParams.get("message");
  return (
    <>
      {(errorDesc || error) && (
        <p className="my-4 p-4 rounded-md bg-red-900 text-neutral-300 text-center">
          {error}
        </p>
      )}
      {message && (
        <p className="my-4 p-4 rounded-md bg-neutral-900 text-neutral-300 text-center">
          {message}
        </p>
      )}
    </>
  );
}
