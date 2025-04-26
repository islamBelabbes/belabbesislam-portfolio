import { NextRequest, NextResponse } from "next/server";
import { TApiResponse } from "./api-response";
import { User } from "@/dto/users";
import { getCurrentUserUseCase } from "@/use-cases/user";
import { AuthError } from "./error";

type TApiHandlerWithAuth<T extends Promise<object>> = (
  req: NextRequest,
  segmentData: { params: T },
  user: User
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;

type TApiHandlerWithOptionalAuth<T extends Promise<object>> = (
  req: NextRequest,
  segmentData: { params: T },
  user: User | undefined
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;

const withAuth = <T extends Promise<object>>(
  handler: TApiHandlerWithAuth<T>
) => {
  return async (req: NextRequest, segmentData: { params: T }) => {
    const user = await getCurrentUserUseCase();
    if (!user) throw new AuthError();
    return handler(req, segmentData, user);
  };
};

export const withOptionalAuth = <T extends Promise<object>>(
  handler: TApiHandlerWithOptionalAuth<T>
) => {
  return async (req: NextRequest, segmentData: { params: T }) => {
    const user = await getCurrentUserUseCase();
    return handler(req, segmentData, user);
  };
};

export default withAuth;
