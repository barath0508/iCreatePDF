import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MergeTool } from '@/components/tools/MergeTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Secure Client-Side PDF Merger - 100% Private | iCreatePDF',
  description: 'Merge PDF files securely in your browser sandbox. Your files are combined client-side via WebAssembly — 100% private, zero server uploads.',
  keywords: 'secure client side pdf merger, merge pdf online free, private pdf merger, combine pdf files locally',
  alternates: { canonical: '/merge-pdf' },
  openGraph: {
    title: 'Secure Client-Side PDF Merger - 100% Private | iCreatePDF',
    description: 'Merge PDF files securely in your browser sandbox. Your files are combined client-side via WebAssembly — 100% private, zero server uploads.',
    type: 'website',
  }
};

export default function MergePdfPage() {
  return (
    <ToolPageShell badge="PDF Merger" title="Merge PDF Files" description="Combine multiple PDF files into a single, organized document. All processing is executed client-side.">
      <MergeTool />
    </ToolPageShell>
  );
}
