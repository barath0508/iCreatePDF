import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EpubToPdfTool } from '@/components/tools/EpubToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'EPUB to PDF Converter � Free, Private, No Upload | iCreatePDF',
  description: 'Convert EPUB eBook files into clean, printable A4 or Letter PDF documents. 100% private � files process inside browser memory.',
  alternates: buildAlternates('/tools/epub-to-pdf'),
  openGraph: {
    title: 'EPUB to PDF Converter � iCreatePDF',
    description: 'Convert EPUB eBook files into clean, printable A4 or Letter PDF documents.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'EPUB to PDF Converter � iCreatePDF' }],
  },
};

export default function EpubToPdfToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'EPUB to PDF Converter',
        description: 'Convert EPUB eBook files into clean, printable A4 or Letter PDF documents.',
        url: '/tools/epub-to-pdf',
      })}
      badge="eBook Converter"
      title="EPUB to PDF Converter"
      description="Convert EPUB eBook files into clean, printable A4 or Letter PDF documents."
      extraSections={<ToolSeoContent content={toolContent['epub-to-pdf']} />}
    >
      <EpubToPdfTool />
    </ToolPageShell>
  );
}
