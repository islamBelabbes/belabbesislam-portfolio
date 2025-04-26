import { User } from "@/dto/users";
import apiResponse from "@/lib/api-response";
import { PaginationSchema } from "@/lib/schema";
import withAuth from "@/lib/with-auth";
import withErrorHandler from "@/lib/with-error-handling";
import { createCategorySchema, getCategoriesSchema } from "@/schema/category";
import {
  createCategoryUseCase,
  getCategoriesUseCase,
} from "@/use-cases/category";
import { NextRequest, NextResponse } from "next/server";

async function getHandler(req: NextRequest) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  const showEmpty = url.searchParams.get("show-empty") ?? undefined;
  const name = url.searchParams.get("name") ?? undefined;

  const pagination = PaginationSchema.parse({ page, limit });
  const validated = getCategoriesSchema.parse({ showEmpty, name });
  const categories = await getCategoriesUseCase({
    ...pagination,
    ...validated,
  });

  const response = apiResponse({
    success: true,
    status: 200,
    message: "categories fetched successfully",
    data: categories,
  });
  return NextResponse.json(response, { status: response.status });
}

async function postHandler(req: NextRequest, _: any, user: User) {
  const formData = await req.formData();
  const body = {
    name: formData.get("name"),
    image: formData.get("image"),
  };

  const validatedBody = createCategorySchema.parse(body);
  const created = await createCategoryUseCase({ ...validatedBody }, user);
  const response = apiResponse({
    success: true,
    message: "category created successfully",
    status: 201,
    data: created,
  });
  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandler(getHandler);
export const POST = withErrorHandler(withAuth(postHandler));
