import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { GrayscaleTool } from '@/components/tools/GrayscaleTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Grayscale PDF Online - Convert to Black & White | iCreatePDF',
  description: 'Convert color PDF documents to black and white (grayscale) locally. Optimize your layouts for ink-saving printing client-side.',
  keywords: 'grayscale pdf, convert pdf to black and white, grayscale pdf online free, ink saving pdf converter',
  alternates: { canonical: '/grayscale-pdf' },
  openGraph: {
    title: 'Grayscale PDF Online - Convert to Black & White | iCreatePDF',
    description: 'Convert color PDF documents to black and white (grayscale) locally. Optimize your layouts for ink-saving printing client-side.',
    type: 'website',
  }
};

export default function GrayscalePdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            Print Optimizer
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Grayscale PDF Converter
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Convert color document pages, figures, and charts to ink-saving black and white.
          </p>
        </div>
        <GrayscaleTool />
      </div>
      <FooterSection />
    </main>
  );
}
