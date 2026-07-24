'use client';

import { ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  Converters: [
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
  ],
  Utilities: [
    { name: 'Merge PDF', href: '/tools/merge-pdf' },
    { name: 'Split PDF', href: '/tools/split-pdf' },
    { name: 'Organize PDF', href: '/tools/organize-pdf' },
    { name: 'Rotate PDF', href: '/tools/rotate-pdf' },
    { name: 'Compress PDF', href: '/tools/compress-pdf' },
    { name: 'Unlock PDF', href: '/tools/unlock-pdf' },
    { name: 'Protect PDF', href: '/tools/protect-pdf' },
    { name: 'Sign PDF', href: '/tools/sign-pdf' },
    { name: 'Edit PDF', href: '/tools/edit-pdf' },
    { name: 'PDF to Text', href: '/tools/pdf-to-text' },
    { name: 'Verify Signature', href: '/tools/verify-signature' },
    { name: 'Flatten PDF', href: '/tools/flatten-pdf' },
    { name: 'Grayscale PDF', href: '/tools/grayscale-pdf' },
    { name: 'Compare PDF', href: '/tools/compare-pdf' },
    { name: 'Redact PDF', href: '/tools/redact-pdf' },
    { name: 'Crop PDF', href: '/tools/crop-pdf' },
    { name: 'Extract Pages', href: '/tools/extract-pages' },
    { name: 'Repair PDF', href: '/tools/repair-pdf' },
    { name: 'PDF Metadata', href: '/tools/pdf-metadata' },
    { name: 'Header & Footer', href: '/tools/header-footer' },
    { name: 'Page Numbers', href: '/tools/add-page-numbers' },
    { name: 'Resize PDF', href: '/tools/resize-pdf' },
    { name: 'Bates Numbering', href: '/tools/bates-numbering' },
    { name: 'Invert PDF', href: '/tools/invert-pdf' },
    { name: 'Delete PDF Pages', href: '/tools/delete-pdf-pages' },
    { name: 'Watermark PDF', href: '/tools/watermark-pdf' },
    { name: 'Fillable PDF Builder', href: '/tools/fillable-pdf-builder' },
    { name: 'Bulk Certificates', href: '/tools/bulk-certificates' },
    { name: 'Certify PDF', href: '/tools/certify-pdf' },
    { name: 'Accessibility Checker', href: '/tools/pdf-accessibility-checker' },
    { name: 'PDF OCR', href: '/tools/pdf-ocr' },
    { name: 'Prevent Copy', href: '/tools/prevent-copy' },
    { name: 'Read Aloud PDF', href: '/tools/read-aloud-pdf' },
  ],
  Resources: [
    { name: 'Blog', href: '/blogs' },
    { name: 'Why iCreatePDF', href: '/compare' },
    { name: 'iLovePDF Alternative', href: '/compare/ilovepdf-alternative' },
    { name: 'Smallpdf Alternative', href: '/compare/smallpdf-alternative' },
    { name: 'PDF24 Alternative', href: '/compare/pdf24-alternative' },
    { name: 'No-Upload PDF Tools', href: '/tools/no-upload-pdf-tools' },
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
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-foreground text-background font-mono text-sm font-bold shadow-xs">
                  PDF
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-foreground select-none">
                  iCreate<span className="text-muted-foreground font-mono text-xs ml-1 uppercase">Studio</span>
                </span>
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
