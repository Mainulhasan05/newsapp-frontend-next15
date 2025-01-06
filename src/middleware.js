import { NextResponse } from "next/server";

export async function middleware(req) {
  // Check for token cookie
  let tokenObj = req.cookies.get("access_token");

  const token = tokenObj?.value;

  const requestUrl = req.nextUrl.clone();

  if (!token && !["/login", "/register"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }
  if (token && ["/login", "/register"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Match all routes except login and registration
export const config = {
  matcher: ["/login", "/register", "/profile", "/dashboard/:path*"],
};
