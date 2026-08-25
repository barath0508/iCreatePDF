'use client';

import { useEffect, useRef } from 'react';
import { SectionEyebrow } from './shared/section-eyebrow';
import { SectionHeading } from './shared/section-heading';
import { Reveal } from './shared/reveal';

const features = [
  {
    number: '01',
    title: 'Lightning-Fast Results',
    description: 'No waiting in long upload queues. Your computer processes documents directly in your browser, finishing tasks in the blink of an eye.',
    stats: { value: '< 10ms', label: 'Processing Speed' },
  },
  {
    number: '02',
    title: 'Complete Privacy, Guaranteed',
    description: 'Your confidential contracts, invoices, and personal files stay on your machine. We never see, store, or transmit your data.',
    stats: { value: '0.0 MB', label: 'Sent to Cloud' },
  },
  {
    number: '03',
    title: 'Everything in One Place',
    description: 'Access over 49 free tools to convert, compress, organize, sign, and protect your PDFs whenever you need them — zero paywalls.',
    stats: { value: '49+', label: 'Free Tools' },
  },
  {
    number: '04',
    title: 'Works Even Offline',
    description: 'Spotty Wi-Fi or traveling? Once the page is loaded, our tools work seamlessly without an active internet connection.',
    stats: { value: '100%', label: 'Offline Ready' },
  },
];

function ParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const COUNT = 60;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: (seed * 127.1) % 1,
        by: (seed * 311.7) % 1,
        phase: seed * Math.PI * 2,
        speed: 0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.0),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;

        const bx = p.bx * w;
        const by = p.by * h;
        const dx = p.bx - mx;
        const dy = p.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2.8);

        const x = bx + flowX + influence * Math.cos(time + p.phase) * 36;
        const y = by + flowY + influence * Math.sin(time + p.phase) * 36;

        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.12 + influence * 0.2;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 180, 180, ${alpha})`;
        ctx.fill();
      });

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto" style={{ width: '100%', height: '100%' }} />;
}

export function FeaturesSection() {
  return (
    <section id="architecture" className="relative py-28 lg:py-36 overflow-hidden bg-background border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative mb-20 lg:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <SectionEyebrow>WHY CHOOSE ICREATEPDF</SectionEyebrow>
              <Reveal>
                <SectionHeading>
                  <span className="block font-medium">Built for privacy.</span>
                  <span className="block text-muted-foreground/75 font-normal">Designed for speed.</span>
                </SectionHeading>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:pt-14">
              <Reveal delay={150}>
                <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-normal">
                  Most online converters upload your private files to remote servers. iCreatePDF works entirely inside your browser — keeping your data 100% yours.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="relative bg-card/60 border border-border/80 rounded-3xl p-8 lg:p-12 overflow-hidden group flex flex-col justify-between min-h-[320px] transition-all hover:border-foreground/30">
                {idx === 0 && <ParticleVisualization />}
                <div className="relative z-10 space-y-4">
                  <span className="font-mono text-sm font-semibold text-muted-foreground">{feature.number}</span>
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground font-display">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed max-w-md font-normal">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-6 relative z-10 border-t border-border/60 mt-8 flex justify-between items-end">
                  <div>
                    <span className="text-3xl lg:text-4xl font-extrabold font-mono text-foreground">{feature.stats.value}</span>
                    <span className="block text-xs text-muted-foreground font-mono mt-1 uppercase tracking-wider font-semibold">{feature.stats.label}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
