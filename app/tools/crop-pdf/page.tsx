import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CropTool } from '@/components/tools/CropTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Crop PDF Pages Free Online — Trim Margins & Borders | iCreatePDF',
  description: 'Crop PDF pages online free. Trim whitespace margins, scanner borders, and resize page areas 100% locally in browser memory. No watermark.',
  keywords: 'crop pdf, trim pdf margins, remove pdf borders, crop pdf pages online free, pdf margin trimmer, cut pages in pdf, crop pdf online, resize pdf canvas, crop white space from pdf, crop pdf page area, trim pdf for mobile reading, i2pdf crop, crop pdf without acrobat, free online pdf page trimmer',
  alternates: buildAlternates('/tools/crop-pdf'),
  openGraph: {
    title: 'Crop PDF Pages Free Online — Trim Margins & Borders | iCreatePDF',
    description: 'Crop PDF pages online free. Trim whitespace margins, scanner borders, and resize page areas 100% locally in browser memory. No watermark.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Crop PDF Pages — iCreatePDF' }],
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
