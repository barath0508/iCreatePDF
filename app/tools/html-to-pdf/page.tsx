import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { HtmlToPdfTool } from '@/components/tools/HtmlToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'HTML to PDF Converter Online Free — Save Web Code as PDF | iCreatePDF',
  description: 'Convert HTML code snippets and web pages into clean, printable PDF documents. 100% private in-browser rendering with zero server uploads.',
  keywords: 'html to pdf, convert html to pdf, web page to pdf converter, html code to pdf document, save html as pdf free, render html to pdf online, html table to pdf, convert html file to pdf, html to printable pdf, browser html to pdf converter',
  alternates: buildAlternates('/tools/html-to-pdf'),
  openGraph: {
    title: 'HTML to PDF Converter Online Free — Save Web Code as PDF | iCreatePDF',
    description: 'Convert HTML code snippets and web pages into clean, printable PDF documents. 100% private in-browser rendering with zero server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'HTML to PDF Converter — iCreatePDF' }],
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
