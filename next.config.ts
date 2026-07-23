import type { NextConfig } from "next";

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
  'prevent-copy', 'pdf-ocr', 'bulk-certificates', 'fillable-pdf-builder'
];

const nextConfig: NextConfig = {
  compress: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
      ...OLD_TOOLS.map((tool) => ({
        source: `/${tool}`,
        destination: `/tools/${tool}`,
        permanent: true,
      })),
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
      {
        source: '/no-upload-pdf-tools',
        destination: '/tools/no-upload-pdf-tools',
        permanent: true,
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
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

