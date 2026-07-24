'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield } from 'lucide-react';
import { CommandMenu } from '@/components/navigation/CommandMenu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const navLinks = [
  { name: 'Tools Suite', href: '/#tools' },
  { name: 'Privacy Benchmark', href: '/compare' },
  { name: 'Blog', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const spring = { type: 'spring', stiffness: 320, damping: 32, mass: 0.8 };

  return (
    <motion.header
      initial={false}
      animate={isScrolled
        ? { top: 12, left: 16, right: 16 }
        : { top: 0, left: 0, right: 0 }
      }
      transition={spring}
      style={{ position: 'fixed', zIndex: 50 }}
    >
      <motion.nav
        initial={false}
        animate={isScrolled
          ? {
              borderRadius: 20,
              backgroundColor: 'hsl(var(--card) / 0.92)',
              boxShadow: '0 8px 40px 0 rgba(0,0,0,0.22), 0 1px 0 0 rgba(255,255,255,0.06) inset',
              maxWidth: 1120,
            }
          : {
              borderRadius: 0,
              backgroundColor: 'hsl(var(--background) / 0.60)',
              boxShadow: '0 1px 0 0 hsl(var(--border) / 0.4)',
              maxWidth: 1280,
            }
        }
        transition={spring}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <motion.div
          initial={false}
          animate={isScrolled
            ? { height: 56, paddingLeft: 24, paddingRight: 24 }
            : { height: 88, paddingLeft: 40, paddingRight: 40 }
          }
          transition={spring}
          className="flex items-center justify-between"
        >
          {/* Logo & Identity */}
          <Link href="/" className="inline-flex items-center gap-3.5 group shrink-0">
            <motion.div
              animate={isScrolled ? { width: 36, height: 36 } : { width: 44, height: 44 }}
              transition={spring}
              className="relative flex items-center justify-center rounded-xl border border-border bg-foreground text-background shadow-xs transition-transform group-hover:scale-105 shrink-0"
            >
              <span className="font-mono text-sm font-extrabold tracking-tighter">PDF</span>
            </motion.div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-sm font-extrabold tracking-tight text-foreground select-none leading-none">
                iCreate
              </span>
              <span className="font-mono text-sm font-bold text-muted-foreground uppercase border border-border px-2 py-0.5 rounded-lg bg-muted/60 leading-none">
                Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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
                Launch Studio
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
        </motion.div>
      </motion.nav>

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
    </motion.header>
  );
}

export default Navigation;
