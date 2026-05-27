import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { RepairTool } from '@/components/tools/RepairTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = {
  title: 'Repair PDF Online Free - Fix Corrupted PDF Files | iCreatePDF',
  description: 'Fix corrupted, damaged, or broken PDF files online. Rebuilds cross-reference tables and object streams to recover readable documents locally.',
  keywords: 'repair pdf, fix corrupted pdf, recover damaged pdf, pdf repair tool online free, fix broken pdf',
  alternates: { canonical: '/repair-pdf' },
  openGraph: {
    title: 'Repair PDF Online Free - Fix Corrupted PDF Files | iCreatePDF',
    description: 'Fix corrupted, damaged, or broken PDF files online. Rebuilds cross-reference tables and object streams to recover readable documents locally.',
    type: 'website',
  }
};
export default function RepairPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">PDF Recovery</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">Repair PDF</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Attempt to recover corrupted or damaged PDF files by rebuilding their internal structure.</p>
        </div>
        <RepairTool />
      </div>
      <FooterSection />
    </main>
  );
}
