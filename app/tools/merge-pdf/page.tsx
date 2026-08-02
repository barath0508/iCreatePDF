import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MergeTool } from '@/components/tools/MergeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Merge PDF Free Online — Combine PDF Files | iCreatePDF',
  description: 'Combine multiple PDF files into one document free online. ⚡ Fast, secure, and 100% local — files stay in your browser, no upload required.',
  keywords: 'merge pdf free, combine pdf files, merge pdf online, join pdf files, merge multiple pdf, combine pdf files online free, merge pdf without uploading, pdf merger free, how to merge pdf files, merge pdf files into one, combine pdf pages, join pdf online free, merge pdf files locally, pdf combiner free, merge pdf on iphone, merge pdf android, merge 2 pdfs together free, merge pdf secure, combine pdf no upload',
  alternates: buildAlternates('/tools/merge-pdf'),
  openGraph: {
    title: 'Merge PDF Free Online — Combine PDF Instantly | iCreatePDF',
    description: 'Combine multiple PDF files into one document free online. ⚡ Fast, secure, and 100% local. No uploads required.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Merge PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF Free Online — Combine PDF Instantly | iCreatePDF',
    description: 'Combine multiple PDF files into one document free online. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function MergePdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Merge PDF Files',
          description: 'Merge PDF files securely in your browser sandbox. Your files are combined client-side via WebAssembly — 100% private, zero server uploads.',
          url: '/tools/merge-pdf',
        }),
        faqSchema([
          {
            question: 'How do I merge PDF files free online?',
            answer: 'Upload your PDF documents, drag them into the preferred page order, then click Merge PDF to download your combined document instantly.',
          },
          {
            question: 'Does merging PDFs upload my files to a server?',
            answer: 'No. iCreatePDF processes your files entirely locally in your browser using WebAssembly. Your files are never uploaded to any remote server.',
          },
          {
            question: 'Is there a limit on how many PDFs I can combine?',
            answer: 'No, there are no artificial limits. You can combine as many PDF files as your computer\'s browser memory can handle.',
          },
        ]),
        howToSchema({
          name: 'Merge PDF Files',
          description: 'Combine multiple PDF files into a single document online.',
          url: '/tools/merge-pdf',
          steps: [
            { title: 'Upload PDFs', description: 'Drag and drop your PDF files into the tool.' },
            { title: 'Reorder Files', description: 'Arrange and reorder your file thumbnails in the desired sequence.' },
            { title: 'Merge & Download', description: 'Click Merge PDF to compile and download your new PDF document.' },
          ],
        }),
      ]}
      badge="PDF Merger"
      title="Merge PDF Files"
      description="Combine multiple PDF files into a single, organized document. All processing is executed client-side."
      extraSections={<ToolSeoContent content={toolContent['merge-pdf']} />}
    >
      <MergeTool />
    </ToolPageShell>
  );
}
