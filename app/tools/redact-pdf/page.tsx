import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RedactTool } from '@/components/tools/RedactTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Redact PDF Online Free: Auto-Detect PII & Permanent Blackout | iCreatePDF',
  description: 'Redact sensitive text in your PDF automatically — detects emails, phone numbers, SSNs, IBANs, and card numbers, or draw manual boxes. Redactions are burned in locally, never uploaded.',
  keywords: 'redact pdf online free, automatic pdf redaction, pii scanner pdf, redact social security number pdf, redact pdf, black out text in pdf, secure pdf redaction, how to black out text in pdf permanently, private pdf text redaction, secure pdf redact tool, black out pdf text locally, redact document browser sandbox, remove personal info pdf, burn redactions pdf free, local document censorship',
  alternates: buildAlternates('/tools/redact-pdf'),
  openGraph: {
    title: 'Redact PDF Online Free: Auto-Detect PII & Permanent Blackout | iCreatePDF',
    description: 'Redact sensitive text in your PDF automatically — detects emails, phone numbers, SSNs, IBANs, and card numbers, or draw manual boxes. Redactions are burned in locally, never uploaded.',
    type: 'website',
  }
};

export default function RedactPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Redact PDF',
        description: 'Automatically detect and redact emails, phone numbers, SSNs, IBANs, and card numbers in a PDF, or draw manual boxes. Redactions are burned into the document locally inside your browser.',
        url: '/tools/redact-pdf',
      })}
      badge="Privacy Shield"
      title="Redact PDF"
      description="Auto-detect emails, phone numbers, SSNs, and card numbers, or draw manual boxes. Redactions are burned permanently — no hidden layer remains."
      extraSections={<ToolSeoContent content={toolContent['redact-pdf']} />}
    >
      <RedactTool />
    </ToolPageShell>
  );
}
