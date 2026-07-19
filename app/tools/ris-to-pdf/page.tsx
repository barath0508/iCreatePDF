import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RisToPdfTool } from '@/components/tools/RisToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert RIS to PDF Online Free: Bibliography & Citations | iCreatePDF',
  description: 'Wondering how to convert RIS to PDF? Parse RIS bibliographic citation files and compile them into beautifully formatted PDFs (APA, MLA, Chicago, Harvard). 100% private, local browser conversion.',
  keywords: 'how to convert ris to pdf, ris to pdf, convert ris to pdf, ris file to pdf, bibliography compiler, formatted citation pdf, citation converter free',
  alternates: buildAlternates('/tools/ris-to-pdf'),
  openGraph: {
    title: 'Convert RIS to PDF Online Free: Bibliography & Citations | iCreatePDF',
    description: 'Wondering how to convert RIS to PDF? Parse RIS bibliographic citation files and compile them into beautifully formatted PDFs (APA, MLA, Chicago, Harvard). 100% private, local browser conversion.',
    type: 'website',
  }
};

export default function RisToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'RIS to PDF Citation Converter',
        description: 'Convert RIS bibliographic reference files into styled PDF bibliographies (APA, MLA, Harvard, Chicago). Run entirely in your browser sandbox with 100% data privacy.',
        url: '/tools/ris-to-pdf',
      })}
      badge="Citation Converter"
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
