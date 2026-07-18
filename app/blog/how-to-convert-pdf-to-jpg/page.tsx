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
  title: 'How to Convert PDF to JPG Online — Free Guide | iCreatePDF',
  description: 'Turn every page of a PDF into a JPG image in seconds, right in your browser. No uploads, no watermark, download as a ZIP instantly.',
  keywords: 'convert pdf to jpg, pdf to jpg free, pdf to image converter, extract images from pdf, pdf to jpg online 2026',
  alternates: buildAlternates('/blog/how-to-convert-pdf-to-jpg'),
  openGraph: {
    title: 'How to Convert PDF to JPG Online — Free Guide',
    description: 'Turn every page of a PDF into a JPG image, directly in your browser. No uploads, no watermark.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Social Media Posts', desc: 'Turn a PDF flyer or poster into an image you can post directly to Instagram or Facebook.' },
  { title: 'Presentation Slides', desc: 'Convert PDF slide decks into individual JPGs to drop into other slide tools or documents.' },
  { title: 'Website Thumbnails', desc: 'Extract a cover page as a JPG to use as a preview thumbnail or blog header image.' },
  { title: 'Print Shops', desc: 'Some print services require flat image files instead of PDFs — export each page as JPG first.' },
  { title: 'Archiving Old Scans', desc: 'Convert scanned document PDFs back to individual JPGs for photo-management software.' },
  { title: 'Chat & Messaging', desc: 'Share a single page from a long PDF as an image instead of forcing recipients to open the whole file.' },
];

export default function PdfToJpgBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Convert PDF to JPG Online — Free Guide | iCreatePDF',
          description: 'Turn every page of a PDF into a JPG image in seconds, right in your browser. No uploads, no watermark, download as a ZIP instantly.',
          url: '/blog/how-to-convert-pdf-to-jpg',
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Image Conversion</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Convert PDF to JPG Online — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Every page of your PDF becomes a separate JPG image, ready to download as a ZIP — done entirely in your browser in a few seconds.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />July 18, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Sometimes a PDF isn't the format you actually need — you want an image you can paste into a slide, post on social media, or attach to a message without forcing someone to open a PDF viewer. Converting PDF pages to JPG solves that, and you don't need to install anything or upload your document anywhere to do it.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Convert PDF to JPG Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/pdf-to-jpg" className="text-brand hover:underline">iCreatePDF PDF to JPG</Link>.</li>
            <li>Drag and drop your PDF file, or click to browse and select it.</li>
            <li>iCreatePDF renders every page as a high-resolution JPG directly in your browser.</li>
            <li>Download a single page or click <strong className="text-foreground">Download All</strong> to get a ZIP with every page as its own JPG.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Page rendering happens using your browser's built-in Canvas API. Your PDF is never uploaded — the JPGs are generated locally and never touch a server.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">6 Reasons to Convert a PDF to JPG</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Does Converting to JPG Reduce Quality?</h2>
          <p>
            JPG is a lossy format, so extremely fine text can look slightly softer than in the original vector PDF, especially at low resolution. iCreatePDF renders pages at a high pixel density by default, which keeps most documents sharp and readable. If you need to preserve exact text fidelity — for example, to keep text selectable — convert to <Link href="/pdf-to-text" className="text-brand hover:underline">plain text</Link> instead, or keep the file as a PDF.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other PDF-to-JPG Tools</h2>
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
                  ['Account required', 'No', 'Often yes'],
                  ['Page count limits', 'Browser memory only', 'Capped on free tier'],
                  ['Cost', 'Free', 'Freemium / paywalled'],
                  ['Output format', 'Individual JPGs + ZIP', 'Varies'],
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
              { q: 'Can I convert just one page instead of the whole PDF?', a: 'Yes. After conversion, every page appears as a separate thumbnail — download the ones you need individually instead of the full ZIP.' },
              { q: 'What resolution are the JPG images?', a: 'iCreatePDF renders pages at a high pixel density suitable for screen use and most printing. For extremely high-DPI print jobs, check the exported file size before sending to a print shop.' },
              { q: 'Does this work with scanned PDFs?', a: 'Yes — scanned PDFs are already page images internally, so conversion to JPG is fast and preserves the original scan quality.' },
              { q: 'Is there a page limit?', a: "No arbitrary limit is enforced. The practical ceiling depends on your device's available memory for very long documents." },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Convert your PDF to JPG now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/pdf-to-jpg">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Convert PDF to JPG Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-convert-pdf-to-jpg" />
      </article>

      <FooterSection />
    </div>
  );
}
