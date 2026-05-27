import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { OrganizeTool } from '@/components/tools/OrganizeTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Organize PDF Pages Online - Free & Private | iCreatePDF',
  description: 'Rearrange, rotate, or delete specific pages in a PDF. 100% client-side with visual page preview thumbnails.',
  keywords: 'organize pdf, reorder pdf pages, rotate pdf pages, delete pages pdf, private pdf organizer',
};

export default function OrganizePdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Page Editor
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Organize &amp; Rotate PDF
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Drag page thumbnails to reorder pages. Rotate pages or flag specific pages for removal from the output.
          </p>
        </div>
        <OrganizeTool />
      </div>
      <FooterSection />
    </main>
  );
}
