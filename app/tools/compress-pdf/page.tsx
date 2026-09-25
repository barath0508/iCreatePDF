import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compress PDF Online (No Upload) — 100% Private Local Reducer | iCreatePDF',
  description: 'Shrink confidential PDF files locally in your browser with WebAssembly. Zero server uploads, zero logs, zero cloud exposure. Safe for legal & financial documents.',
  keywords: 'compress pdf no upload, compress confidential pdf, private pdf compressor, compress pdf without uploading, client side pdf compressor, reduce pdf size locally, compress sensitive pdf, shrink pdf without server upload, compress pdf offline, secure pdf compressor free, hipaa compliant pdf compression, reduce pdf file size free, compress pdf, compress pdf online free',
  alternates: buildAlternates('/tools/compress-pdf'),
  openGraph: {
    title: 'Compress PDF Online (No Upload) — 100% Private Local Reducer | iCreatePDF',
    description: 'Shrink confidential PDF files locally in your browser with WebAssembly. Zero server uploads, zero logs, zero cloud exposure. Safe for legal & financial documents.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Private Client-Side PDF Compressor — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF Online (No Upload) — 100% Private Local Reducer | iCreatePDF',
    description: 'Shrink confidential PDF files locally in your browser with WebAssembly. Zero server uploads, zero logs, zero cloud exposure. Safe for legal & financial documents.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function CompressPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('compress-pdf')}
      badge="PDF Optimizer"
      title="Compress PDF File"
      description="Reduce the file size of your PDF files by optimizing internal streams and resources client-side."
      extraSections={<ToolSeoContent content={toolContent['compress-pdf']} />}
    >
      <CompressTool />
    </ToolPageShell>
  );
}
