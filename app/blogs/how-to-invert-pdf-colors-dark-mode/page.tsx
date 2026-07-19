import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Eye, Moon, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Invert PDF Colors for Dark Mode Reading | iCreatePDF',
  description: 'Learn how to invert the colors of your PDF pages for comfortable night reading, dark mode setups, and printing ink savings. 100% free and client-side.',
  keywords: 'invert pdf colors, dark mode pdf, pdf color inverter, night mode pdf, invert pdf text background',
  alternates: buildAlternates('/blogs/how-to-invert-pdf-colors-dark-mode'),
  openGraph: {
    title: 'How to Invert PDF Colors for Dark Mode Reading',
    description: 'Transform bright white PDF document backgrounds to comfortable dark layouts. Ideal for reducing eye strain during night reading.',
    type: 'article',
    publishedTime: '2026-05-26T00:00:00Z',
  },
};

export default function InvertPdfBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Invert PDF Colors for Dark Mode Reading | iCreatePDF',
          description: 'Learn how to invert the colors of your PDF pages for comfortable night reading, dark mode setups, and printing ink savings. 100% free and client-side.',
          url: '/blogs/how-to-invert-pdf-colors-dark-mode',
          datePublished: '2026-05-26T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">Reading Experience</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Invert PDF Colors for Night Reading (Dark Mode PDF)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Staring at bright white PDFs in a dark room causes digital eye strain. Learn how to convert pages to dark mode by inverting R, G, B colors.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-05-26">May 26, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Most books, academic papers, and company guides are exported as black text on bright white background paper. While this simulates physical print during the day, it is incredibly harsh on the eyes when reading on screens at night. Inverting colors changes white to black, black to white, and remaps colors to their opposite spectral values, giving you a perfect dark mode reading experience.
          </p>

          
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#benefits-of-dark-mode-pdfs" className="hover:text-brand transition-colors">
                  Benefits of Dark Mode PDFs
                </Link>
              </li>
              <li>
                <Link href="#how-to-invert-pdf-colors" className="hover:text-brand transition-colors">
                  How to Invert PDF Colors
                </Link>
              </li>
            </ul>
          </div>

<h2 id="benefits-of-dark-mode-pdfs" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Moon className="w-5 h-5 text-brand" />
            Benefits of Dark Mode PDFs
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li><strong className="text-foreground">Reduced Eye Strain:</strong> Decreases the intensity of white light emission, allowing for relaxed reading in low-light environments.</li>
            <li><strong className="text-foreground">Printer Ink Savings:</strong> Printing an inverted layout on a black sheet is rarely done, but printing negative templates or saving ink is sometimes needed.</li>
            <li><strong className="text-foreground">Better Battery Life:</strong> On OLED or AMOLED screens, dark backgrounds turn off pixels, extending laptop, tablet, or phone battery life.</li>
          </ul>

          <h2 id="how-to-invert-pdf-colors" className="text-xl font-bold text-foreground pt-4 font-display">How to Invert PDF Colors</h2>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Visit the <Link href="/tools/invert-pdf" className="text-brand hover:underline">/invert-pdf</Link> page.</li>
            <li>Upload your document. The application reads each page, rendering it onto a canvas.</li>
            <li>The script runs pixel-level color transformations, inverting all light and dark tones.</li>
            <li>Download the dark mode PDF.</li>
          </ol>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-foreground/70 border border-foreground/10 rounded-xl overflow-hidden">
              <thead className="bg-foreground/5 text-foreground font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Feature</th>
                  <th className="text-left px-4 py-3">Normal PDF</th>
                  <th className="text-left px-4 py-3">Inverted PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {[
                  ['Background Color', 'Bright White', 'Deep Black / Dark Gray'],
                  ['Text Color', 'Deep Black / Dark Colors', 'Bright White / Light Colors'],
                  ['Eye Comfort at Night', 'Poor (High Blue Light)', 'Excellent (Low Contrast Comfort)'],
                ].map(([feat, norm, inv]) => (
                  <tr key={feat}>
                    <td className="px-4 py-3 font-semibold text-foreground">{feat}</td>
                    <td className="px-4 py-3">{norm}</td>
                    <td className="px-4 py-3 text-brand">{inv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display flex items-center justify-center gap-2">
            <Eye className="w-5 h-5 text-brand" />
            Comfortable Reading Starts Here
          </h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Convert bright sheets to night-friendly dark documents 100% locally in your browser.</p>
          <Link href="/tools/invert-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Invert PDF Colors
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-invert-pdf-colors-dark-mode" />
      </article>

      <FooterSection />
    </div>
  );
}
