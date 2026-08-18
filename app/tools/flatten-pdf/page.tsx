import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { FlattenTool } from '@/components/tools/FlattenTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Flatten PDF Forms & Annotations — Make PDF Read-Only | iCreatePDF',
  description: 'Flatten interactive form fields, signatures, and annotation layers into fixed graphics. Prevent further editing and lock PDF content 100% privately.',
  keywords: 'flatten pdf form, flatten pdf, flat pdf, flatten form fields, make pdf non editable, secure pdf forms online, convert fillable pdf to read only, flatten annotations on pdf, lock pdf form inputs, flatten layers in pdf, make pdf unfillable, permanent pdf stamping, lock signed pdf from editing',
  alternates: buildAlternates('/tools/flatten-pdf'),
  openGraph: {
    title: 'Flatten PDF Forms & Annotations — Make PDF Read-Only | iCreatePDF',
    description: 'Flatten interactive form fields, signatures, and annotation layers into fixed graphics. Prevent further editing and lock PDF content 100% privately.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Flatten PDF Form Fields — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flatten PDF Forms & Annotations — Make PDF Read-Only | iCreatePDF',
    description: 'Flatten interactive form fields, signatures, and annotation layers into fixed graphics. Prevent further editing and lock PDF content 100% privately.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function FlattenPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('flatten-pdf')}
      badge="Layer Flatener"
      title="Flatten PDF Documents"
      description="Merge interactive drop-downs, signatures, and form fields into read-only static layers."
      extraSections={<ToolSeoContent content={toolContent['flatten-pdf']} />}
    >
      <FlattenTool />
    </ToolPageShell>
  );
}
