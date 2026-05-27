import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { QrToPdfTool } from '@/components/tools/QrToPdfTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = {
  title: 'Generate QR Code to PDF Online Free | iCreatePDF',
  description: 'Create a PDF document with an embedded QR code. Enter any URL or text, customize size and labels, and download as a clean A4 PDF instantly.',
  keywords: 'qr code to pdf, generate qr code pdf, create pdf with qr code, qr code generator pdf, embed qr code pdf free',
  alternates: { canonical: '/qr-to-pdf' },
  openGraph: {
    title: 'Generate QR Code to PDF Online Free | iCreatePDF',
    description: 'Create a PDF document with an embedded QR code. Enter any URL or text, customize size and labels, and download as a clean A4 PDF instantly.',
    type: 'website',
  }
};
export default function QrToPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">QR Generator</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">QR Code to PDF</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Generate a clean A4 PDF with your QR code for any URL, text, or contact info. Instant live preview.</p>
        </div>
        <QrToPdfTool />
      </div>
      <FooterSection />
    </main>
  );
}
