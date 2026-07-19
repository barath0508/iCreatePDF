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
  title: 'How to Scan Documents to PDF with Your Phone or Webcam — Free Guide | iCreatePDF',
  description: 'Turn your phone or webcam camera into a document scanner. Crop, compile, and convert captured photos into a single PDF, entirely in your browser.',
  keywords: 'scan to pdf, document scanner online, phone scanner pdf, webcam document scan, scan to pdf free 2026',
  alternates: buildAlternates('/blogs/how-to-scan-documents-to-pdf'),
  openGraph: {
    title: 'How to Scan Documents to PDF with Your Phone or Webcam — Free Guide',
    description: 'Turn your phone or webcam camera into a document scanner, entirely in your browser.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Signed Contracts', desc: 'Scan a physically signed paper contract into a PDF to email back without a dedicated scanner.' },
  { title: 'Receipts & Invoices', desc: 'Capture paper receipts for expense reports before they fade or get lost.' },
  { title: 'ID Documents', desc: 'Scan a physical ID or certificate copy for a digital application form.' },
  { title: 'Handwritten Notes', desc: 'Digitize handwritten meeting notes or whiteboard photos into a single shareable PDF.' },
  { title: 'Multi-Page Forms', desc: 'Capture several pages of a paper form in sequence and compile them into one document.' },
  { title: 'Mail & Correspondence', desc: 'Keep a digital PDF record of important physical mail or letters.' },
];

export default function ScanToPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
          title: 'How to Scan Documents to PDF with Your Phone or Webcam — Free Guide | iCreatePDF',
          description: 'Turn your phone or webcam camera into a document scanner. Crop, compile, and convert captured photos into a single PDF, entirely in your browser.',
          url: '/blogs/how-to-scan-documents-to-pdf',
          datePublished: '2026-07-18T00:00:00Z'
        }),
            {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do I need to install an app to scan with my phone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. iCreatePDF works directly in your phone's browser, using its camera through standard web APIs \u2014 no app store download required."
                }
              },
              {
                "@type": "Question",
                "name": "Can I combine multiple scanned pages into one PDF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes \u2014 capture or upload as many pages as needed, arrange them in order, and compile them into a single multi-page PDF."
                }
              },
              {
                "@type": "Question",
                "name": "Is the scan quality good enough to read text clearly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, for most standard printed or handwritten documents. If you need the scanned text to be searchable, run the result through PDF OCR afterward."
                }
              },
              {
                "@type": "Question",
                "name": "Does this work on desktop with a webcam?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes \u2014 any device with camera access, including laptop webcams, can be used for scanning through the same browser-based tool."
                }
              }
            ]
          }
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Document Setup</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Scan Documents to PDF with Your Phone or Webcam — Free Guide
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Turn a stack of paper into a single, clean PDF using just your phone or laptop camera — no scanner app download required.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-07-18">July 18, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            You don't need a physical scanner to digitize a document — your phone or laptop's built-in camera is enough. The key is capturing each page cleanly, cropping out the surrounding table or desk, and compiling multiple pages into a single ordered PDF, all of which iCreatePDF handles directly in your browser.
          </p>

          
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#step-by-step-scan-a-document-using-icreatepdf" className="hover:text-brand transition-colors">
                  Step-by-Step: Scan a Document Using iCreatePDF
                </Link>
              </li>
              <li>
                <Link href="#6-reasons-to-scan-with-your-camera-instead-of-a-scanner" className="hover:text-brand transition-colors">
                  6 Reasons to Scan with Your Camera Instead of a Scanner
                </Link>
              </li>
              <li>
                <Link href="#tips-for-cleaner-camera-scans" className="hover:text-brand transition-colors">
                  Tips for Cleaner Camera Scans
                </Link>
              </li>
              <li>
                <Link href="#icreatepdf-vs-other-scanning-apps" className="hover:text-brand transition-colors">
                  iCreatePDF vs Other Scanning Apps
                </Link>
              </li>
              <li>
                <Link href="#frequently-asked-questions" className="hover:text-brand transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

<h2 id="step-by-step-scan-a-document-using-icreatepdf" className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Scan a Document Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/tools/scan-to-pdf" className="text-brand hover:underline">iCreatePDF Scan to PDF</Link> on your phone or laptop.</li>
            <li>Allow camera access and capture each page, or upload existing photos.</li>
            <li>Crop each capture to the document edges and adjust order if needed.</li>
            <li>Compile all pages into a single PDF and download.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Captured photos are cropped and compiled into a PDF entirely on your device. Nothing is uploaded to iCreatePDF or any third party — important for scanning IDs, contracts, or financial paperwork.
            </p>
          </div>

          <h2 id="6-reasons-to-scan-with-your-camera-instead-of-a-scanner" className="text-xl font-bold text-foreground pt-4 font-display">6 Reasons to Scan with Your Camera Instead of a Scanner</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="tips-for-cleaner-camera-scans" className="text-xl font-bold text-foreground pt-4 font-display">Tips for Cleaner Camera Scans</h2>
          <p>
            Use even, indirect lighting to avoid glare and shadows, place the document on a plain contrasting surface to make edge detection easier, and hold the camera directly overhead rather than at an angle to minimize perspective distortion. If a page still looks a little crooked afterward, fix it with <Link href="/tools/rotate-pdf" className="text-brand hover:underline">Rotate PDF</Link> before finalizing.
          </p>

          <h2 id="icreatepdf-vs-other-scanning-apps" className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other Scanning Apps</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-foreground/70 border border-foreground/10 rounded-xl overflow-hidden">
              <thead className="bg-foreground/5 text-foreground font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Feature</th>
                  <th className="text-left px-4 py-3">iCreatePDF</th>
                  <th className="text-left px-4 py-3">Typical Scanner Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {[
                  ['App install required', 'No — works in your browser', 'Usually yes'],
                  ['Photos uploaded to a server', 'Never', 'Often, for cloud sync'],
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

          <h2 id="frequently-asked-questions" className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Do I need to install an app to scan with my phone?', a: 'No. iCreatePDF works directly in your phone\'s browser, using its camera through standard web APIs — no app store download required.' },
              { q: 'Can I combine multiple scanned pages into one PDF?', a: 'Yes — capture or upload as many pages as needed, arrange them in order, and compile them into a single multi-page PDF.' },
              { q: 'Is the scan quality good enough to read text clearly?', a: 'Yes, for most standard printed or handwritten documents. If you need the scanned text to be searchable, run the result through PDF OCR afterward.' },
              { q: 'Does this work on desktop with a webcam?', a: 'Yes — any device with camera access, including laptop webcams, can be used for scanning through the same browser-based tool.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Scan your documents now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your scans stay on your device.</p>
          <Link href="/tools/scan-to-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Scan to PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-scan-documents-to-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
