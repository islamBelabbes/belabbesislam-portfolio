import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function generateSearchParams(params: Record<string, any>) {
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

// https://github.com/orgs/react-hook-form/discussions/1991#discussioncomment-4593488
type UnknownObject = Record<string, unknown>;
type UnknownArrayOrObject = unknown[] | UnknownObject;
export function getDirtyFields(
  dirtyFields: UnknownArrayOrObject | boolean | unknown,
  allValues: UnknownArrayOrObject | unknown
): UnknownArrayOrObject | unknown {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  if (typeof dirtyFields !== "object" || dirtyFields === null) {
    return undefined;
  }

  const dirtyFieldsObject = dirtyFields as UnknownObject;
  const allValuesObject = allValues as UnknownObject;

  return Object.fromEntries(
    Object.entries(dirtyFieldsObject).map(([key, value]) => [
      key,
      getDirtyFields(value, allValuesObject[key]),
    ])
  );
}
