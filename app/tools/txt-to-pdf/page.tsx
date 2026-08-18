import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { TxtToPdfTool } from '@/components/tools/TxtToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'TXT to PDF Converter Free Online — Plain Text to Formatted PDF | iCreatePDF',
  description: 'Convert plain text (.txt) files and notes into formatted, printable PDF documents with custom typography and margins. 100% private.',
  keywords: 'txt to pdf, convert text file to pdf, convert notepad txt to pdf, txt to formatted pdf, plain text to pdf converter online, text to printable pdf a4, text document to pdf free',
  alternates: buildAlternates('/tools/txt-to-pdf'),
  openGraph: {
    title: 'Convert Text to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert plain text files (.txt) or raw typed text into formatted PDF sheets. Processed 100% locally in your browser sandbox for absolute data privacy.',
    type: 'website',
  }
};

export default function TxtToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Convert TXT to PDF',
          description: 'Convert plain text (.txt) files and notes into formatted, printable PDF documents with custom typography and margins. 100% private.',
          url: '/tools/txt-to-pdf',
        }),
        faqSchema(toolContent['txt-to-pdf'].faqs),
        howToSchema({
          name: 'Convert TXT to PDF',
          description: toolContent['txt-to-pdf'].overview,
          url: '/tools/txt-to-pdf',
          steps: toolContent['txt-to-pdf'].steps,
        }),
      ]}badge="Local Converter"
      title="Convert Text to PDF"
      description="Convert raw text or plain text (.txt) files into structured, formatted PDF documents. Set margins, orientations, font families, and custom headers in your browser."
      extraSections={<ToolSeoContent content={toolContent['txt-to-pdf']} />}
    >
      <TxtToPdfTool />
    </ToolPageShell>
  );
}
