import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RotateTool } from '@/components/tools/RotateTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Rotate PDF Free Online — Rotate PDF Pages and Save Permanently | iCreatePDF',
  description: 'Rotate PDF pages 90, 180, or 270 degrees and save permanently. Fix sideways or upside-down scans 100% locally in browser memory.',
  keywords: 'rotate pdf, rotate pdf pages, turn pdf upside down fix, rotate and save pdf, pdf orientation changer, how to rotate one page in pdf, rotate landscape to portrait pdf, flip pdf pages, rotate all pages in pdf free',
  alternates: buildAlternates('/tools/rotate-pdf'),
  openGraph: {
    title: 'Rotate PDF Free Online — Rotate PDF Pages and Save Permanently | iCreatePDF',
    description: 'Rotate PDF pages 90, 180, or 270 degrees and save permanently. Fix sideways or upside-down scans 100% locally in browser memory.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Rotate PDF Pages & Save — iCreatePDF' }],
  },
          {
            question: 'Will rotating my PDF make it permanently rotated?',
            answer: 'Yes. When you download the rotated PDF, the new rotation angles are compiled directly into the PDF page dictionary structures so they will render rotated in all PDF readers.',
          },
          {
            question: 'Is it safe to rotate confidential documents here?',
            answer: 'Yes. iCreatePDF processes document page matrices locally on your device. Your file content never leaves your browser.',
          },
        ]),
        howToSchema({
          name: 'Rotate PDF Pages',
          description: 'Rotate individual pages or entire PDF files online free.',
          url: '/tools/rotate-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Drag and drop your PDF document into the page rotator.' },
            { title: 'Rotate Pages', description: 'Click the rotate buttons on individual page previews to spin them.' },
            { title: 'Save & Download', description: 'Click Rotate PDF to finalize and download your permanently rotated document.' },
          ],
        }),
      ]}
      badge="PDF Page Rotator"
      title="Rotate PDF Pages"
      description="Rotate specific pages of your PDF document or apply a bulk clockwise rotation to all pages locally."
      extraSections={<ToolSeoContent content={toolContent['rotate-pdf']} />}
    >
      <RotateTool />
    </ToolPageShell>
  );
}
