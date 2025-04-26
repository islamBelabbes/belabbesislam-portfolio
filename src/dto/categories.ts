import { CategoryTable } from "@/lib/db/schema";

export const categoryDtoMapper = (category: CategoryTable["$inferSelect"]) => {
  // TODO : design DTO
  return { ...category };
};

export type Category = ReturnType<typeof categoryDtoMapper>;
