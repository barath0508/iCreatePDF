import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert HEIC to PDF: Save iPhone Photos to PDF Free | iCreatePDF',
  description: 'Convert iPhone HEIC photos to PDF online. 100% local and private client-side converter, no file uploads. Reorder and save HEIC images to PDF instantly.',
  keywords: 'how to convert heic to pdf on iphone, heic to pdf iphone, convert heic to pdf iphone, iphone heic to pdf converter, heic to pdf, convert heic to pdf, convert iphone heic to pdf, heic to pdf converter, convert heic to pdf offline, offline heic to pdf converter, convert heic to pdf locally, iphone heic to pdf private, local image converter',
  alternates: buildAlternates('/tools/heic-to-pdf'),
  openGraph: {
    title: 'Convert HEIC to PDF: Save iPhone Photos to PDF Free | iCreatePDF',
    description: 'Convert iPhone HEIC photos to PDF online. 100% local and private client-side converter, no file uploads. Reorder and save HEIC images to PDF instantly.',
    type: 'website',
  }
};

export default function HeicToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'HEIC to PDF',
        description: 'Convert iPhone HEIC photos to PDF directly in your browser. 100% local client-side conversion, zero server uploads, safe for sensitive photos.',
        url: '/tools/heic-to-pdf',
      })}
      badge="Image Converter"
      title="HEIC to PDF"
      description="Drag & drop multiple HEIC images from iPhone, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['heic-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="heic" />
    </ToolPageShell>
  );
}
