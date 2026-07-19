import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CertifyTool } from '@/components/tools/CertifyTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Certify PDF — SHA-256 Fingerprint & Tamper-Proof Stamp | iCreatePDF',
  description: 'Certify any PDF with a cryptographic SHA-256 fingerprint and a scannable QR code, then verify a file against its fingerprint later. 100% private, browser-based integrity checking.',
  keywords: 'certify pdf, pdf fingerprint, pdf hash checker, sha256 pdf, tamper proof pdf, verify pdf integrity, pdf notarize online',
  alternates: buildAlternates('/tools/certify-pdf'),
  openGraph: {
    title: 'Certify PDF — SHA-256 Fingerprint & Tamper-Proof Stamp | iCreatePDF',
    description: 'Certify any PDF with a cryptographic SHA-256 fingerprint and a scannable QR code, then verify a file against its fingerprint later.',
    type: 'website',
  }
};

export default function CertifyPdfPage() {
  return (
    <ToolPageShell
      badge="Integrity & Trust"
      title="Certify PDF"
      description="Stamp any PDF with a SHA-256 fingerprint and a scannable QR code — a tamper-evident certificate anyone can independently verify."
      jsonLd={toolSchema({
        name: 'Certify PDF',
        description: 'Certify any PDF with a cryptographic SHA-256 fingerprint and a scannable QR code, then verify a file against its fingerprint later.',
        url: '/tools/certify-pdf',
      })}
      extraSections={<ToolSeoContent content={toolContent['certify-pdf']} />}
    >
      <CertifyTool />
    </ToolPageShell>
  );
}
