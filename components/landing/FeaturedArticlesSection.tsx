import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';
import { SectionEyebrow } from './shared/section-eyebrow';
import { SectionHeading } from './shared/section-heading';
import { Reveal } from './shared/reveal';

const featuredArticles = [
  {
    slug: 'how-to-compress-pdf-to-200kb-online',
    title: 'How to Compress PDF to 200KB Online Free (For Government & Job Portals)',
    excerpt: 'Reduce oversized scanned certificates, passports, and transcripts to under 200KB, 100KB, or 50KB while keeping typography sharp.',
    category: 'Optimization',
    readTime: '4 min read',
    date: 'Aug 22, 2026',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    slug: 'how-to-edit-pdf-on-mac-free',
    title: 'How to Edit PDF on Mac Free (No Watermark or Adobe Subscription)',
    excerpt: 'Complete tutorial on editing PDF text, adding electronic signatures, and filling forms on macOS without recurring subscription fees.',
    category: 'macOS Guide',
    readTime: '5 min read',
    date: 'Aug 22, 2026',
    tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    slug: 'how-to-save-pdf-as-jpg',
    title: 'How to Save PDF as JPG (Free, Online & High Resolution)',
    excerpt: 'Convert every PDF page into high-resolution 300 DPI JPEG image files directly in your browser with zero compression artifacts.',
    category: 'Conversion',
    readTime: '4 min read',
    date: 'Aug 22, 2026',
    tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    slug: 'how-to-split-pdf-files',
    title: 'How to Split PDF Files Online for Free (Separate & Extract Pages)',
    excerpt: 'Extract specific page ranges, split multi-chapter books, or turn individual pages into separate standalone PDF documents.',
    category: 'Document Management',
    readTime: '4 min read',
    date: 'Aug 22, 2026',
    tagColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  },
  {
    slug: 'how-to-auto-redact-pdf-sensitive-data',
    title: 'How to Permanently Redact Sensitive PII (SSNs & Financials) from PDF',
    excerpt: 'Deep-dive security guide on removing confidential metadata and permanently burning black-box redactions into the PDF canvas.',
    category: 'Security & Privacy',
    readTime: '6 min read',
    date: 'Aug 20, 2026',
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    slug: 'proof-zero-server-uploads-how-to-verify-offline-pdf-converter',
    title: 'Proof of Zero Server Uploads: How to Verify Offline Privacy in DevTools',
    excerpt: 'Step-by-step technical tutorial for security auditors on verifying that zero network packets leave your computer during PDF operations.',
    category: 'Technical Architecture',
    readTime: '7 min read',
    date: 'Aug 18, 2026',
    tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  },
];

export function FeaturedArticlesSection() {
  return (
    <section id="guides" aria-label="Featured PDF Engineering Guides" className="py-20 lg:py-28 bg-background relative z-10 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 space-y-4">
          <SectionEyebrow className="justify-center">EDITORIAL &amp; HOW-TO GUIDES</SectionEyebrow>
          <SectionHeading className="text-center">
            Master PDF Workflows with Expert Tutorials
          </SectionHeading>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Comprehensive, step-by-step guides written by document software engineers to help you optimize, secure, and convert your PDF files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, idx) => (
            <Reveal key={article.slug} delay={Math.min(idx * 40, 250)}>
              <Link
                href={`/blogs/${article.slug}`}
                className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-brand/40 hover:bg-card/80 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-semibold font-mono px-2.5 py-0.5 rounded-full border ${article.tagColor}`}>
                      {article.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-foreground group-hover:text-brand transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span className="text-brand font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/[0.04] border border-border hover:border-brand/40 text-foreground text-xs font-semibold hover:text-brand transition-colors"
          >
            <BookOpen className="w-4 h-4 text-brand" />
            Explore All 70+ PDF Tutorials &amp; Engineering Articles
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
