import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompressTool } from '@/components/tools/CompressTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Local Browser PDF Compressor - Reduce Size Privately | iCreatePDF',
  description: 'Compress and shrink PDF files locally on your device. 100% private client-side optimization with no file uploads or data logging.',
  keywords: 'local browser pdf compressor, private pdf compression, shrink pdf file size secure, offline pdf size reducer',
  alternates: buildAlternates('/compress-pdf'),
  openGraph: {
    title: 'Local Browser PDF Compressor - Reduce Size Privately | iCreatePDF',
    description: 'Compress and shrink PDF files locally on your device. 100% private client-side optimization with no file uploads or data logging.',
    type: 'website',
  }
};

export default function CompressPdfPage() {
  return (
    <ToolPageShell badge="PDF Optimizer" title="Compress PDF File" description="Reduce the file size of your PDF files by optimizing internal streams and resources client-side.">
      <CompressTool />
    </ToolPageShell>
  );
}
