import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Scissors, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Split PDF Files Online for Free (Separate & Extract Pages) | iCreatePDF',
  description: 'Learn how to split PDF files online for free without software. Separate large PDFs by page ranges, extract specific chapters, or split every page into individual PDF files privately.',
  keywords: 'how to split pdf files, split pdf online free, separate pdf pages, extract pages from pdf, cut pdf file, split large pdf into parts',
  alternates: buildAlternates('/blogs/how-to-split-pdf-files'),
  openGraph: {
    title: 'How to Split PDF Files Online for Free (Separate & Extract Pages)',
    description: 'Learn how to split PDF files online for free. Separate large PDFs by page ranges or extract individual pages with 100% private in-browser processing.',
    type: 'article',
    publishedTime: '2026-08-22T00:00:00Z',
  },
};

const splitModes = [
  {
    title: '1. Split by Custom Page Ranges (e.g., 1-5, 6-10)',
    desc: 'Divide a 100-page book or annual report into specific sections, chapters, or assignment units.',
    icon: Scissors,
  },
  {
    title: '2. Extract Specific Single Pages',
    desc: 'Select individual pages (e.g., pages 3, 7, and 12) and bundle them into a single clean PDF output.',
    icon: FileText,
  },
  {
    title: '3. Split Every Page into Individual PDFs',
    desc: 'Automatically break down a multi-page PDF so every single page becomes its own standalone PDF file packaged in a ZIP.',
    icon: Scissors,
  },
];

const faqs = [
  {
    question: 'How do I split a large PDF into multiple files?',
    answer: 'Open iCreatePDF Split PDF, upload your document, enter your desired page intervals (such as 1-5, 6-10, 11-20), and click "Split PDF". Your new files will download immediately.',
  },
  {
    question: 'Will splitting a PDF reduce the text or visual quality?',
    answer: 'No. Splitting extracts vector content, fonts, embedded images, and metadata losslessly without recompression or degradation.',
  },
  {
    question: 'Is there a limit on how many pages I can split?',
    answer: 'No arbitrary limits are enforced. Because iCreatePDF operates inside your local browser memory, you can split 500+ page documents without encountering daily paywalls or pay-per-page restrictions.',
  },
  {
    question: 'Can I split password-protected PDF files?',
    answer: 'Yes. If you know the password, first unlock the document using the iCreatePDF Unlock PDF tool, then split the resulting document freely.',
  },
];

const howToSteps = [
  {
    title: 'Upload your PDF document',
    description: 'Drag and drop your PDF into the iCreatePDF Split PDF tool.',
  },
  {
    title: 'Choose your splitting mode',
    description: 'Select either Custom Ranges (e.g. 1-4, 5-8), Extract Selected Pages, or Split All Pages into Individual Files.',
  },
  {
    title: 'Download split PDF files',
    description: 'Click "Split PDF" to instantly generate and download your separated files or ZIP bundle.',
  },
];

export default function SplitPdfFilesPage() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Split PDF Files Online for Free (Separate & Extract Pages) | iCreatePDF',
              description: 'Learn how to split PDF files online for free without software. Separate large PDFs by page ranges or extract specific chapters.',
              url: '/blogs/how-to-split-pdf-files',
              datePublished: '2026-08-22T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Split PDF Files',
              description: 'Step-by-step instructions on splitting and separating multi-page PDF documents for free.',
              url: '/blogs/how-to-split-pdf-files',
              steps: howToSteps,
            }),
          ]),
        }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Document Management</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Split PDF Files Online for Free (Separate &amp; Extract Pages)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Separate large PDF documents into smaller files, extract specific chapters, or split every page into a standalone PDF in seconds.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Specialist)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-08-22">August 22, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Large PDF documents like scanned binders, legal discovery filings, university textbooks, and financial statements are often too bulky to email or share. Splitting your PDF allows you to extract exactly the pages you need while keeping file sizes lightweight.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Multiple Split Modes:</strong> Split by custom ranges, extract individual pages, or separate all pages.</li>
              <li><strong>Zero Quality Loss:</strong> Retains 100% of original vector fonts, high-res images, and formatting.</li>
              <li><strong>Strict Confidentiality:</strong> Everything executes locally inside your web browser without uploading to a cloud server.</li>
            </ul>
          </div>

          <h2 id="popular-ways-to-split-pdfs" className="text-xl font-bold text-foreground pt-4 font-display">
            3 Ways to Split Your PDF Documents
          </h2>
          <div className="space-y-3 my-4">
            {splitModes.map((mode, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <mode.icon className="w-4 h-4 text-brand" /> {mode.title}
                </h3>
                <p className="text-xs text-foreground/60 leading-relaxed">{mode.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="step-by-step-split-guide" className="text-xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Split a PDF Online
          </h2>
          <ol className="list-decimal list-inside space-y-3 pl-2 text-sm sm:text-base">
            {howToSteps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <strong className="text-foreground">{step.title}:</strong> {step.description}
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Zero Server Upload Privacy:</strong> Traditional sites transfer your multi-page documents to their backend servers. iCreatePDF processes your PDF splits in-memory on your CPU via WebAssembly, guaranteeing your data stays private.
            </p>
          </div>

          <h2 id="frequently-asked-questions" className="text-xl font-bold text-foreground pt-4 font-display">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{question}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Split your PDF file in seconds</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No account needed. No watermarks. Fast and private separation.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/split-pdf">
              <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
                Split PDF Free
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/merge-pdf">
              <Button variant="outline" className="border-border text-foreground hover:bg-foreground/5 font-medium text-xs px-5 rounded-full">
                Merge PDFs
              </Button>
            </Link>
          </div>
        </div>

        <RelatedPosts currentSlug="how-to-split-pdf-files" />
      </article>

      <FooterSection />
    </div>
  );
}
