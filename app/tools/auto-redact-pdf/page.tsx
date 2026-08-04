import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
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

export default function AutoRedactPdfPage() {
  return (
    <ToolPageShell
      title="Smart Auto-Redact PDF"
      description="Automatically scan and burn blackout redactions over Emails, SSNs, Credit Cards, Phone Numbers, and custom sensitive terms 100% locally."
      badge="AUTOMATED PRIVACY ENGINE"
      canonicalPath="/auto-redact-pdf"
      jsonLd={toolSchema({
        name: 'Smart Auto-Redact PDF',
        description: 'Automatically scan and redact sensitive PII data from PDF files locally in your browser.',
        url: '/auto-redact-pdf',
      })}
      extraSections={<ToolSeoContent content={toolContent['auto-redact-pdf']} />}
    >
      <AutoRedactTool />
    </ToolPageShell>
  );
}
