import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MergeTool } from '@/components/tools/MergeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Merge PDF Free: Combine PDF Files Online | iCreatePDF',
  description: 'Merge PDF files securely in your browser sandbox. Your files are combined client-side via WebAssembly — 100% private, zero server uploads.',
  keywords: 'merge pdf free, combine pdf files, join pdf online free, merge multiple pdf free, how to merge pdf, secure client side pdf merger, private pdf merger, combine pdf files locally',
  alternates: buildAlternates('/tools/merge-pdf'),
  openGraph: {
    title: 'Merge PDF Free: Combine PDF Files Online | iCreatePDF',
    description: 'Merge PDF files securely in your browser sandbox. Your files are combined client-side via WebAssembly — 100% private, zero server uploads.',
    type: 'website',
  }
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
