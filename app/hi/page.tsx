import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { InfrastructureSection } from '@/components/landing/infrastructure-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';
import { 
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'iCreatePDF - तेज़, मुफ़्त और निजी इमेज टू पीडीएफ कन्वर्टर',
  description: 'अपने ब्राउज़र में 100% स्थानीय रूप से JPG, PNG, WEBP, HEIC और BMP को PDF में बदलें। कोई साइन-अप नहीं, कोई सर्वर अपलोड नहीं, पूर्ण गोपनीयता।',
  keywords: 'इमेज टू पीडीएफ, जेपीजी टू पीडीएफ, पीएनजी टू पीडीएफ, पीडीएफ कनवर्टर, icreatepdf',
  alternates: {
    canonical: 'https://icreatepdf.com/hi',
    languages: {
      'en': 'https://icreatepdf.com',
      'es': 'https://icreatepdf.com/es',
      'ta': 'https://icreatepdf.com/ta',
    },
  },
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
    desc: 'मानक Microsoft Word (.docx) दस्तावेज़ों को साफ़ पीडीएफ में बदलें।',
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
];

export default function HindiHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-black">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 uppercase font-mono">
          हिंदी सेवाएं
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display">
          सुरक्षित पीडीएफ टूल्स <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100% स्थानीय ब्राउज़र प्रोसेसिंग</span>
        </h1>
        <p className="text-white/40 text-sm max-w-xl mx-auto px-4">
          आपकी फाइलें कभी भी हमारे सर्वर पर नहीं जातीं। आपकी गोपनीयता हमारी प्राथमिकता है।
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-black relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsHi.map((tool) => (
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
                  <p className="text-xs text-white/50 leading-relaxed font-sans">
                    {tool.desc}
                  </p>
                </div>
                
                <span className="text-[10px] font-mono text-white/30 group-hover:text-purple-400 uppercase tracking-widest pt-4 transition-colors">
                  टूल खोलें &rarr;
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
