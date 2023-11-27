import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// This function can be marked `async` if using `await` inside
import {getToken} from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();

  const token = await getToken({req});
  const pathnamePage = pathname.split('/')[1];

  if (pathnamePage === 'auth' && token) {
    const url = new URL(`/products`, req.url);
    return NextResponse.redirect(url);
  }

  if (pathnamePage !== 'auth' && !token) {
    const url = new URL(`/products`, req.url);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ['/products/add', '/products/me', '/settings', '/auth/:path*'],
};
