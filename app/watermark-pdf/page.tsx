import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WatermarkTool } from '@/components/tools/WatermarkTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Watermark PDF Online - Free & Private | iCreatePDF',
  description: 'Add custom text watermarks to all pages of a PDF file. 100% client-side with positioning, size, and opacity adjustments.',
  keywords: 'watermark pdf, add watermark to pdf, watermark pdf online, free watermark pdf, private pdf watermark',
  alternates: buildAlternates('/watermark-pdf'),
  openGraph: {
    title: 'Watermark PDF Online - Free & Private | iCreatePDF',
    description: 'Add custom text watermarks to all pages of a PDF file. 100% client-side with positioning, size, and opacity adjustments.',
    type: 'website',
  }
};

export default function WatermarkPdfPage() {
  return (
    <ToolPageShell badge="PDF Designer" title="Watermark PDF File" description="Apply configured text watermarks to document pages. Set position, size, opacity, and color values locally.">
      <WatermarkTool />
    </ToolPageShell>
  );
}
