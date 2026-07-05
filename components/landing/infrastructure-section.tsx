'use client';

import { SectionEyebrow } from './shared/section-eyebrow';
import { Reveal } from './shared/reveal';
import { useAutoRotate } from './shared/use-auto-rotate';

const regions = [
  { name: 'Browser Sandbox', nodes: 'Isolated', status: 'secure' },
  { name: 'Memory Compression', nodes: 'WebAssembly', status: 'optimized' },
  { name: 'HEIC Decoders', nodes: 'Client-side', status: 'active' },
  { name: 'Canvas Compilers', nodes: 'Native Graphics', status: 'operational' },
];

export function InfrastructureSection() {
  const [activeRegion] = useAutoRotate(regions.length, 3000);

  return (
    <section id="infra" className="relative py-24 lg:py-32 overflow-hidden bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <SectionEyebrow className="mb-8">Client-Side Architecture</SectionEyebrow>

          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-stretch">
            <Reveal className="w-40 lg:w-64 xl:w-72 shrink-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                alt="Global network sphere"
                className="w-full h-full object-contain object-center opacity-80"
              />
            </Reveal>

            <div className="flex flex-col justify-center">
              <Reveal>
                <h2 className="text-5xl md:text-6xl lg:text-[80px] font-display font-medium tracking-tight leading-[0.95]">
                  Serverless by
                  <br />
                  <span className="text-muted-foreground">design.</span>
                </h2>
              </Reveal>

              <Reveal delay={100}>
                <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Your files are converted completely inside your browser's memory. It eliminates network queues, data breaches, and subscription limits.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-2 relative p-8 lg:p-12 border border-border bg-card/40 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 opacity-60">
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: var(--brand);
                      stroke-width: 1.2;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLine 3s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(19)].map((_, i) => {
                  const x1 = 10 + (i % 5) * 20;
                  const y1 = 10 + Math.floor(i / 5) * 25;
                  const x2 = 10 + ((i + 1) % 5) * 20;
                  const y2 = 10 + Math.floor((i + 1) / 5) * 25;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      className="connecting-line"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  );
                })}
              </svg>

              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-brand"
                  style={{
                    left: `${10 + (i % 5) * 20}%`,
                    top: `${10 + Math.floor(i / 5) * 25}%`,
                    animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-7xl lg:text-[8rem] font-display font-medium leading-none">0</span>
                <span className="text-2xl text-muted-foreground">files uploaded</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                100% local processing sandbox. Your private scans and IDs remain secure on your computer.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={100} className="p-8 border border-border bg-card/40 rounded-2xl">
              <span className="text-5xl lg:text-6xl font-display font-medium">100%</span>
              <span className="block text-sm text-muted-foreground mt-2">Offline-Ready Uptime</span>
            </Reveal>

            <Reveal delay={200} className="p-8 border border-border bg-card/40 rounded-2xl">
              <span className="text-5xl lg:text-6xl font-display font-medium">0ms</span>
              <span className="block text-sm text-muted-foreground mt-2">Network upload delay</span>
            </Reveal>
          </div>
        </div>

        {/* Region list */}
        <Reveal delay={300} className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map((region, index) => (
            <div
              key={region.name}
              className={`p-6 border rounded-xl transition-all duration-300 cursor-default ${
                activeRegion === index ? 'border-brand/40 bg-brand/[0.05]' : 'border-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full transition-colors ${activeRegion === index ? 'bg-brand' : 'bg-foreground/20'}`} />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{region.status}</span>
              </div>
              <span className="font-medium block mb-1 text-foreground">{region.name}</span>
              <span className="text-xs text-muted-foreground">{region.nodes}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
