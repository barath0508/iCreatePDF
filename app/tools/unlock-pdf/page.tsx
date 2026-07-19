import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { UnlockTool } from '@/components/tools/UnlockTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Local PDF Password Remover - Decrypt PDF Securely | iCreatePDF',
  description: 'Strip password encryption locks from PDF files online for free. Processed 100% locally inside your browser sandbox with zero uploads for absolute privacy.',
  keywords: 'local pdf password remover, decrypt pdf client-side, remove pdf security password private, offline pdf unlocker, strip pdf permissions local, unlock pdf owner password, bypass pdf print restriction, remove copy restriction pdf',
  alternates: buildAlternates('/tools/unlock-pdf'),
  openGraph: {
    title: 'Local PDF Password Remover - Decrypt PDF Securely | iCreatePDF',
    description: 'Strip password encryption locks from PDF files online for free. Processed 100% locally inside your browser sandbox with zero uploads for absolute privacy.',
    type: 'website',
  }
};

export default function UnlockPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Unlock Protected PDF',
        description: 'Remove passwords and decryption locks from PDF files client-side. Your files and passwords are never uploaded to any remote server.',
        url: '/tools/unlock-pdf',
      })}
      badge="PDF Decrypter"
      title="Unlock Protected PDF"
      description="Strips password security locks from document files. Decryption occurs completely local inside browser memory."
      extraSections={<ToolSeoContent content={toolContent['unlock-pdf']} />}
    >
      <UnlockTool />
    </ToolPageShell>
  );
}
