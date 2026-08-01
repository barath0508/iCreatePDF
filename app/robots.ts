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
        // Google image bot — allow all for image SEO
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        // Bingbot — full access
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/checkout', '/admin'],
      },
      {
        // All other bots — allow full asset rendering
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/checkout',
          '/admin',
          '/test.html',
          '/*-draft.html',
        ],
      },
    ],
    sitemap: 'https://www.icreatepdf.online/sitemap.xml',
    host: 'www.icreatepdf.online',
  };
}

