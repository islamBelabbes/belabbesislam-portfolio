import { z } from "zod";

export const idSchema = z.number();

export const categoryFormSchema = z.object({
  name: z.string().min(1, "please provide a category name"),
  image: z.string(),
});

export const projectFormSchema = z.object({
  title: z
    .string({ required_error: "please enter a title" })
    .min(1, "please enter a title"),
  description: z.string().nullish(),
  url: z.string().nullish(),
  categories: z.array(categoryFormSchema.extend({ id: z.number() })).min(1),
  image: z.string(),
});

export const PageSchema = z.coerce.number().int().min(1).catch(1);

export const PaginationSchema = z.object({
  page: PageSchema,
  limit: PageSchema.removeCatch()
    .or(z.coerce.number().pipe(z.literal(-1)))
    .catch(5),
});

export const ImageSchema = z
  .instanceof(File)
  .refine((file) => {
    return file.size <= 1024 * 1024 * 10;
  }, "File size must be less than 10MB")
  .refine((file) => {
    return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
  }, "File must be a PNG, JPG or JPEG");

export type TPaginationSchema = z.infer<typeof PaginationSchema>;
export type Id = z.infer<typeof idSchema>;
