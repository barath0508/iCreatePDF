import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RedactTool } from '@/components/tools/RedactTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Redact PDF Online Free: Permanent Document Blackout | iCreatePDF',
  description: 'Redact and black out sensitive text or images in your PDF files securely. All redactions are burned into the document locally inside your browser.',
  keywords: 'redact pdf online free, redact pdf, black out text in pdf, secure pdf redaction, how to black out text in pdf permanently, private pdf text redaction, secure pdf redact tool, black out pdf text locally, redact document browser sandbox, remove personal info pdf, burn redactions pdf free, local document censorship, redact social security number pdf',
  alternates: buildAlternates('/redact-pdf'),
  openGraph: {
    title: 'Redact PDF Online Free: Permanent Document Blackout | iCreatePDF',
    description: 'Redact and black out sensitive text or images in your PDF files securely. All redactions are burned into the document locally inside your browser.',
    type: 'website',
  }
};

export default function RedactPdfPage() {
  return (
    <ToolPageShell
      badge="Privacy Shield"
      title="Redact PDF"
      description="Draw black boxes over sensitive data. Redactions are burned permanently — no hidden layer remains."
      extraSections={<ToolSeoContent content={toolContent['redact-pdf']} />}
    >
      <RedactTool />
    </ToolPageShell>
  );
}
