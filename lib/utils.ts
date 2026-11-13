import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Production domain; NEXT_PUBLIC_SITE_URL overrides it (e.g. for preview deployments).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.amvco.com.au";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
