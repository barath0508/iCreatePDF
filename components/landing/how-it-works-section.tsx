'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Select Tool',
    subtitle: 'choose utility',
    description: 'Pick from over 35+ document tools on the dashboard, including converters, page organizers, and file size optimizers.',
  },
  {
    number: '02',
    title: 'Import Files',
    subtitle: 'drag & drop',
    description: 'Select or drag your PDFs, images, or documents into the tool panel. Your files are loaded into browser memory sandbox locally.',
  },
  {
    number: '03',
    title: 'Process & Save',
    subtitle: 'instant download',
    description: 'Adjust your settings and click the action button. The modification compiles instantly on your hardware. Download immediately.',
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative mb-16 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
          <div className="overflow-hidden">
            <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
                <span className="w-12 h-px bg-white/20" />
                Process
              </span>
            </div>
            
            <h2 className={`text-6xl md:text-7xl lg:text-[100px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}>
              <span className="block">Select.</span>
              <span className="block text-white/30">Process.</span>
              <span className="block text-white/10">Download.</span>
            </h2>
          </div>

          <div className={`relative h-[240px] lg:h-[400px] overflow-hidden transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-uAia6REvB137CQyHFCf0za3O6h2zKO.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-full h-full object-contain object-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.01_260)] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Steps Layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 rounded-xl ${
                activeStep === index 
                  ? 'bg-black border-white/60 shadow-[0_0_30px_rgba(236,168,214,0.05)]' 
                  : 'bg-black/50 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-4xl font-display transition-colors duration-300 ${
                  activeStep === index ? 'text-[#eca8d6]' : 'text-white/20'
                }`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-white/10 overflow-hidden">
                  {activeStep === index && (
                    <div className="h-full bg-[#eca8d6]/50 animate-progress" />
                  )}
                </div>
              </div>

              <h3 className="text-3xl font-display mb-2 text-white">
                {step.title}
              </h3>
              <span className="text-sm text-white/40 font-mono block mb-6 uppercase tracking-wider">
                {step.subtitle}
              </span>

              <p className={`text-white/60 text-sm leading-relaxed transition-opacity duration-300 ${
                activeStep === index ? 'opacity-100' : 'opacity-60'
              }`}>
                {step.description}
              </p>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#eca8d6] transition-transform duration-500 origin-left ${
                activeStep === index ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
      `}</style>
    </section>
  );
}
