import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EqualizePageSizesTool } from '@/components/tools/EqualizePageSizesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Equalize Page Sizes — Free, Private, No Upload | iCreatePDF',
  description: 'Standardize mixed Letter, Legal, and A4 pages into a uniform PDF page size. 100% private — files process inside browser memory.',
  keywords: 'equalize pdf page sizes, standardize pdf page size, make pdf pages same size, make all pages a4 pdf, uniform page size pdf online, resize mixed size pdf pages',
  alternates: buildAlternates('/tools/equalize-pdf-page-sizes'),
  openGraph: {
    title: 'Equalize Page Sizes — iCreatePDF',
    description: 'Standardize mixed Letter, Legal, and A4 pages into a uniform PDF page size.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Equalize Page Sizes — iCreatePDF' }],
  },
};

export default function EqualizePageSizesToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Equalize Page Sizes',
        description: 'Standardize mixed Letter, Legal, and A4 pages into a uniform PDF page size.',
        url: '/tools/equalize-pdf-page-sizes',
      })}
      badge="Page Layout"
      title="Equalize Page Sizes"
      description="Standardize mixed Letter, Legal, and A4 pages into a uniform PDF page size."
      extraSections={<ToolSeoContent content={toolContent['equalize-pdf-page-sizes']} />}
    >
      <EqualizePageSizesTool />
    </ToolPageShell>
  );
}
