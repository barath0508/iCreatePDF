import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { QrToPdfTool } from '@/components/tools/QrToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'QR Code to PDF Generator — Printable QR Code Sheets | iCreatePDF',
  description: 'Generate high-resolution QR codes and export printable A4/Letter PDF sheets for URLs, WiFi, contact cards, and text. 100% private.',
  keywords: 'qr to pdf, qr code generator pdf, create qr code sheet pdf, printable qr code pdf, batch qr code to pdf, generate qr codes on a4 pdf, custom url qr code pdf, vcard qr code generator pdf, high res qr code pdf, print qr codes on label sheet pdf, printable qr code stickers pdf',
  alternates: buildAlternates('/tools/qr-to-pdf'),
  openGraph: {
    title: 'QR Code to PDF Generator — Printable QR Code Sheets | iCreatePDF',
    description: 'Generate high-resolution QR codes and export printable A4/Letter PDF sheets for URLs, WiFi, contact cards, and text. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'QR Code to PDF Sheet Generator — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code to PDF Generator — Printable QR Code Sheets | iCreatePDF',
    description: 'Generate high-resolution QR codes and export printable A4/Letter PDF sheets for URLs, WiFi, contact cards, and text. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function QrToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('qr-to-pdf')}
      badge="QR Generator"
      title="QR Code to PDF Generator"
      description="Generate a clean A4 PDF with your QR code for any URL, text, or contact info. Instant live preview."
      extraSections={<ToolSeoContent content={toolContent['qr-to-pdf']} />}
    >
      <QrToPdfTool />
    </ToolPageShell>
  );
}
