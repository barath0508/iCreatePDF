import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { HtmlToPdfTool } from '@/components/tools/HtmlToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'HTML to PDF Converter Online Free — Save Web Code as PDF | iCreatePDF',
  description: 'Convert HTML code snippets and web pages into clean, printable PDF documents. 100% private in-browser rendering with zero server uploads.',
  keywords: 'html to pdf, convert html to pdf, web page to pdf converter, html code to pdf document, save html as pdf free, render html to pdf online, html table to pdf, convert html file to pdf, html to printable pdf, browser html to pdf converter, html to pdf free no limit',
  alternates: buildAlternates('/tools/html-to-pdf'),
  openGraph: {
    title: 'HTML to PDF Converter Online Free — Save Web Code as PDF | iCreatePDF',
    description: 'Convert HTML code snippets and web pages into clean, printable PDF documents. 100% private in-browser rendering with zero server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'HTML to PDF Converter — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML to PDF Converter Online Free — Save Web Code as PDF | iCreatePDF',
    description: 'Convert HTML code snippets and web pages into clean, printable PDF documents. 100% private in-browser rendering with zero server uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function HtmlToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('html-to-pdf')}
      badge="HTML Compiler"
      title="HTML to PDF Converter"
      description="Render your custom HTML/CSS code templates into A4 PDF pages locally."
      extraSections={<ToolSeoContent content={toolContent['html-to-pdf']} />}
    >
      <HtmlToPdfTool />
    </ToolPageShell>
  );
}
