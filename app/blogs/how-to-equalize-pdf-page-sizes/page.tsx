import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Columns, Maximize2, CheckCircle2, Lock, Sparkles, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Equalize PDF Page Sizes Online Free (Standardize Dimensions) | iCreatePDF',
  description: 'Normalize mixed Letter, Legal, A3, and A4 pages in a single PDF into a uniform standard size. Avoid printer jams and awkward jumps with 100% private in-browser processing.',
  keywords: 'equalize pdf page sizes, standardize pdf dimensions, make all pdf pages same size, convert mixed pdf to a4, normalize pdf page sizes free',
  alternates: buildAlternates('/blogs/how-to-equalize-pdf-page-sizes'),
  openGraph: {
    title: 'How to Equalize PDF Page Sizes Online Free (Standardize Dimensions) | iCreatePDF',
    description: 'Normalize mixed Letter, Legal, A3, and A4 pages in a single PDF into a uniform standard size. Avoid printer jams and awkward jumps with 100% private in-browser processing.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
  },
};

const faqs = [
  {
    question: 'Why do my merged PDF documents have mixed, irregular page sizes?',
    answer: 'When you combine files from different sources—such as scanned paper receipts, Word documents in US Letter, European A4 invoices, and wide landscape slide decks—each source file brings its own native /MediaBox dimensions. Merging them concatenates the pages without standardizing their physical dimensions, resulting in jarring layout jumps when scrolling.'
  },
  {
    question: 'Does standardizing page sizes stretch or distort my text and graphics?',
    answer: 'No. iCreatePDF utilizes proportional aspect-ratio scaling. The content scales uniformly without horizontal or vertical stretching. Any remaining margin space is centered with clean white margins (letterboxing), preserving your exact graphic proportions.'
  },
  {
    question: 'What standard page sizes can I normalize my document to?',
    answer: 'You can normalize your entire document to international A4 (210 × 297 mm), North American US Letter (8.5 × 11 inches), US Legal (8.5 × 14 inches), A3, or A5, in either portrait or landscape orientation.'
  },
  {
    question: 'Will equalizing page sizes prevent printer paper tray errors and jams?',
    answer: 'Yes. Most enterprise multi-function office printers pause or throw an error when a single print job requests both "Letter" and "A4" or "Legal" sheets from different paper trays. Normalizing all pages to a single paper specification ensures seamless, continuous duplex printing.'
  },
  {
    question: 'Are my confidential business contracts or blueprints uploaded to an external server?',
    answer: 'No. The entire geometric transformation, bounding box recalculation, and PDF object stream assembly occur 100% locally inside your browser memory using WebAssembly. Your files never leave your computer.'
  }
];

const howToSteps = [
  {
    title: 'Drop your mixed-size PDF into the Equalize Tool',
    description: 'Select your multi-page document with irregular page dimensions in the iCreatePDF Equalize Page Sizes studio.'
  },
  {
    title: 'Choose your target standard paper format',
    description: 'Select standard A4 (international), US Letter (North America), Legal, or A3, and set preferred orientation.'
  },
  {
    title: 'Select fitting strategy (Fit or Letterbox)',
    description: 'Choose "Fit to Page" with proportional scaling to center content cleanly within uniform paper borders.'
  },
  {
    title: 'Equalize and download your normalized PDF',
    description: 'Click "Standardize Pages" and download your uniform, print-ready document in seconds.'
  }
];

export default function EqualizePdfPageSizesBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Equalize PDF Page Sizes Online Free (Standardize Dimensions) | iCreatePDF',
              description: 'Normalize mixed Letter, Legal, A3, and A4 pages in a single PDF into a uniform standard size. Avoid printer jams and awkward jumps with 100% private in-browser processing.',
              url: '/blogs/how-to-equalize-pdf-page-sizes',
              datePublished: '2026-07-25T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Equalize PDF Page Sizes',
              description: 'Step-by-step instructions for standardizing mixed-size PDF pages into uniform A4 or Letter dimensions.',
              url: '/blogs/how-to-equalize-pdf-page-sizes',
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
            Document Normalization &amp; Print
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Equalize PDF Page Sizes Online Free (Standardize Dimensions)
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Normalize mixed Letter, Legal, A3, and A4 pages in a single PDF into a uniform standard dimension. Prevent office printer jams, eliminate binder overhangs, and create polished documents.
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
            Have you ever opened a combined PDF document—like a legal contract with attached scanned receipts, or a technical manual with folded architectural schematics—and noticed that scrolling feels like a rollercoaster? Page 1 is standard letter size, Page 2 is a tiny receipt scan, Page 3 is an oversized legal-sized sheet, and Page 4 is a giant landscape drawing.
          </p>
          <p>
            Irregular page dimensions make documents look unprofessional. Worse yet, when you send a mixed-size PDF to a shared office printer, the machine will often pause mid-job, demanding paper from trays that don&apos;t exist, or print oversized pages cropped in half.
          </p>
          <p>
            <strong>Equalizing PDF page sizes</strong> standardizes every sheet in your document to a uniform dimension (such as A4 or US Letter), ensuring consistent visual presentation and painless physical printing.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 font-display">
              <Printer className="w-4 h-4 text-brand" />
              Why Document Standardization Matters
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/70 pl-1">
              <li><strong>Flawless Duplex Printing:</strong> Modern printers require uniform page dimensions to feed two-sided sheets through the duplex inverter.</li>
              <li><strong>Physical Binder Alignment:</strong> Eliminates oversized sheets hanging awkwardly outside ring binders or folders.</li>
              <li><strong>Smooth Digital Reading:</strong> Readers enjoy a fluid, consistent scrolling experience on tablets and laptops without jarring zoom jumps.</li>
              <li><strong>Court &amp; Government Compliance:</strong> Most federal courts, patent offices, and academic review boards strictly mandate uniform page dimensions.</li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            The Geometry: How Page Resizing Works In-Browser
          </h2>
          <p>
            In the PDF ISO 32000 specification, every page object contains a <code>/MediaBox</code> array defining four points: <code>[xMin, yMin, xMax, yMax]</code>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/70">
            <li><strong>US Letter:</strong> <code>[0, 0, 612, 792]</code> (8.5 &times; 11 inches at 72 typographical points per inch).</li>
            <li><strong>ISO A4:</strong> <code>[0, 0, 595.28, 841.89]</code> (210 &times; 297 mm).</li>
            <li><strong>US Legal:</strong> <code>[0, 0, 612, 1008]</code> (8.5 &times; 14 inches).</li>
          </ul>
          <p>
            When equalizing page sizes, iCreatePDF adjusts the target page <code>/MediaBox</code> and applies an affine transformation matrix to the underlying content stream. This centers the existing artwork, scales it proportionally to prevent distortion, and adds clean border padding.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Equalize Page Sizes in iCreatePDF
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
              <strong>100% Client-Side Privacy:</strong> Financial spreadsheets, contracts, and blueprints are standardized entirely within your local browser memory via WebAssembly. Zero files are uploaded to external servers.
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
          <h3 className="text-lg font-bold text-foreground font-display">Standardize your PDF page sizes now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Free, instant, and uniform. Process mixed-size documents directly in your browser.</p>
          <Link href="/equalize-pdf-page-sizes">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs px-6 rounded-full group">
              Launch Equalize Tool
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-equalize-pdf-page-sizes" />
      </article>

      <FooterSection />
    </div>
  );
}
