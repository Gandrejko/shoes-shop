import {getToken} from 'next-auth/jwt';
import {NextRequest, NextResponse} from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  // List of protected routes
  const protectedPaths = ['/my-products'];
  const isPathProtected = protectedPaths?.some(path => pathname == path);
  const res = NextResponse.next();
  if (isPathProtected) {
    //it is session info
    const token = await getToken({req});
    if (!token) {
      const url = new URL(`/`, req.url);
      //url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
