import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { VerifySignatureTool } from '@/components/tools/VerifySignatureTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Verify PDF Signature Online — Check Digital Certificate Authenticity | iCreatePDF',
  description: 'Verify digital signatures and cryptographic certificates in signed PDF documents. Inspect signer identity and document integrity 100% privately.',
  keywords: 'verify signature pdf, check digital signature pdf, pdf signature validator, verify cryptographic signature pdf, validate certificate in pdf, inspect digital sign in pdf, check if pdf is signed',
  alternates: buildAlternates('/tools/verify-signature'),
  openGraph: {
    title: 'Verify PDF Signature - Validate Certificates Online | i...',
    description: 'Validate cryptographic signatures on PDF files locally. Inspect signer identity details and document byte-range integrity.',
    type: 'website',
  }
};

export default function VerifySignaturePage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Verify PDF Digital Signatures',
          description: 'Verify digital signatures and cryptographic certificates in signed PDF documents. Inspect signer identity and document integrity 100% privately.',
          url: '/tools/verify-signature',
        }),
        faqSchema(toolContent['verify-signature'].faqs),
        howToSchema({
          name: 'Verify PDF Digital Signatures',
          description: toolContent['verify-signature'].overview,
          url: '/tools/verify-signature',
          steps: toolContent['verify-signature'].steps,
        }),
      ]}badge="Security Validator"
      title="Verify PDF Signatures"
      description="Extract cryptographic certificate metadata and check file integrity post-signature."
      extraSections={<ToolSeoContent content={toolContent['verify-signature']} />}
    >
      <VerifySignatureTool />
    </ToolPageShell>
  );
}
