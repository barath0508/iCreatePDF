'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, FileText } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
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
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? 'top-4 left-4 right-4' 
          : 'top-0 left-0 right-0'
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-background/85 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]'
            : 'bg-transparent max-w-[1400px]'
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? 'h-14' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 group transition-all duration-500 hover:opacity-90">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-purple-500/20 shadow-md transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="iCreatePDF Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-extrabold tracking-tight select-none text-white text-4xl font-display" style={{ letterSpacing: '-0.03em', lineHeight: 1 }}>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">i</span>Create
            </span>
            <span className="font-extrabold tracking-tight select-none text-4xl font-display" style={{ letterSpacing: '-0.03em', lineHeight: 1, background: 'linear-gradient(135deg, #a78bfa 0%, #eca8d6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              PDF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-colors duration-300 relative group ${
                    isActive 
                      ? 'text-purple-400 font-semibold' 
                      : isScrolled 
                      ? 'text-foreground/70 hover:text-foreground' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-foreground' : 'bg-white'}`} />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <span className={`transition-all duration-500 text-xs ${isScrolled ? 'text-foreground/70' : 'text-white/70'}`}>
              100% Client-Side
            </span>
            <Link href="/#convert">
              <Button
                size="sm"
                className={`rounded-full transition-all duration-500 ${isScrolled ? 'bg-purple-600 hover:bg-purple-700 text-white px-4 h-8 text-xs' : 'bg-white hover:bg-zinc-100 text-black px-6'}`}
              >
                Convert Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? 'text-foreground' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-purple-400 transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : '0ms' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Bottom CTAs */}
          <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
          >
            <Link href="/#convert" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full h-14 text-base"
              >
                Convert Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
