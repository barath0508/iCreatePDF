import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { TxtToPdfTool } from '@/components/tools/TxtToPdfTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Convert Text to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert plain text (.txt) files or pasted text into styled PDF documents. Customize page margins, size, fonts, and headers/footers client-side.',
  keywords: 'text to pdf, txt to pdf online, convert plain text to pdf, free local pdf converter, text layout to pdf',
  alternates: { canonical: '/txt-to-pdf' },
  openGraph: {
    title: 'Convert Text to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert plain text (.txt) files or pasted text into styled PDF documents. Customize page margins, size, fonts, and headers/footers client-side.',
    type: 'website',
  }
};

export default function TxtToPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            Local Converter
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Convert Text to PDF
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Convert raw text or plain text (.txt) files into structured, formatted PDF documents. Set margins, orientations, font families, and custom headers in your browser.
          </p>
        </div>
        <TxtToPdfTool />
      </div>
      <FooterSection />
    </main>
  );
}
