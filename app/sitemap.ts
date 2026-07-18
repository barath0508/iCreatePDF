import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.icreatepdf.online';
  const toolRoutes = [
    '/jpg-to-pdf',
    '/png-to-pdf',
    '/heic-to-pdf',
    '/merge-pdf',
    '/split-pdf',
    '/compress-pdf',
    '/organize-pdf',
    '/rotate-pdf',
    '/watermark-pdf',
    '/add-page-numbers',
    '/pdf-to-jpg',
    '/scan-to-pdf',
    '/word-to-pdf',
    '/protect-pdf',
    '/sign-pdf',
    '/pdf-to-text',
    '/edit-pdf',
    '/verify-signature',
    '/html-to-pdf',
    '/markdown-to-pdf',
    '/flatten-pdf',
    '/grayscale-pdf',
    '/compare-pdf',
    '/unlock-pdf',
    '/redact-pdf',
    '/crop-pdf',
    '/extract-pages',
    '/repair-pdf',
    '/pdf-metadata',
    '/header-footer',
    '/resize-pdf',
    '/bates-numbering',
    '/invert-pdf',
    '/qr-to-pdf',
    '/barcode-to-pdf',
    '/delete-pdf-pages',
    '/txt-to-pdf',
    '/ris-to-pdf',
    '/read-aloud-pdf',
    '/certify-pdf',
    '/pdf-to-excel',
    '/excel-to-pdf',
    '/pdf-accessibility-checker',
    '/prevent-copy',
    '/pdf-ocr',
    '/bulk-certificates',
    '/fillable-pdf-builder',
  ];

  const blogRoutes = [
    '/blog',
    '/blog/how-to-verify-pdf-signature',
    '/blog/how-to-certify-pdf-with-fingerprint',
    '/blog/how-to-convert-markdown-to-pdf',
    '/blog/how-to-convert-txt-to-pdf',
    '/blog/how-to-convert-ris-to-pdf-bibliography',
    '/blog/how-to-listen-to-pdf-text-to-speech',
    '/blog/pdf-accessibility-checker-guide',
    '/blog/how-to-add-header-footer-to-pdf',
    '/blog/how-to-compare-two-pdf-files',
    '/blog/how-to-generate-qr-code-pdf',
    '/blog/how-to-generate-barcode-pdf',
    '/blog/how-to-delete-pages-from-pdf',
    '/blog/how-to-scan-documents-to-pdf',
    '/blog/how-to-organize-pdf-pages',
    '/blog/how-to-convert-html-to-pdf',
    '/blog/how-to-convert-pdf-to-excel',
    '/blog/how-to-convert-excel-to-pdf',
    '/blog/how-to-crop-pdf-pages',
    '/blog/how-to-resize-pdf-pages',
    '/blog/how-to-repair-corrupted-pdf',
    '/blog/how-to-convert-pdf-to-jpg',
    '/blog/how-to-rotate-pdf-pages',
    '/blog/how-to-extract-text-from-pdf',
    '/blog/how-to-edit-pdf-online-free',
    '/blog/proof-zero-server-uploads-how-to-verify-offline-pdf-converter',
    '/blog/how-to-compress-pdf-without-losing-quality',
    '/blog/how-to-merge-pdf-files-free',
    '/blog/how-to-sign-pdf-online-free',
    '/blog/jpg-to-pdf-complete-guide',
    '/blog/how-to-convert-iphone-photos-to-pdf',
    '/blog/best-free-image-to-pdf-tools-2026',
    '/blog/how-to-redact-pdf-online-free',
    '/blog/how-to-extract-pages-from-pdf',
    '/blog/how-to-edit-pdf-metadata',
    '/blog/bates-numbering-pdf-guide',
    '/blog/how-to-invert-pdf-colors-dark-mode',
    '/blog/how-to-prevent-copying-text-from-pdf',
    '/blog/how-to-convert-scanned-pdf-to-text-ocr',
    '/blog/how-to-generate-certificates-in-bulk',
    '/blog/how-to-password-protect-and-unlock-pdf',
    '/blog/how-to-convert-word-docx-to-pdf-free',
    '/blog/how-to-split-pdf-pages-free',
    '/blog/how-to-grayscale-and-flatten-pdf',
    '/blog/how-to-add-watermark-and-page-numbers-to-pdf',
    '/blog/how-to-create-fillable-pdf-forms-free',
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
