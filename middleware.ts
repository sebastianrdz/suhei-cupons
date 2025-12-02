import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // This middleware runs on the server, but we need to check localStorage on client
  // So we'll just allow all routes and handle protection in the page components
  return NextResponse.next();
}

export const config = {
  matcher: ["/landing", "/coupons"],
};

