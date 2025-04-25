import { User } from "@/dto/users";
import apiResponse from "@/lib/api-response";
import { idSchema } from "@/lib/schema";
import withAuth from "@/lib/with-auth";
import withErrorHandler from "@/lib/with-error-handling";
import { updateProjectSchema } from "@/schema/project";
import {
  deleteProjectUseCase,
  getProjectByIdUseCase,
  updateProjectUseCase,
} from "@/use-cases/project";
import { NextRequest, NextResponse } from "next/server";

async function getHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const _id = (await params).id;
  const id = idSchema.parse(_id);
  const project = await getProjectByIdUseCase(id);

  const response = apiResponse({
    success: true,
    message: "post fetched successfully",
    status: 200,
    data: project,
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
  const categories = formData.getAll("categories[]");
  console.log("from-server", categories);
  const body = {
    id,
    title: formData.get("title") || undefined,
    url: formData.get("url") || undefined,
    description: formData.get("description") || undefined,
    image: formData.get("image") || undefined,
    categories,
  };

  const validatedBody = updateProjectSchema.parse(body);

  const post = await updateProjectUseCase({ ...validatedBody }, user);

  const response = apiResponse({
    success: true,
    message: "post updated successfully",
    status: 200,
    data: post,
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

  await deleteProjectUseCase(id, user);
  return new Response(null, { status: 204 });
}

export const GET = withErrorHandler(withAuth(getHandler));
export const PATCH = withErrorHandler(withAuth(patchHandler));
export const DELETE = withErrorHandler(withAuth(deleteHandler));
