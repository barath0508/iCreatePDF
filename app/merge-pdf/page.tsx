import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { MergeTool } from '@/components/tools/MergeTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Merge PDF Online - Free & Private | iCreatePDF',
  description: 'Combine multiple PDF files into one document in seconds. 100% client-side, drag & drop files, reorder pages, and download instantly.',
  keywords: 'merge pdf, combine pdf, merge pdf online, merge pdf free, private pdf merger',
};

export default function MergePdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Merger
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Merge PDF Files
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Combine multiple PDF files into a single, organized document. All processing is executed client-side.
          </p>
        </div>
        <MergeTool />
      </div>
      <FooterSection />
    </main>
  );
}
