import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { MetadataTool } from '@/components/tools/MetadataTool';
import { FooterSection } from '@/components/landing/footer-section';
export const metadata: Metadata = {
  title: 'Edit PDF Metadata Online Free | iCreatePDF',
  description: 'View and edit PDF metadata fields: title, author, subject, keywords, and creator. Update document properties without uploading files.',
  keywords: 'edit pdf metadata, pdf properties editor, change pdf author, pdf title editor online, pdf document properties',
  alternates: { canonical: '/pdf-metadata' },
  openGraph: {
    title: 'Edit PDF Metadata Online Free | iCreatePDF',
    description: 'View and edit PDF metadata fields: title, author, subject, keywords, and creator. Update document properties without uploading files.',
    type: 'website',
  }
};
export default function PdfMetadataPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">Document Properties</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">PDF Metadata Editor</h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Read and update the hidden title, author, subject, and keyword fields embedded in any PDF.</p>
        </div>
        <MetadataTool />
      </div>
      <FooterSection />
    </main>
  );
}
