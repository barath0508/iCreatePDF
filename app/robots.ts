import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/admin', '/test.html', '/*-draft.html'],
    },
    sitemap: 'https://www.icreatepdf.online/sitemap.xml',
  };
}
