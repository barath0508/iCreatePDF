import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExtractImagesTool } from '@/components/tools/ExtractImagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Extract Images from PDF Free Online | iCreatePDF',
  description: 'Extract embedded photos and raster graphics from a PDF into a downloadable ZIP. 100% private — files process inside browser memory.',
  keywords: 'extract images from pdf, save images from pdf, pdf to image extractor, extract all photos from pdf, pdf image downloader zip, get high res images from pdf free',
  alternates: buildAlternates('/tools/extract-pdf-images'),
  openGraph: {
    title: 'Extract Images from PDF — iCreatePDF',
    description: 'Extract embedded photos and raster graphics from a PDF into a downloadable ZIP.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Extract Images from PDF — iCreatePDF' }],
  },
};

export default function ExtractImagesToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Extract Images from PDF',
        description: 'Extract embedded photos and raster graphics from a PDF into a downloadable ZIP.',
        url: '/tools/extract-pdf-images',
      })}
      badge="Media Extractor"
      title="Extract Images from PDF"
      description="Extract embedded photos and raster graphics from a PDF into a downloadable ZIP."
      extraSections={<ToolSeoContent content={toolContent['extract-pdf-images']} />}
    >
      <ExtractImagesTool />
    </ToolPageShell>
  );
}
