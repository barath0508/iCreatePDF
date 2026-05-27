import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { RotateTool } from '@/components/tools/RotateTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Rotate PDF Online - Free & Private | iCreatePDF',
  description: 'Rotate PDF pages in seconds. 100% client-side, drag & drop files, select rotation angles visually, and download instantly.',
  keywords: 'rotate pdf, rotate pdf pages, rotate pdf online, free rotate pdf, private pdf rotation',
  alternates: { canonical: '/rotate-pdf' },
  openGraph: {
    title: 'Rotate PDF Online - Free & Private | iCreatePDF',
    description: 'Rotate PDF pages in seconds. 100% client-side, drag & drop files, select rotation angles visually, and download instantly.',
    type: 'website',
  }
};

export default function RotatePdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Page Rotator
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Rotate PDF Pages
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Rotate specific pages of your PDF document or apply a bulk clockwise rotation to all pages locally.
          </p>
        </div>
        <RotateTool />
      </div>
      <FooterSection />
    </main>
  );
}
