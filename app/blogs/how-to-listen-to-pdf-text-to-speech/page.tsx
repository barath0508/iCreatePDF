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
  title: 'How to Listen to a PDF Read Aloud (Text-to-Speech) — Free Guide | iCreatePDF',
  description: 'Listen to any PDF read aloud in your browser with adjustable voice and speed, plus live word highlighting. 100% private, no upload required.',
  keywords: 'pdf read aloud, pdf text to speech, listen to pdf online, pdf audio reader free, pdf tts 2026',
  alternates: buildAlternates('/blogs/how-to-listen-to-pdf-text-to-speech'),
  openGraph: {
    title: 'How to Listen to a PDF Read Aloud (Text-to-Speech) — Free Guide',
    description: 'Listen to any PDF read aloud in your browser with adjustable voice and speed.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Proofreading by Ear', desc: 'Catch awkward phrasing or errors in your own writing by hearing it read aloud instead of just re-reading it.' },
  { title: 'Multitasking', desc: 'Listen to a long report or article while commuting, exercising, or doing chores.' },
  { title: 'Accessibility Needs', desc: 'Make written content accessible to people with visual impairments or reading difficulties.' },
  { title: 'Language Learning', desc: 'Hear correct pronunciation of a document in a language you\'re learning.' },
  { title: 'Long Reading Lists', desc: 'Get through academic papers or lengthy reports faster by listening at an increased speed.' },
  { title: 'Reviewing on the Go', desc: 'Listen to a contract or memo when you don\'t have time to sit and read it in full.' },
];

export default function ReadAloudBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Listen to a PDF Read Aloud (Text-to-Speech) — Free Guide | iCreatePDF',
          description: 'Listen to any PDF read aloud in your browser with adjustable voice and speed, plus live word highlighting. 100% private, no upload required.',
          url: '/blogs/how-to-listen-to-pdf-text-to-speech',
          datePublished: '2026-07-18T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Reading Experience</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Listen to a PDF Read Aloud (Text-to-Speech) — Free Guide
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Have any PDF read aloud with a natural voice, adjustable speed, and live word highlighting — directly in your browser.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />July 18, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Not every document needs to be read with your eyes. Text-to-speech lets you absorb a long report while commuting, catch mistakes in your own writing by hearing it aloud, or make content accessible if reading text on screen is difficult — all without installing a separate screen-reader app.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Listen to a PDF Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/tools/read-aloud-pdf" className="text-brand hover:underline">iCreatePDF Read Aloud</Link>.</li>
            <li>Upload the PDF you want to listen to.</li>
            <li>Choose a voice and adjust the reading speed to your preference.</li>
            <li>Press play and follow along with live word highlighting as it reads.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Text-to-speech runs using your browser's built-in speech synthesis engine. Your document's content is never uploaded to a server.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">6 Reasons to Listen to a PDF</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">What If the PDF Is a Scanned Document?</h2>
          <p>
            Text-to-speech reads the underlying text layer of a PDF, so it works immediately on digitally created documents. If your PDF is a scan or photo with no text layer, run it through <Link href="/tools/pdf-ocr" className="text-brand hover:underline">PDF OCR</Link> first to generate readable text, then use Read Aloud on the result.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other Read-Aloud Tools</h2>
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
                  ['File uploads to server', 'Never', 'Often'],
                  ['Live word highlighting', 'Yes', 'Varies'],
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
              { q: 'Can I choose a different voice or accent?', a: 'Yes — available voices depend on your browser and operating system\'s installed speech synthesis voices, and you can pick from whichever are available.' },
              { q: 'Can I speed up or slow down the reading?', a: 'Yes, adjust the playback speed to read faster for quick review or slower for careful listening.' },
              { q: 'Does this work offline?', a: 'Once the page and voices are loaded, reading works without needing an active internet connection, since synthesis happens locally in your browser.' },
              { q: 'Can I pause and resume reading?', a: 'Yes, playback controls let you pause, resume, and skip around the document as needed.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Listen to your PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/tools/read-aloud-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Read Aloud Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-listen-to-pdf-text-to-speech" />
      </article>

      <FooterSection />
    </div>
  );
}
