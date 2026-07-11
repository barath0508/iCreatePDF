import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { HtmlToPdfTool } from '@/components/tools/HtmlToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert HTML to PDF Online - Free & Private | iCreatePDF',
  description: 'Compile custom HTML and CSS templates into formatted PDF documents locally. Completely private, client-side HTML-to-PDF utility.',
  keywords: 'html to pdf, convert html to pdf, online html pdf compiler, css to pdf client side',
  alternates: buildAlternates('/html-to-pdf'),
  openGraph: {
    title: 'Convert HTML to PDF Online - Free & Private | iCreatePDF',
    description: 'Compile custom HTML and CSS templates into formatted PDF documents locally. Completely private, client-side HTML-to-PDF utility.',
    type: 'website',
  }
};

export default function HtmlToPdfPage() {
  return (
    <ToolPageShell
      badge="HTML Compiler"
      title="HTML to PDF Converter"
      description="Render your custom HTML/CSS code templates into A4 PDF pages locally."
      extraSections={<ToolSeoContent content={toolContent['html-to-pdf']} />}
    >
      <HtmlToPdfTool />
    </ToolPageShell>
  );
}
