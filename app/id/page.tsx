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
  title: 'iCreatePDF - Gabung, Kompres & Ubah PDF Online Gratis 100% Aman',
  description: 'Gabungkan PDF, kompres ukuran file PDF, pisahkan halaman, dan ubah PDF ke Word langsung di browser. 100% gratis tanpa upload file ke server.',
  keywords: 'gabung pdf, kompres pdf, ubah pdf ke word, pisah pdf, menggabungkan pdf, kompres file pdf, hapus halaman pdf, icreatepdf indonesia',
  alternates: buildAlternates('/id'),
};

const toolsId = [
  {
    icon: Combine,
    title: 'Gabung PDF',
    desc: 'Gabungkan beberapa file PDF menjadi satu dokumen secara berurutan.',
    href: '/merge-pdf',
  },
  {
    icon: Scissors,
    title: 'Pisahkan PDF',
    desc: 'Ekstrak rentang halaman tertentu atau pisahkan setiap halaman PDF.',
    href: '/split-pdf',
  },
  {
    icon: Minimize2,
    title: 'Kompres PDF',
    desc: 'Perkecil ukuran file PDF untuk pendaftaran kerja dan dokumen resmi.',
    href: '/compress-pdf',
  },
  {
    icon: FileText,
    title: 'Ubah PDF ke Word',
    desc: 'Konversi file PDF menjadi dokumen Word (.docx) yang dapat diedit.',
    href: '/pdf-to-word',
  },
  {
    icon: Image,
    title: 'JPG ke PDF',
    desc: 'Ubah foto JPG, PNG, dan HEIC menjadi dokumen PDF yang rapi.',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PDF ke JPG',
    desc: 'Ekstrak semua halaman PDF menjadi gambar JPG berkualitas tinggi.',
    href: '/pdf-to-jpg',
  },
  {
    icon: Sliders,
    title: 'Susun Halaman PDF',
    desc: 'Atur ulang urutan halaman, putar, atau hapus halaman PDF yang tidak perlu.',
    href: '/organize-pdf',
  },
  {
    icon: RotateCw,
    title: 'Putar PDF',
    desc: 'Putar orientasi halaman PDF yang terbalik dengan sekali klik.',
    href: '/rotate-pdf',
  },
  {
    icon: Unlock,
    title: 'Buka Kunci PDF',
    desc: 'Hapus password dan proteksi keamanan dari dokumen PDF yang terkunci.',
    href: '/unlock-pdf',
  },
  {
    icon: Camera,
    title: 'Scan Dokumen ke PDF',
    desc: 'Pindai dokumen fisik menggunakan kamera ponsel atau laptop ke PDF.',
    href: '/scan-to-pdf',
  },
  {
    icon: Type,
    title: 'Watermark PDF',
    desc: 'Tambahkan tanda air teks atau stempel transparan pada seluruh halaman.',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'Nomor Halaman',
    desc: 'Beri nomor halaman otomatis pada dokumen PDF dengan format pilihan.',
    href: '/add-page-numbers',
  },
];

export default function IndonesianHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-background">
        <SectionEyebrow className="justify-center">Layanan Bahasa Indonesia</SectionEyebrow>
        <Reveal>
          <SectionHeading as="h1" className="text-center">
            Alat PDF Online <br />
            <span className="text-muted-foreground">100% Gratis &amp; Tanpa Upload ke Server</span>
          </SectionHeading>
        </Reveal>
        <p className="text-foreground/40 text-sm max-w-xl mx-auto px-4">
          Semua proses berjalan langsung di memori perangkat Anda. File Anda tetap aman dan tidak pernah dikirim ke internet.
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsId.map((tool, idx) => (
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
                    Buka Alat &rarr;
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
