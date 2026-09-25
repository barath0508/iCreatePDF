import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EditPdfTool } from '@/components/tools/EditPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Client-Side PDF Editor (No Upload) — Edit Sensitive PDFs Privately | iCreatePDF',
  description: 'Edit and annotate PDF documents locally in your browser memory. Add text, highlights, drawings, and signatures with zero server uploads and 100% privacy.',
  keywords: 'client side pdf editor, edit pdf no upload, edit confidential pdf online, private browser pdf editor, annotate pdf locally, secure pdf editor free, offline pdf markup, edit pdf without uploading, edit pdf, edit pdf free online, add text to pdf',
  alternates: buildAlternates('/tools/edit-pdf'),
  openGraph: {
    title: 'Client-Side PDF Editor (No Upload) — Edit Sensitive PDFs Privately | iCreatePDF',
    description: 'Edit and annotate PDF documents locally in your browser memory. Add text, highlights, drawings, and signatures with zero server uploads and 100% privacy.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Private Client-Side PDF Editor — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client-Side PDF Editor (No Upload) — Edit Sensitive PDFs Privately | iCreatePDF',
    description: 'Edit and annotate PDF documents locally in your browser memory. Add text, highlights, drawings, and signatures with zero server uploads and 100% privacy.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function EditPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('edit-pdf')}
      badge="PDF Annotations"
      title="Edit PDF Annotations"
      description="Insert custom text overlay boxes and position them on PDF layouts client-side."
      extraSections={<ToolSeoContent content={toolContent['edit-pdf']} />}
    >
      <EditPdfTool />
    </ToolPageShell>
  );
}
