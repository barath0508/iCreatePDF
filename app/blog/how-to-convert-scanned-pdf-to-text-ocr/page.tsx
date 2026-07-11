import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Eye, Sparkles, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Convert Scanned PDF to Text (Free Online OCR) | iCreatePDF',
  description: 'Learn how to extract copyable text from scanned documents and image-only PDF files using client-side OCR character recognition in English, Spanish, Tamil, and Hindi.',
  keywords: 'pdf ocr online, scanned pdf to text, extract text from pdf, copy-proof pdf to text ocr, convert scanned pdf to text, local pdf ocr',
  alternates: buildAlternates('/blog/how-to-convert-scanned-pdf-to-text-ocr'),
  openGraph: {
    title: 'How to Convert Scanned PDF to Text (Free Online OCR)',
    description: 'Digitize paper scans, faxes, or copy-protected documents into editable plain text locally in your browser sandbox using WebAssembly neural recognition.',
    type: 'article',
    publishedTime: '2026-05-28T00:00:00Z',
  },
};

export default function ScannedPdfToTextBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Convert Scanned PDF to Text (Free Online OCR) | iCreatePDF',
          description: 'Learn how to extract copyable text from scanned documents and image-only PDF files using client-side OCR character recognition in English, Spanish, Tamil, and Hindi.',
          url: '/blog/how-to-convert-scanned-pdf-to-text-ocr',
          datePublished: '2026-05-28T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Text Extraction</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Convert Scanned PDFs and Images to Editable Text
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Locked or scanned documents are frustrating to work with. Learn how to perform Optical Character Recognition (OCR) client-side in seconds.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />May 28, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When a document is faxed, scanned with a physical scanner, or copy-protected using flat canvas pages, it essentially becomes a collection of photographs. The original text formatting is lost, and standard PDF readers cannot find or highlight the text. To retrieve the characters, we need Optical Character Recognition (OCR) software. We can do this entirely client-side without sending files to server systems.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand" />
            In-Browser Neural OCR (WebAssembly)
          </h2>
          <p>
            In the past, running OCR meant installing gigabytes of software or uploading documents to cloud APIs (which poses data compliance risks). Today, we can run modern neural network models directly inside the browser using WebAssembly.
          </p>
          <p>
            iCreatePDF compiles a browser-version of the Tesseract OCR engine. It renders your PDF pages to image canvas buffers, feeds the frames to the WebAssembly worker thread, checks letters against dictionary databases, and compiles them into clean, copyable unicode text.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-brand" />
            Steps to Extract Text from Scanned PDF
          </h2>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Visit the <Link href="/pdf-ocr" className="text-brand hover:underline">PDF OCR (Scan to Text)</Link> tool page.</li>
            <li>Select and upload your scanned, non-copyable PDF file.</li>
            <li>Choose your Document Language. We support:
              <ul className="list-disc list-inside pl-6 pt-1 space-y-1 font-mono text-xs">
                <li>English (eng)</li>
                <li>Spanish (spa)</li>
                <li>Tamil (tam)</li>
                <li>Hindi (hin)</li>
              </ul>
            </li>
            <li>Click <strong>Run OCR Text Extraction</strong>. The script will render pages, load the language file, and process character recognition.</li>
            <li>Copy the resulting text directly to your clipboard or click <strong>Download Plain Text (.txt)</strong> to save it.</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Maximizing OCR Accuracy</h2>
          <p className="text-sm leading-relaxed">
            OCR accuracy depends heavily on document readability. For best results:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li>Ensure the scanned document is upright (rotate pages first if they are sideways).</li>
            <li>High-resolution scans yield better text detection; avoid low-quality faxes if possible.</li>
            <li>Match the primary document language in the selector to prevent dictionary parsing mismatches.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display flex items-center justify-center gap-2">
            <Eye className="w-5 h-5 text-brand" />
            Extract Text from Scanned Documents
          </h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Digitize paper scans, faxes, or copy-protected documents into editable plain text locally in your browser sandbox.</p>
          <Link href="/pdf-ocr">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Start PDF OCR
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-convert-scanned-pdf-to-text-ocr" />
      </article>

      <FooterSection />
    </div>
  );
}
