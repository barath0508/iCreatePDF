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
  title: 'iCreatePDF - Fusionner, Compresser et Convertir PDF Gratuit (100% Privé)',
  description: 'Outils PDF en ligne 100% gratuits et confidentiels. Fusionnez, compressez, divisez et convertissez vos fichiers directement dans votre navigateur sans téléversement sur serveur.',
  keywords: 'fusionner pdf, compresser pdf, convertir pdf en word, diviser pdf, pdf en jpg, jpg en pdf, icreatepdf francais',
  alternates: buildAlternates('/fr'),
};

const toolsFr = [
  {
    icon: Combine,
    title: 'Fusionner PDF',
    desc: 'Combinez plusieurs fichiers PDF en un seul document dans l\'ordre souhaité.',
    href: '/merge-pdf',
  },
  {
    icon: Minimize2,
    title: 'Compresser PDF',
    desc: 'Réduisez la taille de vos fichiers PDF tout en conservant une excellente netteté.',
    href: '/compress-pdf',
  },
  {
    icon: Scissors,
    title: 'Diviser PDF',
    desc: 'Extrayez des plages de pages précises ou séparez toutes les pages en fichiers distincts.',
    href: '/split-pdf',
  },
  {
    icon: FileText,
    title: 'PDF en Word',
    desc: 'Convertissez vos documents PDF en fichiers Microsoft Word (.docx) modifiables.',
    href: '/pdf-to-word',
  },
  {
    icon: Image,
    title: 'JPG en PDF',
    desc: 'Transformez vos images JPG, PNG et HEIC en un document PDF propre.',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PDF en JPG',
    desc: 'Extrayez chaque page de votre PDF sous forme d\'images JPEG haute résolution.',
    href: '/pdf-to-jpg',
  },
  {
    icon: Sliders,
    title: 'Organiser PDF',
    desc: 'Réorganisez, faites pivoter ou supprimez des pages de manière visuelle.',
    href: '/organize-pdf',
  },
  {
    icon: RotateCw,
    title: 'Faire pivoter PDF',
    desc: 'Tournez vos pages PDF de 90°, 180° ou 270° en un clic.',
    href: '/rotate-pdf',
  },
  {
    icon: Unlock,
    title: 'Déverrouiller PDF',
    desc: 'Supprimez les mots de passe et restrictions de sécurité de vos fichiers PDF.',
    href: '/unlock-pdf',
  },
  {
    icon: Camera,
    title: 'Numériser en PDF',
    desc: 'Scannez des documents avec la caméra de votre smartphone ou PC directement en PDF.',
    href: '/scan-to-pdf',
  },
  {
    icon: Type,
    title: 'Filigrane PDF',
    desc: 'Ajoutez un filigrane texte ou une signature personnalisée sur toutes vos pages.',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'Numéros de page',
    desc: 'Insérez une numérotation automatique de pages avec options d\'emplacement.',
    href: '/add-page-numbers',
  },
];

export default function FrenchHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-background">
        <SectionEyebrow className="justify-center">Services en Français</SectionEyebrow>
        <Reveal>
          <SectionHeading as="h1" className="text-center">
            Outils PDF Gratuits <br />
            <span className="text-muted-foreground">100% Locaux &amp; Sans Téléversement</span>
          </SectionHeading>
        </Reveal>
        <p className="text-foreground/40 text-sm max-w-xl mx-auto px-4">
          Tous les traitements sont effectués directement dans votre navigateur. Vos documents confidentiels ne quittent jamais votre appareil.
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsFr.map((tool, idx) => (
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
                    Ouvrir l'outil &rarr;
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
