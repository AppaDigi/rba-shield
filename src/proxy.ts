import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED_PATHS = [
    "/profile/edit",
    "/settings",
    "/messages",
    "/live/auctions",
];

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

    if (isProtected) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            const loginUrl = new URL("/auth/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    ],
};
