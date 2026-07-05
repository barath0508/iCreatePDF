'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';
import { SectionEyebrow } from './shared/section-eyebrow';
import { Reveal } from './shared/reveal';

const securityFeatures = [
  {
    icon: Shield,
    title: 'No Cloud Sync',
    description: 'Zero bytes of your files are sent to remote servers or third-party storage.',
  },
  {
    icon: Lock,
    title: 'Local Sandbox',
    description: 'Conversions execute strictly within isolated browser memory space.',
  },
  {
    icon: Eye,
    title: 'Memory Purge',
    description: 'Object URLs are immediately revoked from RAM after compilation.',
  },
  {
    icon: FileCheck,
    title: 'Zero Logins Needed',
    description: 'No email forms, logins, or tracking credentials required to convert.',
  },
];

const certifications = ['100% PRIVATE', 'GDPR COMPLIANT', 'ZERO SERVER UPLOADS', 'CLIENT-SIDE ONLY'];

export function SecuritySection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="security" className="relative py-24 lg:py-32 overflow-hidden bg-card/40 text-foreground border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <SectionEyebrow className="mb-8">Security &amp; Compliance</SectionEyebrow>

          <Reveal>
            <h2 className="text-5xl md:text-6xl lg:text-[80px] font-display font-medium tracking-tight leading-[0.95] mb-12">
              Private by design,
              <br />
              <span className="text-muted-foreground">not compromised.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              iCreatePDF offers total protection for confidential document conversions. All file manipulation occurs on your CPU, never in the cloud.
            </p>
          </Reveal>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-7 relative p-8 lg:p-12 border border-border bg-background/60 min-h-[380px] rounded-2xl overflow-hidden">
            <div className="relative z-10">
              <span className="font-mono text-sm text-muted-foreground">Active protection</span>
              <div className="mt-8">
                <span className="text-7xl lg:text-8xl font-display font-medium text-foreground">0</span>
                <span className="block text-muted-foreground mt-2">Files stored on servers</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 border border-border text-xs font-mono text-muted-foreground bg-background/50 rounded-md"
                >
                  {cert}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-5 flex flex-col gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border rounded-xl transition-all duration-300 cursor-default ${
                  activeFeature === index ? 'border-brand/40 bg-brand/[0.05]' : 'border-border'
                }`}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                      activeFeature === index ? 'border-brand bg-brand text-brand-foreground' : 'border-border text-foreground'
                    }`}
                  >
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
