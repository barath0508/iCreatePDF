import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CertifyTool } from '@/components/tools/CertifyTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Certify PDF — SHA-256 Digital Fingerprint & Integrity Check | iCreatePDF',
  description: 'Certify PDF files with a cryptographic SHA-256 fingerprint stamp and scannable verification QR code. 100% private browser-based document integrity audit.',
  keywords: 'certify pdf, pdf fingerprint, pdf hash checker, sha256 pdf, tamper proof pdf, verify pdf integrity, pdf notarize online, cryptographic pdf verification, document authenticity checker pdf, verify pdf hash online, sha256 checksum pdf, client side pdf certifier, timestamp pdf document, prove pdf integrity',
  alternates: buildAlternates('/tools/certify-pdf'),
  openGraph: {
    title: 'Certify PDF — SHA-256 Fingerprint & Tamper-Proof Stamp ...',
    description: 'Certify any PDF with a cryptographic SHA-256 fingerprint and a scannable QR code, then verify a file against its fingerprint later. 100% private, browser-based integrity checking.',
    type: 'website',
  }
};

export default function CertifyPdfPage() {
  return (
    <ToolPageShell
      badge="Integrity & Trust"
      title="Certify PDF"
      description="Stamp any PDF with a SHA-256 fingerprint and a scannable QR code — a tamper-evident certificate anyone can independently verify."
      jsonLd={[
        ...toolSchema({
          name: 'Certify PDF with SHA-256',
          description: 'Certify PDF files with a cryptographic SHA-256 fingerprint stamp and scannable verification QR code. 100% private browser-based document integrity audit.',
          url: '/tools/certify-pdf',
        }),
        faqSchema(toolContent['certify-pdf'].faqs),
        howToSchema({
          name: 'Certify PDF with SHA-256',
          description: toolContent['certify-pdf'].overview,
          url: '/tools/certify-pdf',
          steps: toolContent['certify-pdf'].steps,
        }),
      ]}extraSections={<ToolSeoContent content={toolContent['certify-pdf']} />}
    >
      <CertifyTool />
    </ToolPageShell>
  );
}
