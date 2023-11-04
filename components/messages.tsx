"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
export default function Messages() {
  if (typeof window === "object") {
    console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
\`\`\`\`\`\`\`\`\`\` Welcome \`\`\`\`\`\`\`\`\`\`\`
\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
\`\`                          \`\`
\`\`                          \`\`
\`\`         \`\`\`\`\`\`\`\`\`\`       \`\`
\`\`        \`      \`\`\`        \`\`
\`\`             \`\`\`          \`\`
\`\`            \`\`\`           \`\`
\`\`                          \`\`
\`\`         \`\`\`              \`\`
\`\`        \`\`\`      \`        \`\`
\`\`       \`\`\`\`\`\`\`\`\`\`         \`\`
\`\`                          \`\`
\`\`                          \`\`
\`\`                          \`\`
\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
\`\`https://github.com/thatziv \`
\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
`);
  }

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDesc = searchParams.get("error_description"); // bc supabase sends urls in hash because of "security"

  const message = searchParams.get("message");
  return (
    <>
      {(errorDesc || error) && (
        <p className="my-4 p-4 rounded-md animate-pulse bg-red-900 text-neutral-200 text-center">
          {errorDesc || error}
        </p>
      )}
      {message && (
        <p className="my-4 p-4 rounded-md text-black font-semibold bg-neutral-200 text-center">
          {message}
        </p>
      )}
    </>
  );
}
