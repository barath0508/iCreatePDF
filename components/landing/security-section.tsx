'use client';

import { useEffect, useState, useRef } from 'react';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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
      setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="security" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <span className="w-12 h-px bg-white/20" />
            Security &amp; Compliance
          </span>
          
          <h2 className={`text-6xl md:text-7xl lg:text-[100px] font-display tracking-tight leading-[0.9] mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Private by design,
            <br />
            <span className="text-muted-foreground">not compromised.</span>
          </h2>
          
          <div className={`transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              iCreatePDF offers total protection for confidential document conversions. All image manipulation occurs on your CPU, never in the cloud.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className={`lg:col-span-7 relative p-8 lg:p-12 border border-white/10 bg-white/[0.02] min-h-[400px] rounded-2xl overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative z-10">
              <span className="font-mono text-sm text-white/40">Active protection</span>
              <div className="mt-8">
                <span className="text-7xl lg:text-8xl font-display text-white">0</span>
                <span className="block text-white/40 mt-2">Files stored on servers</span>
              </div>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-3 py-1 border border-white/10 text-xs font-mono text-white/45 transition-all duration-500 bg-black/40 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border rounded-xl transition-all duration-500 cursor-default ${
                  activeFeature === index 
                    ? 'border-white/30 bg-white/[0.04]' 
                    : 'border-white/10'
                } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center border transition-colors ${
                    activeFeature === index 
                      ? 'border-white bg-white text-black' 
                      : 'border-white/20 text-white'
                  }`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white">{feature.title}</h3>
                    <p className="text-sm text-white/50">{feature.description}</p>
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
