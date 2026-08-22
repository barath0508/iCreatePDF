import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Minimize2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Compress PDF to 200KB Online Free (For Government & Job Portals) | iCreatePDF',
  description: 'Reduce PDF file size to 200KB, 100KB, or 50KB online for free. Ideal for government exam portals, job applications, passport submissions, and university uploads.',
  keywords: 'how to compress pdf to 200kb online, compress pdf to 100kb, reduce pdf size below 200kb, compress pdf for government job application, compress pdf to chosen size',
  alternates: buildAlternates('/blogs/how-to-compress-pdf-to-200kb-online'),
  openGraph: {
    title: 'How to Compress PDF to 200KB Online Free (For Government & Job Portals)',
    description: 'Reduce PDF file size to 200KB, 100KB, or 50KB online for free. Instant in-browser compression with zero quality degradation.',
    type: 'article',
    publishedTime: '2026-08-22T00:00:00Z',
  },
};

const portalTargets = [
  { size: '200 KB', useCase: 'Government Job Applications & UPSC / SSC / PSC recruitment portals' },
  { size: '100 KB', useCase: 'Passport, Visa applications & National ID document upload systems' },
  { size: '300 KB – 500 KB', useCase: 'University admissions, scholarship forms & college grade submissions' },
  { size: 'Under 1 MB', useCase: 'Email attachments & corporate job candidate resume portals' },
];

const faqs = [
  {
    question: 'How do I reduce my PDF file to exactly under 200 KB?',
    answer: 'Open iCreatePDF Compress PDF, select your document, and choose "Medium" or "High Compression". The tool will optimize image quantization and strip unneeded structural metadata to drop the file size below 200KB while preserving sharp text.',
  },
  {
    question: 'Will text become blurry when compressing to 200KB or 100KB?',
    answer: 'No. iCreatePDF utilizes smart font subsetting and selective raster downsampling. Vector typography remains razor-sharp, ensuring your certificates, marks cards, and signatures pass automated portal verification.',
  },
  {
    question: 'Is it safe to upload sensitive identity documents like passports and tax IDs?',
    answer: 'iCreatePDF never uploads your files to a cloud server. Everything executes locally on your device\'s CPU using WebAssembly, ensuring your private identity documents never leave your browser.',
  },
];

const howToSteps = [
  {
    title: 'Upload your PDF document',
    description: 'Go to iCreatePDF Compress PDF and drag your oversized PDF into the box.',
  },
  {
    title: 'Select compression level',
    description: 'Choose High Compression (for files over 2MB aiming for 100KB–200KB) or Recommended Compression.',
  },
  {
    title: 'Download optimized 200KB PDF',
    description: 'Check the real-time file size indicator and click Download to save your compliant PDF for instant upload.',
  },
];

export default function CompressPdfTo200kbPage() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Compress PDF to 200KB Online Free (For Government & Job Portals) | iCreatePDF',
              description: 'Reduce PDF file size to 200KB, 100KB, or 50KB online for free. Ideal for government exam portals and passport submissions.',
              url: '/blogs/how-to-compress-pdf-to-200kb-online',
              datePublished: '2026-08-22T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Compress PDF to 200KB',
              description: 'Step-by-step tutorial on reducing PDF file sizes to under 200KB or 100KB for application portals.',
              url: '/blogs/how-to-compress-pdf-to-200kb-online',
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Document Optimization</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Compress PDF to 200KB Online Free (For Government &amp; Job Portals)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Meet strict online upload requirements without losing readability. Reduce oversized PDFs to under 200KB, 100KB, or 50KB instantly in your browser.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; Optimization Specialist)
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
            Almost every government recruitment portal, university admission system, and passport office enforces a strict document upload ceiling — typically **under 200 KB** or **under 100 KB**. If your scanned certificate or marks card is 2 MB to 5 MB, your application will be rejected with an *"Exceeds maximum file size"* error.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Targeted File Reductions:</strong> Drop 5MB+ scanned PDFs down to 100KB–200KB in seconds.</li>
              <li><strong>Pass Official Verification:</strong> Preserves clear signatures, stamps, and high-contrast text.</li>
              <li><strong>Zero Cloud Uploads:</strong> Safe for national identity documents, passports, and academic transcripts.</li>
            </ul>
          </div>

          <h2 id="popular-portal-size-limits" className="text-xl font-bold text-foreground pt-4 font-display">
            Common Portal File Size Requirements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {portalTargets.map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5 text-brand">
                  <Minimize2 className="w-4 h-4" /> Limit: {p.size}
                </h3>
                <p className="text-xs text-foreground/60 leading-normal">{p.useCase}</p>
              </div>
            ))}
          </div>

          <h2 id="step-by-step-compression" className="text-xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Reduce PDF Below 200KB with iCreatePDF
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
              <strong>Applicant Privacy Guarantee:</strong> Never upload your government identity proofs or financial statements to unverified cloud servers. iCreatePDF processes your files entirely on your device with 100% data confidentiality.
            </p>
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
          <h3 className="text-lg font-bold text-foreground font-display">Compress your PDF to 200KB right now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Fast, free, and compliant with all online portals.</p>
          <Link href="/compress-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Compress PDF to 200KB Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-compress-pdf-to-200kb-online" />
      </article>

      <FooterSection />
    </div>
  );
}
