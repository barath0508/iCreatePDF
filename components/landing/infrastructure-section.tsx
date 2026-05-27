'use client';

import { useEffect, useState, useRef } from 'react';

const regions = [
  { name: 'Browser Sandbox', nodes: 'Isolated', status: 'secure' },
  { name: 'Memory Compression', nodes: 'WebAssembly', status: 'optimized' },
  { name: 'HEIC Decoders', nodes: 'Client-side', status: 'active' },
  { name: 'Canvas Compilers', nodes: 'Native Graphics', status: 'operational' },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % regions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <span className="w-12 h-px bg-white/20" />
            Client-Side Architecture
          </span>
          
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-stretch">
            <div className={`w-48 lg:w-72 xl:w-80 shrink-0 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                alt="Global network sphere"
                className="w-full h-full object-contain object-center"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className={`text-6xl md:text-7xl lg:text-[100px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Serverless by
                <br />
                <span className="text-muted-foreground">design.</span>
              </h2>

              <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                Your images are converted completely inside your browser's memory. It eliminates network queues, data breaches, and subscription limits.
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 relative p-8 lg:p-12 border border-white/10 bg-white/[0.02] overflow-hidden rounded-2xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="absolute inset-0 opacity-70">
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'none' }}
              >
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: #eca8d6;
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
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#eca8d6]"
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
                <span className="text-8xl lg:text-[10rem] font-display leading-none">0</span>
                <span className="text-2xl text-muted-foreground">files uploaded</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                100% local processing sandbox. Your private scans and IDs remain secure on your computer.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`p-8 border border-white/10 bg-white/[0.02] rounded-2xl transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="text-5xl lg:text-6xl font-display">100%</span>
              <span className="block text-sm text-muted-foreground mt-2">Offline-Ready Uptime</span>
            </div>
            
            <div className={`p-8 border border-white/10 bg-white/[0.02] rounded-2xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="text-5xl lg:text-6xl font-display">0ms</span>
              <span className="block text-sm text-muted-foreground mt-2">Network upload delay</span>
            </div>
          </div>
        </div>

        {/* Region list */}
        <div className={`mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {regions.map((region, index) => (
            <div
              key={region.name}
              className={`p-6 border rounded-xl transition-all duration-300 cursor-default ${
                activeRegion === index 
                  ? 'border-white/30 bg-white/[0.04]' 
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full transition-colors ${
                  activeRegion === index ? 'bg-[#eca8d6]' : 'bg-white/20'
                }`} />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {region.status}
                </span>
              </div>
              <span className="font-medium block mb-1 text-white">{region.name}</span>
              <span className="text-xs text-white/50">{region.nodes}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
