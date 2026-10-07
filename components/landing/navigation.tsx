'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, ChevronDown, ArrowRight, Sparkles, Search } from 'lucide-react';
import { CommandMenu } from '@/components/navigation/CommandMenu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';
import { ALL_TOOLS } from '@/lib/tools-data';

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
      { name: 'PDF to PNG', href: '/pdf-to-png', desc: 'Lossless transparent PNG' },
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
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(true);
  const [mobileSearch, setMobileSearch] = useState('');
  const [mobileCategory, setMobileCategory] = useState<string>('Popular');
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
    setMobileSearch('');
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
        <div className="md:hidden fixed inset-x-3 top-20 sm:top-24 z-40 rounded-2xl border border-border bg-card/98 backdrop-blur-2xl p-5 shadow-2xl space-y-4 max-h-[82vh] overflow-y-auto">
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              placeholder="Search all 70+ PDF tools..."
              className="w-full bg-background border border-border rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all font-sans"
            />
            {mobileSearch && (
              <button
                type="button"
                onClick={() => setMobileSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 text-xs"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results if user is typing */}
          {mobileSearch.trim() ? (
            <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
              {ALL_TOOLS.filter((t) => {
                const q = mobileSearch.toLowerCase();
                return (
                  t.name.toLowerCase().includes(q) ||
                  t.description.toLowerCase().includes(q) ||
                  t.keywords.some((k) => k.toLowerCase().includes(q))
                );
              }).slice(0, 15).map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-background/60 hover:bg-muted border border-border/40 text-foreground transition-colors min-h-[44px]"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-foreground truncate">{tool.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{tool.description}</p>
                  </div>
                  <span className="text-[9px] font-mono font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full shrink-0 border border-brand/20">
                    {tool.category}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <>
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['Popular', 'Convert to PDF', 'Convert from PDF', 'Organize', 'Edit & Sign', 'Security', 'Utilities'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setMobileCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors min-h-[36px] flex items-center ${
                      mobileCategory === cat
                        ? 'bg-foreground text-background font-bold shadow-xs'
                        : 'bg-background/80 border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Tools Grid for Selected Category */}
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {(mobileCategory === 'Popular'
                  ? ALL_TOOLS.filter((t) => t.badge === 'Popular' || ['/merge-pdf', '/compress-pdf', '/word-to-pdf', '/jpg-to-pdf', '/sign-pdf', '/protect-pdf'].includes(t.href))
                  : ALL_TOOLS.filter((t) => t.category === mobileCategory)
                ).map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 text-xs font-semibold rounded-xl bg-muted/40 hover:bg-muted text-foreground flex items-center justify-between border border-border/40 min-h-[44px]"
                  >
                    <span className="truncate">{t.name}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground/60 shrink-0 ml-1" />
                  </Link>
                ))}
              </div>

              {/* Standard Nav Links */}
              <div className="border-t border-border/60 pt-3 flex flex-wrap gap-x-4 gap-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors py-1.5 min-h-[36px] flex items-center"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Bottom Security & Studio Link */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand" /> 100% In-Browser
                </span>
                <Link href="/#tools" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm" className="rounded-xl bg-foreground text-background font-bold text-xs h-8 px-4">
                    All 70+ Tools
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navigation;
