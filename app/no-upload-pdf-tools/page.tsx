import type { Metadata } from 'next';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Lock, WifiOff, Eye } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'No-Upload PDF Tools: 46+ Free Tools That Never Leave Your Browser | iCreatePDF',
  description: 'Every iCreatePDF tool processes files 100% locally in your browser — no upload, no server, no account. Browse the full list of 46+ private PDF tools.',
  keywords: 'no upload pdf tools, private pdf tools, offline pdf converter, client side pdf tools, pdf tools no upload 2026',
  alternates: buildAlternates('/no-upload-pdf-tools'),
  openGraph: {
    title: 'No-Upload PDF Tools: 46+ Free Tools That Never Leave Your Browser',
    description: 'Every iCreatePDF tool processes files 100% locally in your browser — no upload, no server, no account.',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'How can a PDF tool work without uploading my file?',
    a: 'Modern browsers can run JavaScript and WebAssembly code powerful enough to parse, edit, and generate PDF files directly on your device. iCreatePDF loads that code once, then every operation — merging, compressing, signing, converting — runs on your own CPU inside the browser tab, with no file data sent anywhere.',
  },
  {
    q: 'How do I verify a tool really isn\'t uploading my file?',
    a: 'Open your browser\'s developer tools (Network tab) before using a tool, then process a file and watch for outgoing requests. With iCreatePDF, you\'ll see no request carrying your file data — read our step-by-step verification guide linked below.',
  },
  {
    q: 'Are these tools safe for sensitive documents like IDs and contracts?',
    a: 'Because your file never leaves your device, there is no upload step where it could be intercepted, logged, or exposed by a server-side breach — which is exactly the exposure point most online PDF tools carry.',
  },
  {
    q: 'Do all 46+ tools work the same way, or just some?',
    a: 'All of them. Every tool listed on this page — from basic merging and splitting to OCR and digital signatures — uses the same 100% local, no-upload architecture.',
  },
];

