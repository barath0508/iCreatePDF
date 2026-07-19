import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Rotate PDF Pages Online — Free Guide | iCreatePDF',
  description: 'Fix sideways or upside-down PDF pages in seconds. Rotate one page or the whole document, entirely in your browser — no uploads, no software.',
  keywords: 'rotate pdf, rotate pdf pages online, fix sideways pdf, rotate pdf free, how to rotate pdf 2026',
  alternates: buildAlternates('/blogs/how-to-rotate-pdf-pages'),
  openGraph: {
    title: 'How to Rotate PDF Pages Online — Free Guide',
    description: 'Fix sideways or upside-down PDF pages in seconds, directly in your browser.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Scanned Documents', desc: 'Fix pages that were scanned sideways or upside-down before sending or filing.' },
  { title: 'Mixed Orientation Reports', desc: 'Rotate a single landscape chart page to match the rest of a portrait report.' },
  { title: 'Phone Camera Scans', desc: 'Correct pages photographed at an angle with a phone scanning app.' },
  { title: 'Print Preparation', desc: 'Ensure every page is right-side-up before sending a document to a print shop.' },
  { title: 'Legal Filings', desc: 'Courts often reject documents with incorrectly oriented pages — fix them before submission.' },
  { title: 'Presentation Handouts', desc: 'Rotate exported slide PDFs to the correct reading orientation for printing.' },
];

export default function RotatePdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Rotate PDF Pages Online — Free Guide | iCreatePDF',
          description: 'Fix sideways or upside-down PDF pages in seconds. Rotate one page or the whole document, entirely in your browser — no uploads, no software.',
          url: '/blogs/how-to-rotate-pdf-pages',
          datePublished: '2026-07-18T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">PDF Editing</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Rotate PDF Pages Online — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Whether one page is sideways or the whole document is upside-down, fixing the orientation takes seconds — right in your browser.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-07-18">July 18, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            A sideways scan or a stray landscape slide can make an otherwise perfect PDF annoying to read. Rotating pages permanently — not just in your viewer, but in the actual saved file — fixes this for every future reader, and you don't need to upload the document anywhere to do it.
          </p>

          
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#step-by-step-rotate-pdf-pages-using-icreatepdf" className="hover:text-brand transition-colors">
                  Step-by-Step: Rotate PDF Pages Using iCreatePDF
                </Link>
              </li>
              <li>
                <Link href="#6-situations-where-youll-need-to-rotate-a-pdf" className="hover:text-brand transition-colors">
                  6 Situations Where You'll Need to Rotate a PDF
                </Link>
              </li>
              <li>
                <Link href="#rotating-one-page-vs-the-whole-document" className="hover:text-brand transition-colors">
                  Rotating One Page vs the Whole Document
                </Link>
              </li>
              <li>
                <Link href="#icreatepdf-vs-other-rotate-tools" className="hover:text-brand transition-colors">
                  iCreatePDF vs Other Rotate Tools
                </Link>
              </li>
              <li>
                <Link href="#frequently-asked-questions" className="hover:text-brand transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

<h2 id="step-by-step-rotate-pdf-pages-using-icreatepdf" className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Rotate PDF Pages Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/tools/rotate-pdf" className="text-brand hover:underline">iCreatePDF Rotate PDF</Link>.</li>
            <li>Upload your PDF — every page appears as a thumbnail.</li>
            <li>Select the pages you want to fix, or apply rotation to the entire document.</li>
            <li>Choose the rotation angle (90°, 180°, or 270°) and download the corrected file.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Rotation is written directly into the PDF's page metadata using a local JavaScript library. Your file is never uploaded or stored on any server.
            </p>
          </div>

          <h2 id="6-situations-where-youll-need-to-rotate-a-pdf" className="text-xl font-bold text-foreground pt-4 font-display">6 Situations Where You'll Need to Rotate a PDF</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="rotating-one-page-vs-the-whole-document" className="text-xl font-bold text-foreground pt-4 font-display">Rotating One Page vs the Whole Document</h2>
          <p>
            Most rotation tools only let you flip every page at once, which is a problem if just one scanned page is sideways. iCreatePDF lets you select individual pages from the thumbnail grid, so a report with 40 correct pages and 2 sideways ones doesn't need to be processed page-by-page in a separate tool. If you also need to reorder pages or remove blank ones, pair this with <Link href="/tools/organize-pdf" className="text-brand hover:underline">Organize PDF</Link>.
          </p>

          <h2 id="icreatepdf-vs-other-rotate-tools" className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other Rotate Tools</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-foreground/70 border border-foreground/10 rounded-xl overflow-hidden">
              <thead className="bg-foreground/5 text-foreground font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Feature</th>
                  <th className="text-left px-4 py-3">iCreatePDF</th>
                  <th className="text-left px-4 py-3">Typical Online Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {[
                  ['File uploads to server', 'Never', 'Always'],
                  ['Per-page rotation', 'Yes', 'Sometimes whole-document only'],
                  ['Account required', 'No', 'Often yes'],
                  ['Cost', 'Free', 'Freemium / paywalled'],
                  ['Processing speed', 'Instant (local)', 'Depends on server load'],
                ].map(([feature, ours, theirs]) => (
                  <tr key={feature}>
                    <td className="px-4 py-3 font-medium text-foreground/80">{feature}</td>
                    <td className="px-4 py-3 text-emerald-400">{ours}</td>
                    <td className="px-4 py-3 text-red-400/80">{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="frequently-asked-questions" className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Does rotating a PDF page reduce quality?', a: 'No. Rotation changes the page display orientation metadata — it does not re-render or compress any content, so quality is fully preserved.' },
              { q: 'Can I rotate only some pages and leave others untouched?', a: 'Yes. Select individual pages from the thumbnail grid before applying rotation; unselected pages remain exactly as they were.' },
              { q: 'Will the rotation stick when I open the file elsewhere?', a: 'Yes — the rotation is saved into the PDF file itself, so it displays correctly in any PDF viewer, not just in iCreatePDF.' },
              { q: 'Can I undo a rotation?', a: 'You can rotate the same page again in the opposite direction, or re-upload your original file if you kept a copy.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Rotate your PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/tools/rotate-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Rotate PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-rotate-pdf-pages" />
      </article>

      <FooterSection />
    </div>
  );
}
