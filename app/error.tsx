"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="dark:text-white flex h-screen text-black text-center">
      <div className="m-auto">
        <h1 className="text-xl">Something went wrong :(</h1>
        <button
          className="py-2 px-4 rounded-md mt-5 bg-[#1E1E1E] text-foreground"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
