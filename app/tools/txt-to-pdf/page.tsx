import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { TxtToPdfTool } from '@/components/tools/TxtToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert Text to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert plain text files (.txt) or raw typed text into formatted PDF sheets. Processed 100% locally in your browser sandbox for absolute data privacy.',
  keywords: 'text to pdf, txt to pdf online, convert plain text to pdf, free local pdf converter, text layout to pdf',
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
      jsonLd={toolSchema({
        name: 'Convert Text to PDF',
        description: 'Convert plain text (.txt) files or pasted text into styled PDF documents. Customize page margins, size, fonts, and headers/footers client-side.',
        url: '/tools/txt-to-pdf',
      })}
      badge="Local Converter"
      title="Convert Text to PDF"
      description="Convert raw text or plain text (.txt) files into structured, formatted PDF documents. Set margins, orientations, font families, and custom headers in your browser."
      extraSections={<ToolSeoContent content={toolContent['txt-to-pdf']} />}
    >
      <TxtToPdfTool />
    </ToolPageShell>
  );
}
