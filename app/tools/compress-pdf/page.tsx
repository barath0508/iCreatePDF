import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compress PDF Free Online — Reduce File Size Without Quality Loss | iCreatePDF',
  description: 'Shrink and compress PDF file size online free. Optimize documents for email and web portals. 100% private local WebAssembly compression, no uploads.',
  keywords: 'compress pdf, compress pdf online free, reduce pdf file size, shrink pdf, compress pdf without losing quality, pdf compressor, reduce pdf size online free, compress pdf file, make pdf smaller, pdf size reducer, compress pdf locally, compress pdf no upload, pdf file size reducer free, how to compress pdf, compress pdf for email, compress pdf to 1mb, compress pdf to 200kb, compress pdf to 100kb, compress large pdf, best pdf compressor free',
  alternates: buildAlternates('/tools/compress-pdf'),
  openGraph: {
    title: 'Compress PDF Free Online — Reduce File Size Without Quality Loss | iCreatePDF',
    description: 'Shrink and compress PDF file size online free. Optimize documents for email and web portals. 100% private local WebAssembly compression, no uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Compress PDF File Size — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF Free Online — Reduce File Size Without Quality Loss | iCreatePDF',
    description: 'Shrink and compress PDF file size online free. Optimize documents for email and web portals. 100% private local WebAssembly compression, no uploads.',
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
