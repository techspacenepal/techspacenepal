// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const adminToken = request.cookies.get('adminToken')?.value;

//   const protectedPaths = ['/Dashboard'];

//   const isProtectedPath = protectedPaths.some((path) =>
//     request.nextUrl.pathname.startsWith(path)
//   );

//   if (isProtectedPath && !adminToken) {
//     const loginUrl = new URL('/auth/adminLogin', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// // Apply middleware to specific paths
// export const config = {
//   matcher: ['/Dashboard/:path*'],
// };




// /middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/Dashboard/:path*',
    '/Dashboard',  
    '/auth/Dashboard/teacherDashboard/:path*',
    '/auth/Dashboard/teacherDashboard', 
  ],
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log('Middleware triggered for:', pathname);

  if (pathname.startsWith('/Dashboard')) {
    const adminToken = request.cookies.get('adminToken')?.value;
    console.log('adminToken:', adminToken);
    if (!adminToken) {
      console.log('Redirecting to adminLogin');
      return NextResponse.redirect(new URL('/auth/adminLogin', request.url));
    }
  }

  if (pathname.startsWith('/auth/Dashboard/teacherDashboard')) {
    const token = request.cookies.get('token')?.value || null;
    const userRole = request.cookies.get('role')?.value || null;
    console.log('token:', token, 'role:', userRole);

    if (!token || userRole !== 'teacher') {
      console.log('Redirecting to /auth/login');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}





