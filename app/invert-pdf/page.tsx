import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { InvertTool } from '@/components/tools/InvertTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = {
  title: 'Invert PDF Colors Online Free - Dark Mode PDF | iCreatePDF',
  description: 'Invert the colors of your PDF to create a dark mode version. Ideal for night reading, reducing eye strain, and saving white ink when printing.',
  keywords: 'invert pdf colors, dark mode pdf, pdf color inverter, night mode pdf, invert pdf online free',
  alternates: { canonical: '/invert-pdf' },
  openGraph: {
    title: 'Invert PDF Colors Online Free - Dark Mode PDF | iCreatePDF',
    description: 'Invert the colors of your PDF to create a dark mode version. Ideal for night reading, reducing eye strain, and saving white ink when printing.',
    type: 'website',
  }
};
export default function InvertPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">Dark Mode</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">Invert PDF Colors</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Flip every pixel — turn white pages black for night reading and eye strain reduction.</p>
        </div>
        <InvertTool />
      </div>
      <FooterSection />
    </main>
  );
}
