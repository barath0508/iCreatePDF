import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { PageNumbersTool } from '@/components/tools/PageNumbersTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Add PDF Page Numbers Online - Free & Private | iCreatePDF',
  description: 'Stamp page numbers onto a PDF document. Customize positioning, number label formatting, and fonts locally in-browser.',
  keywords: 'add page numbers to pdf, number pdf pages, pdf page numbers online, private pdf numbering',
};

export default function PageNumbersPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Numbering
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Add Page Numbers
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Number PDF pages automatically. Select positions (top, bottom, left, right) and label styling formats (e.g. Page X of Y).
          </p>
        </div>
        <PageNumbersTool />
      </div>
      <FooterSection />
    </main>
  );
}
