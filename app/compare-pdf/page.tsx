import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { CompareTool } from '@/components/tools/CompareTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Compare PDF Online - Sync Scroll Document Revision Check | iCreatePDF',
  description: 'Compare two PDF document versions side-by-side with synchronized scrolling locally in the browser. Easily audit content differences.',
  keywords: 'compare pdf, compare two pdfs online, side by side pdf compare, sync scroll pdf, visual pdf diff',
  alternates: { canonical: '/compare-pdf' },
  openGraph: {
    title: 'Compare PDF Online - Sync Scroll Document Revision Check | iCreatePDF',
    description: 'Compare two PDF document versions side-by-side with synchronized scrolling locally in the browser. Easily audit content differences.',
    type: 'website',
  }
};

export default function ComparePdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            Diff Checker
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Compare PDF Revisions
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Audit content differences side-by-side with synchronized viewport scrolling.
          </p>
        </div>
        <CompareTool />
      </div>
      <FooterSection />
    </main>
  );
}
