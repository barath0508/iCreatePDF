'use client';

import { SectionEyebrow } from './shared/section-eyebrow';
import { Reveal } from './shared/reveal';
import { useAutoRotate } from './shared/use-auto-rotate';

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
  const [activeStep, setActiveStep] = useAutoRotate(steps.length, 6000);

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-card/40 text-foreground overflow-hidden border-y border-border">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative mb-16">
          <SectionEyebrow className="mb-8">Process</SectionEyebrow>
          <Reveal>
            <h2 className="text-5xl md:text-6xl lg:text-[80px] font-display font-medium tracking-tight leading-[0.95]">
              <span className="block">Select.</span>
              <span className="block text-muted-foreground">Process.</span>
              <span className="block text-foreground/15">Download.</span>
            </h2>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 rounded-2xl ${
                activeStep === index
                  ? 'bg-background border-brand/40'
                  : 'bg-background/40 border-border hover:border-foreground/20'
              }`}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-4xl font-display font-medium transition-colors duration-300 ${activeStep === index ? 'text-brand' : 'text-foreground/20'}`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-border overflow-hidden">
                  {activeStep === index && <div className="h-full bg-brand/50 animate-progress" />}
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-display font-medium mb-2 text-foreground">{step.title}</h3>
              <span className="text-sm text-muted-foreground font-mono block mb-6 uppercase tracking-wider">{step.subtitle}</span>

              <p className={`text-muted-foreground text-sm leading-relaxed transition-opacity duration-300 ${activeStep === index ? 'opacity-100' : 'opacity-60'}`}>
                {step.description}
              </p>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-brand rounded-b-2xl transition-transform duration-500 origin-left ${
                  activeStep === index ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
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
