import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { HtmlToPdfTool } from '@/components/tools/HtmlToPdfTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Convert HTML to PDF Online - Free & Private | iCreatePDF',
  description: 'Compile custom HTML and CSS templates into formatted PDF documents locally. Completely private, client-side HTML-to-PDF utility.',
  keywords: 'html to pdf, convert html to pdf, online html pdf compiler, css to pdf client side',
  alternates: { canonical: '/html-to-pdf' },
  openGraph: {
    title: 'Convert HTML to PDF Online - Free & Private | iCreatePDF',
    description: 'Compile custom HTML and CSS templates into formatted PDF documents locally. Completely private, client-side HTML-to-PDF utility.',
    type: 'website',
  }
};

export default function HtmlToPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            HTML Compiler
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            HTML to PDF Converter
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Render your custom HTML/CSS code templates into A4 PDF pages locally.
          </p>
        </div>
        <HtmlToPdfTool />
      </div>
      <FooterSection />
    </main>
  );
}
