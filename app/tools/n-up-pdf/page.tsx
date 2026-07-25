import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { NUpTool } from '@/components/tools/NUpTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'N-up PDF Converter � Free, Private, No Upload | iCreatePDF',
  description: 'Place 2, 4, 6, 8, or 9 PDF pages onto a single sheet of paper. 100% private � files process inside browser memory.',
  alternates: buildAlternates('/tools/n-up-pdf'),
  openGraph: {
    title: 'N-up PDF Converter � iCreatePDF',
    description: 'Place 2, 4, 6, 8, or 9 PDF pages onto a single sheet of paper.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'N-up PDF Converter � iCreatePDF' }],
  },
};

export default function NUpToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'N-up PDF Converter',
        description: 'Place 2, 4, 6, 8, or 9 PDF pages onto a single sheet of paper.',
        url: '/tools/n-up-pdf',
      })}
      badge="Imposition Tool"
      title="N-up PDF Converter"
      description="Place 2, 4, 6, 8, or 9 PDF pages onto a single sheet of paper."
      extraSections={<ToolSeoContent content={toolContent['n-up-pdf']} />}
    >
      <NUpTool />
    </ToolPageShell>
  );
}
