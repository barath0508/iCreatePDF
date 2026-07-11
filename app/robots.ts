import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/admin', '/test.html', '/*-draft.html'],
    },
    sitemap: 'https://i-create-pdf.vercel.app/sitemap.xml',
  };
}
