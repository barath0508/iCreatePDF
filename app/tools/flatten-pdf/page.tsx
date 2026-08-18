import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { FlattenTool } from '@/components/tools/FlattenTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Flatten PDF Forms & Annotations — Make PDF Read-Only | iCreatePDF',
  description: 'Flatten interactive form fields, signatures, and annotation layers into fixed graphics. Prevent further editing and lock PDF content 100% privately.',
  keywords: 'flatten pdf form, flatten pdf, flat pdf, flatten form fields, make pdf non editable, secure pdf forms online, convert fillable pdf to read only, flatten annotations on pdf, lock pdf form inputs, flatten layers in pdf, make pdf unfillable, permanent pdf stamping',
  alternates: buildAlternates('/tools/flatten-pdf'),
  openGraph: {
    title: 'Flatten PDF Form: Merge Form Fields & Annotations | iCr...',
    description: 'Flatten interactive form fields and digital annotation layers into flat vector graphics locally inside browser memory. Secure PDF flattener.',
    type: 'website',
  }
};

export default function FlattenPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Flatten PDF Form Fields',
          description: 'Flatten interactive form fields, signatures, and annotation layers into fixed graphics. Prevent further editing and lock PDF content 100% privately.',
          url: '/tools/flatten-pdf',
        }),
        faqSchema(toolContent['flatten-pdf'].faqs),
        howToSchema({
          name: 'Flatten PDF Form Fields',
          description: toolContent['flatten-pdf'].overview,
          url: '/tools/flatten-pdf',
          steps: toolContent['flatten-pdf'].steps,
        }),
      ]}badge="Layer Flatener"
      title="Flatten PDF Documents"
      description="Merge interactive drop-downs, signatures, and form fields into read-only static layers."
      extraSections={<ToolSeoContent content={toolContent['flatten-pdf']} />}
    >
      <FlattenTool />
    </ToolPageShell>
  );
}
