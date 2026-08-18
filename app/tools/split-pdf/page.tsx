import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SplitTool } from '@/components/tools/SplitTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Split PDF Free Online — Separate & Extract PDF Pages | iCreatePDF',
  description: 'Split PDF documents into individual files or extract custom page ranges online free. 100% private client-side PDF splitter with zero uploads.',
  keywords: 'split pdf, separate pdf pages, extract pdf pages, split pdf online free, pdf page separator, how to split pdf into multiple files, split pdf by range, extract pages from pdf document, split large pdf file',
  alternates: buildAlternates('/tools/split-pdf'),
  openGraph: {
    title: 'Split PDF Free Online — Separate & Extract PDF Pages | iCreatePDF',
    description: 'Split PDF documents into individual files or extract custom page ranges online free. 100% private client-side PDF splitter with zero uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Split PDF Pages Online — iCreatePDF' }],
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
