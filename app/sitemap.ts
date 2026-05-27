import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://icreatepdf.com';
  
  const routes = [
    '',
    '/jpg-to-pdf',
    '/png-to-pdf',
    '/heic-to-pdf',
    '/merge-pdf',
    '/split-pdf',
    '/organize-pdf',
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
    '/contact',
    '/blog',
    '/blog/how-to-convert-iphone-photos-to-pdf',
    '/blog/best-free-image-to-pdf-tools-2026',
    '/privacy',
    '/terms',
    '/es',
    '/hi',
    '/ta',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
