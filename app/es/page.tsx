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
  title: 'iCreatePDF - Convertidor de Imagen a PDF Rápido, Gratuito y Privado',
  description: 'Convierta JPG, PNG, WEBP, HEIC y BMP a PDF 100% localmente en su navegador. Sin registros, sin cargas a servidores, privacidad total.',
  keywords: 'convertir jpg a pdf, png a pdf, heic a pdf, convertidor de pdf privado, icreatepdf',
  alternates: buildAlternates('/es'),
};

const toolsEs = [
  {
    icon: Combine,
    title: 'Unir PDF',
    desc: 'Combine múltiples documentos PDF en un solo archivo en cualquier orden.',
    href: '/merge-pdf',
  },
  {
    icon: Scissors,
    title: 'Dividir PDF',
    desc: 'Extraiga rangos de páginas específicos o separe todas las páginas.',
    href: '/split-pdf',
  },
  {
    icon: Sliders,
    title: 'Organizar PDF',
    desc: 'Reordene, rote o elimine páginas específicas de forma visual.',
    href: '/organize-pdf',
  },
  {
    icon: Image,
    title: 'JPG a PDF',
    desc: 'Convierta imágenes JPG, PNG, WEBP, HEIC y BMP en un PDF limpio.',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PDF a JPG',
    desc: 'Extraiga cada página de un documento PDF como imágenes JPEG de alta calidad.',
    href: '/pdf-to-jpg',
  },
  {
    icon: FileText,
    title: 'Word a PDF',
    desc: 'Convierta documentos estándar de procesador de textos (.docx) en archivos PDF.',
    href: '/word-to-pdf',
  },
  {
    icon: Camera,
    title: 'Escanear a PDF',
    desc: 'Capture páginas de documentos con su cámara y compílelas en un PDF.',
    href: '/scan-to-pdf',
  },
  {
    icon: Minimize2,
    title: 'Comprimir PDF',
    desc: 'Optimice flujos de archivos para reducir el tamaño de documentos localmente.',
    href: '/compress-pdf',
  },
  {
    icon: RotateCw,
    title: 'Rotar PDF',
    desc: 'Gire páginas de documentos PDF en el sentido de las agujas del reloj.',
    href: '/rotate-pdf',
  },
  {
    icon: Unlock,
    title: 'Desbloquear PDF',
    desc: 'Elimine contraseñas y cifrados de seguridad de archivos PDF.',
    href: '/unlock-pdf',
  },
  {
    icon: Type,
    title: 'Marca de agua',
    desc: 'Estampe superposiciones de texto configurables en todas las páginas.',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'Números de página',
    desc: 'Añada números de página con formatos y posiciones personalizadas.',
    href: '/add-page-numbers',
  },
  {
    icon: Sliders,
    title: 'Creador de formularios',
    desc: 'Diseñe formularios interactivos con campos de texto y casillas de verificación.',
    href: '/fillable-pdf-builder',
  },
];

export default function SpanishHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-background">
        <SectionEyebrow className="justify-center">Servicios en Español</SectionEyebrow>
        <Reveal>
          <SectionHeading as="h1" className="text-center">
            Herramientas PDF <br />
            <span className="text-muted-foreground">100% Locales y Privadas</span>
          </SectionHeading>
        </Reveal>
        <p className="text-foreground/40 text-sm max-w-xl mx-auto px-4">
          Procese todos sus archivos directamente en su navegador. Sin cargas a la nube, garantizando máxima seguridad.
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsEs.map((tool, idx) => (
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
                    Abrir Herramienta &rarr;
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
