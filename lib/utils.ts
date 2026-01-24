import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeRedirect(next: string | null, fallback: string = "/"): string {
  if (!next) {
    return fallback;
  }

  if (next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }

  return fallback;
}
