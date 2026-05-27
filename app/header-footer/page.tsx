import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { HeaderFooterTool } from '@/components/tools/HeaderFooterTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = { title: 'Add Header and Footer to PDF Online Free | iCreatePDF', description: 'Add custom headers and footers to every page of your PDF. Include page numbers, company name, date, or any text. 100% browser-based.', keywords: 'add header footer pdf, pdf header footer online, stamp header pdf, pdf footer text, add header to pdf free', alternates: { canonical: '/header-footer' } };
export default function HeaderFooterPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">Page Stamper</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">Add Header & Footer to PDF</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Stamp text at the top and bottom of every page. Supports automatic page numbers with {'{page}'} and {'{total}'}.</p>
        </div>
        <HeaderFooterTool />
      </div>
      <FooterSection />
    </main>
  );
}
