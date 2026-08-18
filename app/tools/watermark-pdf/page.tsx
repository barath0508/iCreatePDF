import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WatermarkTool } from '@/components/tools/WatermarkTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Watermark PDF Free Online — Add Text or Logo Stamp to PDF | iCreatePDF',
  description: 'Add custom text watermarks or image logos to PDF pages. Adjust opacity, rotation, font, and placement. 100% private in-browser watermark creator.',
  keywords: 'watermark pdf, add watermark to pdf, pdf watermark creator, confidential stamp pdf, insert logo in pdf, how to put watermark on pdf pages, custom text watermark pdf, transparent watermark on pdf, draft watermark pdf',
  alternates: buildAlternates('/tools/watermark-pdf'),
  openGraph: {
    title: 'Watermark PDF Free Online — Add Text or Logo Stamp to PDF | iCreatePDF',
    description: 'Add custom text watermarks or image logos to PDF pages. Adjust opacity, rotation, font, and placement. 100% private in-browser watermark creator.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Add Watermark to PDF — iCreatePDF' }],
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
