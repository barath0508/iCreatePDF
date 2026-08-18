import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WatermarkTool } from '@/components/tools/WatermarkTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Watermark PDF Free Online — Add Text or Logo Stamp to PDF | iCreatePDF',
  description: 'Add custom text watermarks or image logos to PDF pages. Adjust opacity, rotation, font, and placement. 100% private in-browser watermark creator.',
  keywords: 'watermark pdf, add watermark to pdf, pdf watermark creator, confidential stamp pdf, insert logo in pdf, how to put watermark on pdf pages, custom text watermark pdf, transparent watermark on pdf, draft watermark pdf, watermark pdf online without acrobat',
  alternates: buildAlternates('/tools/watermark-pdf'),
  openGraph: {
    title: 'Watermark PDF Free Online — Add Text or Logo Stamp to PDF | iCreatePDF',
    description: 'Add custom text watermarks or image logos to PDF pages. Adjust opacity, rotation, font, and placement. 100% private in-browser watermark creator.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Add Watermark to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watermark PDF Free Online — Add Text or Logo Stamp to PDF | iCreatePDF',
    description: 'Add custom text watermarks or image logos to PDF pages. Adjust opacity, rotation, font, and placement. 100% private in-browser watermark creator.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function WatermarkPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('watermark-pdf')}
      badge="PDF Designer"
      title="Watermark PDF File"
      description="Apply configured text watermarks to document pages. Set position, size, opacity, and color values locally."
      extraSections={<ToolSeoContent content={toolContent['watermark-pdf']} />}
    >
      <WatermarkTool />
    </ToolPageShell>
  );
}
