import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SvgToPdfTool } from '@/components/tools/SvgToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'SVG to PDF Converter Free Online — Scalable Vector to PDF | iCreatePDF',
  description: 'Convert SVG vector graphics and illustrations into high-resolution, vector-accurate PDF files online free. 100% private client-side converter.',
  keywords: 'svg to pdf, convert svg to pdf, vector graphic to pdf converter, scalable vector graphics to pdf, high resolution svg to pdf, export svg as printable pdf, convert vector artwork to pdf document, preserve vector sharpness svg to pdf, convert svg vector to pdf free, vector svg to pdf converter, preserve vector quality svg to pdf, export svg graphic as pdf, batch svg to pdf converter, turn svg logo into pdf',
  alternates: buildAlternates('/tools/svg-to-pdf'),
  openGraph: {
    title: 'SVG to PDF Converter Free Online — Scalable Vector to PDF | iCreatePDF',
    description: 'Convert SVG vector graphics and illustrations into high-resolution, vector-accurate PDF files online free. 100% private client-side converter.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert SVG to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVG to PDF Converter Free Online — Scalable Vector to PDF | iCreatePDF',
    description: 'Convert SVG vector graphics and illustrations into high-resolution, vector-accurate PDF files online free. 100% private client-side converter.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function SvgToPdfToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('svg-to-pdf')}
      badge="Vector Graphics"
      title="SVG to PDF Converter"
      description="Convert Scalable Vector Graphics (.svg) into crisp vector PDF documents."
      extraSections={<ToolSeoContent content={toolContent['svg-to-pdf']} />}
    >
      <SvgToPdfTool />
    </ToolPageShell>
  );
}
