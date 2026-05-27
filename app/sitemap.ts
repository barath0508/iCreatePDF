import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://icreatepdf.com';
  const today = new Date().toISOString().split('T')[0];

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
  ];

  const blogRoutes = [
    '/blog',
    '/blog/how-to-compress-pdf-without-losing-quality',
    '/blog/how-to-merge-pdf-files-free',
    '/blog/how-to-sign-pdf-online-free',
    '/blog/jpg-to-pdf-complete-guide',
    '/blog/how-to-convert-iphone-photos-to-pdf',
    '/blog/best-free-image-to-pdf-tools-2026',
  ];

  const staticRoutes = [
    '/contact',
    '/privacy',
    '/terms',
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
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Tool pages — core content
    ...toolRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Blog pages
    ...blogRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Static pages (Contact, Privacy, Terms)
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    // Localised landing pages
    ...langRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
