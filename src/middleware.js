import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  let subdomain = '';
  if (hostname.includes('localhost')) {
    subdomain = url.searchParams.get('subdomain') || '';
  } else {
    subdomain = hostname.split('.')[0];
  }

  if (subdomain === 'blog') {
    url.pathname = `/blog${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
