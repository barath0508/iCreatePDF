import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { SignTool } from '@/components/tools/SignTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Sign PDF Online - Draw or Type Signatures | iCreatePDF',
  description: 'Sign PDF documents visually and securely in your browser. Draw or type your signature and position it on any page locally.',
  keywords: 'sign pdf, e-sign pdf, digital signature, draw signature, write signature on pdf',
  alternates: { canonical: '/sign-pdf' },
  openGraph: {
    title: 'Sign PDF Online - Draw or Type Signatures | iCreatePDF',
    description: 'Sign PDF documents visually and securely in your browser. Draw or type your signature and position it on any page locally.',
    type: 'website',
  }
};

export default function SignPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            E-Signature
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Sign PDF Documents
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Place, resize, and overlay signatures on document pages 100% client-side.
          </p>
        </div>
        <SignTool />
      </div>
      <FooterSection />
    </main>
  );
}
