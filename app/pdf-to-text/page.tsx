import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { PdfToTextTool } from '@/components/tools/PdfToTextTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Extract Text from PDF Online - Free & Private | iCreatePDF',
  description: 'Extract raw text layouts from PDF documents page-by-page. 100% browser-based text extraction utility.',
  keywords: 'pdf to text, extract text from pdf, pdf text reader, read pdf text online',
  alternates: { canonical: '/pdf-to-text' },
  openGraph: {
    title: 'Extract Text from PDF Online - Free & Private | iCreatePDF',
    description: 'Extract raw text layouts from PDF documents page-by-page. 100% browser-based text extraction utility.',
    type: 'website',
  }
};

export default function PdfToTextPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            Text Extractor
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            PDF to Text Extractor
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Extract structural text contents page-by-page locally in your browser.
          </p>
        </div>
        <PdfToTextTool />
      </div>
      <FooterSection />
    </main>
  );
}
