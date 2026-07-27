import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SvgToPdfTool } from '@/components/tools/SvgToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'SVG to PDF Converter — Free, Private, No Upload | iCreatePDF',
  description: 'Convert Scalable Vector Graphics (.svg) into crisp vector PDF documents. 100% private — files process inside browser memory.',
  keywords: 'svg to pdf converter, convert svg to pdf online, scalable vector graphics to pdf, high quality svg pdf, free vector converter',
  alternates: buildAlternates('/tools/svg-to-pdf'),
  openGraph: {
    title: 'SVG to PDF Converter — iCreatePDF',
    description: 'Convert Scalable Vector Graphics (.svg) into crisp vector PDF documents.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'SVG to PDF Converter — iCreatePDF' }],
  },
};

export default function SvgToPdfToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'SVG to PDF Converter',
        description: 'Convert Scalable Vector Graphics (.svg) into crisp vector PDF documents.',
        url: '/tools/svg-to-pdf',
      })}
      badge="Vector Graphics"
      title="SVG to PDF Converter"
      description="Convert Scalable Vector Graphics (.svg) into crisp vector PDF documents."
      extraSections={<ToolSeoContent content={toolContent['svg-to-pdf']} />}
    >
      <SvgToPdfTool />
    </ToolPageShell>
  );
}
