import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const hostname = request.headers.get('host') || '';
    
    // If the request comes to the vercel.app domain, redirect to the custom domain
    if (hostname.includes('vercel.app')) {
      const url = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://icreatepdf.online');
      return NextResponse.redirect(url, 301);
    }
  } catch (error) {
    console.error('Middleware execution error:', error);
  }
  
  return NextResponse.next();
}

export default middleware;

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
