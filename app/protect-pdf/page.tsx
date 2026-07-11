import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ProtectTool } from '@/components/tools/ProtectTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Local PDF Password Encrypter - Protect PDF Securely | iCreatePDF',
  description: 'Encrypt and password protect your PDF files client-side. Set secure owner and user passwords locally in your browser memory space.',
  keywords: 'local pdf password encrypter, protect pdf client-side, encrypt pdf file private, secure pdf lock tool, password protect pdf offline, client-side document encryption, protect sensitive bank statements pdf, AES pdf encryption free',
  alternates: buildAlternates('/protect-pdf'),
  openGraph: {
    title: 'Local PDF Password Encrypter - Protect PDF Securely | iCreatePDF',
    description: 'Encrypt and password protect your PDF files client-side. Set secure owner and user passwords locally in your browser memory space.',
    type: 'website',
  }
};

export default function ProtectPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Protect PDF Files',
        description: 'Encrypt and password protect your PDF files client-side. Set secure owner and user passwords locally in your browser memory space.',
        url: '/protect-pdf',
      })}
      badge="PDF Shield"
      title="Protect PDF Files"
      description="Encrypt your PDF files with secure passwords locally in browser memory."
      extraSections={<ToolSeoContent content={toolContent['protect-pdf']} />}
    >
      <ProtectTool />
    </ToolPageShell>
  );
}
