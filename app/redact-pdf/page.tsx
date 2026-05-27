import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { RedactTool } from '@/components/tools/RedactTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = {
  title: 'Redact PDF Online Free - Black Out Sensitive Info | iCreatePDF',
  description: 'Redact sensitive information from PDF files locally. Draw black boxes over text, images, and personal data. 100% client-side, no uploads.',
  keywords: 'redact pdf, black out pdf text, pdf redaction tool, remove sensitive data pdf, redact pdf online free',
  alternates: { canonical: '/redact-pdf' },
  openGraph: {
    title: 'Redact PDF Online Free - Black Out Sensitive Info | iCreatePDF',
    description: 'Redact sensitive information from PDF files locally. Draw black boxes over text, images, and personal data. 100% client-side, no uploads.',
    type: 'website',
  }
};
export default function RedactPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">Privacy Shield</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">Redact PDF</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Draw black boxes over sensitive data. Redactions are burned permanently — no hidden layer remains.</p>
        </div>
        <RedactTool />
      </div>
      <FooterSection />
    </main>
  );
}
