import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SplitTool } from '@/components/tools/SplitTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Split PDF Free Online — Extract PDF Pages | iCreatePDF',
  description: 'Extract page ranges or separate all pages in a PDF document free online. ⚡ 100% private browser processing — no uploads or sign-up needed.',
  keywords: 'pdf cut pages, how to separate a page from a pdf, separate a page from pdf, how to split pdf pages free, split pdf pages free, split pdf, extract pages pdf, split pdf online, split pdf free, private pdf splitter, cut pages from pdf, cut pages out of pdf',
  alternates: buildAlternates('/tools/split-pdf'),
  openGraph: {
    title: 'Split PDF Free Online — Extract Pages from PDF | iCreatePDF',
    description: 'Extract page ranges or separate all pages in a PDF document free online. 100% private browser processing.',
    type: 'website',
  }
};

export default function SplitPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Split PDF Files',
          description: 'Extract page ranges or separate all pages in a PDF. 100% client-side, drag & drop files, and download split parts instantly.',
          url: '/tools/split-pdf',
        }),
        faqSchema([
          {
            question: 'How do I split PDF pages for free?',
            answer: 'Upload your PDF, choose to extract specific page ranges or split the document into individual single-page files, then click Split PDF.',
          },
          {
            question: 'Is my data secure when splitting PDFs here?',
            answer: 'Yes. iCreatePDF processes your PDF document entirely on your local device using WebAssembly. Your files are never uploaded to any remote server.',
          },
          {
            question: 'Can I extract multiple non-consecutive page ranges?',
            answer: 'Yes! You can specify custom page numbers or ranges (e.g., 1-3, 5, 7-10) to extract exactly the pages you need.',
          },
        ]),
        howToSchema({
          name: 'Split PDF Files',
          description: 'Extract page ranges or separate all pages in a PDF document online.',
          url: '/tools/split-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Drag and drop your PDF file into the splitter.' },
            { title: 'Configure Split Mode', description: 'Select the pages or range you want to extract.' },
            { title: 'Split & Save', description: 'Click Split PDF to compile and download the separated pages instantly.' },
          ],
        }),
      ]}
      badge="PDF Splitter"
      title="Split PDF Files"
      description="Extract individual pages or select custom ranges from your PDF document locally inside your browser."
      extraSections={<ToolSeoContent content={toolContent['split-pdf']} />}
    >
      <SplitTool />
    </ToolPageShell>
  );
}
