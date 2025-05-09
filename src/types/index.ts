import { TApiResponse } from "@/lib/api-response";
import { Pagination } from "@/lib/generate-pagination";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export type TODO = any; // this is placeholder type

export type TDashboardMenuItems = {
  name: string;
  href: string;
  icon: React.JSX.Element;
  subMenu?: TDashboardMenuItems[] | null;
};

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
  segmentData: { params: T }
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;
