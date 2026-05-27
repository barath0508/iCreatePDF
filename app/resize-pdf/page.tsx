import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { ResizeTool } from '@/components/tools/ResizeTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = { title: 'Resize PDF Pages to A4, Letter or Custom Size Free | iCreatePDF', description: 'Normalize all PDF pages to A4, Letter, A3, Legal, or a custom size. Resize pages without losing content quality, entirely in your browser.', keywords: 'resize pdf pages, pdf page size changer, convert pdf to a4, pdf page resizer online free, normalize pdf size', alternates: { canonical: '/resize-pdf' } };
export default function ResizePdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">Page Formatter</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">PDF Page Resizer</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Normalize all PDF pages to A4, Letter, A3, Legal, or A5 in portrait or landscape orientation.</p>
        </div>
        <ResizeTool />
      </div>
      <FooterSection />
    </main>
  );
}
