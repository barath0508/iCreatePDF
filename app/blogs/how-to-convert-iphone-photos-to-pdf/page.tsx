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
  title: 'How to Convert HEIC Photos to PDF | iCreatePDF Blog',
  description: 'Learn the easiest ways to convert HEIC photos from your mobile device into a single PDF document. Browser methods, offline methods, and step-by-step guides.',
  keywords: 'how to convert heic photo to pdf, heic to pdf online, convert multiple heic to pdf, browser heic converter',
  alternates: buildAlternates('/blogs/how-to-convert-iphone-photos-to-pdf'),
  openGraph: {
    title: 'How to Convert HEIC Photos to PDF | iCreatePDF Blog',
    description: 'Learn the easiest ways to convert HEIC photos from your mobile device into a single PDF document. Browser methods, offline methods, and step-by-step guides.',
    type: 'article',
    publishedTime: '2026-05-20T00:00:00Z',
  },
};

export default function BlogPostOne() {
  const steps = [
    { title: 'Select Your HEIC Photos', desc: 'Open iCreatePDF and click inside the upload box. Choose the HEIC files directly from your device library or files folder.' },
    { title: 'Let the Tool Auto-Convert', desc: 'iCreatePDF instantly translates the HEIC raw bytes into standard JPEG inside your browser.' },
    { title: 'Reorder and Customize', desc: 'Arrange the sequence of pages by dragging. Customize margins and page size options.' },
    { title: 'Download your PDF', desc: 'Click "Convert to PDF" and download. Your pictures never leave your local device.' }
  ];

  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Convert HEIC Photos to PDF | iCreatePDF Blog',
          description: 'Learn the easiest ways to convert HEIC photos from your mobile device into a single PDF document. Browser methods, offline methods, and step-by-step guides.',
          url: '/blogs/how-to-convert-iphone-photos-to-pdf',
          datePublished: '2026-05-20T00:00:00Z'
        })) }}
      />
      <Navigation />
      
      <article className="max-w-3xl mx-auto px-6 py-32 space-y-8 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">
            Mobile Guides
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Convert HEIC Photos to PDF
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-05-20">May 20, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            If you own a modern mobile device, you might have noticed that when you transfer your photos to a computer or upload them to specific application portals, they are saved as <strong>.HEIC</strong> (High Efficiency Image Container) files. While HEIC is excellent for saving storage space, it suffers from poor compatibility outside its native ecosystem.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>HEIC Conversion:</strong> Directly convert Apple's high-efficiency HEIC photos without server transcoding.</li>
              <li><strong>Visual Compiling:</strong> Compile multi-photo sets into single report attachments in seconds.</li>
              <li><strong>Local Performance:</strong> Heavy image files stay inside browser memory, reducing bandwidth costs.</li>
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
                <Link href="#method-1-using-icreatepdf-fastest-amp-safest" className="hover:text-brand transition-colors">
                  Method 1: Using iCreatePDF (Fastest &amp; Safest)
                </Link>
              </li>
              <li>
                <Link href="#how-can-you-compile-iphone-photos-using-apple-shortcuts" className="hover:text-brand transition-colors">
                  How Can You Compile iPhone Photos using Apple Shortcuts?
                </Link>
              </li>
            </ul>
          </div>


          <p>
            Often, you need to convert these photos into a single, cohesive PDF document for school submissions, work reports, or official verification. In this guide, we will show you how to do it in under 30 seconds using free and secure methods.
          </p>

          <h2 id="method-1-using-icreatepdf-fastest-amp-safest" className="text-xl font-bold text-foreground pt-4 font-display">Method 1: Using iCreatePDF (Fastest &amp; Safest)</h2>
          <p>
            iCreatePDF allows you to convert multiple HEIC files into a single PDF directly inside your web browser using the <Link href="/tools/heic-to-pdf" className="text-brand hover:underline">HEIC to PDF</Link> tool page. Since it operates entirely client-side, your high-resolution private photos never touch our servers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {steps.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-2">
                <span className="text-xs font-bold text-brand">Step {idx + 1}</span>
                <h3 className="font-bold text-foreground text-sm">{s.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-8">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200">
              <strong>Security Tip:</strong> Avoid uploading personal documents or sensitive photos to cloud-based PDF converters that process your files on remote servers. Always opt for client-side processing tools.
            </p>
          </div>

          <h2 id="how-can-you-compile-iphone-photos-using-apple-shortcuts" className="text-xl font-bold text-foreground pt-4 font-display">How Can You Compile iPhone Photos using Apple Shortcuts?</h2>
          <p>
            If you want to do this completely offline on your device without any website, you can use the built-in system shortcuts or files application workflow:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-xs sm:text-sm">
            <li>Open the native shortcuts or automation app on your mobile device.</li>
            <li>Create a new automation rule and search for "Select Photos". Toggle "Select Multiple" on.</li>
            <li>Add a second action called "Make PDF".</li>
            <li>Add a third action called "Share" or "Save File".</li>
            <li>Run the workflow, choose your photos, and save the generated PDF.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Ready to convert your photos?</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">
            Start converting your JPG, PNG, WEBP, and HEIC files instantly. Zero sign-up, fully secure.
          </p>
          <Link href="/tools/heic-to-pdf">
            <Button
              className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-4 rounded-full group"
            >
              HEIC to PDF Converter
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-convert-iphone-photos-to-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
