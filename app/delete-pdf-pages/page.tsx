import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { DeletePagesTool } from '@/components/tools/DeletePagesTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Delete PDF Pages Online Free - Remove Pages from PDF | iCreatePDF',
  description: 'Delete pages from a PDF document easily. Enter ranges to discard unwanted pages. 100% private client-side processing, no uploads.',
  keywords: 'delete pdf pages, remove pages from pdf, discard pdf pages online, free pdf page deleter, client side page deletion',
  alternates: { canonical: '/delete-pdf-pages' },
  openGraph: {
    title: 'Delete PDF Pages Online Free - Remove Pages from PDF',
    description: 'Delete pages from a PDF document easily. Enter ranges to discard unwanted pages. 100% private client-side processing, no uploads.',
    type: 'website',
  }
};

export default function DeletePagesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            Page Editor
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Delete PDF Pages
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Remove individual pages or complete page ranges from your PDF document instantly without uploading files.
          </p>
        </div>
        <DeletePagesTool />
      </div>
      <FooterSection />
    </main>
  );
}
