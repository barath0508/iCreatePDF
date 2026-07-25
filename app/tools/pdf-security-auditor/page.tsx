import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfSecurityAuditorTool } from '@/components/tools/PdfSecurityAuditorTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Security Auditor � Free, Private, No Upload | iCreatePDF',
  description: 'Audit PDF encryption strength (AES-128/256) and user permission flags. 100% private � files process inside browser memory.',
  alternates: buildAlternates('/tools/pdf-security-auditor'),
  openGraph: {
    title: 'PDF Security Auditor � iCreatePDF',
    description: 'Audit PDF encryption strength (AES-128/256) and user permission flags.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Security Auditor � iCreatePDF' }],
  },
};

export default function PdfSecurityAuditorToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PDF Security Auditor',
        description: 'Audit PDF encryption strength (AES-128/256) and user permission flags.',
        url: '/tools/pdf-security-auditor',
      })}
      badge="Security & Audit"
      title="PDF Security Auditor"
      description="Audit PDF encryption strength (AES-128/256) and user permission flags."
      extraSections={<ToolSeoContent content={toolContent['pdf-security-auditor']} />}
    >
      <PdfSecurityAuditorTool />
    </ToolPageShell>
  );
}
