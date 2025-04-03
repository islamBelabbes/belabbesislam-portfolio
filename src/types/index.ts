import { TApiResponse } from "@/lib/api-response";
import { Pagination } from "@/lib/generate-pagination";
import { categoryFormSchema, projectFormSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
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

export type TTableData = {
  total: number;
  hasNext: boolean;
};
export type TCategoryTableData = {
  data: TCategory[];
} & TTableData;

export type TProjectsTableData = {
  data: TProject[];
} & TTableData;

export type PaginationQuery = {
  page?: number;
  limit?: number;
};

export type QueryWithPagination<T extends object> = PaginationQuery & T;

export type DataWithPagination<T> = Pagination & {
  data: T;
};

export type TApiHandler<T extends object> = (
  req: NextRequest,
  params: T
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;
