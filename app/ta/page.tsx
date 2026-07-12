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
  title: 'iCreatePDF - விரைவான, இலவச மற்றும் பாதுகாப்பான பட PDF மாற்றி',
  description: 'உங்கள் உலாவியில் 100% உள்நாட்டிலேயே JPG, PNG, WEBP, HEIC மற்றும் BMP கோப்புகளை PDF ஆக மாற்றவும். பதிவு இல்லை, கோப்பு பதிவேற்றங்கள் இல்லை.',
  keywords: 'படத்தை PDF ஆக மாற்றுதல், PDF மாற்றி, தமிழ் PDF கன்வெர்ட்டர், icreatepdf',
  alternates: buildAlternates('/ta'),
};

const toolsTa = [
  {
    icon: Combine,
    title: 'PDFகளை ஒன்றிணைக்க',
    desc: 'பல PDF ஆவணங்களை எந்த பக்க வரிசையிலும் ஒரே ஆவணமாக இணைக்கவும்.',
    href: '/merge-pdf',
  },
  {
    icon: Scissors,
    title: 'PDF பிரிக்க',
    desc: 'குறிப்பிட்ட பக்க வரம்புகளை பிரித்தெடுக்கவும் அல்லது அனைத்து பக்கங்களையும் தனித்தனியாக பிரிக்கவும்.',
    href: '/split-pdf',
  },
  {
    icon: Sliders,
    title: 'PDF ஒழுங்கமைக்க',
    desc: 'பக்கங்களை எளிதாக மறுவரிசைப்படுத்தவும், சுழற்றவும் அல்லது நீக்கவும்.',
    href: '/organize-pdf',
  },
  {
    icon: Image,
    title: 'JPG டு PDF',
    desc: 'JPG, PNG, WEBP, HEIC மற்றும் BMP படங்களை ஒரு சுத்தமான PDF கோப்பாக மாற்றவும்.',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PDF டு JPG',
    desc: 'ஒவ்வொரு PDF பக்கத்தையும் உயர்தர JPEG படங்களாக பிரித்தெடுக்கவும்.',
    href: '/pdf-to-jpg',
  },
  {
    icon: FileText,
    title: 'Word கோப்பை PDF ஆக மாற்ற',
    desc: 'மைக்ரோசாஃப்ட் வேர்ட் (.docx) கோப்புகளை சுத்தமான PDF கோப்பாக மாற்றவும்.',
    href: '/word-to-pdf',
  },
  {
    icon: Camera,
    title: 'கேமரா மூலம் PDF ஸ்கேன்',
    desc: 'கேமரா மூலம் ஆவணப் பக்கங்களை எடுத்து உடனடியாக PDF ஆக மாற்றவும்.',
    href: '/scan-to-pdf',
  },
  {
    icon: Minimize2,
    title: 'PDF சுருக்குக',
    desc: 'PDF கோப்புகளின் அளவை ஆன்லைனில் எளிதாக சுருக்கவும்.',
    href: '/compress-pdf',
  },
  {
    icon: RotateCw,
    title: 'PDF சுழற்று',
    desc: 'PDF பக்கங்களை தேவையான திசையில் எளிதாக சுழற்றவும்.',
    href: '/rotate-pdf',
  },
  {
    icon: Unlock,
    title: 'PDF பூட்டை நீக்குக',
    desc: 'கடவுச்சொல் பாதுகாக்கப்பட்ட PDF கோப்புகளின் பூட்டை நீக்கவும்.',
    href: '/unlock-pdf',
  },
  {
    icon: Type,
    title: 'வாட்டர்மார்க் சேர்க்க',
    desc: 'ஆவணத்தின் அனைத்து பக்கங்களிலும் தனிப்பயனாக்கக்கூடிய உரை வாட்டர்மார்க் சேர்க்கவும்.',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'பக்க எண்கள் சேர்க்க',
    desc: 'எளிதாக பக்க எண்களை விரும்பிய இடங்களில் அச்சிடலாம்.',
    href: '/add-page-numbers',
  },
  {
    icon: Sliders,
    title: 'படிவ உருவாக்குபவர்',
    desc: 'உரை உள்ளீடுகள் மற்றும் செக்பாக்ஸ்களுடன் படிவங்களை வடிவமைக்கவும்.',
    href: '/fillable-pdf-builder',
  },
];

export default function TamilHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-background">
        <SectionEyebrow className="justify-center">தமிழ் சேவைகள்</SectionEyebrow>
        <Reveal>
          <SectionHeading as="h1" className="text-center">
            பாதுகாப்பான PDF கருவிகள் <br />
            <span className="text-muted-foreground">100% உள்ளூர் உலாவி செயலாக்கம்</span>
          </SectionHeading>
        </Reveal>
        <p className="text-foreground/40 text-sm max-w-xl mx-auto px-4">
          உங்கள் கோப்புகள் எங்கள் சேவையகத்திற்கு அனுப்பப்படாது. உங்கள் பாதுகாப்பு எங்கள் பொறுப்பு.
        </p>
      </div>

      {/* Tools Grid */}
      <section id="convert" className="py-12 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsTa.map((tool, idx) => (
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
                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                      {tool.desc}
                    </p>
                  </div>
                  
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-brand uppercase tracking-widest pt-4 transition-colors">
                    திறக்க &rarr;
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
