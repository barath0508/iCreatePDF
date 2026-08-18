import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { TxtToPdfTool } from '@/components/tools/TxtToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'TXT to PDF Converter Free Online — Plain Text to Formatted PDF | iCreatePDF',
  description: 'Convert plain text (.txt) files and notes into formatted, printable PDF documents with custom typography and margins. 100% private.',
  keywords: 'txt to pdf, convert text file to pdf, convert notepad txt to pdf, txt to formatted pdf, plain text to pdf converter online, text to printable pdf a4, text document to pdf free, turn txt into formatted pdf document, convert notepad text to pdf, convert txt file to pdf document, text to pdf converter free online, plain text to printable pdf, batch txt to pdf converter, convert text notes to pdf',
  alternates: buildAlternates('/tools/txt-to-pdf'),
  openGraph: {
    title: 'TXT to PDF Converter Free Online — Plain Text to Formatted PDF | iCreatePDF',
    description: 'Convert plain text (.txt) files and notes into formatted, printable PDF documents with custom typography and margins. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert TXT to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TXT to PDF Converter Free Online — Plain Text to Formatted PDF | iCreatePDF',
    description: 'Convert plain text (.txt) files and notes into formatted, printable PDF documents with custom typography and margins. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function TxtToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('txt-to-pdf')}
      badge="Local Converter"
      title="Convert Text to PDF"
      description="Convert raw text or plain text (.txt) files into structured, formatted PDF documents. Set margins, orientations, font families, and custom headers in your browser."
      extraSections={<ToolSeoContent content={toolContent['txt-to-pdf']} />}
    >
      <TxtToPdfTool />
    </ToolPageShell>
  );
}
