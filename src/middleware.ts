// https://github.com/vercel/next.js/discussions/43179#discussioncomment-6920877

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const headers = new Headers(request.headers);
	headers.set("x-pathname", request.nextUrl.pathname);
	return NextResponse.next({ headers });
}
