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
  title: 'iCreatePDF - Juntar, Comprimir e Converter PDF Grátis e 100% Privado',
  description: 'Junte, divida, comprima e converta arquivos PDF direto no seu navegador. 100% grátis, sem upload para servidores, sem limites e sem marca d\'água.',
  keywords: 'juntar pdf, comprimir pdf, pdf para word, dividir pdf, converter pdf em word, jpg para pdf, juntar pdfs gratis, icreatepdf portugues',
  alternates: buildAlternates('/pt'),
};

const toolsPt = [
  {
    icon: Combine,
    title: 'Juntar PDF',
    desc: 'Mescle múltiplos arquivos PDF em um único documento em qualquer ordem.',
    href: '/merge-pdf',
  },
  {
    icon: Scissors,
    title: 'Dividir PDF',
    desc: 'Extraia páginas específicas ou separe todas as páginas em arquivos individuais.',
    href: '/split-pdf',
  },
  {
    icon: Minimize2,
    title: 'Comprimir PDF',
    desc: 'Reduza o tamanho do arquivo PDF mantendo a máxima qualidade visual.',
    href: '/compress-pdf',
  },
  {
    icon: FileText,
    title: 'PDF para Word',
    desc: 'Converta arquivos PDF em documentos editáveis do Microsoft Word (.docx).',
    href: '/pdf-to-word',
  },
  {
    icon: Image,
    title: 'JPG para PDF',
    desc: 'Converta fotos JPG, PNG e HEIC em um arquivo PDF organizado.',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PDF para JPG',
    desc: 'Extraia todas as páginas do PDF como imagens JPEG de alta resolução.',
    href: '/pdf-to-jpg',
  },
  {
    icon: Sliders,
    title: 'Organizar PDF',
    desc: 'Reordene, gire ou exclua páginas do documento visualmente.',
    href: '/organize-pdf',
  },
  {
    icon: RotateCw,
    title: 'Girar PDF',
    desc: 'Gire páginas individuais ou todo o documento PDF em 90°, 180° ou 270°.',
    href: '/rotate-pdf',
  },
  {
    icon: Unlock,
    title: 'Desbloquear PDF',
    desc: 'Remova senhas e restrições de segurança de arquivos PDF protegidos.',
    href: '/unlock-pdf',
  },
  {
    icon: Camera,
    title: 'Escanear para PDF',
    desc: 'Digitalize documentos com a câmera do celular ou webcam e salve como PDF.',
    href: '/scan-to-pdf',
  },
  {
    icon: Type,
    title: 'Marca d\'água',
    desc: 'Adicione marcas d\'água personalizadas de texto ou imagem em todas as páginas.',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'Adicionar Números de Página',
    desc: 'Insira numeração de páginas com formatação e posições configuráveis.',
    href: '/add-page-numbers',
  },
];

export default function PortugueseHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-background">
        <SectionEyebrow className="justify-center">Ferramentas em Português</SectionEyebrow>
        <Reveal>
          <SectionHeading as="h1" className="text-center">
            Ferramentas PDF <br />
            <span className="text-muted-foreground">100% Gratuitas e Sem Upload</span>
          </SectionHeading>
        </Reveal>
        <p className="text-foreground/40 text-sm max-w-xl mx-auto px-4">
          Processe todos os seus arquivos diretamente no navegador. Seus documentos nunca saem do seu computador ou celular.
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsPt.map((tool, idx) => (
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
                    Abrir Ferramenta &rarr;
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
