import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FlattenTool } from '@/components/tools/FlattenTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Flatten PDF Online - Merge Form Fields & Forms | iCreatePDF',
  description: 'Flatten interactive form fields and digital annotation layers into flat vector graphics locally inside browser memory. Secure PDF flattener.',
  keywords: 'flatten pdf, flat pdf, flatten form fields, make pdf non editable, secure pdf forms online',
  alternates: { canonical: '/flatten-pdf' },
  openGraph: {
    title: 'Flatten PDF Online - Merge Form Fields & Forms | iCreatePDF',
    description: 'Flatten interactive form fields and digital annotation layers into flat vector graphics locally inside browser memory. Secure PDF flattener.',
    type: 'website',
  }
};

export default function FlattenPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            Layer Flatener
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Flatten PDF Documents
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Merge interactive drop-downs, signatures, and form fields into read-only static layers.
          </p>
        </div>
        <FlattenTool />
      </div>
      <FooterSection />
    </main>
  );
}
