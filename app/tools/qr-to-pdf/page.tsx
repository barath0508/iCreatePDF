import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { QrToPdfTool } from '@/components/tools/QrToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'QR Code to PDF Converter: Generate QR Codes Free | iCreatePDF',
  description: 'Free online QR Code to PDF converter. Generate custom QR codes from any URL or text. Processed 100% locally in your browser sandbox for absolute privacy.',
  keywords: 'qr code to pdf, qr code to pdf converter, qr code to pdf generator, how to convert qr code to pdf, convert qr code to pdf, qr code to pdf free, qr to pdf converter, generate qr code pdf, create pdf with qr code, qr code generator pdf, embed qr code pdf free',
  alternates: buildAlternates('/tools/qr-to-pdf'),
  openGraph: {
    title: 'QR Code to PDF Converter: Generate QR Codes Free | iCreatePDF',
    description: 'Free online QR Code to PDF converter. Generate custom QR codes from any URL or text. Processed 100% locally in your browser sandbox for absolute privacy.',
    type: 'website',
  }
};

export default function QrToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'QR Code to PDF',
        description: 'Create a PDF document with an embedded QR code. Enter any URL or text, customize size and labels, and download as a clean A4 PDF instantly.',
        url: '/tools/qr-to-pdf',
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
