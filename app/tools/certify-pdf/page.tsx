import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CertifyTool } from '@/components/tools/CertifyTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Certify PDF — SHA-256 Digital Fingerprint & Integrity Check | iCreatePDF',
  description: 'Certify PDF files with a cryptographic SHA-256 fingerprint stamp and scannable verification QR code. 100% private browser-based document integrity audit.',
  keywords: 'certify pdf, pdf fingerprint, pdf hash checker, sha256 pdf, tamper proof pdf, verify pdf integrity, pdf notarize online, cryptographic pdf verification, document authenticity checker pdf, verify pdf hash online, sha256 checksum pdf, client side pdf certifier, timestamp pdf document, prove pdf integrity, immutable pdf seal',
  alternates: buildAlternates('/tools/certify-pdf'),
  openGraph: {
    title: 'Certify PDF — SHA-256 Digital Fingerprint & Integrity Check | iCreatePDF',
    description: 'Certify PDF files with a cryptographic SHA-256 fingerprint stamp and scannable verification QR code. 100% private browser-based document integrity audit.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Certify PDF with SHA-256 — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certify PDF — SHA-256 Digital Fingerprint & Integrity Check | iCreatePDF',
    description: 'Certify PDF files with a cryptographic SHA-256 fingerprint stamp and scannable verification QR code. 100% private browser-based document integrity audit.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function CertifyPdfPage() {
  return (
    <ToolPageShell
      badge="Integrity & Trust"
      title="Certify PDF"
      description="Stamp any PDF with a SHA-256 fingerprint and a scannable QR code — a tamper-evident certificate anyone can independently verify."
      jsonLd={getToolFullJsonLd('certify-pdf')}
      extraSections={<ToolSeoContent content={toolContent['certify-pdf']} />}
    >
      <CertifyTool />
    </ToolPageShell>
  );
}
