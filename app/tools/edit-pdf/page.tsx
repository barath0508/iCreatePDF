import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EditPdfTool } from '@/components/tools/EditPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Edit PDF Free Online — Add Text & Annotate | iCreatePDF',
  description: 'Edit PDF documents free online. Add text overlays, drawings, shapes, and annotations locally in browser memory. 100% secure, no uploads.',
  keywords: 'edit pdf, annotate pdf, add text to pdf, overlay text on pdf, edit pdf free online, write on pdf online, private pdf editor',
  alternates: buildAlternates('/tools/edit-pdf'),
  openGraph: {
    title: 'Edit PDF Online — Add Text, Annotate & Draw | iCreatePDF',
    description: 'Edit PDF documents free online. Add text overlays, drawings, and annotations locally in browser memory. 100% private.',
    type: 'website',
  }
};

export default function EditPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Edit PDF Annotations',
          description: 'Edit PDF files directly in your web browser. Place text overlay annotations, customize colors, and write them back into the PDF.',
          url: '/tools/edit-pdf',
        }),
        faqSchema([
          {
            question: 'How do I edit a PDF file for free online?',
            answer: 'Upload your PDF document, select the text tool or drawing options, place overlay elements directly on the document pages, and click Save PDF to download.',
          },
          {
            question: 'Does this editor upload my document to any servers?',
            answer: 'No. iCreatePDF is a local utility. All editing, rendering, and rendering modifications are performed client-side using JavaScript and WebAssembly.',
          },
          {
            question: 'Can I change existing text in a PDF?',
            answer: 'This tool functions as an annotator, allowing you to add new text blocks, shapes, drawings, and whiteouts over existing content rather than directly editing the underlying PDF text blocks.',
          },
        ]),
        howToSchema({
          name: 'Edit PDF Annotations',
          description: 'Add text overlays, whiteouts, and draw on your PDF documents locally.',
          url: '/tools/edit-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Select or drag your PDF document into the editor.' },
            { title: 'Add Annotations', description: 'Insert text fields, whiteout boxes, drawings, or lines onto any page.' },
            { title: 'Save & Download', description: 'Click Save PDF to write annotations and download the updated document.' },
          ],
        }),
      ]}
      badge="PDF Annotations"
      title="Edit PDF Annotations"
      description="Insert custom text overlay boxes and position them on PDF layouts client-side."
      extraSections={<ToolSeoContent content={toolContent['edit-pdf']} />}
    >
      <EditPdfTool />
    </ToolPageShell>
  );
}
