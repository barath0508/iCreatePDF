import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { ExtractPagesTool } from '@/components/tools/ExtractPagesTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = { title: 'Extract Pages from PDF Free Online | iCreatePDF', description: 'Extract specific pages from a PDF file. Enter page numbers or ranges to pull out exactly the pages you need into a new PDF document.', keywords: 'extract pages from pdf, pdf page extractor, pull pages from pdf, pdf page picker online free', alternates: { canonical: '/extract-pages' } };
export default function ExtractPagesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">Page Extractor</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">Extract PDF Pages</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Pick specific pages or ranges — e.g. 1,3,5-8 — and save them as a new PDF.</p>
        </div>
        <ExtractPagesTool />
      </div>
      <FooterSection />
    </main>
  );
}
