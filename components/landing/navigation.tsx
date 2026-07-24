'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield } from 'lucide-react';
import { CommandMenu } from '@/components/navigation/CommandMenu';

const navLinks = [
  { name: 'Tools Suite', href: '/#tools' },
  { name: 'Architecture', href: '/#architecture' },
  { name: 'Privacy Benchmark', href: '/compare' },
  { name: 'Blog', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        isScrolled ? 'top-3 left-4 right-4' : 'top-0 left-0 right-0'
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-md max-w-7xl'
            : 'bg-background/60 backdrop-blur-md max-w-7xl border-b border-border/50'
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 lg:px-10 transition-all duration-300 ${
            isScrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-24 lg:h-28'
          }`}
        >
          {/* Enlarged Logo & Identity */}
          <Link href="/" className="inline-flex items-center gap-3.5 group">
            <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border bg-foreground text-background shadow-xs transition-transform group-hover:scale-105">
              <span className="font-mono text-base sm:text-lg font-extrabold tracking-tighter">PDF</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground select-none">
                iCreate<span className="text-muted-foreground font-mono text-xs sm:text-sm ml-1.5 uppercase border border-border px-2 py-0.5 rounded-lg bg-muted/60">Studio</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Enlarged text-sm to text-base/lg) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm sm:text-base font-semibold tracking-wide transition-colors relative ${
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

          {/* Desktop Actions & Command Menu (Enlarged Buttons) */}
          <div className="hidden md:flex items-center gap-4">
            <CommandMenu />

            <div className="h-6 w-px bg-border mx-1" />

            <Link href="/#tools">
              <Button
                size="lg"
                className="rounded-2xl border border-border bg-foreground text-background hover:bg-foreground/90 font-bold text-sm sm:text-base px-6 h-11 shadow-sm"
              >
                Launch Studio
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <CommandMenu />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-foreground rounded-xl border border-border bg-card"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-24 z-40 rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-6">
          <div className="flex flex-col space-y-4">
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
