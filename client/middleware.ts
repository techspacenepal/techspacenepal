// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("adminToken")?.value;

//   const isAdminRoute = request.nextUrl.pathname.startsWith("/auth/admin");

//   if (isAdminRoute && !token) {
//     return NextResponse.redirect(new URL("/auth/adminLogin", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/auth/admin/:path*"],
// };




// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   const adminToken = request.cookies.get("adminToken")?.value;

//   const isAdminRoute = pathname.startsWith("/auth/admin");
//   const isAdminDashboardRoute = pathname.startsWith("/auth/Dashboard");

//   const isTeacherDashboardRoute = pathname.startsWith("/Dashboard/teacherDashboard");
//   const isStudentDashboardRoute = pathname.startsWith("/studentDashboard");

//   // ✅ Block all routes if any protected route is hit but no token
//   if (
//     (isAdminRoute || isAdminDashboardRoute || isTeacherDashboardRoute || isStudentDashboardRoute) &&
//     !adminToken
//   ) {
//     return NextResponse.redirect(new URL("/auth/adminLogin", request.url));
//   }

//   return NextResponse.next();
// }

// // ✅ Match all protected routes
// export const config = {
//   matcher: [
//     "/auth/admin/:path*",
//     "/auth/Dashboard/:path*",
//     "/auth/Dashboard/teacherDashboard/:path*",
//     "/studentDashboard/:path*",
//   ],
// };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  const adminToken = request.cookies.get("adminToken")?.value;

  const isProtectedPath =
    pathname.startsWith("/auth/Dashboard/teacherDashboard") ||
    pathname.startsWith("/Dashboard/teacherDashboard") ||
    pathname.startsWith("/studentDashboard") ||
    pathname.startsWith("/auth/admin");

  if (isProtectedPath && !adminToken) {
    return NextResponse.redirect(new URL("/auth/adminLogin", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/auth/admin/:path*",
    "/auth/Dashboard/teacherDashboard/:path*", 
    "/Dashboard/teacherDashboard/:path*",
    "/studentDashboard/:path*",
  ],
};
