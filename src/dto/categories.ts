import { category } from "@/schema/category";

type TCategory = category;

export const categoryDtoMapper = (category: TCategory) => {
  return { ...category };
};
