import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  try {
    const hostname = request.nextUrl.hostname;
    
    // 1. Staging/Vercel default domain redirect
    if (hostname.endsWith('.vercel.app')) {
      const url = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://www.icreatepdf.online');
      return NextResponse.redirect(url, 301);
    }

    // 2. Non-www to www redirect (Canonical domain redirection)
    if (hostname === 'icreatepdf.online') {
      const url = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://www.icreatepdf.online');
      return NextResponse.redirect(url, 301);
    }
  } catch (error) {
    console.error('Proxy execution error:', error);
  }
  
  return NextResponse.next();
}

export default proxy;

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
