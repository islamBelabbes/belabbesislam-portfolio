import { TCategory, TTryCatch } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isInSelectedCategories = (
  selectedCategories: TCategory[],
  category: TCategory
) => {
  return selectedCategories?.some((item) => item.id === category?.id);
};

export const tryCatch: TTryCatch = async (promise) => {
  try {
    const data = await promise;
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
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

export const flatZodError = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    [issue.path[0] ?? "unknown"]: issue.message,
  }));
};

export function generateSearchParams(
  params: Record<string, string | number | undefined>
) {
  // filter out undefined values
  const searchParams = new URLSearchParams();
  Object.keys(params)
    .filter(Boolean)
    .forEach((key) => {
      if (!params[key]) return;
      searchParams.append(key, params[key]!.toString());
    });

  return searchParams;
}
