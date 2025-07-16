// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminToken = request.cookies.get("adminToken")?.value;
  const teacherToken = request.cookies.get("teacherToken")?.value;
  const studentToken = request.cookies.get("studentToken")?.value;

  // Admin Protected Paths
  if (pathname.startsWith("/auth/Dashboard/adminDashboard")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/auth/adminLogin", request.url));
    }
  }

  // Teacher Protected Paths
  if (pathname.startsWith("/auth/Dashboard/teacherDashboard")) {
    if (!teacherToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Student Protected Paths
  if (pathname.startsWith("/studentDashboard")) {
    if (!studentToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/Dashboard/adminDashboard/:path*",
    "/auth/Dashboard/teacherDashboard/:path*",
    "/studentDashboard/:path*",
  ],
};
