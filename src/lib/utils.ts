import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateArray(length: number) {
  const result = [];
  for (let i = 1; i <= length; i++) {
    result.push(i);
  }
  return result;
}
