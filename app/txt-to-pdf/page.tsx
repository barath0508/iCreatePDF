import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { TxtToPdfTool } from '@/components/tools/TxtToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert Text to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert plain text (.txt) files or pasted text into styled PDF documents. Customize page margins, size, fonts, and headers/footers client-side.',
  keywords: 'text to pdf, txt to pdf online, convert plain text to pdf, free local pdf converter, text layout to pdf',
  alternates: buildAlternates('/txt-to-pdf'),
  openGraph: {
    title: 'Convert Text to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert plain text (.txt) files or pasted text into styled PDF documents. Customize page margins, size, fonts, and headers/footers client-side.',
    type: 'website',
  }
};

export default function TxtToPdfPage() {
  return (
    <ToolPageShell
      badge="Local Converter"
      title="Convert Text to PDF"
      description="Convert raw text or plain text (.txt) files into structured, formatted PDF documents. Set margins, orientations, font families, and custom headers in your browser."
      extraSections={<ToolSeoContent content={toolContent['txt-to-pdf']} />}
    >
      <TxtToPdfTool />
    </ToolPageShell>
  );
}
