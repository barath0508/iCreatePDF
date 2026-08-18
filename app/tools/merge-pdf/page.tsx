import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MergeTool } from '@/components/tools/MergeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Merge PDF Free Online — Combine Multiple PDF Files | iCreatePDF',
  description: 'Combine multiple PDF files into one document free online. ⚡ Fast, secure, and 100% local — files stay in your browser, no upload required.',
  keywords: 'merge pdf, combine pdf, merge pdf online free, combine pdf files, pdf joiner, merge multiple pdfs into one, how to combine pdf files, pdf merger free, merge pdf without uploading, join pdf online free, merge pdf files locally, pdf combiner free, merge pdf on mac, merge pdf on iphone, merge 2 pdfs together free, combine pdf pages online',
  alternates: buildAlternates('/tools/merge-pdf'),
  openGraph: {
    title: 'Merge PDF Free Online — Combine Multiple PDF Files | iCreatePDF',
    description: 'Combine multiple PDF files into one document free online. ⚡ Fast, secure, and 100% local — files stay in your browser, no upload required.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Merge PDF Files Online — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF Free Online — Combine Multiple PDF Files | iCreatePDF',
    description: 'Combine multiple PDF files into one document free online. ⚡ Fast, secure, and 100% local — files stay in your browser, no upload required.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function MergePdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('merge-pdf')}
      badge="PDF Merger"
      title="Merge PDF Files"
      description="Combine multiple PDF files into a single, organized document. All processing is executed client-side."
      extraSections={<ToolSeoContent content={toolContent['merge-pdf']} />}
    >
      <MergeTool />
    </ToolPageShell>
  );
}
