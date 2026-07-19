import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compress PDF Offline: Reduce File Size Privately | iCreatePDF',
  description: 'Compress and shrink PDF files locally on your device. 100% private client-side optimization with no file uploads or data logging.',
  keywords: 'compress pdf offline, compress pdf without losing quality, reduce pdf file size, shrink pdf free, compress pdf online free, local browser pdf compressor, private pdf compression, shrink pdf file size secure, offline pdf size reducer',
  alternates: buildAlternates('/tools/compress-pdf'),
  openGraph: {
    title: 'Compress PDF Offline: Reduce File Size Privately | iCreatePDF',
    description: 'Compress and shrink PDF files locally on your device. 100% private client-side optimization with no file uploads or data logging.',
    type: 'website',
  }
};

export default function CompressPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Compress PDF File',
        description: 'Compress and shrink PDF files locally on your device. 100% private client-side optimization with no file uploads or data logging.',
        url: '/tools/compress-pdf',
      })}
      badge="PDF Optimizer"
      title="Compress PDF File"
      description="Reduce the file size of your PDF files by optimizing internal streams and resources client-side."
      extraSections={<ToolSeoContent content={toolContent['compress-pdf']} />}
    >
      <CompressTool />
    </ToolPageShell>
  );
}
