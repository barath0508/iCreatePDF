import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Printer, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Grayscale and Flatten PDF Documents | iCreatePDF',
  description: 'Learn how to convert color PDFs to black & white for ink-saving printing, and flatten form fields, annotation layers, and signatures locally.',
  keywords: 'grayscale pdf online, convert pdf to black and white, flatten pdf forms, flatten signature layers pdf, print ink-saver pdf',
  alternates: buildAlternates('/blog/how-to-grayscale-and-flatten-pdf'),
  openGraph: {
    title: 'How to Grayscale and Flatten PDF Documents',
    description: 'Save printer cartridges by removing colored backgrounds and secure interactive forms by locking editing fields client-side.',
    type: 'article',
    publishedTime: '2026-05-29T00:00:00Z',
  },
};

export default function GrayscaleFlattenPdfBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Grayscale and Flatten PDF Documents | iCreatePDF',
          description: 'Learn how to convert color PDFs to black & white for ink-saving printing, and flatten form fields, annotation layers, and signatures locally.',
          url: '/blog/how-to-grayscale-and-flatten-pdf',
          datePublished: '2026-05-29T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase">PDF Management</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Grayscale and Flatten PDF Documents for Printing
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Printing colorful PDFs is expensive, and interactive forms are easy to temper with. Learn how to convert pages to black &amp; white and lock PDF input layers securely.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />May 29, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When preparing corporate decks, legal forms, or worksheets for physical printing, converting the layout to grayscale saves significant color toner cartridge costs. Additionally, if you have filled out interactive PDF form fields or added annotations, flattening the document merges these layers into standard page content, preventing others from editing your entries.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Printer className="w-5 h-5 text-brand" />
            Converting PDF to Grayscale (Black &amp; White)
          </h2>
          <p>
            Converting to grayscale strips all saturation levels, converting color coordinates (R,G,B) to their respective luminance values. Here is how to do it:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to the <Link href="/grayscale-pdf" className="text-brand hover:underline">Grayscale PDF</Link> tool page.</li>
            <li>Drag and drop your color document.</li>
            <li>Click <strong>Convert to Grayscale</strong>. The script transforms the color profile of all text, images, and backgrounds locally.</li>
            <li>Download the monochrome PDF.</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand" />
            Flattening Form Fields &amp; Annotations
          </h2>
          <p>
            Standard PDFs support interactive annotation layers (comments, shapes, checkmarks, text field values). Anyone can click these layers to alter their values. Flattening embeds these interactive elements permanently into the page canvas.
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to the <Link href="/flatten-pdf" className="text-brand hover:underline">Flatten PDF</Link> page.</li>
            <li>Upload your completed PDF forms or signed agreements.</li>
            <li>Click <strong>Flatten PDF</strong>. The tool merges form fields and annotations.</li>
            <li>Download the flattened document.</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3 text-center">
            <Printer className="w-8 h-8 text-brand mx-auto" />
            <h4 className="font-bold font-display text-foreground text-sm">Grayscale PDF</h4>
            <p className="text-xs text-foreground/50">Convert color pages to black &amp; white to save ink.</p>
            <Link href="/grayscale-pdf" className="inline-block pt-2">
              <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-4 rounded-full">
                Grayscale PDF
              </Button>
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3 text-center">
            <Layers className="w-8 h-8 text-brand mx-auto" />
            <h4 className="font-bold font-display text-foreground text-sm">Flatten PDF</h4>
            <p className="text-xs text-foreground/50">Lock interactive form fields and signatures permanently.</p>
            <Link href="/flatten-pdf" className="inline-block pt-2">
              <Button className="bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/10 font-medium text-xs px-4 rounded-full">
                Flatten PDF
              </Button>
            </Link>
          </div>
        </div>

        <RelatedPosts currentSlug="how-to-grayscale-and-flatten-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
