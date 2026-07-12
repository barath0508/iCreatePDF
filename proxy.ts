import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // If the request comes to the vercel.app domain, redirect to the custom domain
  if (hostname.includes('vercel.app')) {
    const url = request.nextUrl.clone();
    url.host = 'icreatepdf.online';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - logo.png, logo.svg, icon.png (branding assets)
     * - manifest.json, robots.txt, sitemap.xml, favicon.ico
     */
    '/((?!api|_next/static|_next/image|logo.png|logo.svg|icon.png|manifest.json|robots.txt|sitemap.xml|favicon.ico).*)',
  ],
};
