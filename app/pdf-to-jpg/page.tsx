import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToJpgTool } from '@/components/tools/PdfToJpgTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PDF to JPG Online - Free & Private | iCreatePDF',
  description: 'Convert PDF pages to JPG images in seconds. 100% client-side, drag & drop files, and download image ZIP instantly.',
  keywords: 'convert pdf to jpg, pdf to jpg, pdf to image, extract pdf pages to jpg, private pdf to jpg',
  alternates: buildAlternates('/pdf-to-jpg'),
  openGraph: {
    title: 'Convert PDF to JPG Online - Free & Private | iCreatePDF',
    description: 'Convert PDF pages to JPG images in seconds. 100% client-side, drag & drop files, and download image ZIP instantly.',
    type: 'website',
  }
};

export default function PdfToJpgPage() {
  return (
    <ToolPageShell badge="PDF Extractor" title="Convert PDF to JPG" description="Extract each page of your PDF file as a high-quality JPEG image. All processes run locally and package downloads into a ZIP.">
      <PdfToJpgTool />
    </ToolPageShell>
  );
}
