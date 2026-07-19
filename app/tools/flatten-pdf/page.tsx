import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { FlattenTool } from '@/components/tools/FlattenTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Flatten PDF Form: Merge Form Fields & Annotations | iCreatePDF',
  description: 'Flatten interactive form fields and digital annotation layers into flat vector graphics locally inside browser memory. Secure PDF flattener.',
  keywords: 'flatten pdf form, flatten pdf, flat pdf, flatten form fields, make pdf non editable, secure pdf forms online',
  alternates: buildAlternates('/tools/flatten-pdf'),
  openGraph: {
    title: 'Flatten PDF Form: Merge Form Fields & Annotations | iCreatePDF',
    description: 'Flatten interactive form fields and digital annotation layers into flat vector graphics locally inside browser memory. Secure PDF flattener.',
    type: 'website',
  }
};

export default function FlattenPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Flatten PDF Documents',
        description: 'Flatten interactive form fields and digital annotation layers into flat vector graphics locally inside browser memory. Secure PDF flattener.',
        url: '/tools/flatten-pdf',
      })}
      badge="Layer Flatener"
      title="Flatten PDF Documents"
      description="Merge interactive drop-downs, signatures, and form fields into read-only static layers."
      extraSections={<ToolSeoContent content={toolContent['flatten-pdf']} />}
    >
      <FlattenTool />
    </ToolPageShell>
  );
}
