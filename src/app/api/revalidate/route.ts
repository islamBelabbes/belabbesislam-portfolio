import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
  const apikey = req.headers.get("apikey");

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
