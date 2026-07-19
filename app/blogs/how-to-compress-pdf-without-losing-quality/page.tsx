import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Compress a PDF Without Losing Quality (2026 Guide) | iCreatePDF',
  description: 'Learn the best methods to reduce PDF file size while keeping images and text sharp. No quality loss, no uploads, all done in your browser for free.',
  keywords: 'compress pdf without losing quality, reduce pdf file size, shrink pdf free, pdf compression guide 2026, compress pdf online free',
  alternates: buildAlternates('/blogs/how-to-compress-pdf-without-losing-quality'),
  openGraph: {
    title: 'How to Compress a PDF Without Losing Quality (2026)',
    description: 'Reduce your PDF file size for free — right in your browser. No uploads, no quality loss.',
    type: 'article',
    publishedTime: '2026-05-25T00:00:00Z',
  },
};

const tips = [
  { title: 'Use the Right Compression Level', desc: 'For documents with mostly text, "High" compression has virtually zero visible impact. Only use "Medium" or "Low" for design-heavy files with complex gradients.' },
  { title: 'Remove Hidden Metadata', desc: 'PDFs often embed author info, edit history, fonts subsets, and embedded thumbnails. Stripping these can reduce file size by 10–30% alone.' },
  { title: 'Downsample Images Selectively', desc: 'Images embedded at 600dpi for printing are overkill for web sharing. Resampling to 150–200dpi for screen viewing maintains clarity while dramatically reducing size.' },
  { title: 'Flatten Annotations and Form Fields', desc: 'Interactive form fields, comments, and digital signatures add overhead. Flattening bakes them into static content, reducing complexity.' },
];

const myths = [
  { myth: '"More compression always means bad quality"', truth: 'Text, vectors, and simple graphics compress nearly losslessly. Quality loss mainly affects embedded raster images.' },
  { myth: '"You need desktop software to compress PDFs"', truth: 'Modern browser APIs can match desktop tool quality using canvas rendering and efficient byte encoding.' },
  { myth: '"Compressed PDFs can\'t be edited"', truth: 'Standard compression doesn\'t lock a PDF — it just reduces file size. Editing capabilities depend on PDF permissions, not compression.' },
];

