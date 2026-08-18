import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MergeTool } from '@/components/tools/MergeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Merge PDF Free Online — Combine Multiple PDF Files | iCreatePDF',
  description: 'Combine multiple PDF files into one document free online. ⚡ Fast, secure, and 100% local — files stay in your browser, no upload required.',
  keywords: 'merge pdf, combine pdf, merge pdf online free, combine pdf files, pdf joiner, merge multiple pdfs into one, how to combine pdf files, pdf merger free, merge pdf without uploading, join pdf online free, merge pdf files locally, pdf combiner free, merge pdf on mac, merge pdf on iphone, merge 2 pdfs together free',
  alternates: buildAlternates('/tools/merge-pdf'),
  openGraph: {
    title: 'Merge PDF Free Online — Combine Multiple PDF Files | iCreatePDF',
    description: 'Combine multiple PDF files into one document free online. ⚡ Fast, secure, and 100% local — files stay in your browser, no upload required.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Merge PDF Files Online — iCreatePDF' }],
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
          name: 'Merge PDF Files Online',
          description: 'Combine multiple PDF files into one document free online. ⚡ Fast, secure, and 100% local — files stay in your browser, no upload required.',
          url: '/tools/merge-pdf',
        }),
        faqSchema(toolContent['merge-pdf'].faqs),
        howToSchema({
          name: 'Merge PDF Files Online',
          description: toolContent['merge-pdf'].overview,
          url: '/tools/merge-pdf',
          steps: toolContent['merge-pdf'].steps,
        }),
      ]}),
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
