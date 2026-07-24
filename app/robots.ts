import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Googlebot gets full unrestricted access for maximum indexing
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/checkout', '/admin'],
      },
      {
        // Google image bot \u2014 allow all for image SEO
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        // Bingbot \u2014 full access
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/checkout', '/admin'],
      },
      {
        // All other bots \u2014 allow with disallow list
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/checkout',
          '/admin',
          '/test.html',
          '/*-draft.html',
          '/_next/static/',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://www.icreatepdf.online/sitemap.xml',
    host: 'https://www.icreatepdf.online',
  };
}
