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
  if (!error && !errorDesc && !message) return;

  return (
    <>
      {(errorDesc || error) && (
        <p className="p-4 w-full animate-pulse bg-red-900 text-neutral-200 text-center">
          {errorDesc || error}
        </p>
      )}
      {message && (
        <p className="p-4 w-full text-black font-semibold bg-neutral-200 text-center">
          {message}
        </p>
      )}
    </>
  );
}
