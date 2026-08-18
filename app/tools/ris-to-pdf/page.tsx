import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RisToPdfTool } from '@/components/tools/RisToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'RIS to PDF Converter — Format Academic Citations to PDF | iCreatePDF',
  description: 'Convert RIS citation files into beautifully formatted reference bibliographies in PDF format. 100% private academic formatting tool.',
  keywords: 'ris to pdf, convert ris citation to pdf, bibliography to pdf converter, ris file to formatted reference pdf, endnote ris to pdf, zotero citation to pdf, academic references to pdf, export ris bibliography pdf',
  alternates: buildAlternates('/tools/ris-to-pdf'),
  openGraph: {
    title: 'Convert RIS to PDF Online: | iCreatePDF',
    description: 'Wondering how to convert RIS to PDF? Parse RIS bibliographic citation files and compile them into beautifully formatted PDFs (APA, MLA, Chicago, Harvard). 100% private, local browser conversion.',
    type: 'website',
  }
};

export default function RisToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'RIS to PDF Citation Converter',
          description: 'Convert RIS citation files into beautifully formatted reference bibliographies in PDF format. 100% private academic formatting tool.',
          url: '/tools/ris-to-pdf',
        }),
        faqSchema(toolContent['ris-to-pdf'].faqs),
        howToSchema({
          name: 'RIS to PDF Citation Converter',
          description: toolContent['ris-to-pdf'].overview,
          url: '/tools/ris-to-pdf',
          steps: toolContent['ris-to-pdf'].steps,
        }),
      ]}badge="Citation Converter"
      title="RIS to PDF Citation Converter"
      description="Drop your bibliographic reference file (.ris) to parse and compile it into a beautifully formatted bibliography PDF."
      extraSections={<ToolSeoContent content={toolContent['ris-to-pdf']} />}
    >
      <div className="relative z-10">
        <RisToPdfTool />
      </div>
    </ToolPageShell>
  );
}
