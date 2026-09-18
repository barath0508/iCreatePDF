import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, BookMarked, ListTree, CheckCircle2, Lock, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Build a PDF Table of Contents & Outline Bookmarks | iCreatePDF',
  description: 'Learn how to create clickable PDF outline bookmarks and generate a structured Table of Contents with nested chapters, sections, and page destinations.',
  keywords: 'create pdf table of contents, add outline bookmarks to pdf, pdf bookmark editor free, build pdf toc online, nested pdf bookmarks, free pdf outline generator',
  alternates: buildAlternates('/blogs/how-to-build-pdf-table-of-contents'),
  openGraph: {
    title: 'How to Build a PDF Table of Contents & Outline Bookmarks | iCreatePDF',
    description: 'Learn how to create clickable PDF outline bookmarks and generate a structured Table of Contents with nested chapters, sections, and page destinations.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
  },
};

const faqs = [
  {
    question: 'What is the difference between a printed Table of Contents and PDF Outline Bookmarks?',
    answer: 'A printed Table of Contents is a visible page within the document containing chapter titles and printed page numbers. PDF Outline Bookmarks (the document outline) live in the PDF viewer sidebar. They allow readers to click any heading or subheading to jump instantly to that specific page and view coordinate, even if the document has hundreds of pages.'
  },
  {
    question: 'Why do merged PDFs often lose their outline bookmarks?',
    answer: 'When multiple PDFs are concatenated using basic merge tools, the internal /Outlines dictionary references often become invalid because page object identifiers (IDs) are renumbered. iCreatePDF re-maps bookmark destination pointers so your table of contents continues to point accurately to the new merged page numbers.'
  },
  {
    question: 'Can I create nested bookmarks (multi-level hierarchy)?',
    answer: 'Yes. You can structure your bookmarks with multiple indentation levels—for example, Part 1 (Level 1) &rarr; Chapter 1 (Level 2) &rarr; Section 1.1 (Level 3). Each child item expands and collapses cleanly in Adobe Acrobat, Apple Preview, and web browser viewers.'
  },
  {
    question: 'Are my confidential business manuals or legal briefs uploaded to a cloud server?',
    answer: 'No. iCreatePDF constructs and writes the /Outlines object dictionary entirely inside your browser memory using WebAssembly. Your proprietary reports, legal filings, and books never leave your local machine.'
  }
];

const howToSteps = [
  {
    title: 'Upload your document to the TOC Builder',
    description: 'Open iCreatePDF PDF TOC Builder and select the document requiring structured outline bookmarks.'
  },
  {
    title: 'Add headings and destination pages',
    description: 'Enter your chapter titles and specify target page numbers. Use indent buttons to create nested subsections (H1, H2, H3).'
  },
  {
    title: 'Configure zoom and destination view',
    description: 'Choose whether clicking a bookmark fits the full page (/Fit) or preserves the reader\'s current zoom level.'
  },
  {
    title: 'Build and download your navigable PDF',
    description: 'Click "Generate TOC" to compile the new /Outlines dictionary into the PDF cross-reference table and download your production-ready file.'
  }
];

export default function HowToBuildPdfTableOfContentsPage() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Build a PDF Table of Contents & Outline Bookmarks | iCreatePDF',
              description: 'Learn how to create clickable PDF outline bookmarks and generate a structured Table of Contents with nested chapters, sections, and page destinations.',
              url: '/blogs/how-to-build-pdf-table-of-contents',
              datePublished: '2026-07-25T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Build PDF Table of Contents and Bookmarks',
              description: 'Step-by-step tutorial on building clickable PDF bookmarks and interactive table of contents in your browser.',
              url: '/blogs/how-to-build-pdf-table-of-contents',
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
            Document Navigation &amp; Structure
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Build a PDF Table of Contents &amp; Outline Bookmarks
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Transform massive, unwieldy 200+ page documents into professionally structured PDFs. Add clickable outline bookmarks and hierarchical navigation trees directly in your browser.
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
              <Clock className="w-3.5 h-3.5" /> 6 min read
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="text-foreground/75 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Nothing frustrates a reader more than opening a 300-page technical specification, legal discovery bundle, or academic dissertation only to discover that the bookmark sidebar is completely empty. Without interactive outline bookmarks, finding a specific clause or appendix requires endless scrolling or guessing page numbers.
          </p>
          <p>
            In professional document workflows, a functional Table of Contents (TOC) is not optional—it is a mandatory submission requirement for court filings, regulatory compliance dossiers (e.g. FDA eCTD submissions), and university theses. Adding a structured navigation tree makes your document instantly accessible, searchable, and professional.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 font-display">
              <ListTree className="w-4 h-4 text-brand" />
              Benefits of Interactive Outline Bookmarks
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/70 pl-1">
              <li><strong>Instant One-Click Navigation:</strong> Readers jump straight to the relevant chapter without thumbing through pages.</li>
              <li><strong>Hierarchical Clarity:</strong> Nest sub-clauses under major section headings to visually communicate document architecture.</li>
              <li><strong>Mobile Reader Friendly:</strong> Mobile PDF apps (Apple Books, Adobe Acrobat Mobile) rely heavily on bookmarks for small-screen navigation.</li>
              <li><strong>Court &amp; Regulatory Compliance:</strong> Appellate courts and government procurement boards frequently reject briefs lacking electronic bookmarks.</li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Under the Hood: The PDF /Outlines Dictionary
          </h2>
          <p>
            In the PDF ISO 32000 specification, bookmark outlines are organized as a doubly-linked tree of dictionary objects located in the document&apos;s <code>/Catalog</code>:
          </p>
          <div className="p-5 rounded-2xl bg-card border border-foreground/5 space-y-3 text-xs sm:text-sm font-mono text-foreground/80">
            <p className="text-brand font-bold">&lt;&lt; /Type /Catalog /Outlines 12 0 R ... &gt;&gt;</p>
            <p className="text-foreground/60 pl-4">12 0 obj &lt;&lt; /Type /Outlines /First 13 0 R /Last 15 0 R /Count 3 &gt;&gt;</p>
            <p className="text-foreground/60 pl-8">13 0 obj &lt;&lt; /Title (Chapter 1: Introduction) /Dest [4 0 R /Fit] /Next 14 0 R &gt;&gt;</p>
          </div>
          <p>
            Each bookmark node contains a <code>/Title</code> string, a destination <code>/Dest</code> array pointing to a specific page object and zoom coordinate, and pointers (<code>/Parent</code>, <code>/First</code>, <code>/Last</code>, <code>/Next</code>, <code>/Prev</code>) that define the hierarchy.
          </p>
          <p>
            When documents are scanned, split, or assembled from multiple sources, these internal pointers are often corrupted or severed. iCreatePDF dynamically reconstructs these pointer trees, generating clean, valid PDF outline hierarchies that work seamlessly across Adobe Acrobat, Preview, Chrome, and Firefox.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Build a PDF Table of Contents
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
              <strong>Private &amp; Secure In-Browser Processing:</strong> Legal exhibits, internal company policies, and student manuscripts are processed 100% locally. No document text or file contents are ever uploaded to an external server.
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
          <h3 className="text-lg font-bold text-foreground font-display">Build your PDF Table of Contents now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Create clickable outline bookmarks in seconds. Free, private, and in-browser.</p>
          <Link href="/pdf-toc-builder">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch PDF TOC Builder
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-build-pdf-table-of-contents" />
      </article>

      <FooterSection />
    </div>
  );
}
