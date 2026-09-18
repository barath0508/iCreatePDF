import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Image, FileArchive, CheckCircle2, Lock, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Extract Images from PDF Online Free (Lossless ZIP Export) | iCreatePDF',
  description: 'Extract embedded photos, graphics, and illustrations from any PDF in original high resolution without recompression. Download as a ZIP archive with 100% privacy.',
  keywords: 'extract images from pdf free, rip images from pdf online, extract photos from pdf lossless, pull images out of pdf to zip, pdf image extractor free',
  alternates: buildAlternates('/blogs/how-to-extract-images-from-pdf'),
  openGraph: {
    title: 'How to Extract Images from PDF Online Free (Lossless ZIP Export) | iCreatePDF',
    description: 'Extract embedded photos, graphics, and illustrations from any PDF in original high resolution without recompression. Download as a ZIP archive with 100% privacy.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
  },
};

const faqs = [
  {
    question: 'How is extracting embedded images different from taking screenshots of PDF pages?',
    answer: 'Taking a screenshot captures only your display monitor resolution (typically 72 to 96 DPI), which degrades quality and clips photos behind text. Extracting embedded images pulls the raw, uncompressed binary image stream (/XObject) directly out of the PDF structure, preserving the photographer\'s original 300+ DPI resolution, color gamut, and dimensions without a single pixel of recompression loss.'
  },
  {
    question: 'What image formats can be extracted from a PDF document?',
    answer: 'iCreatePDF extracts images in their native embedded formats: JPEG (.jpg, DCTDecode streams), PNG (.png, FlateDecode streams with alpha transparency), JPEG 2000 (.jp2), and TIFF/CCITT fax streams.'
  },
  {
    question: 'Can I extract all images from a 100-page catalog into a single ZIP archive?',
    answer: 'Yes. The extractor crawls every page object, indexes all embedded raster graphics, filters out microscopic icons or decorative dividers if desired, and bundles every extracted photo into a neatly numbered ZIP file.'
  },
  {
    question: 'Are my private photo albums or copyrighted illustrations uploaded to a server?',
    answer: 'No. Binary stream parsing, FlateDecode decompression, and ZIP generation execute 100% locally inside your web browser sandbox using WebAssembly and JSZip. Zero images are ever uploaded to an external server.'
  }
];

const howToSteps = [
  {
    title: 'Upload your document to the Extract Images tool',
    description: 'Select your photo album, catalog, or illustrated PDF in the iCreatePDF Extract Images studio.'
  },
  {
    title: 'Automatic image discovery and gallery preview',
    description: 'The engine scans the /XObject dictionaries and generates thumbnail previews of every embedded photo with dimensions and file sizes.'
  },
  {
    title: 'Select individual photos or choose "Extract All"',
    description: 'Download specific images individually or select the entire collection for bulk export.'
  },
  {
    title: 'Download your high-resolution ZIP package',
    description: 'Export your extracted images in their native, untouched resolutions ready for print and graphic editing.'
  }
];

export default function ExtractImagesFromPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Extract Images from PDF Online Free (Lossless ZIP Export) | iCreatePDF',
              description: 'Extract embedded photos, graphics, and illustrations from any PDF in original high resolution without recompression. Download as a ZIP archive with 100% privacy.',
              url: '/blogs/how-to-extract-images-from-pdf',
              datePublished: '2026-07-25T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Extract Images from PDF',
              description: 'Step-by-step instructions for extracting high-resolution embedded photos from PDF documents into a ZIP package.',
              url: '/blogs/how-to-extract-images-from-pdf',
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
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase font-mono">
            Media Extraction &amp; Photography
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Extract Images from PDF Online Free (Lossless ZIP Export)
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Pull original high-resolution photos, illustrations, and logos out of any PDF file without recompression or quality loss. Download individual pictures or the full collection as a ZIP.
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
            You receive a PDF presentation, a product catalog, or an architectural bid, and you urgently need the high-resolution source photographs embedded inside it. But the original camera RAW or JPEG files have been lost or buried in archives.
          </p>
          <p>
            Most people resort to snapping screen captures using snipping tools. But a screen capture only captures the pixels currently rendered on your display screen (typically 72 to 96 DPI). If the original photographer embedded a crisp 300 DPI or 600 DPI photo, taking a screenshot throws away up to <strong>80% of the image resolution</strong>.
          </p>
          <p>
            <strong>Lossless image stream extraction</strong> bypasses the screen renderer completely, reaching directly into the PDF&apos;s internal object dictionaries to pull out the exact binary byte stream of the original photograph.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 font-display">
              <Image className="w-4 h-4 text-amber-400" />
              Why Direct Image Extraction Beats Screenshots
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/70 pl-1">
              <li><strong>Zero Recompression Loss:</strong> JPEGs are extracted with their original Discrete Cosine Transform (DCT) tables without generational quality loss.</li>
              <li><strong>Preserves Transparent PNG Channels:</strong> Alpha masks and transparent cutouts remain intact for graphic designers.</li>
              <li><strong>Untouched Native Dimensions:</strong> If a 4000 &times; 3000 pixel camera shot was placed on an A4 page, you get the full 12-megapixel image back.</li>
              <li><strong>Bulk Automation:</strong> Extract 50+ photos in a single click, packaged in a clean, organized ZIP archive.</li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            The Technology: Parsing /XObject /Image Streams
          </h2>
          <p>
            In the ISO 32000 specification, graphical raster assets are stored as independent <strong>XObject</strong> dictionary streams:
          </p>
          <div className="p-5 rounded-2xl bg-card border border-foreground/5 space-y-2 text-xs sm:text-sm font-mono text-foreground/80">
            <p className="text-brand font-bold">15 0 obj &lt;&lt; /Type /XObject /Subtype /Image /Width 3840 /Height 2160</p>
            <p className="text-foreground/60 pl-4">/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode</p>
            <p className="text-foreground/60 pl-4">/Length 248102 &gt;&gt; stream ...endstream</p>
          </div>
          <p>
            The <code>/Filter /DCTDecode</code> indicates that the raw byte stream is already a standard JPEG file. iCreatePDF simply adds the JPEG header markers (SOI / EOI) and writes the byte array directly to a downloadable file or ZIP container—executing at memory-bus speeds without decoding or recompressing pixels.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Extract Images from PDF
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
              <strong>100% In-Browser Confidentiality:</strong> Your private family photos, confidential product prototypes, and proprietary art assets are processed entirely inside your web browser sandbox via WebAssembly. Zero photos are ever uploaded to cloud servers.
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
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/20 to-purple-950/20 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Extract your PDF images now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Lossless high-resolution export in seconds. Free, private, and in-browser.</p>
          <Link href="/extract-pdf-images">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs px-6 rounded-full group">
              Launch Extract Images Tool
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-extract-images-from-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
