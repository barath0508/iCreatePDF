import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { ProtectTool } from '@/components/tools/ProtectTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Protect PDF Online - Set Password & Encrypt | iCreatePDF',
  description: 'Secure your PDF documents with passwords locally. Encrypt your files client-side without uploading them to any servers.',
  keywords: 'protect pdf, encrypt pdf, password protect pdf, secure pdf online, private pdf encrypt',
  alternates: {
    canonical: '/protect-pdf',
  },
};

export default function ProtectPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Shield
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Protect PDF Files
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Encrypt your PDF files with secure passwords locally in browser memory.
          </p>
        </div>
        <ProtectTool />
      </div>
      <FooterSection />
    </main>
  );
}
