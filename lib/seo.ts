import type { Metadata } from 'next';
import { toolContent } from '@/lib/tool-content';

const SITE_URL = 'https://www.icreatepdf.online';

/**
 * Build alternates metadata that preserves hreflang across all pages.
 *
 * Next.js metadata merging *replaces* rather than deep-merges `alternates`,
 * so child pages that only set `{ canonical }` silently drop the parent
 * layout's `alternates.languages`. This helper always includes both.
 */
export function buildAlternates(canonicalPath: string): Metadata['alternates'] {
  const cleanPath = canonicalPath.startsWith('/tools/')
    ? canonicalPath.replace('/tools/', '/')
    : canonicalPath;

  const isHomepage =
    cleanPath === '/' ||
    cleanPath === '/es' ||
    cleanPath === '/hi' ||
    cleanPath === '/ta' ||
    cleanPath === '/pt' ||
    cleanPath === '/id' ||
    cleanPath === '/de' ||
    cleanPath === '/ja' ||
    cleanPath === '/fr' ||
    cleanPath === '';

  if (isHomepage) {
    return {
      canonical: cleanPath,
      languages: {
        'en': '/',
        'es': '/es',
        'pt': '/pt',
        'id': '/id',
        'de': '/de',
        'ja': '/ja',
        'fr': '/fr',
        'hi': '/hi',
        'ta': '/ta',
        'x-default': '/',
      },
    };
  }

  return {
    canonical: cleanPath,
    languages: {
      'en': cleanPath,
      'x-default': cleanPath,
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
 * Generate WebApplication + BreadcrumbList JSON-LD for a tool page.
 */
export function toolSchema({
  name,
  description,
  url,
  featureList,
}: {
  name: string;
  description: string;
  url: string;
  featureList?: string[];
}) {
  const cleanUrl = url.startsWith('/tools/')
    ? url.replace('/tools/', '/')
    : url;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name,
      url: `${SITE_URL}${cleanUrl}`,
      description,
      image: `${SITE_URL}/logo.png`,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web Browser',
      browserRequirements: 'Requires JavaScript and WebAssembly support',
      isAccessibleForFree: true,
      featureList: featureList ?? [
        'Free browser-based PDF processing',
        'Private local file processing — no server uploads',
        'No account registration required',
        'Unlimited file size and page count',
        'Works offline once loaded',
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'iCreatePDF',
        url: SITE_URL,
      },
    },
    breadcrumbSchema([
      { name: 'iCreatePDF', url: '/' },
      { name: 'PDF Tools', url: '/#tools' },
      { name },
    ]),
  ];
}

/**
 * Generate complete JSON-LD structured data (WebApplication, Breadcrumbs, FAQPage, HowTo)
 * automatically synchronized with toolContent for maximum Google rich snippet visibility.
 */
export function getToolFullJsonLd(
  slug: string,
  custom?: { name?: string; description?: string; featureList?: string[] }
) {
  const content = toolContent[slug];
  const name =
    custom?.name ||
    content?.name ||
    slug
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
  const description =
    custom?.description ||
    content?.overview ||
    `Free online ${name} tool with 100% private in-browser processing.`;
  const url = `/tools/${slug}`;

  const schemas: any[] = [
    ...toolSchema({
      name,
      description,
      url,
      featureList: custom?.featureList,
    }),
  ];

  if (content?.faqs && content.faqs.length > 0) {
    schemas.push(faqSchema(content.faqs));
  }

  if (content?.steps && content.steps.length > 0) {
    schemas.push(
      howToSchema({
        name,
        description: content.overview || description,
        url,
        steps: content.steps,
      })
    );
  }

  return schemas;
}



/**
 * Generate BlogPosting + BreadcrumbList JSON-LD for a blog post.
 */
export function articleSchema({
  title,
  description,
  url,
  datePublished,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
}) {
  const imageUrl = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/logo.png`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      url: `${SITE_URL}${url}`,
      datePublished,
      image: imageUrl,
      author: {
        '@type': 'Person',
        name: 'Barath R',
        jobTitle: 'Founder & Lead Developer',
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
      { name: 'Blog', url: '/blogs' },
      { name: title },
    ]),
  ];
}

/**
 * Generate HowTo JSON-LD schema for step-by-step tool instructions.
 */
export function howToSchema({
  name,
  description,
  url,
  steps,
}: {
  name: string;
  description: string;
  url: string;
  steps: { title: string; description: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to ${name}`,
    description,
    totalTime: 'PT1M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    tool: [
      {
        '@type': 'HowToTool',
        name: 'iCreatePDF Web App',
      },
    ],
    step: steps.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.title,
      text: s.description,
      url: `${SITE_URL}${url}#step-${index + 1}`,
    })),
  };
}

/**
 * Generate FAQPage JSON-LD for a tool or page.
 * Pair with toolSchema to get both WebApplication and FAQ rich results.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate ItemList JSON-LD for a page that lists multiple tools or blog posts.
 */
export function itemListSchema(items: { name: string; url: string; description?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'iCreatePDF Online PDF Tools',
    description: '46+ free browser-based PDF tools — merge, compress, convert, edit, sign, OCR, and protect PDFs without server uploads.',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => {
      const cleanItemUrl = item.url.startsWith('/tools/')
        ? item.url.replace('/tools/', '/')
        : item.url;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${SITE_URL}${cleanItemUrl}`,
        ...(item.description ? { description: item.description } : {}),
      };
    }),
  };
}

