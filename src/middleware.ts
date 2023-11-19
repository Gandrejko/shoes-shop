import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// This function can be marked `async` if using `await` inside
import {getToken} from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();

  //it is session info
  const token = await getToken({req});
  if (!token) {
    const url = new URL(`/`, req.url);
    //url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/products/add', '/products/me', '/settings'],
};
