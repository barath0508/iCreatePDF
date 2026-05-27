import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { MarkdownToPdfTool } from '@/components/tools/MarkdownToPdfTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Convert Markdown to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert styled Markdown text files into standard PDF page layouts locally. Completely private, browser-based Markdown-to-PDF utility.',
  keywords: 'markdown to pdf, convert md to pdf, markdown editor pdf converter, client side md pdf',
  alternates: { canonical: '/markdown-to-pdf' },
  openGraph: {
    title: 'Convert Markdown to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert styled Markdown text files into standard PDF page layouts locally. Completely private, browser-based Markdown-to-PDF utility.',
    type: 'website',
  }
};

export default function MarkdownToPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            Markdown Engine
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Markdown to PDF Converter
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Write syntax-styled Markdown documents and compile them to clean A4 PDFs locally.
          </p>
        </div>
        <MarkdownToPdfTool />
      </div>
      <FooterSection />
    </main>
  );
}
