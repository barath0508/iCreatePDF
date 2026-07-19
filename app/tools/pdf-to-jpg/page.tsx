import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToJpgTool } from '@/components/tools/PdfToJpgTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PDF to JPG Online - Free & Private | iCreatePDF',
  description: 'Convert PDF pages to JPG images in seconds. 100% client-side, drag & drop files, and download image ZIP instantly.',
  keywords: 'convert pdf to jpg, pdf to jpg, pdf to image, extract pdf pages to jpg, private pdf to jpg',
  alternates: buildAlternates('/tools/pdf-to-jpg'),
  openGraph: {
    title: 'Convert PDF to JPG Online - Free & Private | iCreatePDF',
    description: 'Convert PDF pages to JPG images in seconds. 100% client-side, drag & drop files, and download image ZIP instantly.',
    type: 'website',
  }
};

export default function PdfToJpgPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Convert PDF to JPG',
        description: 'Convert PDF pages to JPG images in seconds. 100% client-side, drag & drop files, and download image ZIP instantly.',
        url: '/tools/pdf-to-jpg',
      })}
      badge="PDF Extractor"
      title="Convert PDF to JPG"
      description="Extract each page of your PDF file as a high-quality JPEG image. All processes run locally and package downloads into a ZIP."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-jpg']} />}
    >
      <PdfToJpgTool />
    </ToolPageShell>
  );
}
