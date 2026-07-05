import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RedactTool } from '@/components/tools/RedactTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Private PDF Text Redaction Tool - Black Out PDF Free | iCreatePDF',
  description: 'Redact and black out sensitive text or images in your PDF files securely. All redactions are burned into the document locally inside your browser.',
  keywords: 'private pdf text redaction, secure pdf redact tool, black out pdf text locally, redact document browser sandbox, remove personal info pdf, burn redactions pdf free, local document censorship, redact social security number pdf',
  alternates: buildAlternates('/redact-pdf'),
  openGraph: {
    title: 'Private PDF Text Redaction Tool - Black Out PDF Free | iCreatePDF',
    description: 'Redact and black out sensitive text or images in your PDF files securely. All redactions are burned into the document locally inside your browser.',
    type: 'website',
  }
};

export default function RedactPdfPage() {
  return (
    <ToolPageShell badge="Privacy Shield" title="Redact PDF" description="Draw black boxes over sensitive data. Redactions are burned permanently — no hidden layer remains.">
      <RedactTool />
    </ToolPageShell>
  );
}
