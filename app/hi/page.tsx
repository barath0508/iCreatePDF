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
  title: 'iCreatePDF - तेज़, मुफ़्त और निजी इमेज टू पीडीएफ कनवर्टर',
  description: 'अपने ब्राउज़र में 100% स्थानीय रूप से JPG, PNG, WEBP, HEIC और BMP को PDF में बदलें। कोई साइन-अप नहीं, कोई सर्वर अपलोड नहीं, पूर्ण गोपनीयता।',
  keywords: 'इमेज टू पीडीएफ, जेपीजी टू पीडीएफ, पीएनजी टू पीडीएफ, पीडीएफ कनवर्टर, icreatepdf',
  alternates: buildAlternates('/hi'),
};

const toolsHi = [
  {
    icon: Combine,
    title: 'पीडीएफ मर्ज करें',
    desc: 'किसी भी पेज क्रम में कई पीडीएफ दस्तावेजों को एक फाइल मेंसंयोजित करें।',
    href: '/merge-pdf',
  },
  {
    icon: Scissors,
    title: 'पीडीएफ विभाजित करें',
    desc: 'विशिष्ट पेज श्रेणियों को निकालें या सभी पेजों को अलग करें।',
    href: '/split-pdf',
  },
  {
    icon: Sliders,
    title: 'पीडीएफ व्यवस्थित करें',
    desc: 'सचित्र पेज थंबनेल के साथ विशिष्ट पेजों को पुनर्व्यवस्थित, घुमाएं या हटाएं।',
    href: '/organize-pdf',
  },
  {
    icon: Image,
    title: 'जेपीजी टू पीडीएफ',
    desc: 'JPG, PNG, WEBP, HEIC और BMP इमेज को एक स्वच्छ पीडीएफ में बदलें।',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'पीडीएफ टू जेपीजी',
    desc: 'पीडीएफ दस्तावेज़ के प्रत्येक पेज को उच्च गुणवत्ता वाली जेपीईजी इमेज के रूप में निकालें।',
    href: '/pdf-to-jpg',
  },
  {
    icon: FileText,
    title: 'वर्ड टू पीडीएफ',
    desc: 'मानक वर्ड प्रोसेसर (.docx) दस्तावेज़ों को साफ़ पीडीएफ में बदलें।',
    href: '/word-to-pdf',
  },
  {
    icon: Camera,
    title: 'पीडीएफ में स्कैन करें',
    desc: 'कैमरे से दस्तावेज़ के पेजों को कैप्चर करें और उन्हें पीडीएफ में संकलित करें।',
    href: '/scan-to-pdf',
  },
  {
    icon: Minimize2,
    title: 'पीडीएफ कंप्रेस करें',
    desc: 'पीडीएफ फ़ाइल के आकार को स्थानीय रूप से कम करें।',
    href: '/compress-pdf',
  },
  {
    icon: RotateCw,
    title: 'पीडीएफ घुमाएँ',
    desc: 'पीडीएफ पेज को दक्षिणावर्त दिशा में घुमाएँ।',
    href: '/rotate-pdf',
  },
  {
    icon: Unlock,
    title: 'पीडीएफ अनलॉक करें',
    desc: 'पीडीएफ फाइलों से पासवर्ड सुरक्षा हटाएं।',
    href: '/unlock-pdf',
  },
  {
    icon: Type,
    title: 'वाटरमार्क पीडीएफ',
    desc: 'दस्तावेज़ के सभी पेजों पर अनुकूलन योग्य टेक्स्ट वाटरमार्क लगाएं।',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'पेज नंबर जोड़ें',
    desc: 'अनुकूलित लेआउट और स्थिति के साथ आसानी से पेज नंबर लगाएं।',
    href: '/add-page-numbers',
  },
  {
    icon: Sliders,
    title: 'फॉर्म निर्माता',
    desc: 'फ़िलेबल इनपुट और चेकबॉक्स के साथ इंटरैक्टिव फ़ॉर्म डिज़ाइन करें।',
    href: '/fillable-pdf-builder',
  },
];

export default function HindiHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-background">
        <SectionEyebrow className="justify-center">हिंदी सेवाएं</SectionEyebrow>
        <Reveal>
          <SectionHeading as="h1" className="text-center">
            सुरक्षित पीडीएफ टूल्स <br />
            <span className="text-muted-foreground">100% स्थानीय ब्राउज़र प्रोसेसिंग</span>
          </SectionHeading>
        </Reveal>
        <p className="text-foreground/40 text-sm max-w-xl mx-auto px-4">
          आपकी फाइलें कभी भी हमारे सर्वर पर नहीं जातीं। आपकी गोपनीयता हमारी प्राथमिकता है।
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsHi.map((tool, idx) => (
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
                    टूल खोलें &rarr;
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
