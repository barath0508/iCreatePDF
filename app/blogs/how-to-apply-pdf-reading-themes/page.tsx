import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema, faqSchema, howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Moon, Sun, Eye, CheckCircle2, Lock, Sparkles, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Apply PDF Reading Themes (Dark Mode, Sepia, Soft Mint) | iCreatePDF',
  description: 'Reduce digital eye fatigue when reading long PDF documents. Apply comfortable color filters: Sepia, Warm Amber, Soft Mint, or True Dark Mode in your browser.',
  keywords: 'pdf reading themes, dark mode pdf reader, sepia pdf reader online, soft green pdf background, reduce eye strain reading pdf, eye friendly pdf viewer free',
  alternates: buildAlternates('/blogs/how-to-apply-pdf-reading-themes'),
  openGraph: {
    title: 'How to Apply PDF Reading Themes (Dark Mode, Sepia, Soft Mint) | iCreatePDF',
    description: 'Reduce digital eye fatigue when reading long PDF documents. Apply comfortable color filters: Sepia, Warm Amber, Soft Mint, or True Dark Mode in your browser.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
  },
};

const faqs = [
  {
    question: 'Why do pure white PDF backgrounds cause severe eye fatigue?',
    answer: 'Standard PDFs are mastered for white paper printouts with reflective ambient light. On backlit LED and OLED displays, pure white (#FFFFFF) acts as an intense light emitter projecting concentrated short-wavelength blue light directly into your retinas. Reading black text on stark white monitors in dim rooms causes pupil constriction fatigue, dry eyes, and headaches.'
  },
  {
    question: 'How is a smart reading theme different from simple color inversion?',
    answer: 'Basic color inversion turns white backgrounds black, but it also turns colored photos and charts into creepy photographic negatives. iCreatePDF applies an intelligent luminance shader that remaps pure background paper color while preserving the natural color tones of embedded photographs and diagrams.'
  },
  {
    question: 'What are the benefits of Sepia and Soft Mint reading themes?',
    answer: 'Sepia (warm amber paper tone) absorbs harsh blue light peaks and mimics classic book stock, making it ideal for evening reading. Soft Mint (pale green tint) maximizes visual contrast while reducing eye muscle tension, a method widely recommended by optometrists for readers with dyslexia or visual stress.'
  },
  {
    question: 'Are my confidential books or research papers uploaded to a server?',
    answer: 'No. Color remapping and canvas shader processing execute 100% locally inside your web browser sandbox using WebAssembly and CSS filters. Your documents never leave your computer.'
  }
];

const howToSteps = [
  {
    title: 'Open your document in PDF Reading Themes',
    description: 'Select or drag your textbook, legal brief, or research paper into the iCreatePDF reading workspace.'
  },
  {
    title: 'Select your preferred visual comfort theme',
    description: 'Choose Dark Mode (OLED black), Sepia (warm paper tone), Soft Mint (calming pale green), or Warm Amber.'
  },
  {
    title: 'Fine-tune brightness and text contrast',
    description: 'Use the contrast slider to soften harsh black text into dark charcoal for maximum reading comfort.'
  },
  {
    title: 'Read comfortably in-browser or export styled PDF',
    description: 'Enjoy fatigue-free reading in fullscreen mode or download your permanently restyled PDF document.'
  }
];

const readingModes = [
  { name: 'Dark Mode (OLED Black)', bg: 'bg-zinc-900 text-zinc-100 border-zinc-700', desc: 'Deep black background with crisp off-white text. Perfect for late-night reading with zero glare and maximum battery savings on OLED displays.' },
  { name: 'Sepia (Vintage Paper)', bg: 'bg-[#f4ecd8] text-[#5b4636] border-[#e2d5ba]', desc: 'Warm amber paper tone reminiscent of classic hardcovers. Cuts out blue light spike frequencies to help maintain healthy melatonin sleep cycles.' },
  { name: 'Soft Mint (Optometric Green)', bg: 'bg-[#e8f5e9] text-[#1b5e20] border-[#c8e6c9]', desc: 'Soothing pastel green hue recommended for prolonged study sessions and readers prone to photophobia or visual stress.' },
  { name: 'Warm Amber (Sunset)', bg: 'bg-[#fef3c7] text-[#78350f] border-[#fde68a]', desc: 'Ultra-low blue light spectrum designed specifically for bedtime reading in completely darkened bedrooms.' },
];

