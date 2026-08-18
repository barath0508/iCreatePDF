import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { AutoRedactTool } from '@/components/tools/AutoRedactTool';

export const metadata: Metadata = {
  title: 'Auto-Redact PDF Online — Sanitize PII & Confidential Data | iCreatePDF',
  description: 'Automatically scan and black out sensitive data (Emails, SSNs, Credit Cards, Phones) from PDFs. 100% private browser redaction with zero server uploads.',
  keywords: 'auto redact pdf, automatic pdf redaction, sanitize sensitive pdf data, redact ssn from pdf, email redactor pdf, free client-side pdf redactor, auto blackout text in pdf, redact pii from pdf online, hide confidential information pdf, automated pdf text redactor, mask credit card numbers pdf, remove personal data from pdf, secure pdf sanitization, redact pdf without upload, anonymize pdf document',
  alternates: buildAlternates('/tools/auto-redact-pdf'),
  openGraph: {
    title: 'Auto-Redact PDF Online — Sanitize PII & Confidential Data | iCreatePDF',
    description: 'Automatically scan and black out sensitive data (Emails, SSNs, Credit Cards, Phones) from PDFs. 100% private browser redaction with zero server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Auto-Redact PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto-Redact PDF Online — Sanitize PII & Confidential Data | iCreatePDF',
    description: 'Automatically scan and black out sensitive data (Emails, SSNs, Credit Cards, Phones) from PDFs. 100% private browser redaction with zero server uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function AutoRedactPdfPage() {
  return (
    <ToolPageShell
      title="Smart Auto-Redact PDF"
      description="Automatically scan and burn blackout redactions over Emails, SSNs, Credit Cards, Phone Numbers, and custom sensitive terms 100% locally."
      badge="AUTOMATED PRIVACY ENGINE"
      canonicalPath="/auto-redact-pdf"
      jsonLd={getToolFullJsonLd('auto-redact-pdf')}
      extraSections={<ToolSeoContent content={toolContent['auto-redact-pdf']} />}
    >
      <AutoRedactTool />
    </ToolPageShell>
  );
}
