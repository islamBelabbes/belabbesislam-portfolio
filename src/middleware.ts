import { auth, authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { boolean } from "zod";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth: async (auth, req, res) => {
    console.log("here");
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (!auth.isPublicRoute && auth.userId) {
      const { sessionClaims } = auth;
      if (sessionClaims?.is_admin !== "true")
        return NextResponse.redirect(new URL(req.url).origin);
    }
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
