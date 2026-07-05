'use client';

import { useState } from 'react';
import { Reveal } from './shared/reveal';
import { CTAButtonGroup } from './shared/cta-button-group';

export function CtaSection() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal
          className="relative border border-border rounded-2xl bg-card/40"
          delay={0}
        >
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div
              className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, var(--brand), transparent 40%)`,
              }}
            />
          </div>

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex-1">
              <h2 className="text-5xl md:text-6xl lg:text-[64px] font-display font-medium tracking-tight mb-8 leading-[0.98] text-foreground">
                Ready to convert
                <br />
                your files?
              </h2>

              <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                Combine and convert your JPG, PNG, WEBP, HEIC, or BMP images into a clean PDF document completely locally.
              </p>

              <CTAButtonGroup
                primary={{ label: 'Start Converting Now', href: '#convert' }}
                secondary={{ label: 'Privacy Details', href: '/privacy' }}
              />

              <p className="text-sm text-muted-foreground mt-8 font-mono">
                100% Free &amp; no sign-up required
              </p>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-border rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-border rounded-bl-2xl" />
        </Reveal>
      </div>
    </section>
  );
}
