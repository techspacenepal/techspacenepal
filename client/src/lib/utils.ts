// export const BASE_URL = "http://localhost:5000/api";
// export const BASE_IMAGE_URL = "http://localhost:5000";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