const toolCategories: { name: string; tools: { name: string; href: string }[] }[] = [
  {
    name: 'Convert',
    tools: [
      { name: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
      { name: 'PNG to PDF', href: '/tools/png-to-pdf' },
      { name: 'HEIC to PDF', href: '/tools/heic-to-pdf' },
      { name: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
      { name: 'Word to PDF', href: '/tools/word-to-pdf' },
      { name: 'Scan to PDF', href: '/tools/scan-to-pdf' },
      { name: 'TXT to PDF', href: '/tools/txt-to-pdf' },
      { name: 'HTML to PDF', href: '/tools/html-to-pdf' },
      { name: 'Markdown to PDF', href: '/tools/markdown-to-pdf' },
      { name: 'QR to PDF', href: '/tools/qr-to-pdf' },
      { name: 'Barcode to PDF', href: '/tools/barcode-to-pdf' },
      { name: 'PDF to Excel', href: '/tools/pdf-to-excel' },
      { name: 'Excel to PDF', href: '/tools/excel-to-pdf' },
      { name: 'PDF to Text', href: '/tools/pdf-to-text' },
      { name: 'RIS to PDF', href: '/tools/ris-to-pdf' },
    ],
  },
  {
    name: 'Organize & Edit',
    tools: [
      { name: 'Merge PDF', href: '/tools/merge-pdf' },
      { name: 'Split PDF', href: '/tools/split-pdf' },
      { name: 'Organize PDF', href: '/tools/organize-pdf' },
      { name: 'Rotate PDF', href: '/tools/rotate-pdf' },
      { name: 'Edit PDF', href: '/tools/edit-pdf' },
      { name: 'Crop PDF', href: '/tools/crop-pdf' },
      { name: 'Resize PDF', href: '/tools/resize-pdf' },
      { name: 'Extract Pages', href: '/tools/extract-pages' },
      { name: 'Delete PDF Pages', href: '/tools/delete-pdf-pages' },
      { name: 'Compress PDF', href: '/tools/compress-pdf' },
      { name: 'Repair PDF', href: '/tools/repair-pdf' },
      { name: 'Flatten PDF', href: '/tools/flatten-pdf' },
      { name: 'Grayscale PDF', href: '/tools/grayscale-pdf' },
      { name: 'Invert PDF', href: '/tools/invert-pdf' },
    ],
  },
  {
    name: 'Security & Integrity',
    tools: [
      { name: 'Protect PDF', href: '/tools/protect-pdf' },
      { name: 'Unlock PDF', href: '/tools/unlock-pdf' },
      { name: 'Sign PDF', href: '/tools/sign-pdf' },
      { name: 'Verify Signature', href: '/tools/verify-signature' },
      { name: 'Certify PDF', href: '/tools/certify-pdf' },
      { name: 'Redact PDF', href: '/tools/redact-pdf' },
      { name: 'Prevent Copy', href: '/tools/prevent-copy' },
      { name: 'Compare PDF', href: '/tools/compare-pdf' },
    ],
  },
  {
    name: 'Document Setup',
    tools: [
      { name: 'Add Page Numbers', href: '/tools/add-page-numbers' },
      { name: 'Header & Footer', href: '/tools/header-footer' },
      { name: 'Bates Numbering', href: '/tools/bates-numbering' },
      { name: 'Watermark PDF', href: '/tools/watermark-pdf' },
      { name: 'PDF Metadata', href: '/tools/pdf-metadata' },
      { name: 'Fillable PDF Builder', href: '/tools/fillable-pdf-builder' },
      { name: 'Bulk Certificates', href: '/tools/bulk-certificates' },
    ],
  },
  {
    name: 'Accessibility & More',
    tools: [
      { name: 'PDF OCR', href: '/tools/pdf-ocr' },
      { name: 'Read Aloud PDF', href: '/tools/read-aloud-pdf' },
      { name: 'Accessibility Checker', href: '/tools/pdf-accessibility-checker' },
    ],
  },
];

export default function NoUploadPdfToolsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'No-Upload PDF Tools' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      <Navigation />

      <div className="pt-32 pb-24 flex-1">
        <div className="max-w-[1100px] mx-auto px-6 space-y-16">

          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 tracking-wide uppercase font-mono">
              <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
              Privacy First
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              46+ PDF Tools That Never Upload Your Files
            </h1>
            <p className="text-foreground/40 text-sm sm:text-base leading-relaxed">
              Every tool below runs 100% locally in your browser tab. No file is ever transmitted to iCreatePDF or any third party — no account, no server, no exceptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'Nothing uploaded', body: 'Files are loaded into your browser\'s memory and processed there — never sent to a server.' },
              { icon: WifiOff, title: 'Works offline', body: 'Once a tool page has loaded, most tools keep working even without an internet connection.' },
              { icon: Eye, title: 'Verifiable, not just claimed', body: 'Open your browser\'s Network tab while using any tool and see for yourself — no outgoing file data.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-card/40 border border-foreground/5 space-y-3">
                <div className="p-2.5 w-fit rounded-xl bg-brand/10 text-brand border border-brand/20">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-display">{f.title}</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-brand/10 border border-brand/20 max-w-2xl mx-auto text-center">
            <p className="text-xs text-purple-200 leading-relaxed">
              Want to see the proof yourself? Read{' '}
              <Link href="/blogs/proof-zero-server-uploads-how-to-verify-offline-pdf-converter" className="text-brand hover:underline underline-offset-2 font-semibold">
                how to verify iCreatePDF is 100% server-free
              </Link>{' '}
              by running it completely offline.
            </p>
          </div>

          <div className="space-y-10">
            {toolCategories.map((category) => (
              <div key={category.name} className="space-y-4">
                <h2 className="text-lg font-bold font-display text-foreground border-b border-foreground/10 pb-2">
                  {category.name}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex items-center gap-2 p-3 rounded-xl bg-card border border-foreground/5 hover:border-brand/30 hover:bg-card/80 transition-all"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-xs font-medium text-foreground group-hover:text-brand transition-colors">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold font-display text-center">FAQ</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="p-5 rounded-xl bg-card border border-foreground/5">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{f.q}</h3>
                  <p className="text-xs text-foreground/50 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">See How We Compare</h3>
            <p className="text-xs sm:text-sm text-foreground/60 max-w-md mx-auto">
              Check the full technology and pricing comparison against other PDF tools.
            </p>
            <div className="pt-2">
              <Link href="/compare">
                <button className="bg-brand hover:bg-brand/90 text-foreground font-semibold text-xs px-6 py-3 rounded-full transition-all hover:scale-105">
                  View Comparison &rarr;
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <FooterSection />
    </main>
  );
}
