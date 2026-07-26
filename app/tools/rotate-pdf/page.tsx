import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RotateTool } from '@/components/tools/RotateTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Rotate PDF Pages Free Online — Permanently Spin PDF (No Upload) | iCreatePDF',
  description: 'Rotate individual PDF pages or the entire document online free. ⚡ Fast client-side page rotation, 100% secure and private in browser memory.',
  keywords: 'rotate pdf, rotate pdf pages, rotate pdf online, free rotate pdf, private pdf rotation, spin pdf online',
  alternates: buildAlternates('/tools/rotate-pdf'),
  openGraph: {
    title: 'Rotate PDF Pages Free Online — Permanently Spin PDF | iCreatePDF',
    description: 'Rotate individual PDF pages or the entire document online free. 100% private local browser processing.',
    type: 'website',
  }
};

export default function RotatePdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Rotate PDF Pages',
          description: 'Rotate PDF pages in seconds. 100% client-side, drag & drop files, select rotation angles visually, and download instantly.',
          url: '/tools/rotate-pdf',
        }),
        faqSchema([
          {
            question: 'How do I rotate PDF pages online for free?',
            answer: 'Upload your PDF, click the rotation buttons on individual page thumbnails to rotate them 90, 180, or 270 degrees, or click bulk rotation buttons to rotate all pages at once, then click Rotate PDF.',
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
