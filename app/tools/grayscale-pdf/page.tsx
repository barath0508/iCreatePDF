import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { GrayscaleTool } from '@/components/tools/GrayscaleTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Grayscale PDF — Convert PDF to Black & White (Save Ink) | iCreatePDF',
  description: 'Convert color PDF documents to black and white (grayscale) online free. Save printer ink and optimize contrast 100% privately in browser memory.',
  keywords: 'grayscale pdf online, grayscale pdf, convert pdf to black and white, ink saving pdf converter, black and white pdf online free, local pdf grayscale converter, color to black and white pdf, reduce printer ink pdf, monochrome pdf creator, convert color document to b&w pdf, change pdf from color to monochrome',
  alternates: buildAlternates('/tools/grayscale-pdf'),
  openGraph: {
    title: 'Grayscale PDF — Convert PDF to Black & White (Save Ink) | iCreatePDF',
    description: 'Convert color PDF documents to black and white (grayscale) online free. Save printer ink and optimize contrast 100% privately in browser memory.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Grayscale PDF: Convert to Black & White — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grayscale PDF — Convert PDF to Black & White (Save Ink) | iCreatePDF',
    description: 'Convert color PDF documents to black and white (grayscale) online free. Save printer ink and optimize contrast 100% privately in browser memory.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function GrayscalePdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('grayscale-pdf')}
      badge="Print Optimizer"
      title="Grayscale PDF Converter"
      description="Convert color document pages, figures, and charts to ink-saving black and white."
      extraSections={<ToolSeoContent content={toolContent['grayscale-pdf']} />}
    >
      <GrayscaleTool />
    </ToolPageShell>
  );
}
