import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MetadataTool } from '@/components/tools/MetadataTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Metadata Editor — View, Edit & Remove Properties | iCreatePDF',
  description: 'View, edit, or wipe author, title, subject, keywords, and creation dates from PDF properties. 100% private client-side metadata editor.',
  keywords: 'pdf metadata editor, edit pdf metadata, view pdf properties, change pdf author title, remove pdf metadata, sanitize pdf properties, edit pdf creation date, inspect pdf metadata online, clean metadata from pdf, pdf exif viewer',
  alternates: buildAlternates('/tools/pdf-metadata'),
  openGraph: {
    title: 'Edit PDF Metadata Online Free | iCreatePDF',
    description: 'View, edit, and strip PDF metadata including author, title, and creator. Processed 100% locally in your browser for absolute document privacy and security.',
    type: 'website',
  }
};

export default function PdfMetadataPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'PDF Metadata Editor & Sanitizer',
          description: 'View, edit, or wipe author, title, subject, keywords, and creation dates from PDF properties. 100% private client-side metadata editor.',
          url: '/tools/pdf-metadata',
        }),
        faqSchema(toolContent['pdf-metadata'].faqs),
        howToSchema({
          name: 'PDF Metadata Editor & Sanitizer',
          description: toolContent['pdf-metadata'].overview,
          url: '/tools/pdf-metadata',
          steps: toolContent['pdf-metadata'].steps,
        }),
      ]}badge="Document Properties"
      title="PDF Metadata Editor"
      description="Read and update the hidden title, author, subject, and keyword fields embedded in any PDF."
      extraSections={<ToolSeoContent content={toolContent['pdf-metadata']} />}
    >
      <MetadataTool />
    </ToolPageShell>
  );
}
