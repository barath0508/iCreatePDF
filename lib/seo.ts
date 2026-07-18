import type { Metadata } from 'next';

const SITE_URL = 'https://www.icreatepdf.online';

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
      'x-default': canonicalPath,
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD.
 * Omit `item` on the last item so Google resolves it to the current page.
 */
export function breadcrumbSchema(crumbs: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => {
      const item: Record<string, any> = {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
      };
      // Only include item URL if provided AND it's not the last item in the list.
      // If it is the last item, omitting it forces Google Search to use the containing page's URL.
      if (crumb.url && index < crumbs.length - 1) {
        item.item = crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`;
      }
      return item;
    }),
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
      isAccessibleForFree: true,
      featureList: [
        'Free browser-based PDF processing',
        'Private local file processing',
        'No server uploads required',
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    breadcrumbSchema([
      { name: 'iCreatePDF', url: '/' },
      { name },
    ]),
  ];
}

/**
 * Generate BlogPosting + BreadcrumbList JSON-LD for a blog post.
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
  return [
    {
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
    },
    breadcrumbSchema([
      { name: 'iCreatePDF', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: title },
    ]),
  ];
}
