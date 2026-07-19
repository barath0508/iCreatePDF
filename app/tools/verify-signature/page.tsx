import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { VerifySignatureTool } from '@/components/tools/VerifySignatureTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Verify PDF Signature - Validate Certificates Online | iCreatePDF',
  description: 'Validate cryptographic signatures on PDF files locally. Inspect signer identity details and document byte-range integrity.',
  keywords: 'verify pdf signature, validate digital signature pdf, check pdf certificate, verify signed pdf online',
  alternates: buildAlternates('/tools/verify-signature'),
  openGraph: {
    title: 'Verify PDF Signature - Validate Certificates Online | iCreatePDF',
    description: 'Validate cryptographic signatures on PDF files locally. Inspect signer identity details and document byte-range integrity.',
    type: 'website',
  }
};

export default function VerifySignaturePage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Verify PDF Signatures',
        description: 'Validate cryptographic signatures on PDF files locally. Inspect signer identity details and document byte-range integrity.',
        url: '/tools/verify-signature',
      })}
      badge="Security Validator"
      title="Verify PDF Signatures"
      description="Extract cryptographic certificate metadata and check file integrity post-signature."
      extraSections={<ToolSeoContent content={toolContent['verify-signature']} />}
    >
      <VerifySignatureTool />
    </ToolPageShell>
  );
}
