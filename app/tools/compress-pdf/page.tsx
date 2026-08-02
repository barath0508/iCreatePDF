import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compress PDF Free Online — Reduce File Size | iCreatePDF',
  description: 'Compress and shrink PDF files free online. Reduce PDF size without losing quality — 100% private local processing, no server uploads.',
  keywords: 'compress pdf, compress pdf online free, reduce pdf file size, shrink pdf, compress pdf without losing quality, pdf compressor, reduce pdf size online free, compress pdf file, make pdf smaller, pdf size reducer, compress pdf locally, compress pdf no upload, pdf file size reducer free, how to compress pdf, compress pdf for email, compress pdf to 1mb, compress pdf to 200kb, compress large pdf',
  alternates: buildAlternates('/tools/compress-pdf'),
  openGraph: {
    title: 'Compress PDF Free Online — Reduce PDF File Size | iCreatePDF',
    description: 'Compress and shrink PDF files free online. Reduce PDF size without losing quality. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Compress PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF Free Online — Reduce PDF File Size | iCreatePDF',
    description: 'Reduce PDF file size online without losing quality. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function CompressPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Compress PDF File',
          description: 'Compress and shrink PDF files locally on your device. 100% private client-side optimization with no file uploads or data logging.',
          url: '/tools/compress-pdf',
        }),
        faqSchema([
          {
            question: 'How do I compress a PDF online for free?',
            answer: 'Drag and drop your PDF file into the compress tool, choose the compression level (Low, Medium, High), and download the compressed PDF instantly.',
          },
          {
            question: 'Will compressing my PDF reduce its visual quality?',
            answer: 'No. iCreatePDF optimizes internal resources like redundant fonts and scales down image DPI without losing overall visual readability and structure.',
          },
          {
            question: 'Is there a file size limit for PDF compression?',
            answer: 'No. Since the compression runs entirely inside your browser sandbox locally, there are no file size limits other than what your device browser can handle.',
          },
        ]),
        howToSchema({
          name: 'Compress PDF File',
          description: 'Reduce the file size of your PDF files by optimizing internal streams client-side.',
          url: '/tools/compress-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Select or drag your PDF document into the optimizer.' },
            { title: 'Select Compression Level', description: 'Choose your desired file size reduction balance (Low, Medium, or High).' },
            { title: 'Compress & Save', description: 'Wait a second for local processing and click Download to save.' },
          ],
        }),
      ]}
      badge="PDF Optimizer"
      title="Compress PDF File"
      description="Reduce the file size of your PDF files by optimizing internal streams and resources client-side."
      extraSections={<ToolSeoContent content={toolContent['compress-pdf']} />}
    >
      <CompressTool />
    </ToolPageShell>
  );
}
