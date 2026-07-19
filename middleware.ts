import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const OLD_TOOLS = new Set([
  'jpg-to-pdf', 'png-to-pdf', 'heic-to-pdf', 'merge-pdf', 'split-pdf', 
  'compress-pdf', 'organize-pdf', 'rotate-pdf', 'watermark-pdf', 
  'add-page-numbers', 'pdf-to-jpg', 'scan-to-pdf', 'word-to-pdf', 
  'protect-pdf', 'sign-pdf', 'pdf-to-text', 'edit-pdf', 'verify-signature', 
  'html-to-pdf', 'markdown-to-pdf', 'flatten-pdf', 'grayscale-pdf', 
  'compare-pdf', 'unlock-pdf', 'redact-pdf', 'crop-pdf', 'extract-pages', 
  'repair-pdf', 'pdf-metadata', 'header-footer', 'resize-pdf', 
  'bates-numbering', 'invert-pdf', 'qr-to-pdf', 'barcode-to-pdf', 
  'delete-pdf-pages', 'txt-to-pdf', 'ris-to-pdf', 'read-aloud-pdf', 
  'certify-pdf', 'pdf-to-excel', 'excel-to-pdf', 'pdf-accessibility-checker', 
  'prevent-copy', 'pdf-ocr', 'bulk-certificates', 'fillable-pdf-builder'
]);

export function middleware(request: NextRequest) {
  try {
    const hostname = request.headers.get('host') || '';
    const pathname = request.nextUrl.pathname;
    
    // 1. Staging/Vercel default domain redirect
    if (hostname.includes('vercel.app')) {
      const url = new URL(pathname + request.nextUrl.search, 'https://www.icreatepdf.online');
      return NextResponse.redirect(url, 301);
    }

    // 2. Redirect old blog root
    if (pathname === '/blog') {
      const url = new URL('/blogs', request.url);
      return NextResponse.redirect(url, 301);
    }

    // 3. Redirect old blog post paths
    if (pathname.startsWith('/blog/')) {
      const newPath = pathname.replace('/blog/', '/blogs/');
      const url = new URL(newPath + request.nextUrl.search, request.url);
      return NextResponse.redirect(url, 301);
    }

    // 4. Redirect old flat tool paths
    // Remove the leading slash to match the set keys
    const toolKey = pathname.substring(1);
    if (OLD_TOOLS.has(toolKey)) {
      const url = new URL(`/tools/${toolKey}${request.nextUrl.search}`, request.url);
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
