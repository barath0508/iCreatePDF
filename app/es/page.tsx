import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { InfrastructureSection } from '@/components/landing/infrastructure-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';
import { 
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'iCreatePDF - Convertidor de Imagen a PDF Rápido, Gratuito y Privado',
  description: 'Convierta JPG, PNG, WEBP, HEIC y BMP a PDF 100% localmente en su navegador. Sin registros, sin cargas a servidores, privacidad total.',
  keywords: 'convertir jpg a pdf, png a pdf, heic a pdf, convertidor de pdf privado, icreatepdf',
  alternates: {
    canonical: 'https://icreatepdf.com/es',
    languages: {
      'en': 'https://icreatepdf.com',
      'hi': 'https://icreatepdf.com/hi',
      'ta': 'https://icreatepdf.com/ta',
    },
  },
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
];

export default function SpanishHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-black">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 uppercase font-mono">
          Servicios en Español
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display">
          Herramientas PDF <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100% Locales y Privadas</span>
        </h1>
        <p className="text-white/40 text-sm max-w-xl mx-auto px-4">
          Procese todos sus archivos directamente en su navegador. Sin cargas a la nube, garantizando máxima seguridad.
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-black relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsEs.map((tool) => (
              <Link 
                key={tool.title} 
                href={tool.href}
                className="group relative p-8 bg-zinc-950 border border-white/5 hover:border-purple-500/30 hover:bg-zinc-900/20 transition-all duration-300 rounded-2xl flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 group-hover:bg-purple-600 group-hover:border-purple-500 group-hover:text-white transition-all text-purple-400">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-display text-white group-hover:text-purple-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                
                <span className="text-[10px] font-mono text-white/30 group-hover:text-purple-400 uppercase tracking-widest pt-4 transition-colors">
                  Abrir Herramienta &rarr;
                </span>
              </Link>
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
