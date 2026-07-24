import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MergeTool } from '@/components/tools/MergeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Merge PDF Free — Combine PDF Files Online Privately | iCreatePDF',
  description: 'Merge multiple PDF files into one document free online. Reorder files, combine unlimited PDFs, and download instantly. 100% private — files stay in your browser, never uploaded.',
  keywords: 'merge pdf free, combine pdf files, merge pdf online, join pdf files, merge multiple pdf, combine pdf files online free, merge pdf without uploading, pdf merger free, how to merge pdf files, merge pdf files into one, combine pdf pages, join pdf online free, merge pdf files locally, pdf combiner free, merge pdf on iphone, merge pdf android, merge 2 pdfs together free, merge pdf secure, combine pdf no upload',
  alternates: buildAlternates('/tools/merge-pdf'),
  openGraph: {
    title: 'Merge PDF Free — Combine PDF Files Online Privately | iCreatePDF',
    description: 'Merge multiple PDFs into one. Reorder files and download instantly. 100% private — no uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Merge PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF Free — Combine PDF Files Online Privately | iCreatePDF',
    description: 'Merge multiple PDFs into one. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function MergePdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Merge PDF Files',
        description: 'Merge PDF files securely in your browser sandbox. Your files are combined client-side via WebAssembly — 100% private, zero server uploads.',
        url: '/tools/merge-pdf',
      })}
      badge="PDF Merger"
      title="Merge PDF Files"
      description="Combine multiple PDF files into a single, organized document. All processing is executed client-side."
      extraSections={<ToolSeoContent content={toolContent['merge-pdf']} />}
    >
      <MergeTool />
    </ToolPageShell>
  );
}
