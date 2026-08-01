import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Search Engine Crawlers
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: '/',
        disallow: ['/api/', '/checkout', '/admin'],
      },
      {
        // AI Search & Generative Crawlers (ChatGPT, Perplexity, Claude, Gemini)
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Amazonbot',
          'ByteSpider',
        ],
        allow: '/',
        disallow: ['/api/', '/checkout', '/admin'],
      },
      {
        // Google image bot — allow all for image SEO
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        // Default rule for all other web crawlers
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


