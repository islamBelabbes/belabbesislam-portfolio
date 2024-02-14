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
