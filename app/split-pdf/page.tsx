import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { SplitTool } from '@/components/tools/SplitTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Split PDF Online - Free & Private | iCreatePDF',
  description: 'Extract page ranges or separate all pages in a PDF. 100% client-side, drag & drop files, and download split parts instantly.',
  keywords: 'split pdf, extract pages pdf, split pdf online, split pdf free, private pdf splitter',
  alternates: { canonical: '/split-pdf' },
  openGraph: {
    title: 'Split PDF Online - Free & Private | iCreatePDF',
    description: 'Extract page ranges or separate all pages in a PDF. 100% client-side, drag & drop files, and download split parts instantly.',
    type: 'website',
  }
};

export default function SplitPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Splitter
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Split PDF Files
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Extract individual pages or select custom ranges from your PDF document locally inside your browser.
          </p>
        </div>
        <SplitTool />
      </div>
      <FooterSection />
    </main>
  );
}
