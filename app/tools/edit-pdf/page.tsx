import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EditPdfTool } from '@/components/tools/EditPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Edit PDF Free Online — Add Text, Annotations & Shapes | iCreatePDF',
  description: 'Edit PDF documents online free. Add text overlays, comments, highlights, drawings, and shapes locally in browser memory. 100% secure, zero uploads.',
  keywords: 'edit pdf, annotate pdf, add text to pdf, overlay text on pdf, edit pdf free online, write on pdf online, private pdf editor, pdf markup tool online, insert text into pdf document, free browser pdf editor, highlight and draw on pdf, edit pdf without adobe acrobat, add comments to pdf online, client side pdf editor',
  alternates: buildAlternates('/tools/edit-pdf'),
  openGraph: {
    title: 'Edit PDF Free Online — Add Text, Annotations & Shapes | iCreatePDF',
    description: 'Edit PDF documents online free. Add text overlays, comments, highlights, drawings, and shapes locally in browser memory. 100% secure, zero uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Edit PDF & Add Annotations — iCreatePDF' }],
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
