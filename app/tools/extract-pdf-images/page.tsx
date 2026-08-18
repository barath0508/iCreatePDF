import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExtractImagesTool } from '@/components/tools/ExtractImagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Extract Images from PDF Free Online (Download All Photos) | iCreatePDF',
  description: 'Extract embedded photos, raster graphics, and illustrations from any PDF into a high-resolution ZIP file. 100% private local extraction.',
  keywords: 'extract images from pdf, save images from pdf, pdf to image extractor, extract all photos from pdf, pdf image downloader zip, get high res images from pdf free, rip pictures from pdf, extract embedded graphics from pdf, download pictures from pdf document, export raster images pdf',
  alternates: buildAlternates('/tools/extract-pdf-images'),
  openGraph: {
    title: 'Extract Images from PDF Free Online (Download All Photos) | iCreatePDF',
    description: 'Extract embedded photos, raster graphics, and illustrations from any PDF into a high-resolution ZIP file. 100% private local extraction.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Extract Images from PDF — iCreatePDF' }],
  },
};

export default function ExtractImagesToolPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Extract Images from PDF',
          description: 'Extract embedded photos, raster graphics, and illustrations from any PDF into a high-resolution ZIP file. 100% private local extraction.',
          url: '/tools/extract-pdf-images',
        }),
        faqSchema(toolContent['extract-pdf-images'].faqs),
        howToSchema({
          name: 'Extract Images from PDF',
          description: toolContent['extract-pdf-images'].overview,
          url: '/tools/extract-pdf-images',
          steps: toolContent['extract-pdf-images'].steps,
        }),
      ]}badge="Media Extractor"
      title="Extract Images from PDF"
      description="Extract embedded photos and raster graphics from a PDF into a downloadable ZIP."
      extraSections={<ToolSeoContent content={toolContent['extract-pdf-images']} />}
    >
      <ExtractImagesTool />
    </ToolPageShell>
  );
}
