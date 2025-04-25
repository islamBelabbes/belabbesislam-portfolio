import { User } from "@/dto/users";
import apiResponse from "@/lib/api-response";
import { PaginationSchema } from "@/lib/schema";
import withAuth from "@/lib/with-auth";
import withErrorHandler from "@/lib/with-error-handling";
import { createProjectSchema, getProjectsSchema } from "@/schema/project";
import { createProjectUseCase, getProjectsUseCase } from "@/use-cases/project";
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

async function postHandler(req: NextRequest, _: any, user: User) {
  const formData = await req.formData();
  const categories = formData.getAll("categories");
  console.log("from-server", categories);

  const body = {
    title: formData.get("title"),
    image: formData.get("image"),
    url: formData.get("url") || undefined,
    description: formData.get("description"),
    categories: categories,
  };

  const validatedBody = createProjectSchema.parse(body);

  const post = await createProjectUseCase({ ...validatedBody }, user);

  const response = apiResponse({
    success: true,
    message: "post created successfully",
    status: 201,
    data: post,
  });
  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandler(getHandler);
export const POST = withErrorHandler(withAuth(postHandler));
