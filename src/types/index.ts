import { categoryFormSchema, projectFormSchema } from "@/lib/Schema";
import { z } from "zod";

export type TODO = any; // this is placeholder type

export type TDashboardMenuItems = {
  name: string;
  href: string;
  icon: JSX.Element;
  subMenu?: TDashboardMenuItems[] | null;
};

export type TProject = z.infer<typeof projectFormSchema>;

export type TCategory = z.infer<typeof categoryFormSchema> & { id: string };
