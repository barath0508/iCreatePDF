import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { ScanToPdfTool } from '@/components/tools/ScanToPdfTool';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Scan to PDF Online - Free Document Scanner | iCreatePDF',
  description: 'Scan document pages with your mobile or webcam camera. Crop, compile, and convert captured photos into a single PDF locally. 100% private.',
  keywords: 'scan to pdf, document scanner online, webcam to pdf, mobile camera scan to pdf, free online scanner, icreatepdf',
};

export default function ScanToPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-32 text-center space-y-4 bg-black">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 uppercase font-mono">
          Device scanner
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display">
          Scan to PDF <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Directly from camera</span>
        </h1>
        <p className="text-white/40 text-sm max-w-xl mx-auto px-4">
          Scan multiple pages and compile them into a high-quality PDF in seconds. Processed entirely inside your browser sandbox.
        </p>
      </div>

      <div className="relative z-10">
        <ScanToPdfTool />
      </div>

      <FeaturesSection />
      <HowItWorksSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
