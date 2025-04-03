import apiResponse from "@/lib/api-response";
import { PaginationSchema } from "@/lib/schema";
import withErrorHandler from "@/lib/with-error-handling";
import { getProjectsSchema } from "@/schema/project";
import { getProjectsUseCase } from "@/use-cases/project";
import { NextRequest, NextResponse } from "next/server";

async function getHandler(req: NextRequest) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  const _categoryId = url.searchParams.get("category-id") || undefined;

  const pagination = PaginationSchema.parse({ page, limit });
  const { categoryId } = getProjectsSchema.parse({ categoryId: _categoryId });

  const projects = await getProjectsUseCase({ ...pagination, categoryId });

  const response = apiResponse({
    success: true,
    status: 200,
    message: "posts fetched successfully",
    data: projects,
  });
  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandler(getHandler);
