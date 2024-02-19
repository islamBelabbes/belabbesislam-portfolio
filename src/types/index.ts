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

export type TTryCatch<T> = (promise: Promise<T>) => {
  data: T | null;
  error: Error | null;
};

export type TToken = { token: string | null };
