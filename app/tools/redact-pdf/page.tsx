import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RedactTool } from '@/components/tools/RedactTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Redact PDF Online Free — Black Out & Sanitize Confidential Text | iCreatePDF',
  description: 'Permanently black out sensitive text and images from PDF files. Irreversible client-side redaction ensures data privacy with zero uploads.',
  keywords: 'redact pdf, blackout text in pdf, permanently remove sensitive data pdf, redact pdf free online, censor pdf text, whiteout pdf online, black box on pdf text, remove confidential info pdf, sanitize pdf document',
  alternates: buildAlternates('/tools/redact-pdf'),
  openGraph: {
    title: 'Redact PDF Online: Auto-Detect PII & Permanent Blackout...',
    description: 'Redact sensitive text in your PDF automatically — detects emails, phone numbers, SSNs, IBANs, and card numbers, or draw manual boxes. Redactions are burned in locally, never uploaded.',
    type: 'website',
  }
};

export default function RedactPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Redact PDF & Black Out Text',
          description: 'Permanently black out sensitive text and images from PDF files. Irreversible client-side redaction ensures data privacy with zero uploads.',
          url: '/tools/redact-pdf',
        }),
        faqSchema(toolContent['redact-pdf'].faqs),
        howToSchema({
          name: 'Redact PDF & Black Out Text',
          description: toolContent['redact-pdf'].overview,
          url: '/tools/redact-pdf',
          steps: toolContent['redact-pdf'].steps,
        }),
      ]}badge="Privacy Shield"
      title="Redact PDF"
      description="Auto-detect emails, phone numbers, SSNs, and card numbers, or draw manual boxes. Redactions are burned permanently — no hidden layer remains."
      extraSections={<ToolSeoContent content={toolContent['redact-pdf']} />}
    >
      <RedactTool />
    </ToolPageShell>
  );
}
