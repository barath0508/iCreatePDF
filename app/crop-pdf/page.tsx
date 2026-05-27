import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { CropTool } from '@/components/tools/CropTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = { title: 'Crop PDF Pages Online Free | iCreatePDF', description: 'Crop PDF pages by trimming margins from any side. Remove scanner borders, white space, and unwanted margins from all pages locally.', keywords: 'crop pdf, trim pdf margins, remove pdf borders, crop pdf pages online free, pdf margin trimmer', alternates: { canonical: '/crop-pdf' } };
export default function CropPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">Page Editor</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">Crop PDF Pages</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Remove scanner borders and excess whitespace by trimming page margins.</p>
        </div>
        <CropTool />
      </div>
      <FooterSection />
    </main>
  );
}
