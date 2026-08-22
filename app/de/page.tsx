import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { InfrastructureSection } from '@/components/landing/infrastructure-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';
import { SectionEyebrow } from '@/components/landing/shared/section-eyebrow';
import { SectionHeading } from '@/components/landing/shared/section-heading';
import { Reveal } from '@/components/landing/shared/reveal';
import { 
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText
} from 'lucide-react';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'iCreatePDF - PDF zusammenfügen, komprimieren & bearbeiten (100% Privat)',
  description: 'PDFs zusammenfügen, teilen, komprimieren und konvertieren direkt im Browser. 100% kostenlos, DSGVO-konform, ohne Server-Upload und ohne Registrierung.',
  keywords: 'pdf zusammenfügen, pdf komprimieren, pdf teilen, pdf in jpg, pdf bearbeiten kostenlos, word in pdf, icreatepdf deutsch',
  alternates: buildAlternates('/de'),
};

const toolsDe = [
  {
    icon: Combine,
    title: 'PDF zusammenfügen',
    desc: 'Verbinden Sie mehrere PDF-Dateien in der gewünschten Reihenfolge zu einem Dokument.',
    href: '/merge-pdf',
  },
  {
    icon: Scissors,
    title: 'PDF teilen',
    desc: 'Extrahieren Sie Seitenbereiche oder speichern Sie jede Seite als eigene PDF.',
    href: '/split-pdf',
  },
  {
    icon: Minimize2,
    title: 'PDF komprimieren',
    desc: 'Reduzieren Sie die PDF-Dateigröße bei optimaler Text- und Bildschärfe.',
    href: '/compress-pdf',
  },
  {
    icon: FileText,
    title: 'PDF in Word umwandeln',
    desc: 'Konvertieren Sie PDF-Dateien in bearbeitbare Microsoft Word-Dokumente (.docx).',
    href: '/pdf-to-word',
  },
  {
    icon: Image,
    title: 'JPG in PDF',
    desc: 'Wandeln Sie Bilder (JPG, PNG, HEIC) in saubere PDF-Dokumente um.',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PDF in JPG',
    desc: 'Extrahieren Sie alle PDF-Seiten als hochauflösende JPEG-Grafiken.',
    href: '/pdf-to-jpg',
  },
  {
    icon: Sliders,
    title: 'PDF organisieren',
    desc: 'Seiten neu anordnen, drehen oder überflüssige Seiten visuell löschen.',
    href: '/organize-pdf',
  },
  {
    icon: RotateCw,
    title: 'PDF drehen',
    desc: 'Drehen Sie einzelne oder alle PDF-Seiten um 90°, 180° oder 270°.',
    href: '/rotate-pdf',
  },
  {
    icon: Unlock,
    title: 'PDF entsperren',
    desc: 'Entfernen Sie Passwörter und Sicherheitsbeschränkungen von PDF-Dateien.',
    href: '/unlock-pdf',
  },
  {
    icon: Camera,
    title: 'Dokumente scannen',
    desc: 'Scannen Sie Dokumente mit Ihrer Webcam oder Smartphone-Kamera direkt in PDF.',
    href: '/scan-to-pdf',
  },
  {
    icon: Type,
    title: 'Wasserzeichen hinzufügen',
    desc: 'Fügen Sie Text- oder Bildwasserzeichen auf allen PDF-Seiten ein.',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'Seitenzahlen einfügen',
    desc: 'Fügen Sie anpassbare Seitennummerierungen oben oder unten auf den Seiten ein.',
    href: '/add-page-numbers',
  },
];

export default function GermanHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-background">
        <SectionEyebrow className="justify-center">Services auf Deutsch</SectionEyebrow>
        <Reveal>
          <SectionHeading as="h1" className="text-center">
            PDF-Werkzeuge <br />
            <span className="text-muted-foreground">100% Lokal, Privat &amp; DSGVO-Sicher</span>
          </SectionHeading>
        </Reveal>
        <p className="text-foreground/40 text-sm max-w-xl mx-auto px-4">
          Bearbeiten Sie Ihre Dateien direkt in Ihrem Webbrowser. Keine Datenübertragung an externe Server — maximale Datensicherheit.
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsDe.map((tool, idx) => (
              <Reveal key={tool.title} delay={Math.min(idx * 30, 300)}>
                <Link 
                  href={tool.href}
                  className="group relative p-8 bg-card/50 border border-border hover:border-brand/40 hover:bg-card transition-all duration-300 rounded-2xl flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-4">
                    <div className="p-3 w-fit rounded-xl bg-foreground/[0.03] border border-border group-hover:bg-brand group-hover:border-brand transition-all text-brand group-hover:text-brand-foreground">
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-display font-medium text-foreground group-hover:text-brand transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-brand uppercase tracking-widest pt-4 transition-colors">
                    Werkzeug öffnen &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
