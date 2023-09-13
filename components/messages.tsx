"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
export default function Messages() {
  const [isMounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const searchParams = useSearchParams();
  const hashParams = React.useMemo(
    () => new URLSearchParams(isMounted ? window.location.hash : ""), // FIXME: this doesnt work
    [isMounted]
  ); // bc supabase sends urls in hash because of "security"
  const error = searchParams.get("error") || hashParams.get("error");
  const errorDesc = hashParams.get("error_description"); // usually from auth callback from supabase

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
