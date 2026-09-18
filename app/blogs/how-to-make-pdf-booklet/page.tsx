import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, BookOpen, Printer, CheckCircle2, Lock, Sparkles, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Make a PDF Booklet Online Free (Saddle-Stitch Imposition) | iCreatePDF',
  description: 'Reorder PDF pages into printable 2-up booklet spreads ready for double-sided printing and folding. Automatic 4-page signature calculation with zero uploads.',
  keywords: 'how to make a pdf booklet, pdf booklet maker online free, saddle stitch pdf imposition, print booklet pdf, 2-up booklet printing, convert pdf to foldable booklet',
  alternates: buildAlternates('/blogs/how-to-make-pdf-booklet'),
  openGraph: {
    title: 'How to Make a PDF Booklet Online Free (Saddle-Stitch Imposition) | iCreatePDF',
    description: 'Reorder PDF pages into printable 2-up booklet spreads ready for double-sided printing and folding. Automatic 4-page signature calculation with zero uploads.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
  },
};

const faqs = [
  {
    question: 'What is "booklet imposition" and why is it necessary for folded books?',
    answer: 'If you take an 8-page document and print pages 1 and 2 on the first sheet, then fold it in half, page 2 will be on the back of page 1 instead of inside where you expect it. Booklet imposition is the mathematical re-sequencing of pages into 2-page spreads so that when printed double-sided and folded down the center spine, the pages read sequentially: 1, 2, 3, 4, 5, 6, 7, 8.'
  },
  {
    question: 'Why does my booklet page count need to be a multiple of 4?',
    answer: 'Every physical sheet of paper folded in half creates 4 distinct pages (front-left, front-right, back-left, and back-right). If your document has 10 pages, iCreatePDF automatically appends 2 clean blank pages to the end to complete the 12-page signature, ensuring proper alignment without errors.'
  },
  {
    question: 'How should I configure my printer settings for double-sided booklet printing?',
    answer: 'When printing your imposed booklet PDF, configure your printer driver to: (1) 100% Actual Size (do not fit or scale); (2) Two-Sided / Duplex Printing; (3) Flip on Short Edge (often called Short-Edge Binding). This ensures the back of each sheet does not print upside down.'
  },
  {
    question: 'Are my private church bulletins, event programs, or zine zips uploaded to a server?',
    answer: 'No. All page imposition algorithms, matrix transformations, and multi-up sheet placements execute 100% locally in your web browser using WebAssembly. Your files never leave your computer.'
  }
];

const howToSteps = [
  {
    title: 'Upload your multi-page PDF document',
    description: 'Select your sequential PDF (e.g. 8, 12, 16, or 24 pages) in the iCreatePDF Booklet Maker studio.'
  },
  {
    title: 'Select paper sheet size and binding format',
    description: 'Choose Letter (producing 5.5 × 8.5" booklets) or A4 (producing A5 booklets), and choose Left-to-Right or Right-to-Left (Manga) binding.'
  },
  {
    title: 'Automatic 4-page signature calculation',
    description: 'The engine pairs the outermost and innermost pages (e.g., Page 16 with Page 1) into printable 2-up spreads.'
  },
  {
    title: 'Download and print with "Flip on Short Edge"',
    description: 'Download your imposed PDF, send it to your duplex printer, fold the sheets down the middle, and staple the spine.'
  }
];

