'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { RecentFilesWidget } from '@/components/landing/RecentFilesWidget';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { InfrastructureSection } from '@/components/landing/infrastructure-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';
import { FaqSection } from '@/components/landing/faq-section';
import { SectionEyebrow } from '@/components/landing/shared/section-eyebrow';
import { SectionHeading } from '@/components/landing/shared/section-heading';
import { Reveal } from '@/components/landing/shared/reveal';
import {
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText, Shield, FileSignature, Edit, ShieldCheck,
  Code, Layers, Printer, Columns, EyeOff, Crop, BookOpen, Wrench, Info,
  AlignCenter, Maximize2, Moon, QrCode, BookMarked, Trash2,
  Volume2, Stamp, FileSpreadsheet, Accessibility, Copy, FileSearch, Award, Search
} from 'lucide-react';

const tools = [
  {
    icon: Combine,
    title: 'Merge PDF',
    desc: 'Combine multiple PDF documents into a single document in any page order.',
    href: '/merge-pdf',
    category: 'organize',
  },
  {
    icon: Scissors,
    title: 'Split PDF',
    desc: 'Extract page ranges or split a PDF into separate files.',
    href: '/split-pdf',
    category: 'organize',
  },
  {
    icon: Sliders,
    title: 'Organize PDF',
    desc: 'Rearrange, rotate, or delete specific pages visually with previews.',
    href: '/organize-pdf',
    category: 'organize',
  },
  {
    icon: Image,
    title: 'JPG to PDF',
    desc: 'Convert JPG, PNG, WEBP, HEIC, and BMP images into a clean PDF.',
    href: '/jpg-to-pdf',
    category: 'convert',
  },
  {
    icon: FileImage,
    title: 'PNG to PDF',
    desc: 'Convert PNG images into a high-quality PDF document locally.',
    href: '/png-to-pdf',
    category: 'convert',
  },
  {
    icon: FileImage,
    title: 'HEIC to PDF',
    desc: 'Convert high-efficiency HEIC photos to PDF without uploading.',
    href: '/heic-to-pdf',
    category: 'convert',
  },
  {
    icon: FileImage,
    title: 'PDF to JPG',
    desc: 'Extract each page of a PDF document as high-fidelity JPEG images.',
    href: '/pdf-to-jpg',
    category: 'convert',
  },
  {
    icon: FileText,
    title: 'Word to PDF',
    desc: 'Convert standard word processor (.docx) documents into clean PDFs.',
    href: '/word-to-pdf',
    category: 'convert',
  },
  {
    icon: FileText,
    title: 'TXT to PDF',
    desc: 'Convert plain text files (.txt) or raw typed text into formatted PDF sheets.',
    href: '/txt-to-pdf',
    category: 'convert',
  },
  {
    icon: BookMarked,
    title: 'RIS to PDF',
    desc: 'Convert bibliographic RIS citation files into beautifully formatted reference PDFs.',
    href: '/ris-to-pdf',
    category: 'convert',
  },
  {
    icon: Camera,
    title: 'Scan to PDF',
    desc: 'Capture document pages using your camera and compile into a PDF.',
    href: '/scan-to-pdf',
    category: 'convert',
  },
  {
    icon: Minimize2,
    title: 'Compress PDF',
    desc: 'Optimize file streams locally to decrease PDF document sizes.',
    href: '/compress-pdf',
    category: 'utilities',
  },
  {
    icon: RotateCw,
    title: 'Rotate PDF',
    desc: 'Rotate PDF document pages clockwise in bulk or individually.',
    href: '/rotate-pdf',
    category: 'organize',
  },
  {
    icon: Shield,
    title: 'Protect PDF',
    desc: 'Encrypt your PDF files with a secure password locally.',
    href: '/protect-pdf',
    category: 'secure',
  },
  {
    icon: Unlock,
    title: 'Unlock PDF',
    desc: 'Strip password encryption locks from PDF files client-side.',
    href: '/unlock-pdf',
    category: 'secure',
  },
  {
    icon: Copy,
    title: 'Prevent Copy',
    desc: 'Rasterize pages locally to disable text selection and copying.',
    href: '/prevent-copy',
    category: 'secure',
  },
  {
    icon: FileSearch,
    title: 'PDF OCR',
    desc: 'Extract text from scanned, non-copyable PDFs using client-side OCR.',
    href: '/pdf-ocr',
    category: 'utilities',
  },
  {
    icon: Award,
    title: 'Bulk Certificates',
    desc: 'Generate customized PDF certificates from Excel spreadsheets locally.',
    href: '/bulk-certificates',
    category: 'convert',
  },
  {
    icon: Type,
    title: 'Watermark PDF',
    desc: 'Stamp configurable text overlays on all pages of a PDF document.',
    href: '/watermark-pdf',
    category: 'utilities',
  },
  {
    icon: Hash,
    title: 'Page Numbers',
    desc: 'Add page numbers with custom layout positioning and labels.',
    href: '/add-page-numbers',
    category: 'organize',
  },
  {
    icon: FileSignature,
    title: 'Sign PDF',
    desc: 'Draw or type your signature and visually stamp it on PDF pages.',
    href: '/sign-pdf',
    category: 'secure',
  },
  {
    icon: FileText,
    title: 'PDF to Text',
    desc: 'Extract structured text layouts from PDF files to clipboard or TXT.',
    href: '/pdf-to-text',
    category: 'utilities',
  },
  {
    icon: Edit,
    title: 'Edit PDF',
    desc: 'Insert custom text annotation overlays on top of PDF layouts.',
    href: '/edit-pdf',
    category: 'utilities',
  },
  {
    icon: Sliders,
    title: 'Fillable PDF Builder',
    desc: 'Design interactive forms with fillable inputs and checkboxes.',
    href: '/fillable-pdf-builder',
    category: 'utilities',
  },
  {
    icon: ShieldCheck,
    title: 'Verify Signature',
    desc: 'Inspect digital certificates and verify signed PDF integrity.',
    href: '/verify-signature',
    category: 'secure',
  },
  {
    icon: Code,
    title: 'HTML to PDF',
    desc: 'Render your custom HTML/CSS code templates into A4 PDF pages locally.',
    href: '/html-to-pdf',
    category: 'convert',
  },
  {
    icon: FileText,
    title: 'Markdown to PDF',
    desc: 'Write styled Markdown documents and compile them to clean A4 PDFs.',
    href: '/markdown-to-pdf',
    category: 'convert',
  },
  {
    icon: Layers,
    title: 'Flatten PDF',
    desc: 'Merge forms, fields, and annotation layers into static read-only PDF text.',
    href: '/flatten-pdf',
    category: 'secure',
  },
  {
    icon: Printer,
    title: 'Grayscale PDF',
    desc: 'Convert colorful PDF documents to black and white to save printer ink.',
    href: '/grayscale-pdf',
    category: 'utilities',
  },
  {
    icon: Columns,
    title: 'Compare PDF',
    desc: 'Audit document differences side-by-side with synchronized scrolling.',
    href: '/compare-pdf',
    category: 'utilities',
  },
  {
    icon: EyeOff,
    title: 'Redact PDF',
    desc: 'Draw black boxes over sensitive content — permanently burned into the document.',
    href: '/redact-pdf',
    category: 'secure',
  },
  {
    icon: Crop,
    title: 'Crop PDF',
    desc: 'Trim scanner borders and excess whitespace from all PDF page margins.',
    href: '/crop-pdf',
    category: 'organize',
  },
  {
    icon: BookOpen,
    title: 'Extract Pages',
    desc: 'Pull specific pages or ranges (1,3,5-8) into a new standalone PDF.',
    href: '/extract-pages',
    category: 'organize',
  },
  {
    icon: Wrench,
    title: 'Repair PDF',
    desc: 'Recover corrupted PDF files by rebuilding internal cross-reference tables.',
    href: '/repair-pdf',
    category: 'utilities',
  },
  {
    icon: Info,
    title: 'PDF Metadata',
    desc: 'View and edit hidden document properties: title, author, subject, keywords.',
    href: '/pdf-metadata',
    category: 'utilities',
  },
  {
    icon: AlignCenter,
    title: 'Header & Footer',
    desc: 'Stamp custom text at the top and bottom of every page with page number tokens.',
    href: '/header-footer',
    category: 'organize',
  },
  {
    icon: Maximize2,
    title: 'Resize PDF',
    desc: 'Normalize all pages to A4, Letter, A3, Legal, or A5 in portrait or landscape.',
    href: '/resize-pdf',
    category: 'organize',
  },
  {
    icon: BookMarked,
    title: 'Bates Numbering',
    desc: 'Sequential legal stamping with custom prefix, suffix, and zero-padded numbering.',
    href: '/bates-numbering',
    category: 'organize',
  },
  {
    icon: Moon,
    title: 'Invert PDF',
    desc: 'Pixel-invert every page for dark mode reading and eye strain reduction.',
    href: '/invert-pdf',
    category: 'utilities',
  },
  {
    icon: QrCode,
    title: 'QR to PDF',
    desc: 'Generate a clean A4 PDF with an embedded QR code for any URL or text.',
    href: '/qr-to-pdf',
    category: 'convert',
  },
  {
    icon: Trash2,
    title: 'Delete Pages',
    desc: 'Remove individual pages or complete ranges of pages from your PDF file.',
    href: '/delete-pdf-pages',
    category: 'organize',
  },
  {
    icon: Volume2,
    title: 'Read Aloud',
    desc: 'Listen to any PDF read aloud with adjustable voice and speed, right in your browser.',
    href: '/read-aloud-pdf',
    category: 'utilities',
  },
  {
    icon: Stamp,
    title: 'Certify PDF',
    desc: 'Stamp a SHA-256 fingerprint and QR code onto a PDF as a tamper-evident certificate.',
    href: '/certify-pdf',
    category: 'secure',
  },
  {
    icon: FileSpreadsheet,
    title: 'PDF to Excel',
    desc: 'Detect tables inside a PDF and export them as Excel-ready CSV files.',
    href: '/pdf-to-excel',
    category: 'utilities',
  },
  {
    icon: Accessibility,
    title: 'Accessibility Checker',
    desc: 'Audit a PDF for screen-reader issues: tagging, language, text layers, and form labels.',
    href: '/pdf-accessibility-checker',
    category: 'utilities',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'convert' | 'organize' | 'secure' | 'utilities'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is iCreatePDF completely free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, iCreatePDF is 100% free with no page limits, file size restrictions, or registration requirements. All conversion and document editing features are fully unlocked for everyone."
                }
              },
              {
                "@type": "Question",
                "name": "Are my documents secure on iCreatePDF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. iCreatePDF works entirely client-side. Your files are processed locally in your browser sandbox using WebAssembly and Javascript. They are never uploaded to any external server, ensuring absolute privacy."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use iCreatePDF offline?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Since all processing runs locally within your browser sandbox, once the page is loaded, the tools do not need an active internet connection to modify, merge, compress, or convert your PDF files."
                }
              },
              {
                "@type": "Question",
                "name": "Do you upload my files to any remote server?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, never. Unlike conventional PDF tools that upload your sensitive documents to cloud servers, iCreatePDF compiles everything directly on your CPU. Your data never leaves your local device."
                }
              },
              {
                "@type": "Question",
                "name": "What file formats are supported by iCreatePDF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support converting JPG, PNG, WEBP, HEIC, BMP, Word (.docx), TXT, HTML, and Markdown to PDF. You can also merge, split, rotate, compress, protect, unlock, sign, grayscale, flatten, and edit existing PDFs."
                }
              },
              {
                "@type": "Question",
                "name": "How does local browser-based PDF processing work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We leverage cutting-edge browser technologies like WebAssembly (Wasm) compiles of C/C++ library engines, Javascript binary arrays, and HTML5 canvas APIs to perform heavy-duty document computations directly in your browser memory space."
                }
              }
            ]
          })
        }}
      />
      <HeroSection />

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-24 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 space-y-4">
            <SectionEyebrow className="justify-center">Document suite</SectionEyebrow>
            <Reveal>
              <SectionHeading className="text-center">
                Organize, convert &amp; <br />
                <span className="text-muted-foreground">manipulate PDFs.</span>
              </SectionHeading>
            </Reveal>
          </div>

          {/* Filtering and Search Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-card/25 border border-border/80 backdrop-blur-md rounded-2xl p-4 max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'all', label: 'All Tools' },
                { id: 'convert', label: 'Convert' },
                { id: 'organize', label: 'Organize' },
                { id: 'secure', label: 'Secure & Sign' },
                { id: 'utilities', label: 'Utilities' },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-brand text-brand-foreground shadow-md shadow-brand/20 scale-105'
                        : 'bg-foreground/[0.02] border border-border/50 text-foreground/75 hover:bg-foreground/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                placeholder="Search tools (e.g. compress, merge)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-foreground/[0.02] border border-border/60 hover:border-border rounded-full focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-foreground placeholder:text-foreground/30 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-foreground/45 hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool, idx) => (
                <Reveal key={tool.title} delay={Math.min(idx * 30, 300)}>
                  <Link
                    href={tool.href}
                    className="group relative p-8 bg-card/50 border border-border hover:border-brand/40 hover:bg-card transition-all duration-300 rounded-2xl flex flex-col justify-between min-h-[220px]"
                  >
                    <div className="space-y-4">
                      <div className="p-3 w-fit rounded-xl bg-foreground/[0.03] border border-border group-hover:bg-brand group-hover:border-brand transition-all text-brand group-hover:text-brand-foreground">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-display font-medium text-foreground group-hover:text-brand transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-muted-foreground group-hover:text-brand uppercase tracking-widest pt-4 transition-colors">
                      Open Tool &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card/10 border border-dashed border-border rounded-2xl max-w-lg mx-auto">
              <p className="text-lg font-medium text-foreground">No tools found matching your criteria</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your keywords or clearing the search filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-6 px-5 py-2 text-xs font-semibold bg-brand text-brand-foreground rounded-full hover:bg-brand/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <SecuritySection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
      <RecentFilesWidget />
    </main>
  );
}
