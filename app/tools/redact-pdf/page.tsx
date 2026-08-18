import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RedactTool } from '@/components/tools/RedactTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Redact PDF Online Free — Black Out & Sanitize Confidential Text | iCreatePDF',
  description: 'Permanently black out sensitive text and images from PDF files. Irreversible client-side redaction ensures data privacy with zero uploads.',
  keywords: 'redact pdf, blackout text in pdf, permanently remove sensitive data pdf, redact pdf free online, censor pdf text, whiteout pdf online, black box on pdf text, remove confidential info pdf, sanitize pdf document, how to blackout text on pdf free, permanent pdf redaction tool',
  alternates: buildAlternates('/tools/redact-pdf'),
  openGraph: {
    title: 'Redact PDF Online Free — Black Out & Sanitize Confidential Text | iCreatePDF',
    description: 'Permanently black out sensitive text and images from PDF files. Irreversible client-side redaction ensures data privacy with zero uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Redact PDF & Black Out Text — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redact PDF Online Free — Black Out & Sanitize Confidential Text | iCreatePDF',
    description: 'Permanently black out sensitive text and images from PDF files. Irreversible client-side redaction ensures data privacy with zero uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function RedactPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('redact-pdf')}
      badge="Privacy Shield"
      title="Redact PDF"
      description="Auto-detect emails, phone numbers, SSNs, and card numbers, or draw manual boxes. Redactions are burned permanently — no hidden layer remains."
      extraSections={<ToolSeoContent content={toolContent['redact-pdf']} />}
    >
      <RedactTool />
    </ToolPageShell>
  );
}