export default function MakePdfBookletBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Make a PDF Booklet Online Free (Saddle-Stitch Imposition) | iCreatePDF',
              description: 'Reorder PDF pages into printable 2-up booklet spreads ready for double-sided printing and folding. Automatic 4-page signature calculation with zero uploads.',
              url: '/blogs/how-to-make-pdf-booklet',
              datePublished: '2026-07-25T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Make a PDF Booklet',
              description: 'Step-by-step instructions for imposing PDF pages into foldable 2-up saddle-stitch booklet spreads.',
              url: '/blogs/how-to-make-pdf-booklet',
              steps: howToSteps,
            }),
          ]),
        }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Guides
        </Link>

        {/* Header */}
        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase font-mono">
            Print Imposition &amp; Binding
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Make a PDF Booklet Online Free (Saddle-Stitch Imposition)
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Reorder pages mathematically into printable 2-up spreads. Print double-sided, fold down the center, and assemble professional booklets, church programs, and zines with zero waste.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <Link href="/authors/barath-r" className="font-semibold text-foreground/70 hover:text-brand underline">Barath R</Link> (Lead Engineer)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-07-25">July 25, 2026</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 5 min read
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="text-foreground/75 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Whether you are printing a church service bulletin, an indie comic or zine, a wedding itinerary, or a product user manual, a folded booklet looks vastly more professional than a stack of stapled corner pages.
          </p>
          <p>
            However, almost everyone who tries to make their first booklet encounters the same perplexing puzzle: you cannot simply print pages 1, 2, 3, and 4 in sequential order. If you print an 8-page document sequentially, Page 2 will be on the back of Page 1, and folding the paper in half scrambles your document completely.
          </p>
          <p>
            In professional commercial printing, this puzzle is solved through <strong>saddle-stitch imposition</strong>: placing the last page and the first page on the same sheet, so that folding the sheets along the center crease puts every single page in perfect numerical order.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 font-display">
              <BookOpen className="w-4 h-4 text-brand" />
              Popular Use Cases for Booklet Maker
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/70 pl-1">
              <li><strong>Event &amp; Theater Programs:</strong> Fold Letter or A4 sheets in half to create pocket-friendly playbills and programs.</li>
              <li><strong>Church Bulletins &amp; Hymnals:</strong> Produce weekly service guides with clean double-sided spreads.</li>
              <li><strong>Indie Zines &amp; Comics:</strong> Self-publish fan magazines and graphic short stories on standard home printers.</li>
              <li><strong>Product Instruction Manuals:</strong> Package compact, foldable warranty and setup guides with consumer electronics.</li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            The Mathematics of Saddle-Stitch Imposition
          </h2>
          <p>
            For a booklet with <code>N</code> pages (where <code>N</code> is a multiple of 4), the sheets are paired systematically from the outside in:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-xs text-foreground/70 border border-foreground/10 rounded-xl overflow-hidden font-mono">
              <thead className="bg-foreground/5 text-foreground font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Sheet Number</th>
                  <th className="text-left px-4 py-3">Side</th>
                  <th className="text-left px-4 py-3">Left Page</th>
                  <th className="text-left px-4 py-3">Right Page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                <tr>
                  <td className="px-4 py-2.5 font-bold text-foreground">Sheet 1 (Outermost)</td>
                  <td className="px-4 py-2.5 font-sans">Front</td>
                  <td className="px-4 py-2.5 text-brand font-bold">Page 8 (Back Cover)</td>
                  <td className="px-4 py-2.5 text-emerald-400 font-bold">Page 1 (Front Cover)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-foreground">Sheet 1 (Outermost)</td>
                  <td className="px-4 py-2.5 font-sans">Back</td>
                  <td className="px-4 py-2.5 text-foreground/80 font-bold">Page 2 (Inside Front)</td>
                  <td className="px-4 py-2.5 text-foreground/80 font-bold">Page 7 (Inside Back)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-foreground">Sheet 2 (Center Fold)</td>
                  <td className="px-4 py-2.5 font-sans">Front</td>
                  <td className="px-4 py-2.5 text-foreground/80 font-bold">Page 6</td>
                  <td className="px-4 py-2.5 text-foreground/80 font-bold">Page 3</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-foreground">Sheet 2 (Center Fold)</td>
                  <td className="px-4 py-2.5 font-sans">Back</td>
                  <td className="px-4 py-2.5 text-foreground/80 font-bold">Page 4 (Center Spread Left)</td>
                  <td className="px-4 py-2.5 text-foreground/80 font-bold">Page 5 (Center Spread Right)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            iCreatePDF computes this permutation matrix automatically, inserting blank filler sheets if your document does not evenly divide by 4.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Make Your PDF Booklet
          </h2>
          <ol className="space-y-3 list-decimal list-inside text-sm sm:text-base pl-2">
            {howToSteps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <strong className="text-foreground">{step.title}:</strong> {step.description}
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <Lock className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>100% In-Browser Privacy:</strong> All page scaling, coordinate matrix shifts, and sheet imposition execute in your browser memory via WebAssembly. Your documents are never uploaded to any remote server.
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1">
                <p className="text-sm font-bold text-foreground">{question}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Make your PDF booklet now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Instant saddle-stitch imposition for duplex printing. Free and private in your browser.</p>
          <Link href="/booklet-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch Booklet Maker
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-make-pdf-booklet" />
      </article>

      <FooterSection />
    </div>
  );
}
