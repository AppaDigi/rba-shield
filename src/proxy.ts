import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PROTECTED_PATHS = [
    "/profile/edit",
    "/settings",
    "/messages",
    "/live/auctions",
];

export const proxy = auth((req) => {
    const { pathname } = req.nextUrl;
    const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

    if (isProtected && !req.auth) {
            const loginUrl = new URL("/auth/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    ],
};
