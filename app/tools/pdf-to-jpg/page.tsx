import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToJpgTool } from '@/components/tools/PdfToJpgTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter Free Online (Convert PDF to Images) | iCreatePDF',
  description: 'Convert PDF pages into high-resolution JPG or PNG images online for free. Download individual pages or a batch ZIP archive 100% privately.',
  keywords: 'pdf to jpg, convert pdf to image, pdf to png converter, extract images from pdf, pdf to jpg 300 dpi, turn pdf into photo, convert pdf pages to jpeg, high resolution pdf to jpg, batch pdf to jpg converter, pdf to image online free, save pdf pages as jpg files',
  alternates: buildAlternates('/tools/pdf-to-jpg'),
  openGraph: {
    title: 'PDF to JPG Converter Free Online (Convert PDF to Images) | iCreatePDF',
    description: 'Convert PDF pages into high-resolution JPG or PNG images online for free. Download individual pages or a batch ZIP archive 100% privately.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert PDF Pages to JPG Images — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to JPG Converter Free Online (Convert PDF to Images) | iCreatePDF',
    description: 'Convert PDF pages into high-resolution JPG or PNG images online for free. Download individual pages or a batch ZIP archive 100% privately.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfToJpgPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('pdf-to-jpg')}
      badge="PDF Extractor"
      title="Convert PDF to JPG"
      description="Extract each page of your PDF file as a high-quality JPEG image. All processes run locally and package downloads into a ZIP."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-jpg']} />}
    >
      <PdfToJpgTool />
    </ToolPageShell>
  );
}
