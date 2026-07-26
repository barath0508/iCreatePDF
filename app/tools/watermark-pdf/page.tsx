import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WatermarkTool } from '@/components/tools/WatermarkTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Watermark PDF Free Online — Add Text Watermarks (No Upload) | iCreatePDF',
  description: 'Add configurable text watermarks to all PDF pages free online. Customize position, opacity, font size, and color locally in browser memory.',
  keywords: 'watermark pdf, add watermark to pdf, watermark pdf online, free watermark pdf, private pdf watermark',
  alternates: buildAlternates('/tools/watermark-pdf'),
  openGraph: {
    title: 'Watermark PDF Free Online — Add Text Watermarks | iCreatePDF',
    description: 'Stamp configurable text overlays on all pages of a PDF document. Customize text, font, and position. Processed 100% locally in-browser.',
    type: 'website',
  }
};

export default function WatermarkPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Watermark PDF File',
          description: 'Add custom text watermarks to all pages of a PDF file. 100% client-side with positioning, size, and opacity adjustments.',
          url: '/tools/watermark-pdf',
        }),
        faqSchema([
          {
            question: 'How do I add a watermark to a PDF online for free?',
            answer: 'Upload your PDF, type your custom watermark text, select its placement coordinates, font size, color, rotation angle, and transparency, then click Watermark PDF.',
          },
          {
            question: 'Is my watermark processed securely?',
            answer: 'Yes. iCreatePDF overlays the watermark text layers locally on your device. Your file contents are never sent to external servers.',
          },
          {
            question: 'Can I apply watermarks to all pages at once?',
            answer: 'Yes, the watermarking process applies the specified text stamp to every single page of your PDF document in a single click.',
          },
        ]),
        howToSchema({
          name: 'Watermark PDF File',
          description: 'Stamp customized text watermarks onto PDF document pages locally.',
          url: '/tools/watermark-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Select or drag your PDF document into the browser.' },
            { title: 'Style Watermark', description: 'Configure text, transparency opacity, placement grids, and font parameters.' },
            { title: 'Apply & Save', description: 'Click Watermark PDF to compile and download your stamped document.' },
          ],
        }),
      ]}
      badge="PDF Designer"
      title="Watermark PDF File"
      description="Apply configured text watermarks to document pages. Set position, size, opacity, and color values locally."
      extraSections={<ToolSeoContent content={toolContent['watermark-pdf']} />}
    >
      <WatermarkTool />
    </ToolPageShell>
  );
}
