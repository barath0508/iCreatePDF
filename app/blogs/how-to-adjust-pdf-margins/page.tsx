import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Maximize2, Columns, BookOpen, CheckCircle2, Lock, Sparkles, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Adjust PDF Margins Online Free (Add Binding Gutter & Padding) | iCreatePDF',
  description: 'Add extra margin padding or binding gutters to PDF pages for 3-hole punch binders, spiral binding, and note-taking. Free, in-browser margin adjustment.',
  keywords: 'adjust pdf margins free, add gutter to pdf online, pdf margin editor, add space for 3 hole punch pdf, increase pdf margins for printing, spiral binding margin pdf',
  alternates: buildAlternates('/blogs/how-to-adjust-pdf-margins'),
  openGraph: {
    title: 'How to Adjust PDF Margins Online Free (Add Binding Gutter & Padding) | iCreatePDF',
    description: 'Add extra margin padding or binding gutters to PDF pages for 3-hole punch binders, spiral binding, and note-taking. Free, in-browser margin adjustment.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
  },
};

const faqs = [
  {
    question: 'What is a "binding gutter" and why do printed books need it?',
    answer: 'A binding gutter is extra whitespace added specifically to the binding edge of a page (left edge for odd pages, right edge for even pages in duplex printing). Without a sufficient gutter margin (typically 0.5 to 0.75 inches), text near the spine gets swallowed into the book fold, hole-punched through by ring binders, or crimped by spiral wire bindings.'
  },
  {
    question: 'What is the difference between expanding page size and scaling content down?',
    answer: 'iCreatePDF gives you two strategies: (1) "Scale Content Inward" keeps physical paper size standard (e.g. A4 or US Letter) while slightly scaling text inward to create margin space; (2) "Expand Page Canvas" leaves content at 100% original scale and enlarges the physical paper boundary by adding white margin strips along the edges.'
  },
  {
    question: 'Can I set different margins for top, bottom, left, and right?',
    answer: 'Yes. You can link all four margins for uniform padding, or set independent values for Top (e.g., adding room for header stamps), Bottom (room for page numbers), Left (binding gutter), and Right.'
  },
  {
    question: 'Are my legal documents, academic theses, or manuscripts uploaded to a server?',
    answer: 'No. All margin adjustments, bounding box recalculations, and vector transformations execute 100% locally inside your web browser sandbox using WebAssembly. Your files never leave your computer.'
  }
];

const howToSteps = [
  {
    title: 'Drop your PDF into the Adjust Margins studio',
    description: 'Select your thesis, manual, or document requiring extra border clearance in the iCreatePDF Adjust Margins tool.'
  },
  {
    title: 'Choose margin mode (Uniform or Custom Edges)',
    description: 'Set custom point/millimeter values for Top, Bottom, Left, and Right margins, or apply a dedicated Binding Gutter.'
  },
  {
    title: 'Select scaling strategy',
    description: 'Choose "Scale Content Inward" to maintain standard paper size (A4/Letter) or "Expand Canvas" to enlarge sheet dimensions.'
  },
  {
    title: 'Apply margins and download your print-ready PDF',
    description: 'Export your adjusted document instantly with verified binding clearance for duplex printing.'
  }
];

export default function AdjustPdfMarginsBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Adjust PDF Margins Online Free (Add Binding Gutter & Padding) | iCreatePDF',
              description: 'Add extra margin padding or binding gutters to PDF pages for 3-hole punch binders, spiral binding, and note-taking. Free, in-browser margin adjustment.',
              url: '/blogs/how-to-adjust-pdf-margins',
              datePublished: '2026-07-25T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Adjust PDF Margins',
              description: 'Step-by-step instructions for adding custom margins and binding gutters to PDF documents in your browser.',
              url: '/blogs/how-to-adjust-pdf-margins',
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
            Print Preparation &amp; Binding
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Adjust PDF Margins Online Free (Add Binding Gutter &amp; Padding)
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Add necessary gutter margins for 3-hole punch binders, spiral bindings, and student note-taking without editing the original source documents.
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
            You print out a 150-page university dissertation, technical manual, or legal brief, take it to the copy center to have it spiral-bound or 3-hole punched for a binder, and discover a heartbreaking mistake: the punch holes punch directly through the first three letters of every line of text!
          </p>
          <p>
            When documents are designed for digital viewing, text often extends right to the edge of the sheet. But physical binding requires physical space. Spiral combs, thermal glue spines, and ring binder holes consume between <strong>0.5 inches (12.7 mm) and 0.75 inches (19 mm)</strong> of page width.
          </p>
          <p>
            If you don&apos;t have access to the original InDesign, LaTeX, or Word files, manually re-exporting the document with adjusted margins is impossible. Using an in-browser <strong>PDF margin adjustment engine</strong> allows you to shift content inward and add necessary gutter space directly to the compiled PDF.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 font-display">
              <Printer className="w-4 h-4 text-brand" />
              Standard Margin Guidelines for Binding
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/70 pl-1">
              <li><strong>3-Hole Ring Binders:</strong> Add 0.5 inches (36 pt) to the binding edge so holes never clip text.</li>
              <li><strong>Wire-O &amp; Spiral Coil Binding:</strong> Add 0.6 inches (43 pt) to accommodate spiral punch teeth and turning clearance.</li>
              <li><strong>Perfect Bound Paperback Books:</strong> Add 0.75 inches (54 pt) to prevent text disappearing into the glued spine curvature.</li>
              <li><strong>Lecture Handouts &amp; Study Notes:</strong> Add 1.5 inches to the right margin to give students dedicated space for handwritten annotations.</li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            The Geometry: Scaling Inward vs Canvas Expansion
          </h2>
          <p>
            iCreatePDF offers two distinct mathematical approaches to adjusting PDF margins:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-card border border-foreground/5 space-y-2">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-brand" />
                1. Scale Content Inward (Recommended)
              </h4>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Keeps the outer page dimensions strictly locked to standard A4 (210 &times; 297 mm) or US Letter (8.5 &times; 11&quot;). It scales the content stream slightly down (e.g. 92%) and shifts it horizontally, generating margin padding without changing paper size.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-foreground/5 space-y-2">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Columns className="w-4 h-4 text-emerald-400" />
                2. Expand Page Canvas
              </h4>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Leaves your text at 100% original scale and enlarges the physical <code>/MediaBox</code> boundary, adding new white canvas space along chosen edges. Ideal when text must remain at strict 1:1 architectural or engineering scales.
              </p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Adjust PDF Margins
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
              <strong>100% In-Browser Privacy:</strong> Academic theses, legal exhibits, and business manuals are processed entirely inside your local browser sandbox via WebAssembly. Zero files are uploaded to external cloud storage.
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
          <h3 className="text-lg font-bold text-foreground font-display">Adjust your PDF margins now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Add binding gutters and custom margins in seconds. Free, private, and in-browser.</p>
          <Link href="/adjust-pdf-margins">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs px-6 rounded-full group">
              Launch Adjust Margins Tool
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-adjust-pdf-margins" />
      </article>

      <FooterSection />
    </div>
  );
}
