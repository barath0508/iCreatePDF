const OLD_TOOLS = [
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
  'prevent-copy', 'pdf-ocr', 'bulk-certificates', 'fillable-pdf-builder', 'base64-to-pdf',
  'n-up-pdf', 'booklet-pdf', 'adjust-pdf-margins', 'equalize-pdf-page-sizes',
  'pdf-to-word', 'extract-pdf-images', 'export-pdf-form-data', 'pdf-to-audio',
  'stamp-pdf', 'pdf-reading-themes', 'pdf-security-auditor', 'pdf-toc-builder',
  'epub-to-pdf', 'svg-to-pdf', 'csv-to-pdf',
  'auto-redact-pdf', 'pdf-attachment-manager', 'pdf-visual-diff',
  'pdf-3d-flipbook', 'pdf-presentation-mode', 'auto-crop-pdf'
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-select',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-tabs',
      'cmdk',
      'date-fns',
      'recharts',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/blogs/:slug*',
        permanent: true,
      },
      {
        source: '/tools/:slug*',
        destination: '/:slug*',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/#tools',
        permanent: true,
      },
      {
        source: '/ilovepdf-alternative',
        destination: '/compare/ilovepdf-alternative',
        permanent: true,
      },
      {
        source: '/smallpdf-alternative',
        destination: '/compare/smallpdf-alternative',
        permanent: true,
      },
      {
        source: '/pdf24-alternative',
        destination: '/compare/pdf24-alternative',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      ...OLD_TOOLS.map((tool) => ({
        source: `/${tool}`,
        destination: `/tools/${tool}`,
      })),
      {
        source: '/remove-pages',
        destination: '/tools/delete-pdf-pages',
      },
      {
        source: '/page-numbers',
        destination: '/tools/add-page-numbers',
      },
      {
        source: '/ocr-pdf',
        destination: '/tools/pdf-ocr',
      },
      {
        source: '/no-upload-pdf-tools',
        destination: '/tools/no-upload-pdf-tools',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Link',
            value: '<https://www.googletagmanager.com>; rel=preconnect, <https://pagead2.googlesyndication.com>; rel=preconnect, <https://cdn.jsdelivr.net>; rel=preconnect; crossorigin',
          },
          {
            // Tell Google to index all pages and follow links (belt-and-suspenders alongside meta robots)
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            // Prevent MIME type sniffing — improves trust score with Google Safe Browsing
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Protect against clickjacking, a spam/malware signal Google checks
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // Controls referrer data sent to third parties
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // HSTS policy with includeSubDomains and preload for Best Practices audit
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Long-term immutable caching for static assets & branding images
        source: '/:path*.(png|jpg|jpeg|svg|webp|ico|woff2|woff|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Preconnect to CDN used by pdfjs worker on all tool pages
        source: '/tools/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://cdn.jsdelivr.net>; rel=preconnect; crossorigin, <https://cdn.jsdelivr.net>; rel=dns-prefetch',
          },
        ],
      },
      {
        // Prevent sitemap.xml from being cached indefinitely (recommendation by Bing to refresh daily)
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, must-revalidate',
          },
        ],
      },
      {
        // Prevent robots.txt from being cached indefinitely
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
