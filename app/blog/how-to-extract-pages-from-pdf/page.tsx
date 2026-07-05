import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, HelpCircle, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Extract Pages from PDF Files Free Online | iCreatePDF',
  description: 'Learn how to split, pull, and extract specific pages from a PDF. Crop margins and resize pages easily. 100% offline, privacy first.',
  keywords: 'extract pages from pdf, split pdf pages, pull specific pdf pages, crop pdf, resize pdf to a4, save pages from pdf',
  alternates: buildAlternates('/blog/how-to-extract-pages-from-pdf'),
  openGraph: {
    title: 'How to Extract Pages from PDF Files Free Online',
    description: 'Split or extract specific pages from your PDF documents. Learn to trim margins and resize pages locally in your browser.',
    type: 'article',
    publishedTime: '2026-05-26T00:00:00Z',
  },
};

const methods = [
  { name: 'Extract Range', desc: 'Choose a page selection syntax like "1, 3, 5-8" to separate exactly the pages you need from the source document.' },
  { name: 'Crop Margins', desc: 'Remove white borders, scanner artifacts, or crop specific margins in millimeters for clean print layout alignment.' },
  { name: 'Resize to A4 / Letter', desc: 'Rescale mismatched PDF page sizes standardizing them to uniform layouts like Letter or A4.' },
];

export default function ExtractPagesBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Extract Pages from PDF Files Free Online | iCreatePDF',
          description: 'Learn how to split, pull, and extract specific pages from a PDF. Crop margins and resize pages easily. 100% offline, privacy first.',
          url: '/blog/how-to-extract-pages-from-pdf',
          datePublished: '2026-05-26T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">PDF Editing</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Extract and Organize PDF Pages Free (2026 Guide)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Whether you need to extract a single receipt from a giant document, crop out scanner borders, or resize pages to A4, here is how to do it instantly in your browser.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />May 26, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Many multi-page PDFs are filled with pages you simply don\'t need. Sending a 50-page contract when only the signature page is required wastes bandwidth and exposes unnecessary details.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Three Ways to Clean Up PDF Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            {methods.map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-2">
                <span className="text-xs font-bold text-emerald-400 font-mono">Method {i + 1}</span>
                <h3 className="font-bold text-foreground text-sm">{m.name}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{m.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">How to Extract Pages Instantly</h2>
          <p>
            Using iCreatePDF\'s page extractor, you can input a page range (e.g., <code className="text-brand font-mono">1, 3-5, 10</code>) and generate a new PDF containing only those selected pages.
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to <Link href="/extract-pages" className="text-brand hover:underline">/extract-pages</Link></li>
            <li>Drag &amp; drop your source PDF document.</li>
            <li>Type in your desired page numbers or ranges (e.g., 2-4, 7).</li>
            <li>Click <em>Extract Pages</em> and download your split document.</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Trimming &amp; Formatting: Crop and Resize</h2>
          <p>
            If your pages are scanned with off-center borders or extra black lines, crop them down. Crop margins let you specify how many millimeters to cut from the top, bottom, left, and right sides.
          </p>
          <p>
            Similarly, if you need to print a document on A4 but it was designed on Letter size, the Resizer tool handles rescaling content properly without cropping important text.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Does extracting pages reduce quality?</h4>
              <p className="text-xs text-foreground/50 leading-relaxed">No. The text layers, vector images, and font styles are copied directly from the source pages, meaning the output has the exact same resolution and format.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Can I extract pages from a protected PDF?</h4>
              <p className="text-xs text-foreground/50 leading-relaxed">If a PDF is locked with a password, you must first unlock it using the Unlock PDF tool, then proceed to extract pages.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display flex items-center justify-center gap-2">
            <Scissors className="w-5 h-5 text-emerald-400" />
            Extract Specific Pages Now
          </h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">100% browser-based. Zero uploads. Complete page control.</p>
          <Link href="/extract-pages">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Extract PDF Pages
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}
