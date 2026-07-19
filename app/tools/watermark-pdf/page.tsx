import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WatermarkTool } from '@/components/tools/WatermarkTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Watermark PDF Online - Free & Private | iCreatePDF',
  description: 'Add custom text watermarks to all pages of a PDF file. 100% client-side with positioning, size, and opacity adjustments.',
  keywords: 'watermark pdf, add watermark to pdf, watermark pdf online, free watermark pdf, private pdf watermark',
  alternates: buildAlternates('/tools/watermark-pdf'),
  openGraph: {
    title: 'Watermark PDF Online - Free & Private | iCreatePDF',
    description: 'Add custom text watermarks to all pages of a PDF file. 100% client-side with positioning, size, and opacity adjustments.',
    type: 'website',
  }
};

export default function WatermarkPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Watermark PDF File',
        description: 'Add custom text watermarks to all pages of a PDF file. 100% client-side with positioning, size, and opacity adjustments.',
        url: '/tools/watermark-pdf',
      })}
      badge="PDF Designer"
      title="Watermark PDF File"
      description="Apply configured text watermarks to document pages. Set position, size, opacity, and color values locally."
      extraSections={<ToolSeoContent content={toolContent['watermark-pdf']} />}
    >
      <WatermarkTool />
    </ToolPageShell>
  );
}
