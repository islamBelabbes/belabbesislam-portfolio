import { User } from "@/dto/users";
import apiResponse from "@/lib/api-response";
import { idSchema } from "@/lib/schema";
import withAuth from "@/lib/with-auth";
import withErrorHandler from "@/lib/with-error-handling";
import { updateCategorySchema } from "@/schema/category";
import {
  deleteCategoryUseCase,
  getCategoryByIdUseCase,
  updateCategoryUseCase,
} from "@/use-cases/category";
import { NextRequest, NextResponse } from "next/server";

async function getHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const _id = (await params).id;
  const id = idSchema.parse(_id);
  const category = await getCategoryByIdUseCase(id);

  const response = apiResponse({
    success: true,
    message: "category fetched successfully",
    status: 200,
    data: category,
  });
  return NextResponse.json(response, { status: response.status });
}

async function patchHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
  user: User
) {
  const id = (await params).id;
  const formData = await req.formData();
  const body = {
    id,
    name: formData.get("name") || undefined,
    image: formData.get("image") || undefined,
  };

  const validatedBody = updateCategorySchema.parse(body);

  const category = await updateCategoryUseCase({ ...validatedBody }, user);

  const response = apiResponse({
    success: true,
    message: "category updated successfully",
    status: 200,
    data: category,
  });
  return NextResponse.json(response, { status: response.status });
}

async function deleteHandler(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
  user: User
) {
  const _id = (await params).id;
  const id = idSchema.parse(_id);

  await deleteCategoryUseCase(id, user);
  return new Response(null, { status: 204 });
}

export const GET = withErrorHandler(withAuth(getHandler));
export const PATCH = withErrorHandler(withAuth(patchHandler));
export const DELETE = withErrorHandler(withAuth(deleteHandler));
