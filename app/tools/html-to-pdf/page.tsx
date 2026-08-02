import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { HtmlToPdfTool } from '@/components/tools/HtmlToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert HTML to PDF Free Online | iCreatePDF',
  description: 'Compile custom HTML/CSS code templates into formatted PDF documents online free. 100% private client-side renderer — files never leave your device.',
  keywords: 'pdfcrowd html to pdf, html to pdf, convert html to pdf, online html pdf compiler, css to pdf client side',
  alternates: buildAlternates('/tools/html-to-pdf'),
  openGraph: {
    title: 'Convert HTML to PDF Free Online — HTML Compiler | iCreatePDF',
    description: 'Compile custom HTML and CSS templates into formatted PDF documents locally. Completely private, client-side HTML-to-PDF utility.',
    type: 'website',
  }
};

export default function HtmlToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'HTML to PDF Converter',
          description: 'Compile custom HTML and CSS templates into formatted PDF documents locally. Completely private, client-side HTML-to-PDF utility.',
          url: '/tools/html-to-pdf',
        }),
        faqSchema([
          {
            question: 'How do I convert HTML code to PDF for free?',
            answer: 'Paste your raw HTML and CSS markup into the code editor fields, customize paper margins and orientation parameters, and download the compiled PDF layout instantly.',
          },
          {
            question: 'Is my custom HTML code sent to a server?',
            answer: 'No. The HTML compiler uses client-side rendering engines (like canvas or iframe streams) to generate PDFs entirely inside your browser memory. Zero file uploads.',
          },
          {
            question: 'Does it support CSS styling and layout media?',
            answer: 'Yes. You can write CSS rules directly inside `<style>` tags or inline attributes to style tables, fonts, grids, and page borders.',
          },
        ]),
        howToSchema({
          name: 'HTML to PDF Converter',
          description: 'Compile custom HTML and CSS templates into formatted PDF documents locally.',
          url: '/tools/html-to-pdf',
          steps: [
            { title: 'Input HTML Code', description: 'Paste or write your HTML structure and CSS rules into the editor.' },
            { title: 'Set Page Size', description: 'Configure A4 paper dimensions, margins, and orientation layout.' },
            { title: 'Compile & Save', description: 'Click Compile to PDF to download your layout immediately.' },
          ],
        }),
      ]}
      badge="HTML Compiler"
      title="HTML to PDF Converter"
      description="Render your custom HTML/CSS code templates into A4 PDF pages locally."
      extraSections={<ToolSeoContent content={toolContent['html-to-pdf']} />}
    >
      <HtmlToPdfTool />
    </ToolPageShell>
  );
}
