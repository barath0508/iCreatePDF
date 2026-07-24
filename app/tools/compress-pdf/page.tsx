import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compress PDF — Reduce PDF File Size Free Online | iCreatePDF',
  description: 'Compress and shrink PDF files free online. Reduce PDF size without losing quality — 100% private client-side processing, no uploads, no file size limits.',
  keywords: 'compress pdf, compress pdf online free, reduce pdf file size, shrink pdf, compress pdf without losing quality, pdf compressor, reduce pdf size online free, compress pdf file, make pdf smaller, pdf size reducer, compress pdf locally, compress pdf no upload, pdf file size reducer free, how to compress pdf, compress pdf for email, compress pdf to 1mb, compress pdf to 200kb, compress large pdf',
  alternates: buildAlternates('/tools/compress-pdf'),
  openGraph: {
    title: 'Compress PDF — Reduce PDF File Size Free Online | iCreatePDF',
    description: 'Reduce PDF file size without losing quality. 100% private — no uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Compress PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF — Reduce PDF File Size Free Online | iCreatePDF',
    description: 'Reduce PDF file size without losing quality. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
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
