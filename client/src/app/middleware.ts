// /middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('adminToken')?.value;

  const protectedPaths = ['/Dashboard'];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !adminToken) {
    const loginUrl = new URL('/auth/adminLogin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/Dashboard/:path*'],
};
