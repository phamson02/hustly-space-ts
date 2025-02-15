import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value || request.headers.get("cookie")?.includes("accessToken");
    const currentPath = request.nextUrl.pathname;

    const isAuthRoute = currentPath.startsWith("/login");

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - images directory in /public (public static images)
         */
        '/((?!api|_next/static|_next/image|images).*)',
    ],
};