export default function ReadingThemesBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Apply PDF Reading Themes (Dark Mode, Sepia, Soft Mint) | iCreatePDF',
              description: 'Reduce digital eye fatigue when reading long PDF documents. Apply comfortable color filters: Sepia, Warm Amber, Soft Mint, or True Dark Mode in your browser.',
              url: '/blogs/how-to-apply-pdf-reading-themes',
              datePublished: '2026-07-25T00:00:00Z',
            }),
            faqSchema(faqs),
            howToSchema({
              name: 'Apply PDF Reading Themes',
              description: 'Step-by-step instructions for applying eye-friendly color themes and dark mode to PDF documents in your browser.',
              url: '/blogs/how-to-apply-pdf-reading-themes',
              steps: howToSteps,
            }),
          ]),
        }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Guides
        </Link>

        {/* Header */}
        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase font-mono">
            Ergonomics &amp; Reading Comfort
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Apply PDF Reading Themes (Dark Mode, Sepia, Soft Mint)
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Protect your eyes from harsh glare and blue light. Transform bright white PDF pages into soothing Dark Mode, vintage Sepia, or calming Soft Mint directly in your browser.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <Link href="/authors/barath-r" className="font-semibold text-foreground/70 hover:text-brand underline">Barath R</Link> (Lead Engineer)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-07-25">July 25, 2026</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 5 min read
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="text-foreground/75 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Think about how much time you spend reading PDF files: research papers, 400-page textbooks, legal discovery filings, or corporate annual reports. When you open those documents in a standard PDF viewer, you are effectively staring straight into a fluorescent lightbulb.
          </p>
          <p>
            Because PDFs are formatted with physical white paper in mind, their default background is pure RGB <code>#FFFFFF</code>. When viewed in dim rooms or late at night, that intense white glare forces your pupils to contract constantly, drying out your tear film and leading to <strong>computer vision syndrome (asthenopia)</strong>.
          </p>
          <p>
            Applying custom <strong>reading themes</strong>—such as warm paper Sepia, calming Soft Mint, or deep OLED Dark Mode—dramatically softens visual contrast, filters out aggressive blue-light wavelengths, and lets you study or work for hours in complete comfort.
          </p>

          {/* Reading Themes Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {readingModes.map((mode, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${mode.bg} space-y-2`}>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <Moon className="w-4 h-4 shrink-0" />
                  {mode.name}
                </h3>
                <p className="text-xs leading-relaxed opacity-90">{mode.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            The Science: Blue Light &amp; Contrast Sensitivity
          </h2>
          <p>
            Optometric research consistently confirms that visual ergonomics depend on ambient context:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/70">
            <li><strong>Circadian Rhythm Protection:</strong> Blue light frequencies between 450nm and 480nm suppress melatonin production in the brain. Switching to Sepia or Warm Amber shifts color temperatures toward the warm 2700K spectrum, promoting healthy sleep habits.</li>
            <li><strong>Foveal Relaxation:</strong> High-contrast black text on bright white displays creates chromatic aberration halos around letterforms. Softening the background to cream or mint reduces retinal strain.</li>
            <li><strong>OLED Power Efficiency:</strong> On modern smartphones and laptop OLED displays, pixels displaying true black (#000000) are physically turned off, extending device battery life by up to 35%.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Step-by-Step: How to Apply Reading Themes
          </h2>
          <ol className="space-y-3 list-decimal list-inside text-sm sm:text-base pl-2">
            {howToSteps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <strong className="text-foreground">{step.title}:</strong> {step.description}
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <Lock className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>100% Client-Side Processing:</strong> Medical reports, legal case studies, and proprietary eBooks are transformed locally in your browser memory via WebAssembly and CSS matrix filters. Zero files are uploaded to any server.
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4 font-display">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1">
                <p className="text-sm font-bold text-foreground">{question}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/20 to-purple-950/20 border border-amber-500/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Apply comfortable reading themes now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Free, instant eye relief. Read PDFs in Dark Mode or Sepia in your browser.</p>
          <Link href="/pdf-reading-themes">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs px-6 rounded-full group">
              Launch PDF Reading Themes
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-apply-pdf-reading-themes" />
      </article>

      <FooterSection />
    </div>
  );
}
