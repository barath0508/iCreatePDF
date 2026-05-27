import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { WatermarkTool } from '@/components/tools/WatermarkTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Watermark PDF Online - Free & Private | iCreatePDF',
  description: 'Add custom text watermarks to all pages of a PDF file. 100% client-side with positioning, size, and opacity adjustments.',
  keywords: 'watermark pdf, add watermark to pdf, watermark pdf online, free watermark pdf, private pdf watermark',
  alternates: { canonical: '/watermark-pdf' },
  openGraph: {
    title: 'Watermark PDF Online - Free & Private | iCreatePDF',
    description: 'Add custom text watermarks to all pages of a PDF file. 100% client-side with positioning, size, and opacity adjustments.',
    type: 'website',
  }
};

export default function WatermarkPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Designer
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Watermark PDF File
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Apply configured text watermarks to document pages. Set position, size, opacity, and color values locally.
          </p>
        </div>
        <WatermarkTool />
      </div>
      <FooterSection />
    </main>
  );
}
