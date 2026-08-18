import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { VerifySignatureTool } from '@/components/tools/VerifySignatureTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Verify PDF Signature Online — Check Digital Certificate Authenticity | iCreatePDF',
  description: 'Verify digital signatures and cryptographic certificates in signed PDF documents. Inspect signer identity and document integrity 100% privately.',
  keywords: 'verify signature pdf, check digital signature pdf, pdf signature validator, verify cryptographic signature pdf, validate certificate in pdf, inspect digital sign in pdf, check if pdf is signed, verify pdf signature authenticity online, verify pdf signature validity, check digital certificate in pdf, validate pdf e-signature online, check if pdf is digitally signed, verify signed contract pdf, authentic pdf signature checker',
  alternates: buildAlternates('/tools/verify-signature'),
  openGraph: {
    title: 'Verify PDF Signature Online — Check Digital Certificate Authenticity | iCreatePDF',
    description: 'Verify digital signatures and cryptographic certificates in signed PDF documents. Inspect signer identity and document integrity 100% privately.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Verify PDF Digital Signatures — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verify PDF Signature Online — Check Digital Certificate Authenticity | iCreatePDF',
    description: 'Verify digital signatures and cryptographic certificates in signed PDF documents. Inspect signer identity and document integrity 100% privately.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function VerifySignaturePage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('verify-signature')}
      badge="Security Validator"
      title="Verify PDF Signatures"
      description="Extract cryptographic certificate metadata and check file integrity post-signature."
      extraSections={<ToolSeoContent content={toolContent['verify-signature']} />}
    >
      <VerifySignatureTool />
    </ToolPageShell>
  );
}
