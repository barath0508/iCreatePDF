import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { CompressTool } from '@/components/tools/CompressTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Compress PDF Online - Free & Private | iCreatePDF',
  description: 'Compress PDF file size locally in your browser. Reduce PDF byte streams securely without uploading to cloud servers.',
  keywords: 'compress pdf, reduce pdf size, compress pdf online, free compress pdf, private pdf compression',
  alternates: { canonical: '/compress-pdf' },
  openGraph: {
    title: 'Compress PDF Online - Free & Private | iCreatePDF',
    description: 'Compress PDF file size locally in your browser. Reduce PDF byte streams securely without uploading to cloud servers.',
    type: 'website',
  }
};

export default function CompressPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Optimizer
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Compress PDF File
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Reduce the file size of your PDF files by optimizing internal streams and resources client-side.
          </p>
        </div>
        <CompressTool />
      </div>
      <FooterSection />
    </main>
  );
}
