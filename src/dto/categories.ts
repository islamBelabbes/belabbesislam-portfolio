import { CategoryTable } from "@/lib/db/schema";

type TCategory = CategoryTable["$inferSelect"];

export const categoryDtoMapper = (category: TCategory) => {
  // TODO : design DTO
  return { ...category };
};
