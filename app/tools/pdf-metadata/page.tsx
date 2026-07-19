import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MetadataTool } from '@/components/tools/MetadataTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Edit PDF Metadata Online Free | iCreatePDF',
  description: 'View and edit PDF metadata fields: title, author, subject, keywords, and creator. Update document properties without uploading files.',
  keywords: 'edit pdf metadata, pdf properties editor, change pdf author, pdf title editor online, pdf document properties',
  alternates: buildAlternates('/tools/pdf-metadata'),
  openGraph: {
    title: 'Edit PDF Metadata Online Free | iCreatePDF',
    description: 'View and edit PDF metadata fields: title, author, subject, keywords, and creator. Update document properties without uploading files.',
    type: 'website',
  }
};

export default function PdfMetadataPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PDF Metadata Editor',
        description: 'View and edit PDF metadata fields: title, author, subject, keywords, and creator. Update document properties without uploading files.',
        url: '/tools/pdf-metadata',
      })}
      badge="Document Properties"
      title="PDF Metadata Editor"
      description="Read and update the hidden title, author, subject, and keyword fields embedded in any PDF."
      extraSections={<ToolSeoContent content={toolContent['pdf-metadata']} />}
    >
      <MetadataTool />
    </ToolPageShell>
  );
}
