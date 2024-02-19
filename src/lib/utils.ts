import { TCategory } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isInSelectedCategories = (
  selectedCategories: TCategory[],
  category: TCategory
) => {
  return selectedCategories?.some((item) => item.id === category?.id);
};

export const tryCatch = async <T>(Promise: Promise<T>) => {
  try {
    const data: any = await Promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export async function urlToBlob(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.blob();
    const blob = new Blob([data], { type: "image/jpeg" });
    return blob;
  } catch (error) {
    return null;
  }
}
