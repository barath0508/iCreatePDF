import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { PdfToJpgTool } from '@/components/tools/PdfToJpgTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Convert PDF to JPG Online - Free & Private | iCreatePDF',
  description: 'Convert PDF pages to JPG images in seconds. 100% client-side, drag & drop files, and download image ZIP instantly.',
  keywords: 'convert pdf to jpg, pdf to jpg, pdf to image, extract pdf pages to jpg, private pdf to jpg',
  alternates: { canonical: '/pdf-to-jpg' },
  openGraph: {
    title: 'Convert PDF to JPG Online - Free & Private | iCreatePDF',
    description: 'Convert PDF pages to JPG images in seconds. 100% client-side, drag & drop files, and download image ZIP instantly.',
    type: 'website',
  }
};

export default function PdfToJpgPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            PDF Extractor
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Convert PDF to JPG
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Extract each page of your PDF file as a high-quality JPEG image. All processes run locally and package downloads into a ZIP.
          </p>
        </div>
        <PdfToJpgTool />
      </div>
      <FooterSection />
    </main>
  );
}
