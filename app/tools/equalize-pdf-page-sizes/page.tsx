import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EqualizePageSizesTool } from '@/components/tools/EqualizePageSizesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Equalize PDF Page Sizes — Make All Pages Uniform Dimensions | iCreatePDF',
  description: 'Standardize mixed Letter, Legal, and A4 pages into a uniform PDF page size. 100% private client-side document dimension normalizer.',
  keywords: 'equalize pdf page sizes, standardize pdf page size, make pdf pages same size, make all pages a4 pdf, uniform page size pdf online, resize mixed size pdf pages, normalize pdf dimensions, fit all pdf pages to letter size, fix uneven pdf pages, batch standardize pdf canvas, uniform pdf layout converter',
  alternates: buildAlternates('/tools/equalize-pdf-page-sizes'),
  openGraph: {
    title: 'Equalize PDF Page Sizes — Make All Pages Uniform Dimensions | iCreatePDF',
    description: 'Standardize mixed Letter, Legal, and A4 pages into a uniform PDF page size. 100% private client-side document dimension normalizer.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Equalize PDF Page Sizes — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equalize PDF Page Sizes — Make All Pages Uniform Dimensions | iCreatePDF',
    description: 'Standardize mixed Letter, Legal, and A4 pages into a uniform PDF page size. 100% private client-side document dimension normalizer.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function EqualizePageSizesToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('equalize-pdf-page-sizes')}
      badge="Page Layout"
      title="Equalize Page Sizes"
      description="Standardize mixed Letter, Legal, and A4 pages into a uniform PDF page size."
      extraSections={<ToolSeoContent content={toolContent['equalize-pdf-page-sizes']} />}
    >
      <EqualizePageSizesTool />
    </ToolPageShell>
  );
}
