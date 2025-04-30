import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logout } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const routes = {
    user: [
      "",
      "about-us",
      "contact-us",
      "properties",
      "set-appointment",
      "loan-calculator",
    ],
    admin: [
      "dashboard",
      "properties",
      "appointments",
      "inquiries",
      "testimonials",
      "subscribers",
      "faqs",
      "articles",
    ],
  };

  const pathname = request.nextUrl.pathname;
  const path = pathname.startsWith("/admin") ? "Admin" : "User";
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;

  if (path == "Admin") {
    if (pathname == "/admin") {
      await logout();
      return NextResponse.next();
    } else if (
      routes.admin.some((route) => {
        return pathname.startsWith(`/admin/${route}`);
      })
    ) {
      if (isLoggedIn) {
        return NextResponse.next();
      }
    }
  } else if (path == "User") {
    if (
      routes.user.some((route) => {
        return pathname.startsWith(`/${route}`);
      })
    ) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */

  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
