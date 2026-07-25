import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToWordTool } from '@/components/tools/PdfToWordTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to Word Converter � Free, Private, No Upload | iCreatePDF',
  description: 'Extract structured text and headings into editable Word (.docx) documents. 100% private � files process inside browser memory.',
  alternates: buildAlternates('/tools/pdf-to-word'),
  openGraph: {
    title: 'PDF to Word Converter � iCreatePDF',
    description: 'Extract structured text and headings into editable Word (.docx) documents.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF to Word Converter � iCreatePDF' }],
  },
};

export default function PdfToWordToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PDF to Word Converter',
        description: 'Extract structured text and headings into editable Word (.docx) documents.',
        url: '/tools/pdf-to-word',
      })}
      badge="Document Converter"
      title="PDF to Word Converter"
      description="Extract structured text and headings into editable Word (.docx) documents."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-word']} />}
    >
      <PdfToWordTool />
    </ToolPageShell>
  );
}
