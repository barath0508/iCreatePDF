import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { AutoRedactTool } from '@/components/tools/AutoRedactTool';

export const metadata: Metadata = {
  title: 'Auto-Redact PDF Online — Hide PII & Data | iCreatePDF',
  description: 'Automatically scan and redact sensitive information from PDF files locally in your browser. Sanitize Emails, Phone Numbers, SSNs, Credit Cards, and custom keywords 100% offline.',
  keywords: 'auto redact pdf, automatic pdf redaction, sanitize sensitive pdf data, redact ssn from pdf, email redactor pdf, free client-side pdf redactor',
  alternates: buildAlternates('/tools/auto-redact-pdf'),
  openGraph: {
    title: 'Smart Auto-Redact PDF Online — Free PII Masking',
    description: 'Automatically scan and redact sensitive information from PDF files locally in your browser.',
  },
};

const faqs = [
  {
    question: 'How does automatic PDF redaction work?',
    answer: 'Our tool scans the PDF text stream directly inside your browser for PII patterns like Emails, SSNs, and Credit Cards, allowing you to burn opaque black boxes over sensitive items with 1 click.',
  },
  {
    question: 'Are my confidential documents uploaded to any server?',
    answer: 'No! All scanning, text matching, and blackout box rendering happens 100% client-side in your local browser memory.',
  },
  {
    question: 'Can redacted text be unmasked or selected?',
    answer: 'No. The underlying text content stream is permanently stripped and covered with solid vector black rectangles upon export.',
  },
];

export default function AutoRedactPdfPage() {
  return (
    <ToolPageShell
      title="Smart Auto-Redact PDF"
      description="Automatically scan and burn blackout redactions over Emails, SSNs, Credit Cards, Phone Numbers, and custom sensitive terms 100% locally."
      badge="AUTOMATED PRIVACY ENGINE"
      canonicalPath="/auto-redact-pdf"
      jsonLd={[
        ...toolSchema({
          name: 'Smart Auto-Redact PDF',
          description: 'Automatically scan and redact sensitive PII data from PDF files locally in your browser.',
          url: '/auto-redact-pdf',
        }),
        faqSchema(faqs),
      ]}
    >
      <AutoRedactTool />
    </ToolPageShell>
  );
}
