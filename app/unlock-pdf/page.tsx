import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { UnlockTool } from '@/components/tools/UnlockTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Unlock PDF Online - Free & Private | iCreatePDF',
  description: 'Unlock password-protected PDF files instantly in your web browser. Remove PDF locks locally without uploading sensitive files.',
  keywords: 'unlock pdf, remove pdf password, unlock pdf online, free unlock pdf, private pdf decrypter',
  alternates: {
    canonical: 'https://icreatepdf.com/unlock-pdf',
    languages: {
      'es': 'https://icreatepdf.com/es',
      'hi': 'https://icreatepdf.com/hi',
      'ta': 'https://icreatepdf.com/ta',
    },
  },
};

export default function UnlockPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Decrypter
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Unlock Protected PDF
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Strips password security locks from document files. Decryption occurs completely local inside browser memory.
          </p>
        </div>
        <UnlockTool />
      </div>
      <FooterSection />
    </main>
  );
}
