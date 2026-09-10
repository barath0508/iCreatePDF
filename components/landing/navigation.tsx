'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { CommandMenu } from '@/components/navigation/CommandMenu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';

const TOOL_CATEGORIES = [
  {
    title: 'Convert to PDF',
    tools: [
      { name: 'Word to PDF', href: '/word-to-pdf', desc: 'Convert DOCX to clean PDF' },
      { name: 'JPG to PDF', href: '/jpg-to-pdf', desc: 'Convert JPG, PNG, WEBP' },
      { name: 'Excel to PDF', href: '/excel-to-pdf', desc: 'Spreadsheets to tables' },
      { name: 'Scan to PDF', href: '/scan-to-pdf', desc: 'Camera document scanner' },
      { name: 'HTML to PDF', href: '/html-to-pdf', desc: 'Webpages and code' },
    ],
  },
  {
    title: 'Convert from PDF',
    tools: [
      { name: 'PDF to Word', href: '/pdf-to-word', desc: 'Editable DOCX files' },
      { name: 'PDF to JPG', href: '/pdf-to-jpg', desc: 'Extract high-res images' },
      { name: 'PDF to Excel', href: '/pdf-to-excel', desc: 'Extract table data' },
      { name: 'PDF to Text', href: '/pdf-to-text', desc: 'Plain text extraction' },
      { name: 'Extract Images', href: '/extract-pdf-images', desc: 'Export embedded photos' },
    ],
  },
  {
    title: 'Organize & Optimize',
    tools: [
      { name: 'Merge PDF', href: '/merge-pdf', desc: 'Combine multiple files' },
      { name: 'Compress PDF', href: '/compress-pdf', desc: 'Reduce MB in browser' },
      { name: 'Split PDF', href: '/split-pdf', desc: 'Extract page ranges' },
      { name: 'Organize PDF', href: '/organize-pdf', desc: 'Rearrange and rotate' },
      { name: 'Delete Pages', href: '/delete-pdf-pages', desc: 'Remove unwanted pages' },
    ],
  },
  {
    title: 'Edit & Security',
    tools: [
      { name: 'Edit PDF', href: '/edit-pdf', desc: 'Add text & annotations' },
      { name: 'Sign PDF', href: '/sign-pdf', desc: 'Draw & stamp signatures' },
      { name: 'Protect PDF', href: '/protect-pdf', desc: 'Password encryption' },
      { name: 'Unlock PDF', href: '/unlock-pdf', desc: 'Remove passwords' },
      { name: 'PDF OCR', href: '/pdf-ocr', desc: 'Scanned text recognition' },
    ],
  },
];

const navLinks = [
  { name: 'Guides', href: '/blogs' },
  { name: 'Why Us', href: '/compare' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(e.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsToolsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed z-50 transition-[top,left,right] duration-300 ease-out ${
        isScrolled ? 'top-3 left-4 right-4' : 'top-0 left-0 right-0'
      }`}
    >
      <nav
        className={`mx-auto backdrop-blur-2xl transition-all duration-300 ease-out ${
          isScrolled
            ? 'rounded-[20px] max-w-[1120px] bg-card/92 shadow-[0_8px_40px_0_rgba(0,0,0,0.22),0_1px_0_0_rgba(255,255,255,0.06)_inset]'
            : 'rounded-none max-w-[1280px] bg-background/60 shadow-[0_1px_0_0_hsl(var(--border)/0.4)]'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled ? 'h-14 px-6' : 'h-[88px] px-10'
          }`}
        >
          {/* Logo & Identity */}
          <Link href="/" className="inline-flex items-center gap-3.5 group shrink-0">
            <Logo size={isScrolled ? 34 : 40} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Tools Mega Menu Trigger */}
            <div
              ref={toolsDropdownRef}
              className="relative"
              onMouseEnter={() => setIsToolsDropdownOpen(true)}
              onMouseLeave={() => setIsToolsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
                  isToolsDropdownOpen || pathname.startsWith('/tools')
                    ? 'text-foreground font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-expanded={isToolsDropdownOpen}
              >
                <span>Tools</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isToolsDropdownOpen ? 'rotate-180 text-foreground' : 'text-muted-foreground'
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown Panel */}
              {isToolsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[820px] z-50">
                  <div className="rounded-2xl border border-border bg-card/98 backdrop-blur-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
                    <div className="grid grid-cols-4 gap-6">
                      {TOOL_CATEGORIES.map((category) => (
                        <div key={category.title} className="space-y-3">
                          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground/80 border-b border-border/50 pb-1.5">
                            {category.title}
                          </p>
                          <ul className="space-y-1">
                            {category.tools.map((tool) => (
                              <li key={tool.href}>
                                <Link
                                  href={tool.href}
                                  className="group block p-1.5 rounded-lg hover:bg-muted/60 transition-colors"
                                >
                                  <p className="text-xs font-semibold text-foreground group-hover:text-brand transition-colors">
                                    {tool.name}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground/75 truncate mt-0.5">
                                    {tool.desc}
                                  </p>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-brand" /> 100% In-Browser &bull; Zero Uploads
                      </span>
                      <Link
                        href="/#tools"
                        className="font-bold text-foreground hover:text-brand transition-colors flex items-center gap-1"
                      >
                        <span>Explore all 69+ tools</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-foreground font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <CommandMenu />
            <ThemeToggle />
            <div className="h-6 w-px bg-border mx-1" />
            <Link href="/#tools">
              <Button
                size="lg"
                className="rounded-2xl border border-border bg-foreground text-background hover:bg-foreground/90 font-bold text-sm px-6 h-10 shadow-sm"
              >
                Explore Tools
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <CommandMenu />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground rounded-xl border border-border bg-card"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-24 z-40 rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Mobile Tools Accordion */}
          <div className="border-b border-border pb-4">
            <button
              type="button"
              onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
              className="w-full flex items-center justify-between text-lg font-bold text-foreground"
            >
              <span>Popular Tools</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  isMobileToolsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isMobileToolsOpen && (
              <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                {[
                  { name: 'Word to PDF', href: '/word-to-pdf' },
                  { name: 'PDF to Word', href: '/pdf-to-word' },
                  { name: 'Merge PDF', href: '/merge-pdf' },
                  { name: 'Compress PDF', href: '/compress-pdf' },
                  { name: 'Split PDF', href: '/split-pdf' },
                  { name: 'JPG to PDF', href: '/jpg-to-pdf' },
                  { name: 'PDF to JPG', href: '/pdf-to-jpg' },
                  { name: 'Sign PDF', href: '/sign-pdf' },
                  { name: 'Edit PDF', href: '/edit-pdf' },
                  { name: 'Protect PDF', href: '/protect-pdf' },
                  { name: 'PDF OCR', href: '/pdf-ocr' },
                  { name: 'Delete Pages', href: '/delete-pdf-pages' },
                ].map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-xs font-semibold rounded-lg bg-muted/40 hover:bg-muted text-foreground"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-foreground hover:text-muted-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> 100% Client-Side Engine
            </span>
            <Link href="/#tools" onClick={() => setIsMobileMenuOpen(false)}>
              <Button size="lg" className="rounded-xl bg-foreground text-background font-bold text-sm">
                Open Studio
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigation;
