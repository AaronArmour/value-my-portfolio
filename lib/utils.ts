import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.warn(`Price fetch failed: ${res.status} ${url}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(`Network error fetching ${url}`, err);
    return null;
  }
}
