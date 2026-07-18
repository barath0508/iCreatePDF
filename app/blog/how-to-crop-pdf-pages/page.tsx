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
  title: 'How to Crop PDF Pages Online — Free Guide | iCreatePDF',
  description: 'Trim margins, remove scanner borders, and cut white space from PDF pages. 100% browser-based cropping — no uploads, apply to one page or all.',
  keywords: 'crop pdf, crop pdf pages online, trim pdf margins, remove pdf white space, crop pdf free 2026',
  alternates: buildAlternates('/blog/how-to-crop-pdf-pages'),
  openGraph: {
    title: 'How to Crop PDF Pages Online — Free Guide',
    description: 'Trim margins, remove scanner borders, and cut white space from PDF pages.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Scanner Border Removal', desc: 'Cut off the black borders and shadows a flatbed scanner adds around the page edge.' },
  { title: 'Ebook Formatting', desc: 'Trim wide margins from a printed book scan to make it more readable on smaller screens.' },
  { title: 'Slide Exports', desc: 'Remove excess white space around a PDF exported from a presentation tool.' },
  { title: 'Receipt Cleanup', desc: 'Crop a long receipt scan down to just the printed content, removing blank paper areas.' },
  { title: 'Print Layout Fixes', desc: 'Adjust margins so a document fits correctly within a specific print template or binding area.' },
  { title: 'Focus on Key Content', desc: 'Crop a page down to a single chart, table, or diagram for isolated sharing.' },
];

export default function CropPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Crop PDF Pages Online — Free Guide | iCreatePDF',
          description: 'Trim margins, remove scanner borders, and cut white space from PDF pages. 100% browser-based cropping — no uploads, apply to one page or all.',
          url: '/blog/how-to-crop-pdf-pages',
          datePublished: '2026-07-18T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">PDF Editing</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Crop PDF Pages Online — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Trim margins, cut scanner borders, and remove excess white space from any PDF, directly in your browser.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />July 18, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Scanned documents and exported reports often come with wide margins, dark scanner borders, or wasted white space. Cropping trims the visible page area without touching the content itself, and iCreatePDF does it directly in your browser without ever uploading the document.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Crop a PDF Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/crop-pdf" className="text-brand hover:underline">iCreatePDF Crop PDF</Link>.</li>
            <li>Upload your PDF — a visual preview appears with adjustable crop handles.</li>
            <li>Drag the margin handles from each side (top, bottom, left, right) to trim the page.</li>
            <li>Apply the crop to a single page or all pages, then download the result.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Cropping adjusts each page's visible boundary locally in your browser — the document is never uploaded to a server.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">6 Reasons to Crop a PDF</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Cropping vs. Resizing — What's the Difference?</h2>
          <p>
            Cropping trims the visible page boundary, cutting away margins without touching the underlying content's scale. Resizing, by contrast, changes the overall page dimensions (like fitting content to A4 or Letter). If your goal is a standardized page size rather than removing borders, use <Link href="/resize-pdf" className="text-brand hover:underline">Resize PDF</Link> instead.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other Crop Tools</h2>
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
                  ['Per-page crop control', 'Yes', 'Sometimes whole-document only'],
                  ['Account required', 'No', 'Often yes'],
                  ['Cost', 'Free', 'Freemium / paywalled'],
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

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Does cropping delete content permanently?', a: 'Cropping changes the visible page boundary. Content outside the crop area is no longer displayed or included in the exported file, so keep your original if you may need the full page later.' },
              { q: 'Can I apply different crop margins to different pages?', a: 'Yes — select individual pages and adjust crop handles independently, or apply the same crop to every page at once.' },
              { q: 'Will cropping affect text selectability?', a: 'No. Cropping only changes the visible page area; any text remaining within the cropped boundary stays fully selectable and searchable.' },
              { q: 'Is there a limit to how much I can crop?', a: 'You can crop as tightly as needed, down to the bounds of your visible content.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Crop your PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/crop-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Crop PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-crop-pdf-pages" />
      </article>

      <FooterSection />
    </div>
  );
}
