import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, BookOpen, Printer, Sparkles, CheckCircle2, Lock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Convert EPUB to PDF Online Free (Print-Ready Formatting) | iCreatePDF',
  description: 'Convert EPUB eBooks into cleanly formatted, printable PDF documents. Choose standard book trim sizes (A4, Letter, A5, 6x9"), preserve chapter breaks, and read offline.',
  keywords: 'convert epub to pdf free, epub to pdf online, print epub as pdf, ebook to pdf converter free, convert epub to a4 pdf, private epub converter',
  alternates: buildAlternates('/blogs/how-to-convert-epub-to-pdf'),
  openGraph: {
    title: 'How to Convert EPUB to PDF Online Free (Print-Ready Formatting) | iCreatePDF',
    description: 'Convert EPUB eBooks into cleanly formatted, printable PDF documents. Choose standard book trim sizes (A4, Letter, A5, 6x9"), preserve chapter breaks, and read offline.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
  },
};

const faqs = [
  {
    question: 'What is the main difference between an EPUB file and a PDF document?',
    answer: 'An EPUB (Electronic Publication) is a reflowable XHTML/CSS container. Text automatically adjusts its line breaks, font size, and layout depending on the screen dimensions of the e-reader. A PDF is a fixed-layout document where every word, image, and page margin is locked to precise physical typographical coordinates, making PDF the universal standard for physical printing and consistent page citations.'
  },
  {
    question: 'Can I choose standard book trim sizes like 6x9 inches or A5?',
    answer: 'Yes. iCreatePDF allows you to format the converted PDF to standard publishing trim sizes: 6x9 inches (standard trade paperback), A5 (digest book format), A4, or US Letter, with customizable inner gutter margins for spine binding.'
  },
  {
    question: 'Will illustrations, cover art, and chapter headings be preserved?',
    answer: 'Yes. Our converter unzips the internal EPUB package, extracts embedded JPEG/PNG/SVG illustrations, parses the manifest table of contents, and renders chapters with clean page breaks.'
  },
  {
    question: 'Can I convert DRM-protected EPUB files purchased from Amazon or Apple Books?',
    answer: 'No. iCreatePDF supports open, standard DRM-free EPUB files (such as Project Gutenberg classics, open-access academic texts, and personal manuscripts). We do not circumvent digital rights management (DRM) encryption.'
  },
  {
    question: 'Are my eBook files uploaded to external cloud servers?',
    answer: 'No. EPUB package decompression and PDF rendering take place 100% locally inside your web browser sandbox via WebAssembly. Your personal manuscripts and eBook files never leave your computer.'
  }
];

const howToSteps = [
  {
    title: 'Select your EPUB eBook file',
    description: 'Drag and drop your .epub file into the iCreatePDF EPUB to PDF conversion studio.'
  },
  {
    title: 'Select book trim size and typography',
    description: 'Choose your desired paper format (A4, Letter, A5, or 6x9" Paperback), set base font size, and configure line spacing.'
  },
  {
    title: 'Configure page numbering and chapter breaks',
    description: 'Enable automatic chapter pagination and ensure each new chapter begins on a fresh page.'
  },
  {
    title: 'Convert and download your printable PDF',
    description: 'Click "Convert to PDF" and download your beautifully formatted, print-ready document in seconds.'
  }
];

export default function ConvertEpubToPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Convert EPUB to PDF Online Free (Print-Ready Formatting) | iCreatePDF',
              description: 'Convert EPUB eBooks into cleanly formatted, printable PDF documents. Choose standard book trim sizes (A4, Letter, A5, 6x9"), preserve chapter breaks, and read offline.',
              url: '/blogs/how-to-convert-epub-to-pdf',
              datePublished: '2026-07-25T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Convert EPUB to PDF',
              description: 'Step-by-step instructions for converting EPUB eBooks into print-ready PDF documents with custom trim sizes.',
              url: '/blogs/how-to-convert-epub-to-pdf',
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
            E-Book Publishing &amp; Printing
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Convert EPUB to PDF Online Free (Print-Ready Formatting)
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Turn reflowable eBooks into beautifully paginated, printable PDF documents with custom book trim sizes, clean chapter breaks, and complete privacy.
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
            The EPUB format is the undisputed standard for reading books on dedicated e-readers like Kobo, Nook, and mobile reader apps. Because EPUB is reflowable, it dynamically adjusts font sizes and page breaks to match whatever screen you happen to be holding.
          </p>
          <p>
            However, that reflowable nature becomes a severe liability when you need to <strong>print physical copies</strong>, cite specific page numbers in an academic paper, or annotate a book using stylus tools in apps like GoodNotes or Notability. Physical printing and formal study require <strong>fixed page geometries</strong>, which only the PDF format provides.
          </p>
          <p>
            Converting EPUB to PDF allows authors, students, and avid readers to transform fluid digital text into professional, physical-ready book layouts with consistent typography and custom page margins.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 font-display">
              <Printer className="w-4 h-4 text-brand" />
              Common Trim Sizes for EPUB-to-PDF Conversion
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-card border border-foreground/5 space-y-1">
                <strong className="text-foreground block">6 &times; 9 inches (Trade Paperback):</strong>
                <p className="text-foreground/60 leading-normal">The standard format for novels, memoirs, and non-fiction publishing.</p>
              </div>
              <div className="p-3 rounded-xl bg-card border border-foreground/5 space-y-1">
                <strong className="text-foreground block">A5 (148 &times; 210 mm Digest):</strong>
                <p className="text-foreground/60 leading-normal">Popular in European printing, poetry books, and compact technical manuals.</p>
              </div>
              <div className="p-3 rounded-xl bg-card border border-foreground/5 space-y-1">
                <strong className="text-foreground block">A4 &amp; US Letter:</strong>
                <p className="text-foreground/60 leading-normal">Standard office paper formats, ideal for binder storage and home printing.</p>
              </div>
              <div className="p-3 rounded-xl bg-card border border-foreground/5 space-y-1">
                <strong className="text-foreground block">Tablet Optimized (4:3 Aspect Ratio):</strong>
                <p className="text-foreground/60 leading-normal">Fills iPad and Android tablet screens edge-to-edge for digital note-taking.</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            How Client-Side EPUB Conversion Works
          </h2>
          <p>
            An <code>.epub</code> file is actually a specialized ZIP container holding HTML content files, CSS style sheets, image assets, and an XML package manifest (<code>content.opf</code>).
          </p>
          <p>
            When you load an EPUB into iCreatePDF:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/70">
            <li><strong>ZIP Extraction:</strong> Client-side WebAssembly unzips the archive directly in browser memory without sending a single byte to an external server.</li>
            <li><strong>Manifest Parsing:</strong> The reading spine and chapter order are reconstructed from the <code>content.opf</code> metadata dictionary.</li>
            <li><strong>CSS Paged Media Formatting:</strong> Paged media stylesheets inject proper page breaks (<code>page-break-before: always</code>), running headers, and page numbering.</li>
            <li><strong>Vector Assembly:</strong> Text vectors, fonts, and embedded photos are compiled directly into an ISO 32000 compliant PDF document.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Convert EPUB to PDF
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
              <strong>Complete Copyright Privacy:</strong> Your self-published manuscripts, unpublished drafts, and personal eBook library are processed 100% locally on your own machine. We never store, log, or upload your books.
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
          <h3 className="text-lg font-bold text-foreground font-display">Convert your EPUB to PDF now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Free, print-ready, and private. Convert eBooks in your browser without software installs.</p>
          <Link href="/epub-to-pdf">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs px-6 rounded-full group">
              Launch EPUB to PDF Converter
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-convert-epub-to-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
