'use client';

import { useEffect, useState, useRef } from 'react';
import { CTAButtonGroup } from './shared/cta-button-group';

const words = ['convert', 'compress', 'reorder', 'compile'];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split('');
  const [showAccent, setShowAccent] = useState(true);

  useEffect(() => {
    setShowAccent(true);
    const STAGGER = 45;
    const DURATION = 500;
    const holdTime = STAGGER * letters.length + DURATION + 200;
    const timer = setTimeout(() => setShowAccent(false), holdTime);
    return () => clearTimeout(timer);
  }, [word, letters.length]);

  return (
    <span key={trigger} className="inline-flex transition-colors duration-500" style={{ color: showAccent ? 'var(--brand)' : 'var(--foreground)' }}>
      {letters.map((char, i) => (
        <span
          key={i}
          className="inline-block animate-char-in"
          style={{
            animationDelay: `${i * 45}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-background">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-60"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/85" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div key={`h-${i}`} className="absolute h-px bg-foreground" style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }} />
        ))}
        {[...Array(12)].map((_, i) => (
          <div key={`v-${i}`} className="absolute w-px bg-foreground" style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="lg:max-w-[65%]">
          <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-foreground/60">
              <span className="w-8 h-px bg-foreground/30" />
              100% client-side privacy-first conversion tools
            </span>
          </div>

          <div className="mb-12">
            <h1
              className={`text-left text-[clamp(2.2rem,6vw,6.5rem)] font-display font-medium leading-[0.95] tracking-tight text-foreground transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="block sm:whitespace-nowrap whitespace-normal">Combine &amp; convert</span>
              <span className="block sm:whitespace-nowrap whitespace-normal">
                images to{' '}
                <span className="relative inline-block">
                  <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                </span>
              </span>
            </h1>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CTAButtonGroup
              primary={{ label: 'Convert Now', href: '#convert' }}
              secondary={{ label: 'Learn Process', href: '#how-it-works' }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 hidden sm:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-start gap-10 lg:gap-20">
          {[
            { value: '0% Uploaded', label: 'All files remain on your device' },
            { value: '100% Free', label: 'No limitations or paywalls' },
            { value: '< 1 Second', label: 'Local browser compilation speed' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-display font-medium text-foreground">{stat.value}</span>
              <span className="text-xs text-foreground/50 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
