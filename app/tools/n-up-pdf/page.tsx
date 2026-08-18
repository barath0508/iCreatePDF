import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { NUpTool } from '@/components/tools/NUpTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'N-Up PDF Maker — Print Multiple Pages per Sheet (2-Up, 4-Up) | iCreatePDF',
  description: 'Arrange multiple PDF pages onto a single sheet (2-up, 4-up, 8-up) for handouts and paper-saving printing. 100% private client-side imposition.',
  keywords: 'n-up pdf, multiple pages per sheet pdf, 2 up pdf, 4 up pdf printer layout, print multiple pages on one page pdf, n-up imposition pdf, handouts pdf maker, print 2 pages on 1 sheet pdf, compact pdf page layout, grid layout pdf printer',
  alternates: buildAlternates('/tools/n-up-pdf'),
  openGraph: {
    title: 'N-Up PDF Maker — Print Multiple Pages per Sheet (2-Up, 4-Up) | iCreatePDF',
    description: 'Arrange multiple PDF pages onto a single sheet (2-up, 4-up, 8-up) for handouts and paper-saving printing. 100% private client-side imposition.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'N-Up PDF: Multiple Pages per Sheet — iCreatePDF' }],
  },
};

export default function NUpToolPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'N-Up PDF: Multiple Pages per Sheet',
          description: 'Arrange multiple PDF pages onto a single sheet (2-up, 4-up, 8-up) for handouts and paper-saving printing. 100% private client-side imposition.',
          url: '/tools/n-up-pdf',
        }),
        faqSchema(toolContent['n-up-pdf'].faqs),
        howToSchema({
          name: 'N-Up PDF: Multiple Pages per Sheet',
          description: toolContent['n-up-pdf'].overview,
          url: '/tools/n-up-pdf',
          steps: toolContent['n-up-pdf'].steps,
        }),
      ]}badge="Imposition Tool"
      title="N-up PDF Converter"
      description="Place 2, 4, 6, 8, or 9 PDF pages onto a single sheet of paper."
      extraSections={<ToolSeoContent content={toolContent['n-up-pdf']} />}
    >
      <NUpTool />
    </ToolPageShell>
  );
}
