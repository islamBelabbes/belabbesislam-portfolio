import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const apikey = req.headers.get("apikey") || searchParams.get("apikey");

  if (apikey !== process.env.REVALIDATE_API_KEY) {
    return Response.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  revalidatePath("/");
  return Response.json(null, {
    status: 201,
  });
}
