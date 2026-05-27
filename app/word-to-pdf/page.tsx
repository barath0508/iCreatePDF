import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { WordToPdfTool } from '@/components/tools/WordToPdfTool';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Convert Word to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert DOCX Word documents into PDF files. Completely client-side inside browser sandbox, preserving text layout with 100% data privacy.',
  keywords: 'convert word to pdf, docx to pdf, word document converter online, free docx to pdf, private pdf converter, icreatepdf',
  alternates: { canonical: '/word-to-pdf' },
  openGraph: {
    title: 'Convert Word to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert DOCX Word documents into PDF files. Completely client-side inside browser sandbox, preserving text layout with 100% data privacy.',
    type: 'website',
  }
};

export default function WordToPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-32 text-center space-y-4 bg-black">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 uppercase font-mono">
          DOCX converter
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display">
          Word to PDF <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Instant Client-Side Conversion</span>
        </h1>
        <p className="text-white/40 text-sm max-w-xl mx-auto px-4">
          Drop your Word document (.docx) to compile it into a PDF layout. Processed entirely inside your browser memory.
        </p>
      </div>

      <div className="relative z-10">
        <WordToPdfTool />
      </div>

      <FeaturesSection />
      <HowItWorksSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