export default function CompressPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Compress a PDF Without Losing Quality (2026 Guide) | iCreatePDF',
          description: 'Learn the best methods to reduce PDF file size while keeping images and text sharp. No quality loss, no uploads, all done in your browser for free.',
          url: '/blogs/how-to-compress-pdf-without-losing-quality',
          datePublished: '2026-05-25T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full uppercase">PDF Compression</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Compress a PDF Without Losing Quality (2026 Guide)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            A bloated PDF can be rejected by email servers, slow to upload to portals, or frustrating to share. Here is exactly how to shrink yours without sacrificing readability.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-05-25">May 25, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            PDF files grow large for many reasons — embedded high-resolution images, multiple font subsets, attached metadata, form fields, and redundant object streams. A 50MB PDF from a scanner can easily be brought down to under 5MB without any perceptible quality loss, if you know the right approach.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Optimal Sizing:</strong> Local compression resizes images and compacts font arrays without blurring text.</li>
              <li><strong>Email Limits:</strong> Compress large files below 10MB to comply with email client attachments.</li>
              <li><strong>Browser Safety:</strong> Keep secure legal and accounting records safe from server-side compromises.</li>
            </ul>
          </div>
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#why-do-pdf-files-get-so-large" className="hover:text-brand transition-colors">
                  Why Do PDF Files Get So Large?
                </Link>
              </li>
              <li>
                <Link href="#what-are-the-top-4-expert-tips-for-better-pdf-compression" className="hover:text-brand transition-colors">
                  What Are the Top 4 Expert Tips for Better PDF Compression?
                </Link>
              </li>
              <li>
                <Link href="#how-do-you-compress-a-pdf-offline-with-icreatepdf" className="hover:text-brand transition-colors">
                  How Do You Compress a PDF Offline with iCreatePDF?
                </Link>
              </li>
              <li>
                <Link href="#what-are-the-common-myths-about-pdf-compression" className="hover:text-brand transition-colors">
                  What Are the Common Myths About PDF Compression?
                </Link>
              </li>
              <li>
                <Link href="#what-file-size-should-you-target-for-standard-email-attachments" className="hover:text-brand transition-colors">
                  What File Size Should You Target for Standard Email Attachments?
                </Link>
              </li>
            </ul>
          </div>


          <p>
            <strong>PDF compression</strong> is the process of reducing a document's file size by downsampling image resolutions, compacting font streams, and scrubbing metadata. <strong>Lossless compression</strong> reduces bytes without degrading the visual readability of vectors or text labels. Compressing files locally allows you to keep secure legal or accounting records private from cloud servers.
          </p>

          <h2 id="why-do-pdf-files-get-so-large" className="text-xl font-bold text-foreground pt-4 font-display">Why Do PDF Files Get So Large?</h2>
          <p>
            Most PDFs originate from scanned documents, design exports (Photoshop, Illustrator, InDesign), or word processors. Each source embeds data differently:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li><strong className="text-foreground">Scanned PDFs</strong> are essentially image files in a PDF wrapper — each page is a large raster image at 300–600dpi.</li>
            <li><strong className="text-foreground">Word processor exports</strong> embed full font files, metadata, and revision history.</li>
            <li><strong className="text-foreground">Design exports</strong> include colour profiles, embedded thumbnails, and uncompressed vector paths.</li>
          </ul>

          <h2 id="what-are-the-top-4-expert-tips-for-better-pdf-compression" className="text-xl font-bold text-foreground pt-4 font-display">What Are the Top 4 Expert Tips for Better PDF Compression?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {tips.map((t, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-2">
                <span className="text-xs font-bold text-brand">Tip {i + 1}</span>
                <h3 className="font-bold text-foreground text-sm">{t.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{t.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="how-do-you-compress-a-pdf-offline-with-icreatepdf" className="text-xl font-bold text-foreground pt-4 font-display">How Do You Compress a PDF Offline with iCreatePDF?</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Go to <Link href="/tools/compress-pdf" className="text-brand hover:underline">/compress-pdf</Link> — no sign-up needed.</li>
            <li>Drop your PDF onto the upload zone.</li>
            <li>Choose a compression level: <strong className="text-foreground">High</strong> (best for text-heavy docs), <strong className="text-foreground">Medium</strong> (balanced), or <strong className="text-foreground">Low</strong> (preserves print-quality images).</li>
            <li>Click <em>Compress PDF</em> and download your smaller file instantly.</li>
          </ol>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 my-6">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200 leading-relaxed">
              <strong>Pro tip:</strong> If your PDF is a scanned document, run it through the Grayscale tool first before compressing. Converting colour scans to greyscale before compression can reduce file size by an additional 30–60%.
            </p>
          </div>

          <h2 id="what-are-the-common-myths-about-pdf-compression" className="text-xl font-bold text-foreground pt-4 font-display">What Are the Common Myths About PDF Compression?</h2>
          <div className="space-y-4">
            {myths.map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1">
                <p className="text-xs text-red-400 line-through">{m.myth}</p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground/70 leading-relaxed">{m.truth}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 id="what-file-size-should-you-target-for-standard-email-attachments" className="text-xl font-bold text-foreground pt-4 font-display">What File Size Should You Target for Standard Email Attachments?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-foreground/70 border border-foreground/10 rounded-xl overflow-hidden">
              <thead className="bg-foreground/5 text-foreground font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Use Case</th>
                  <th className="text-left px-4 py-3">Target Size</th>
                  <th className="text-left px-4 py-3">Compression Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {[
                  ['Email attachment', 'Under 5 MB', 'High'],
                  ['Online portal upload', 'Under 2 MB', 'High'],
                  ['Web embedding', 'Under 1 MB', 'High'],
                  ['Print-ready archive', '10–25 MB', 'Low or None'],
                  ['General sharing', '2–8 MB', 'Medium'],
                ].map(([use, size, level]) => (
                  <tr key={use}>
                    <td className="px-4 py-3">{use}</td>
                    <td className="px-4 py-3 text-brand font-mono">{size}</td>
                    <td className="px-4 py-3">{level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Ready to shrink your PDF?</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">100% client-side compression — your files never leave your browser.</p>
          <Link href="/tools/compress-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Compress PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-compress-pdf-without-losing-quality" />
      </article>

      <FooterSection />
    </div>
  );
}
