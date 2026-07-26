import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { QrToPdfTool } from '@/components/tools/QrToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'QR Code to PDF Generator Free Online (Instant & Printable A4) | iCreatePDF',
  description: 'Convert & generate QR code to PDF free online. Create custom vector QR codes from any URL or text into a print-ready A4 PDF. 100% private client-side processing.',
  keywords: 'qr code to pdf, qr code to pdf generator, qr code to pdf converter, how to convert qr code to pdf, convert qr code to pdf, qr code to pdf free, qr to pdf converter, generate qr code pdf, create pdf with qr code, qr code generator pdf, embed qr code pdf free',
  alternates: buildAlternates('/tools/qr-to-pdf'),
  openGraph: {
    title: 'QR Code to PDF Generator Free Online (Instant & Printable A4) | iCreatePDF',
    description: 'Convert & generate QR code to PDF free online. Create custom vector QR codes from any URL or text into a print-ready A4 PDF. 100% private client-side processing.',
    type: 'website',
  }
};

export default function QrToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'QR Code to PDF Generator',
          description: 'Convert & generate QR code to PDF document free online. Enter any URL or text, customize size and labels, and download as a clean A4 PDF instantly.',
          url: '/tools/qr-to-pdf',
        }),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I convert a URL or text into a QR code PDF?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Paste your URL or text into the input field. Customize the label or size, then click Generate PDF to download a vector-sharp A4 PDF document containing your QR code.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is this QR code to PDF tool free and private?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! The QR generator runs 100% locally in your browser memory. Your links and text payloads are never stored or sent to external servers.',
              },
            },
          ],
        },
      ]}
      badge="QR Generator"
      title="QR Code to PDF Generator"
      description="Generate a clean A4 PDF with your QR code for any URL, text, or contact info. Instant live preview."
      extraSections={<ToolSeoContent content={toolContent['qr-to-pdf']} />}
    >
      <QrToPdfTool />
    </ToolPageShell>
  );
}
