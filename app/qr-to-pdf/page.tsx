import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { QrToPdfTool } from '@/components/tools/QrToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Generate QR Code to PDF Online Free | iCreatePDF',
  description: 'Create a PDF document with an embedded QR code. Enter any URL or text, customize size and labels, and download as a clean A4 PDF instantly.',
  keywords: 'qr code to pdf, generate qr code pdf, create pdf with qr code, qr code generator pdf, embed qr code pdf free',
  alternates: buildAlternates('/qr-to-pdf'),
  openGraph: {
    title: 'Generate QR Code to PDF Online Free | iCreatePDF',
    description: 'Create a PDF document with an embedded QR code. Enter any URL or text, customize size and labels, and download as a clean A4 PDF instantly.',
    type: 'website',
  }
};

export default function QrToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'QR Code to PDF',
        description: 'Create a PDF document with an embedded QR code. Enter any URL or text, customize size and labels, and download as a clean A4 PDF instantly.',
        url: '/qr-to-pdf',
      })}
      badge="QR Generator"
      title="QR Code to PDF"
      description="Generate a clean A4 PDF with your QR code for any URL, text, or contact info. Instant live preview."
      extraSections={<ToolSeoContent content={toolContent['qr-to-pdf']} />}
    >
      <QrToPdfTool />
    </ToolPageShell>
  );
}
