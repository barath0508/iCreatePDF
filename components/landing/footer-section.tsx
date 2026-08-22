'use client';

import { ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

const footerLinks = {
  Converters: [
    { name: 'JPG to PDF', href: '/jpg-to-pdf' },
    { name: 'PNG to PDF', href: '/png-to-pdf' },
    { name: 'HEIC to PDF', href: '/heic-to-pdf' },
    { name: 'PDF to JPG', href: '/pdf-to-jpg' },
    { name: 'Word to PDF', href: '/word-to-pdf' },
    { name: 'Scan to PDF', href: '/scan-to-pdf' },
    { name: 'TXT to PDF', href: '/txt-to-pdf' },
    { name: 'HTML to PDF', href: '/html-to-pdf' },
    { name: 'Markdown to PDF', href: '/markdown-to-pdf' },
    { name: 'QR to PDF', href: '/qr-to-pdf' },
    { name: 'Barcode to PDF', href: '/barcode-to-pdf' },
    { name: 'PDF to Excel', href: '/pdf-to-excel' },
    { name: 'Excel to PDF', href: '/excel-to-pdf' },
    { name: 'EPUB to PDF', href: '/epub-to-pdf' },
    { name: 'SVG to PDF', href: '/svg-to-pdf' },
    { name: 'CSV to PDF', href: '/csv-to-pdf' },
    { name: 'PDF to Word', href: '/pdf-to-word' },
  ],
  Utilities: [
    { name: 'Merge PDF', href: '/merge-pdf' },
    { name: 'Split PDF', href: '/split-pdf' },
    { name: 'Organize PDF', href: '/organize-pdf' },
    { name: 'Rotate PDF', href: '/rotate-pdf' },
    { name: 'Compress PDF', href: '/compress-pdf' },
    { name: 'Unlock PDF', href: '/unlock-pdf' },
    { name: 'Protect PDF', href: '/protect-pdf' },
    { name: 'Sign PDF', href: '/sign-pdf' },
    { name: 'Edit PDF', href: '/edit-pdf' },
    { name: 'PDF to Text', href: '/pdf-to-text' },
    { name: 'Verify Signature', href: '/verify-signature' },
    { name: 'Flatten PDF', href: '/flatten-pdf' },
    { name: 'Grayscale PDF', href: '/grayscale-pdf' },
    { name: 'Compare PDF', href: '/compare-pdf' },
    { name: 'Redact PDF', href: '/redact-pdf' },
    { name: 'Crop PDF', href: '/crop-pdf' },
    { name: 'Extract Pages', href: '/extract-pages' },
    { name: 'Repair PDF', href: '/repair-pdf' },
    { name: 'PDF Metadata', href: '/pdf-metadata' },
    { name: 'Header & Footer', href: '/header-footer' },
    { name: 'Page Numbers', href: '/add-page-numbers' },
    { name: 'Resize PDF', href: '/resize-pdf' },
    { name: 'Bates Numbering', href: '/bates-numbering' },
    { name: 'Invert PDF', href: '/invert-pdf' },
    { name: 'Delete PDF Pages', href: '/delete-pdf-pages' },
    { name: 'Watermark PDF', href: '/watermark-pdf' },
    { name: 'Fillable PDF Builder', href: '/fillable-pdf-builder' },
    { name: 'Bulk Certificates', href: '/bulk-certificates' },
    { name: 'Certify PDF', href: '/certify-pdf' },
    { name: 'Accessibility Checker', href: '/pdf-accessibility-checker' },
    { name: 'PDF OCR', href: '/pdf-ocr' },
    { name: 'Prevent Copy', href: '/prevent-copy' },
    { name: 'Read Aloud PDF', href: '/read-aloud-pdf' },
    { name: 'N-up PDF', href: '/n-up-pdf' },
    { name: 'Booklet Maker', href: '/booklet-pdf' },
    { name: 'Adjust Margins', href: '/adjust-pdf-margins' },
    { name: 'Equalize Page Sizes', href: '/equalize-pdf-page-sizes' },
    { name: 'Extract Images', href: '/extract-pdf-images' },
    { name: 'Export Form Data', href: '/export-pdf-form-data' },
    { name: 'PDF to Audio', href: '/pdf-to-audio' },
    { name: 'Batch Rubber Stamp', href: '/stamp-pdf' },
    { name: 'PDF Reading Themes', href: '/pdf-reading-themes' },
    { name: 'Security Auditor', href: '/pdf-security-auditor' },
    { name: 'PDF TOC Builder', href: '/pdf-toc-builder' },
  ],
  Resources: [
    { name: 'Blog', href: '/blogs' },
    { name: 'Why iCreatePDF', href: '/compare' },
    { name: 'iLovePDF Alternative', href: '/compare/ilovepdf-alternative' },
    { name: 'Smallpdf Alternative', href: '/compare/smallpdf-alternative' },
    { name: 'PDF24 Alternative', href: '/compare/pdf24-alternative' },
    { name: 'No-Upload PDF Tools', href: '/no-upload-pdf-tools' },
    { name: 'Verify Offline Proof', href: '/blogs/proof-zero-server-uploads-how-to-verify-offline-pdf-converter' },
    { name: 'LLM Agents (llms.txt)', href: '/llms.txt' },
  ],
  'Legal & Languages': [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'AdSense Policy', href: '/adsense-policy' },
    { name: 'English (US)', href: '/' },
    { name: 'Español (Spanish)', href: '/es' },
    { name: 'Português (Portuguese)', href: '/pt' },
    { name: 'Bahasa Indonesia', href: '/id' },
    { name: 'Deutsch (German)', href: '/de' },
    { name: 'हिन्दी (Hindi)', href: '/hi' },
    { name: 'தமிழ் (Tamil)', href: '/ta' },
  ],
};

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background text-foreground border-t border-border/80">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-12 lg:gap-8">
            <div className="col-span-1 sm:col-span-2 space-y-4">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <Logo size={38} />
              </Link>

              <p className="text-muted-foreground leading-relaxed max-w-xs text-xs">
                Private, high-performance client-side PDF engineering suite. Processing is executed entirely in your browser memory without server uploads.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-mono text-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 stroke-[1.5]" />
                  Zero Server Upload Architecture
                </span>
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => {
              const isUtilities = title === 'Utilities';
              return (
                <div key={title} className={isUtilities ? 'col-span-1 sm:col-span-2' : 'col-span-1'}>
                  <h3 className="text-xs font-mono font-semibold tracking-wider text-foreground uppercase mb-4">
                    {title}
                  </h3>
                  <ul className={isUtilities ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5' : 'space-y-2.5'}>
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Comprehensive SEO & Technical Text Content for Text-to-HTML Ratio */}
          <div className="pt-12 border-t border-border/40 text-xs text-muted-foreground leading-relaxed space-y-4">
            <h2 className="text-sm font-semibold text-foreground font-display">
              iCreatePDF: Secure, High-Performance Browser-Based PDF Tools & Workflows
            </h2>
            <p>
              iCreatePDF provides over 46 free online PDF tools designed for total data privacy and instant document processing. Unlike traditional web-based PDF utilities that require uploading sensitive or confidential files to remote cloud servers, iCreatePDF executes 100% of document transformations, conversions, compression, editing, and encryption directly inside your web browser using WebAssembly (Wasm) engines and client-side JavaScript APIs.
            </p>
            <p>
              Whether you need to merge multiple PDF documents into a single cohesive report, compress large file sizes without compromising visual quality, convert scanned images or office documents (Word, Excel, PPT) to PDF format, protect sensitive files with SHA-256 digital certification, or extract text using optical character recognition (OCR), your files never leave your computer or mobile device. This zero-upload architecture guarantees total immunity from server data breaches, zero network transfer delay, and complete compliance with corporate privacy regulations, GDPR, and HIPAA requirements.
            </p>
            <p>
              Our tool suite supports an extensive array of professional document workflows including PDF page splitting, page rotation, margin adjustment, digital e-signature verification, custom watermarking, Bates numbering for legal proceedings, and fillable form creation. All tools function seamlessly across desktop and mobile browsers including Google Chrome, Apple Safari, Mozilla Firefox, and Microsoft Edge without requiring account registration, software installation, or paid subscriptions.
            </p>
          </div>
        </div>

        <div className="py-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} iCreatePDF. All rights reserved. Architected for client-side privacy.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-2 border border-border/80 bg-card px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Client-Side WebAssembly Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
