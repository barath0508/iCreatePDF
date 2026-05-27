import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { BatesTool } from '@/components/tools/BatesTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = {
  title: 'Bates Numbering PDF Online Free | iCreatePDF',
  description: 'Add Bates numbers to PDF documents for legal, medical, and compliance workflows. Configure prefix, suffix, padding, and position. Browser-based.',
  keywords: 'bates numbering pdf, add bates stamps pdf, legal pdf numbering, bates number generator online free, pdf sequential numbering',
  alternates: { canonical: '/bates-numbering' },
  openGraph: {
    title: 'Bates Numbering PDF Online Free | iCreatePDF',
    description: 'Add Bates numbers to PDF documents for legal, medical, and compliance workflows. Configure prefix, suffix, padding, and position. Browser-based.',
    type: 'website',
  }
};
export default function BatesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">Legal Stamping</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">Bates Numbering</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Sequential document stamping for legal discovery, medical records, and compliance workflows.</p>
        </div>
        <BatesTool />
      </div>
      <FooterSection />
    </main>
  );
}
