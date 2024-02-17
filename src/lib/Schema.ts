import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "please provide a category name"),
  image: z.string(),
});

export const projectFormSchema = z.object({
  title: z
    .string({ required_error: "please enter a title" })
    .min(1, "please enter a title"),
  description: z.string().min(1, "please enter a description"),
  url: z.string().optional(),
  categories: z.array(categoryFormSchema.extend({ id: z.string() })).min(1),
  image: z.string(),
});
