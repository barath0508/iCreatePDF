import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CropTool } from '@/components/tools/CropTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Crop PDF Pages Free Online — Trim PDF Margins (No Upload) | iCreatePDF',
  description: 'Crop PDF pages free online by trimming margins. Remove scan borders, whitespace, and adjust canvas sizes locally in browser memory. 100% private.',
  keywords: 'i2pdf crop, pdf cut pages, crop pdf, trim pdf margins, remove pdf borders, crop pdf pages online free, pdf margin trimmer, cut pages in pdf, crop pdf online i2pdf',
  alternates: buildAlternates('/tools/crop-pdf'),
  openGraph: {
    title: 'Crop PDF Pages Free Online — Trim PDF Margins | iCreatePDF',
    description: 'Crop PDF pages by trimming margins from any side. Remove scanner borders, white space, and unwanted margins from all pages locally.',
    type: 'website',
  }
};

export default function CropPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Crop PDF Pages',
          description: 'Crop PDF pages by trimming margins from any side. Remove scanner borders, white space, and unwanted margins from all pages locally.',
          url: '/tools/crop-pdf',
        }),
        faqSchema([
          {
            question: 'How do I crop PDF pages online for free?',
            answer: 'Upload your PDF file. Adjust the crop margins visually on the page preview canvas, apply changes to individual pages or all pages, and download the cropped PDF document.',
          },
          {
            question: 'Will cropping my PDF upload my document to any servers?',
            answer: 'No. iCreatePDF executes the page box translations locally in your browser sandbox using Javascript. Your confidential documents are 100% secure.',
          },
          {
            question: 'Can I crop specific pages differently?',
            answer: 'Yes, you can configure unique crop dimension boxes on a page-by-page basis, or apply a uniform crop margin configuration across all document pages.',
          },
        ]),
        howToSchema({
          name: 'Crop PDF Pages',
          description: 'Crop and trim PDF pages online to remove scanner borders or white space.',
          url: '/tools/crop-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Drag and drop your PDF document into the page cropper.' },
            { title: 'Set Crop Margins', description: 'Adjust the visual crop box boundaries on the page template preview.' },
            { title: 'Crop & Save', description: 'Click Crop PDF to execute page box translations and save your cropped file.' },
          ],
        }),
      ]}
      badge="Page Editor"
      title="Crop PDF Pages"
      description="Remove scanner borders and excess whitespace by trimming page margins."
      extraSections={<ToolSeoContent content={toolContent['crop-pdf']} />}
    >
      <CropTool />
    </ToolPageShell>
  );
}
