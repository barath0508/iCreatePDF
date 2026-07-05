'use client';

import { useEffect, useRef } from 'react';
import { SectionEyebrow } from './shared/section-eyebrow';
import { SectionHeading } from './shared/section-heading';
import { Reveal } from './shared/reveal';

const features = [
  {
    number: '01',
    title: '100% Client-Side Privacy',
    description: 'We process all files directly inside your browser sandbox using WebAssembly and local JavaScript. No files are ever uploaded to any remote servers. Absolute security.',
    stats: { value: '0%', label: 'remote server uploads' },
  },
  {
    number: '02',
    title: 'Complete PDF Tools Suite',
    description: 'Merge, split, compress, protect, sign, rotate, crop, watermark, and convert documents. Everything you need for daily document workflows in one place.',
    stats: { value: '35+', label: 'free local tools' },
  },
  {
    number: '03',
    title: 'Fast Local Processing',
    description: 'Because there are no upload or download queues, conversions and edits execute at hardware speed on your device instantly.',
    stats: { value: '<1s', label: 'average processing time' },
  },
  {
    number: '04',
    title: 'Universal File Compatibility',
    description: 'Seamlessly convert and process JPG, PNG, WEBP, HEIC, Word, Markdown, HTML, and PDF files locally without installing any desktop software.',
    stats: { value: '100%', label: 'offline capable' },
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

    const COUNT = 70;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: (seed * 127.1) % 1,
        by: (seed * 311.7) % 1,
        phase: seed * Math.PI * 2,
        speed: 0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.2),
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
        const alpha = 0.06 + pulse * 0.14 + influence * 0.25;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(126, 93, 224, ${alpha})`;
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
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative mb-16 lg:mb-20">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <SectionEyebrow className="mb-6">Capabilities</SectionEyebrow>
              <Reveal>
                <SectionHeading>
                  Features built for
                  <br />
                  <span className="text-muted-foreground">everyday work.</span>
                </SectionHeading>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <Reveal delay={150}>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We designed iCreatePDF to be completely client-side, avoiding server queues, file size limits, and security/privacy concerns.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="relative bg-card/50 border border-border rounded-2xl p-8 lg:p-12 overflow-hidden group flex flex-col justify-between min-h-[340px]">
                {idx === 0 && <ParticleVisualization />}
                <div className="relative z-10">
                  <span className="font-mono text-xs text-muted-foreground">{feature.number}</span>
                  <h3 className="text-2xl lg:text-3xl font-display font-medium mt-4 mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-8 relative z-10 border-t border-border mt-8 flex justify-between items-end">
                  <div>
                    <span className="text-4xl lg:text-5xl font-display font-medium text-foreground">{feature.stats.value}</span>
                    <span className="block text-[10px] text-muted-foreground font-mono mt-1 uppercase tracking-wider">{feature.stats.label}</span>
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
