import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { Base64ToPdfTool } from '@/components/tools/Base64ToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Decode Base64 to PDF Online — Free & Private | iCreatePDF',
  description: 'Convert Base64 encoded strings back into readable PDF documents. Safe, fast, and purely client-side — your data never leaves your browser.',
  keywords: 'base64 to pdf, decode base64 to pdf, convert base64 string to pdf, base64 pdf decoder, base64 to pdf online, developer tools',
  alternates: buildAlternates('/tools/base64-to-pdf'),
  openGraph: {
    title: 'Decode Base64 to PDF Online — Free & Private | iCreatePDF',
    description: 'Convert Base64 encoded strings back into readable PDF documents. Safe, fast, and purely client-side — your data never leaves your browser.',
    type: 'website',
  }
};

export default function Base64ToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Decode Base64 to PDF',
        description: 'Convert Base64 encoded strings back into readable PDF documents. Safe, fast, and purely client-side — your data never leaves your browser.',
        url: '/tools/base64-to-pdf',
      })}
      badge="Developer Tool"
      title="Base64 to PDF Decoder"
      description="Instantly convert Base64 encoded strings back to a viewable and downloadable PDF. Your payload is processed locally in browser sandbox memory, keeping sensitive data 100% private."
      extraSections={<ToolSeoContent content={toolContent['base64-to-pdf']} />}
    >
      <Base64ToPdfTool />
    </ToolPageShell>
  );
}
