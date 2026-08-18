import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EpubToPdfTool } from '@/components/tools/EpubToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'EPUB to PDF Converter Free Online (eBook to PDF) | iCreatePDF',
  description: 'Convert EPUB eBooks into formatted, printable A4 or Letter PDF documents online. 100% private client-side conversion without file uploads.',
  keywords: 'epub to pdf converter, convert epub to pdf, ebook to pdf free, read epub as pdf, convert epub file online, private epub pdf converter, epub to printable pdf a4, batch epub to pdf, convert electronic publication to pdf, format epub ebook as pdf document',
  alternates: buildAlternates('/tools/epub-to-pdf'),
  openGraph: {
    title: 'EPUB to PDF Converter Free Online (eBook to PDF) | iCreatePDF',
    description: 'Convert EPUB eBooks into formatted, printable A4 or Letter PDF documents online. 100% private client-side conversion without file uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'EPUB to PDF Converter — iCreatePDF' }],
  },
};

export default function EpubToPdfToolPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'EPUB to PDF Converter',
          description: 'Convert EPUB eBooks into formatted, printable A4 or Letter PDF documents online. 100% private client-side conversion without file uploads.',
          url: '/tools/epub-to-pdf',
        }),
        faqSchema(toolContent['epub-to-pdf'].faqs),
        howToSchema({
          name: 'EPUB to PDF Converter',
          description: toolContent['epub-to-pdf'].overview,
          url: '/tools/epub-to-pdf',
          steps: toolContent['epub-to-pdf'].steps,
        }),
      ]}badge="eBook Converter"
      title="EPUB to PDF Converter"
      description="Convert EPUB eBook files into clean, printable A4 or Letter PDF documents."
      extraSections={<ToolSeoContent content={toolContent['epub-to-pdf']} />}
    >
      <EpubToPdfTool />
    </ToolPageShell>
  );
}
