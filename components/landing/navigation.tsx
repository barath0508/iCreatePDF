'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, Sparkles } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const searchTools = [
  { title: 'Merge PDF', href: '/merge-pdf', desc: 'Combine multiple PDF documents into a single document.' },
  { title: 'Split PDF', href: '/split-pdf', desc: 'Extract page ranges or split a PDF into separate files.' },
  { title: 'Organize PDF', href: '/organize-pdf', desc: 'Rearrange, rotate, or delete specific pages visually.' },
  { title: 'JPG to PDF', href: '/jpg-to-pdf', desc: 'Convert JPG, PNG, WEBP, HEIC, and BMP images into a clean PDF.' },
  { title: 'PNG to PDF', href: '/png-to-pdf', desc: 'Convert PNG images into a high-quality PDF document locally.' },
  { title: 'HEIC to PDF', href: '/heic-to-pdf', desc: 'Convert Apple iPhone HEIC photos to PDF without uploading.' },
  { title: 'PDF to JPG', href: '/pdf-to-jpg', desc: 'Extract each page of a PDF document as high-fidelity JPEG images.' },
  { title: 'Word to PDF', href: '/word-to-pdf', desc: 'Convert standard Microsoft Word (.docx) documents into clean PDFs.' },
  { title: 'TXT to PDF', href: '/txt-to-pdf', desc: 'Convert plain text files (.txt) or raw typed text into formatted PDF sheets.' },
  { title: 'Scan to PDF', href: '/scan-to-pdf', desc: 'Capture document pages using your camera and compile into a PDF.' },
  { title: 'Compress PDF', href: '/compress-pdf', desc: 'Optimize file streams locally to decrease PDF document sizes.' },
  { title: 'Rotate PDF', href: '/rotate-pdf', desc: 'Rotate PDF document pages clockwise in bulk or individually.' },
  { title: 'Protect PDF', href: '/protect-pdf', desc: 'Encrypt your PDF files with a secure password locally.' },
  { title: 'Unlock PDF', href: '/unlock-pdf', desc: 'Strip password encryption locks from PDF files client-side.' },
  { title: 'Watermark PDF', href: '/watermark-pdf', desc: 'Stamp configurable text overlays on all pages of a PDF document.' },
  { title: 'Page Numbers', href: '/add-page-numbers', desc: 'Add page numbers with custom layout positioning and labels.' },
  { title: 'Sign PDF', href: '/sign-pdf', desc: 'Draw or type your signature and visually stamp it on PDF pages.' },
  { title: 'PDF to Text', href: '/pdf-to-text', desc: 'Extract structured text layouts from PDF files.' },
  { title: 'Edit PDF', href: '/edit-pdf', desc: 'Insert custom text annotation overlays on top of PDF layouts.' },
  { title: 'Verify Signature', href: '/verify-signature', desc: 'Inspect digital certificates and verify signed PDF integrity.' },
  { title: 'HTML to PDF', href: '/html-to-pdf', desc: 'Render your custom HTML/CSS code templates into PDF pages.' },
  { title: 'Markdown to PDF', href: '/markdown-to-pdf', desc: 'Write styled Markdown documents and compile them to clean PDFs.' },
  { title: 'Flatten PDF', href: '/flatten-pdf', desc: 'Merge forms, fields, and annotation layers into static text.' },
  { title: 'Grayscale PDF', href: '/grayscale-pdf', desc: 'Convert colorful PDF documents to black and white.' },
  { title: 'Compare PDF', href: '/compare-pdf', desc: 'Audit document differences side-by-side with synchronized scrolling.' },
  { title: 'Compare client vs server', href: '/compare', desc: 'Audit architectural privacy, security, and speed differences.' },
  { title: 'Redact PDF', href: '/redact-pdf', desc: 'Draw black boxes over sensitive content — permanently burned.' },
  { title: 'Crop PDF', href: '/crop-pdf', desc: 'Trim scanner borders and excess whitespace from PDF page margins.' },
  { title: 'Extract Pages', href: '/extract-pages', desc: 'Pull specific pages or ranges (1,3,5-8) into a new PDF.' },
  { title: 'Repair PDF', href: '/repair-pdf', desc: 'Recover corrupted PDF files by rebuilding cross-reference tables.' },
  { title: 'PDF Metadata', href: '/pdf-metadata', desc: 'View and edit hidden document properties: title, author, subject.' },
  { title: 'Header & Footer', href: '/header-footer', desc: 'Stamp custom text at the top and bottom of every page.' },
  { title: 'Resize PDF', href: '/resize-pdf', desc: 'Normalize all pages to A4, Letter, A3, Legal, or A5.' },
  { title: 'Bates Numbering', href: '/bates-numbering', desc: 'Sequential legal stamping with custom prefix, suffix, and padding.' },
  { title: 'Invert PDF', href: '/invert-pdf', desc: 'Pixel-invert every page for dark mode reading.' },
  { title: 'QR to PDF', href: '/qr-to-pdf', desc: 'Generate a clean A4 PDF with an embedded QR code.' },
  { title: 'Delete PDF Pages', href: '/delete-pdf-pages', desc: 'Remove individual pages or complete ranges of pages from your PDF file.' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const filteredTools = searchTools.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? 'top-4 left-4 right-4' : 'top-0 left-0 right-0'
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-card/85 backdrop-blur-xl border border-border rounded-2xl shadow-lg max-w-[1200px]'
            : 'bg-transparent max-w-[1400px]'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? 'h-14' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 group transition-opacity duration-300 hover:opacity-90">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo.svg" alt="iCreatePDF Logo" fill className="object-contain scale-[1.4]" priority />
            </div>
            <span
              className="font-semibold tracking-tight select-none text-foreground text-xl sm:text-2xl font-display"
              style={{ letterSpacing: '-0.02em' }}
            >
              iCreate<span className="text-brand">PDF</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-colors duration-300 relative group ${
                    isActive ? 'text-brand font-semibold' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-xs border border-border bg-foreground/[0.03] rounded-full px-3 py-1.5 text-foreground/50 transition-all hover:bg-foreground/[0.06] hover:text-foreground"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search tools...</span>
              <kbd className="text-[10px] font-mono opacity-60 px-1 bg-foreground/10 rounded">⌘K</kbd>
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-xs text-foreground/50">100% Client-Side</span>
            <Link href="/#convert">
              <Button size="sm" className={`rounded-full transition-all duration-500 ${isScrolled ? 'h-8 px-4 text-xs' : 'h-9 px-6'}`}>
                Convert Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-foreground/70 hover:bg-foreground/5 transition-colors"
              aria-label="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground transition-colors duration-500"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 overflow-y-auto ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col min-h-screen px-8 pt-24 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-brand transition-all duration-500 ${
                  isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : '0ms' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div
            className={`flex gap-4 pt-8 border-t border-border transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
          >
            <Link href="/#convert" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full rounded-full h-14 text-base">Convert Now</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Command palette search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-md flex items-start justify-center sm:pt-24 pt-4 px-4">
          <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[80vh] flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-foreground/[0.02]">
              <Search className="w-5 h-5 text-brand shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tool name or function..."
                className="w-full bg-transparent text-foreground border-0 outline-none placeholder-foreground/30 text-sm py-1"
              />
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="p-1 hover:bg-foreground/10 rounded text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 divide-y divide-border max-h-[300px] sm:max-h-[360px]">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-foreground/[0.04] transition-colors group text-left"
                  >
                    <div className="p-2 rounded-lg bg-foreground/[0.03] border border-border text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">{tool.title}</h4>
                      <p className="text-xs text-muted-foreground leading-normal">{tool.desc}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground text-xs">
                  No matching tools found for "{searchQuery}"
                </div>
              )}
            </div>

            <div className="px-4 py-2 bg-foreground/[0.02] border-t border-border text-[10px] text-muted-foreground flex items-center justify-between">
              <span>Press <kbd className="bg-foreground/10 px-1 rounded text-foreground/60">ESC</kbd> to close</span>
              <span>{searchTools.length} local tools available</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
