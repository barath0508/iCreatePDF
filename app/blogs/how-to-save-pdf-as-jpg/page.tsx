import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Download, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Save PDF as JPG (Free, Online, No Quality Loss) | iCreatePDF',
  description: 'Learn how to save a PDF as JPG images on Windows, Mac, iPhone, and Android for free. Extract individual pages or download all pages as high-resolution JPGs in a single ZIP.',
  keywords: 'how to save pdf as jpg, save pdf as image, save pdf page as jpg, convert pdf to jpg free, export pdf to jpeg without losing quality',
  alternates: buildAlternates('/blogs/how-to-save-pdf-as-jpg'),
  openGraph: {
    title: 'How to Save PDF as JPG (Free, Online, No Quality Loss)',
    description: 'Learn how to save a PDF as JPG images on Windows, Mac, iPhone, and Android for free. Instant in-browser conversion with zero server uploads.',
    type: 'article',
    publishedTime: '2026-08-22T00:00:00Z',
  },
};

const platforms = [
  {
    name: 'Windows 10 / 11',
    steps: 'Open iCreatePDF in Edge or Chrome > Drag PDF file into the converter > Click "Download All" to save your high-res JPGs to the Downloads folder.',
  },
  {
    name: 'Mac & MacBook',
    steps: 'Open iCreatePDF in Safari > Drop your PDF > Each page renders as a crisp JPEG with zero server uploads.',
  },
  {
    name: 'iPhone & iPad',
    steps: 'Open Safari > Select PDF from Files app or iCloud > Tap individual page thumbnails to save directly to Apple Photos camera roll.',
  },
  {
    name: 'Android Mobile',
    steps: 'Open Chrome > Choose PDF from Google Drive or Downloads > Tap Download ZIP to save all extracted JPG images directly to your gallery.',
  },
];

const faqs = [
  {
    question: 'How do I save only one page of a PDF as a JPG?',
    answer: 'When you upload your PDF to iCreatePDF PDF to JPG, all pages are rendered as individual interactive thumbnails. Simply click the download button below the specific page you need, instead of downloading the entire ZIP archive.',
  },
  {
    question: 'Will saving a PDF as a JPG reduce the image or text quality?',
    answer: 'iCreatePDF renders PDF pages at a high pixel density (2x scale / high DPI) using hardware-accelerated HTML5 Canvas. Text remains crisp and diagrams preserve sharp detail for presentations and print.',
  },
  {
    question: 'Is it free to save multiple large PDFs as JPGs?',
    answer: 'Yes! iCreatePDF enforces no daily conversion quotas, no page number restrictions, and no file size limits because files are rendered locally by your browser.',
  },
  {
    question: 'Are my confidential documents uploaded to an online server?',
    answer: 'No. Unlike traditional converters that send your files to remote cloud servers, iCreatePDF executes conversion entirely within your web browser. Your confidential contracts, IDs, and financial records never leave your device.',
  },
];

const howToSteps = [
  {
    title: 'Upload your PDF document',
    description: 'Go to iCreatePDF PDF to JPG converter and select or drag-and-drop your PDF.',
  },
  {
    title: 'Preview page thumbnails',
    description: 'Every page of your PDF is automatically converted into high-resolution JPG previews in real time.',
  },
  {
    title: 'Download individual JPG or complete ZIP',
    description: 'Click "Download" on single pages, or hit "Download All as ZIP" to get every page organized in numerical order.',
  },
];

export default function SavePdfAsJpgPage() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Save PDF as JPG (Free, Online, No Quality Loss) | iCreatePDF',
              description: 'Learn how to save a PDF as JPG images on Windows, Mac, iPhone, and Android for free. Extract individual pages or download all pages as high-res JPGs.',
              url: '/blogs/how-to-save-pdf-as-jpg',
              datePublished: '2026-08-22T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Save PDF as JPG',
              description: 'Step-by-step instructions on saving PDF documents as JPEG images for free on any device.',
              url: '/blogs/how-to-save-pdf-as-jpg',
              steps: howToSteps,
            }),
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Image Conversion</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Save PDF as JPG (Free, Online &amp; High Resolution)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Convert any PDF file into sharp JPG images in seconds. No software installation, no daily usage limits, and 100% private in-browser processing.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; Document Architect)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-08-22">August 22, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Whether you need to upload a certificate to an online application form, insert a page from an eBook into a PowerPoint presentation, or share a single infographic on social media, saving a PDF as a JPG is the cleanest solution.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Instant 1-Click Extraction:</strong> Save all pages into a ZIP archive or pick individual pages.</li>
              <li><strong>Zero Cloud Uploads:</strong> Your documents are converted in your browser's local sandbox for 100% privacy.</li>
              <li><strong>Cross-Platform Compatibility:</strong> Works seamlessly on Mac, Windows, iPhone, iPad, and Android.</li>
            </ul>
          </div>

          <h2 id="step-by-step-save-pdf-as-jpg" className="text-xl font-bold text-foreground pt-4 font-display">
            3 Simple Steps to Save PDF as JPG
          </h2>
          <ol className="list-decimal list-inside space-y-3 pl-2 text-sm sm:text-base">
            {howToSteps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <strong className="text-foreground">{step.title}:</strong> {step.description}
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>100% Privacy Guarantee:</strong> Unlike traditional websites that upload your personal documents to remote cloud servers, iCreatePDF renders your pages locally inside your browser using HTML5 Canvas. Your files never touch our servers.
            </p>
          </div>

          <h2 id="how-to-save-on-any-device" className="text-xl font-bold text-foreground pt-4 font-display">
            How to Save PDF as JPG on Any Device (Windows, Mac, iPhone, Android)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {platforms.map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-brand" /> {p.name}
                </h3>
                <p className="text-xs text-foreground/60 leading-normal">{p.steps}</p>
              </div>
            ))}
          </div>

          <h2 id="why-choose-icreatepdf" className="text-xl font-bold text-foreground pt-4 font-display">
            Why Use iCreatePDF to Save PDFs as JPG?
          </h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-xs text-foreground/70 border border-foreground/10 rounded-xl overflow-hidden">
              <thead className="bg-foreground/5 text-foreground font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Feature</th>
                  <th className="text-left px-4 py-3">iCreatePDF</th>
                  <th className="text-left px-4 py-3">Standard PDF Sites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {[
                  ['Server Uploads', 'None (100% Client-Side)', 'Required (Sent to Cloud)'],
                  ['Daily Limits', 'Unlimited Free', '1-2 tasks per day'],
                  ['Watermarks', 'Zero Watermarks', 'Often stamped on free exports'],
                  ['Single Page Export', 'Instant 1-Click', 'Usually restricted'],
                  ['Batch ZIP Download', 'Included Free', 'Often Premium Only'],
                ].map(([f, ours, others]) => (
                  <tr key={f}>
                    <td className="px-4 py-3 font-medium text-foreground/80">{f}</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">{ours}</td>
                    <td className="px-4 py-3 text-red-400/80">{others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="frequently-asked-questions" className="text-xl font-bold text-foreground pt-4 font-display">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{question}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Ready to save your PDF as JPG?</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Instant conversion. No email registration. Download high-resolution JPGs right now.</p>
          <Link href="/pdf-to-jpg">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Save PDF as JPG Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-save-pdf-as-jpg" />
      </article>

      <FooterSection />
    </div>
  );
}
