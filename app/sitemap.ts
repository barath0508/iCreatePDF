import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.icreatepdf.online';
  const toolRoutes = [
    '/tools/jpg-to-pdf',
    '/tools/png-to-pdf',
    '/tools/heic-to-pdf',
    '/tools/merge-pdf',
    '/tools/split-pdf',
    '/tools/compress-pdf',
    '/tools/organize-pdf',
    '/tools/rotate-pdf',
    '/tools/watermark-pdf',
    '/tools/add-page-numbers',
    '/tools/pdf-to-jpg',
    '/tools/scan-to-pdf',
    '/tools/word-to-pdf',
    '/tools/protect-pdf',
    '/tools/sign-pdf',
    '/tools/pdf-to-text',
    '/tools/edit-pdf',
    '/tools/verify-signature',
    '/tools/html-to-pdf',
    '/tools/markdown-to-pdf',
    '/tools/flatten-pdf',
    '/tools/grayscale-pdf',
    '/tools/compare-pdf',
    '/tools/unlock-pdf',
    '/tools/redact-pdf',
    '/tools/crop-pdf',
    '/tools/extract-pages',
    '/tools/repair-pdf',
    '/tools/pdf-metadata',
    '/tools/header-footer',
    '/tools/resize-pdf',
    '/tools/bates-numbering',
    '/tools/invert-pdf',
    '/tools/qr-to-pdf',
    '/tools/barcode-to-pdf',
    '/tools/delete-pdf-pages',
    '/tools/txt-to-pdf',
    '/tools/ris-to-pdf',
    '/tools/read-aloud-pdf',
    '/tools/certify-pdf',
    '/tools/pdf-to-excel',
    '/tools/excel-to-pdf',
    '/tools/pdf-accessibility-checker',
    '/tools/prevent-copy',
    '/tools/pdf-ocr',
    '/tools/bulk-certificates',
    '/tools/fillable-pdf-builder',
  ];

  const blogRoutes = [
    '/blogs',
    '/blogs/how-to-verify-pdf-signature',
    '/blogs/how-to-certify-pdf-with-fingerprint',
    '/blogs/how-to-convert-markdown-to-pdf',
    '/blogs/how-to-convert-txt-to-pdf',
    '/blogs/how-to-convert-ris-to-pdf-bibliography',
    '/blogs/how-to-listen-to-pdf-text-to-speech',
    '/blogs/pdf-accessibility-checker-guide',
    '/blogs/how-to-add-header-footer-to-pdf',
    '/blogs/how-to-compare-two-pdf-files',
    '/blogs/how-to-generate-qr-code-pdf',
    '/blogs/how-to-generate-barcode-pdf',
    '/blogs/how-to-delete-pages-from-pdf',
    '/blogs/how-to-scan-documents-to-pdf',
    '/blogs/how-to-organize-pdf-pages',
    '/blogs/how-to-convert-html-to-pdf',
    '/blogs/how-to-convert-pdf-to-excel',
    '/blogs/how-to-convert-excel-to-pdf',
    '/blogs/how-to-crop-pdf-pages',
    '/blogs/how-to-resize-pdf-pages',
    '/blogs/how-to-repair-corrupted-pdf',
    '/blogs/how-to-convert-pdf-to-jpg',
    '/blogs/how-to-rotate-pdf-pages',
    '/blogs/how-to-extract-text-from-pdf',
    '/blogs/how-to-edit-pdf-online-free',
    '/blogs/proof-zero-server-uploads-how-to-verify-offline-pdf-converter',
    '/blogs/how-to-compress-pdf-without-losing-quality',
    '/blogs/how-to-merge-pdf-files-free',
    '/blogs/how-to-sign-pdf-online-free',
    '/blogs/jpg-to-pdf-complete-guide',
    '/blogs/how-to-convert-iphone-photos-to-pdf',
    '/blogs/best-free-image-to-pdf-tools-2026',
    '/blogs/how-to-redact-pdf-online-free',
    '/blogs/how-to-extract-pages-from-pdf',
    '/blogs/how-to-edit-pdf-metadata',
    '/blogs/bates-numbering-pdf-guide',
    '/blogs/how-to-invert-pdf-colors-dark-mode',
    '/blogs/how-to-prevent-copying-text-from-pdf',
    '/blogs/how-to-convert-scanned-pdf-to-text-ocr',
    '/blogs/how-to-generate-certificates-in-bulk',
    '/blogs/how-to-password-protect-and-unlock-pdf',
    '/blogs/how-to-convert-word-docx-to-pdf-free',
    '/blogs/how-to-split-pdf-pages-free',
    '/blogs/how-to-grayscale-and-flatten-pdf',
    '/blogs/how-to-add-watermark-and-page-numbers-to-pdf',
    '/blogs/how-to-create-fillable-pdf-forms-free',
  ];

  const staticRoutes = [
    '/contact',
    '/privacy',
    '/terms',
    '/about',
  ];

  const comparisonRoutes = [
    '/compare',
    '/ilovepdf-alternative',
    '/smallpdf-alternative',
    '/pdf24-alternative',
    '/no-upload-pdf-tools',
  ];

  const langRoutes = [
    '/es',
    '/hi',
    '/ta',
  ];

  return [
    // Homepage — highest priority
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Tool pages — core content
    ...toolRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Blog pages
    ...blogRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Static pages (Contact, Privacy, Terms, About)
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    // Comparison / alternative pages — commercial intent
    ...comparisonRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Localised landing pages
    ...langRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
