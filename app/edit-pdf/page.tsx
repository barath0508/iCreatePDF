import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { EditPdfTool } from '@/components/tools/EditPdfTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Edit PDF Online - Add Text Overlays & Annotations | iCreatePDF',
  description: 'Edit PDF files directly in your web browser. Place text overlay annotations, customize colors, and write them back into the PDF.',
  keywords: 'edit pdf, annotate pdf, add text to pdf, overlay text on pdf, edit pdf free online',
  alternates: { canonical: '/edit-pdf' },
  openGraph: {
    title: 'Edit PDF Online - Add Text Overlays & Annotations | iCreatePDF',
    description: 'Edit PDF files directly in your web browser. Place text overlay annotations, customize colors, and write them back into the PDF.',
    type: 'website',
  }
};

export default function EditPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Annotations
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Edit PDF Annotations
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Insert custom text overlay boxes and position them on PDF layouts client-side.
          </p>
        </div>
        <EditPdfTool />
      </div>
      <FooterSection />
    </main>
  );
}
