import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Crop, Smartphone, Tablet, Monitor, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Auto-Crop Blank PDF Margins for Mobile & E-Readers | iCreatePDF',
  description: 'Learn how to automatically detect and trim blank margins, scanner borders, and excess whitespace from PDF pages for comfortable reading on Kindle, iPad, and phones.',
  keywords: 'how to auto crop pdf, trim blank margins pdf online, auto crop pdf whitespace, optimize pdf for kindle, remove scanner borders pdf free',
  alternates: buildAlternates('/blogs/how-to-auto-crop-pdf-margins'),
  openGraph: {
    title: 'How to Auto-Crop Blank PDF Margins for Mobile & E-Readers | iCreatePDF',
    description: 'Learn how to automatically detect and trim blank margins, scanner borders, and excess whitespace from PDF pages for comfortable reading on Kindle, iPad, and phones.',
    type: 'article',
    publishedTime: '2026-08-01T00:00:00Z',
  },
};

const faqs = [
  {
    question: 'How does the automatic whitespace detection algorithm work?',
    answer: 'iCreatePDF renders each page to an off-screen HTML5 Canvas and scans pixel luminance arrays from the four outer edges inward. Once pixel values diverge from pure background color (accounting for threshold noise and scanner grain), the engine calculates the minimum bounding rectangle encompassing all text, illustrations, and equations, and updates the PDF /CropBox accordingly.'
  },
  {
    question: 'What is the difference between /MediaBox and /CropBox in the PDF specification?',
    answer: 'In ISO 32000, /MediaBox defines the full physical paper boundaries (e.g., standard A4 or Letter size), while /CropBox specifies the visible viewport displayed on screen and sent to the printer. Auto-cropping modifies the /CropBox non-destructively, meaning zero underlying text or vector elements are erased.'
  },
  {
    question: 'Will cropping remove page numbers or running headers?',
    answer: 'By default, the auto-detector includes all visible markings—including headers and page numbers. If you want to crop out running headers or footers to maximize mobile font size, you can adjust the top and bottom padding sliders to trim past the header baseline.'
  },
  {
    question: 'Can I apply uniform crop margins across an entire book or multi-page paper?',
    answer: 'Yes. You can either let the engine auto-detect bounds independently for each page (ideal for scans with varying alignment) or calculate a uniform composite crop across all pages to keep page dimensions consistent.'
  },
  {
    question: 'Are my books or academic manuscripts uploaded to your cloud servers?',
    answer: 'No. Pixel scanning, bounding box calculations, and PDF dictionary modifications happen 100% locally in your web browser using WebAssembly. Your copyrighted books, unpublished research, and private documents never leave your machine.'
  }
];

const howToSteps = [
  {
    title: 'Upload your document to Auto-Crop PDF',
    description: 'Select or drag your research paper, scanned book, or report into the iCreatePDF auto-crop studio.'
  },
  {
    title: 'Click Auto-Detect Whitespace',
    description: 'The client-side vision engine scans page margins and automatically snaps crop handles tightly around your content.'
  },
  {
    title: 'Fine-tune margin padding sliders',
    description: 'Add a small breathing buffer (e.g., 10-15pt) around the content box or specify uniform dimensions across all pages.'
  },
  {
    title: 'Apply crop and export optimized PDF',
    description: 'Download your cropped PDF instantly, ready for full-width reading on e-readers, tablets, and phones.'
  }
];

export default function AutoCropBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Auto-Crop Blank PDF Margins for Mobile & E-Readers | iCreatePDF',
              description: 'Learn how to automatically detect and trim blank margins, scanner borders, and excess whitespace from PDF pages for comfortable reading on Kindle, iPad, and phones.',
              url: '/blogs/how-to-auto-crop-pdf-margins',
              datePublished: '2026-08-01T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Auto-Crop PDF Margins',
              description: 'Step-by-step instructions for automatically detecting and cropping blank margins from PDF documents in-browser.',
              url: '/blogs/how-to-auto-crop-pdf-margins',
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase font-mono">
            Reading Optimization &amp; Layout
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Auto-Crop Blank PDF Margins for Mobile Screens &amp; E-Readers
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Eliminate wasted whitespace and dark scanner borders. Maximize text size and comfort when reading academic papers, scanned books, and sheet music on small screens.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <Link href="/authors/barath-r" className="font-semibold text-foreground/70 hover:text-brand underline">Barath R</Link> (Lead Engineer)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-08-01">August 1, 2026</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 5 min read
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="text-foreground/75 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Most PDF documents—from IEEE and arXiv research papers to corporate annual reports—are formatted specifically for standard physical printing on Letter (8.5 &times; 11 inches) or A4 (210 &times; 297 mm) sheets. To look balanced on a desk, designers allocate 1 to 1.5 inches of blank margin padding along all four edges.
          </p>
          <p>
            When you attempt to read these documents on an <strong>e-reader (like a Kindle Paperwhite, Kobo, or reMarkable)</strong> or a mobile device (iPad Mini or smartphone), those generous print margins become a nightmare. The viewer scales the entire page down to fit the narrow screen, shrinking the actual text into an unreadable, microscopic font surrounded by useless white borders.
          </p>
          <p>
            Manually cropping every page using desktop editing software is tedious and error-prone. By using <strong>smart automated whitespace detection</strong>, you can strip away unneeded margins across hundreds of pages in seconds, expanding readable text by up to <strong>40% to 60%</strong>.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 font-display">
              <Crop className="w-4 h-4 text-emerald-400" />
              Who Benefits from PDF Auto-Cropping?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/70 pl-1">
              <li><strong>Researchers &amp; Academics:</strong> Fit two-column journal papers tightly onto tablet screens without pinch-zooming on every paragraph.</li>
              <li><strong>Musicians &amp; Performers:</strong> Maximize musical stave sizes on digital music stands for hands-free sight reading.</li>
              <li><strong>Students with E-Ink Devices:</strong> Read scanned textbooks comfortably on Kindle and Boox readers without eye strain.</li>
              <li><strong>Scanned Document Archivists:</strong> Trim uneven dark borders and photocopier edge shadows from historical archives.</li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            The Technology: Non-Destructive /CropBox Adjustment
          </h2>
          <p>
            Unlike crude converters that rasterize and slice images, iCreatePDF operates strictly at the PDF object level:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/70">
            <li><strong>Luminance Threshold Analysis:</strong> An off-screen HTML5 canvas inspects pixel rows and columns, identifying the true bounding coordinates <code>[xMin, yMin, xMax, yMax]</code> of all text and graphics.</li>
            <li><strong>ISO 32000 /CropBox Injection:</strong> We write the computed coordinates directly to the page&apos;s <code>/CropBox</code> dictionary. The underlying vector text, fonts, and embedded images remain 100% untouched.</li>
            <li><strong>Reversible:</strong> Because the original <code>/MediaBox</code> is preserved in the file structure, the crop is completely non-destructive.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Auto-Crop PDF Margins
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
              <strong>100% In-Browser Privacy:</strong> Your books, personal notes, and research papers are parsed and cropped entirely in local browser memory via WebAssembly. Zero files or pages are ever sent over the network.
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
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-purple-950/20 border border-emerald-500/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Auto-crop your PDF margins now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Free, automatic whitespace detection in your browser. No file uploads.</p>
          <Link href="/auto-crop-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch Auto-Crop PDF Tool
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-auto-crop-pdf-margins" />
      </article>

      <FooterSection />
    </div>
  );
}
