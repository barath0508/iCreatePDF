'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Converters: [
    { name: 'JPG to PDF', href: '/jpg-to-pdf' },
    { name: 'PNG to PDF', href: '/png-to-pdf' },
    { name: 'HEIC to PDF', href: '/heic-to-pdf' },
    { name: 'PDF to JPG', href: '/pdf-to-jpg' },
  ],
  Utilities: [
    { name: 'Merge PDF', href: '/merge-pdf' },
    { name: 'Split PDF', href: '/split-pdf' },
    { name: 'Rotate PDF', href: '/rotate-pdf' },
    { name: 'Compress PDF', href: '/compress-pdf' },
    { name: 'Unlock PDF', href: '/unlock-pdf' },
    { name: 'Protect PDF', href: '/protect-pdf' },
    { name: 'Sign PDF', href: '/sign-pdf' },
    { name: 'Edit PDF', href: '/edit-pdf' },
    { name: 'PDF to Text', href: '/pdf-to-text' },
    { name: 'Verify Signature', href: '/verify-signature' },
    { name: 'HTML to PDF', href: '/html-to-pdf' },
    { name: 'Markdown to PDF', href: '/markdown-to-pdf' },
    { name: 'Flatten PDF', href: '/flatten-pdf' },
    { name: 'Grayscale PDF', href: '/grayscale-pdf' },
    { name: 'Compare PDF', href: '/compare-pdf' },
    { name: 'Redact PDF', href: '/redact-pdf' },
    { name: 'Crop PDF', href: '/crop-pdf' },
    { name: 'Extract Pages', href: '/extract-pages' },
    { name: 'Repair PDF', href: '/repair-pdf' },
    { name: 'PDF Metadata', href: '/pdf-metadata' },
    { name: 'Header & Footer', href: '/header-footer' },
    { name: 'Resize PDF', href: '/resize-pdf' },
    { name: 'Bates Numbering', href: '/bates-numbering' },
    { name: 'Invert PDF', href: '/invert-pdf' },
    { name: 'QR to PDF', href: '/qr-to-pdf' },
    { name: 'Delete PDF Pages', href: '/delete-pdf-pages' },
  ],
  Resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'How It Works', href: '/#how-it-works' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Website', href: '/' },
  { name: 'GitHub', href: '#' },
];

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white">
      <div className="relative w-full h-[240px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group hover:opacity-90 transition-opacity">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-purple-500/20 shadow-md transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="iCreatePDF Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-extrabold tracking-tight select-none text-white text-4xl font-display" style={{ letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">i</span>Create
                </span>
                <span className="font-extrabold tracking-tight select-none text-4xl font-display" style={{ letterSpacing: '-0.03em', lineHeight: 1, background: 'linear-gradient(135deg, #a78bfa 0%, #eca8d6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  PDF
                </span>
              </Link>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                Fast, secure, and browser-based converter. Drag &amp; drop images, reorder, adjust sizes, and download your consolidated PDF instantly.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; {currentYear} iCreatePDF. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eca8d6]" />
              Privacy-First Sandbox Mode Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
