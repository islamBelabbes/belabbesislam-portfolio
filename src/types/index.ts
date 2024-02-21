import { categoryFormSchema, projectFormSchema } from "@/lib/Schema";
import { z } from "zod";

export type TODO = any; // this is placeholder type

export type TDashboardMenuItems = {
  name: string;
  href: string;
  icon: JSX.Element;
  subMenu?: TDashboardMenuItems[] | null;
};

export type TProject = z.infer<typeof projectFormSchema> & { id: number };

export type TCategory = z.infer<typeof categoryFormSchema> & { id: number };

export type TPostForm = {
  initialData?: TProject;
  isUpdate: boolean;
};
export type TCategoryForm = {
  initialData?: TCategory;
  isUpdate: boolean;
};

export type TTryCatchReturn<T> =
  | { data: T; error: null }
  | { data: null; error: unknown };

export type TTryCatch = <T>(promise: Promise<T>) => Promise<TTryCatchReturn<T>>;

export type TToken = { token: string | null };
