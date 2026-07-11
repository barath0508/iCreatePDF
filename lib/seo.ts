import type { Metadata } from 'next';

const SITE_URL = 'https://i-create-pdf.vercel.app';

/**
 * Build alternates metadata that preserves hreflang across all pages.
 *
 * Next.js metadata merging *replaces* rather than deep-merges `alternates`,
 * so child pages that only set `{ canonical }` silently drop the parent
 * layout's `alternates.languages`. This helper always includes both.
 */
export function buildAlternates(canonicalPath: string): Metadata['alternates'] {
  const isHomepage =
    canonicalPath === '/' ||
    canonicalPath === '/es' ||
    canonicalPath === '/hi' ||
    canonicalPath === '/ta' ||
    canonicalPath === '';

  if (isHomepage) {
    return {
      canonical: canonicalPath,
      languages: {
        'en': '/',
        'es': '/es',
        'hi': '/hi',
        'ta': '/ta',
        'x-default': '/',
      },
    };
  }

  return {
    canonical: canonicalPath,
    languages: {
      'en': canonicalPath,
    },
  };
}

/**
 * Generate SoftwareApplication + BreadcrumbList JSON-LD for a tool page.
 */
export function toolSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name,
      url: `${SITE_URL}${url}`,
      description,
      image: `${SITE_URL}/logo.png`,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'iCreatePDF',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name,
          item: `${SITE_URL}${url}`,
        },
      ],
    },
  ];
}

/**
 * Generate BlogPosting JSON-LD for a blog post.
 */
export function articleSchema({
  title,
  description,
  url,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    author: {
      '@type': 'Organization',
      name: 'iCreatePDF',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'iCreatePDF',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
  };
}
