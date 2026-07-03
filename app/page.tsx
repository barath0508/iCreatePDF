import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { InfrastructureSection } from '@/components/landing/infrastructure-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';
import { FaqSection } from '@/components/landing/faq-section';
import { 
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText, Shield, FileSignature, Edit, ShieldCheck,
  Code, Layers, Printer, Columns, EyeOff, Crop, BookOpen, Wrench, Info,
  AlignCenter, Maximize2, Moon, QrCode, BookMarked, Trash2
} from 'lucide-react';

const tools = [
  {
    icon: Combine,
    title: 'Merge PDF',
    desc: 'Combine multiple PDF documents into a single document in any page order.',
    href: '/merge-pdf',
  },
  {
    icon: Scissors,
    title: 'Split PDF',
    desc: 'Extract page ranges or split a PDF into separate files.',
    href: '/split-pdf',
  },
  {
    icon: Sliders,
    title: 'Organize PDF',
    desc: 'Rearrange, rotate, or delete specific pages visually with previews.',
    href: '/organize-pdf',
  },
  {
    icon: Image,
    title: 'JPG to PDF',
    desc: 'Convert JPG, PNG, WEBP, HEIC, and BMP images into a clean PDF.',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PNG to PDF',
    desc: 'Convert PNG images into a high-quality PDF document locally.',
    href: '/png-to-pdf',
  },
  {
    icon: FileImage,
    title: 'HEIC to PDF',
    desc: 'Convert Apple iPhone HEIC photos to PDF without uploading.',
    href: '/heic-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PDF to JPG',
    desc: 'Extract each page of a PDF document as high-fidelity JPEG images.',
    href: '/pdf-to-jpg',
  },
  {
    icon: FileText,
    title: 'Word to PDF',
    desc: 'Convert standard Microsoft Word (.docx) documents into clean PDFs.',
    href: '/word-to-pdf',
  },
  {
    icon: FileText,
    title: 'TXT to PDF',
    desc: 'Convert plain text files (.txt) or raw typed text into formatted PDF sheets.',
    href: '/txt-to-pdf',
  },
  {
    icon: Camera,
    title: 'Scan to PDF',
    desc: 'Capture document pages using your camera and compile into a PDF.',
    href: '/scan-to-pdf',
  },
  {
    icon: Minimize2,
    title: 'Compress PDF',
    desc: 'Optimize file streams locally to decrease PDF document sizes.',
    href: '/compress-pdf',
  },
  {
    icon: RotateCw,
    title: 'Rotate PDF',
    desc: 'Rotate PDF document pages clockwise in bulk or individually.',
    href: '/rotate-pdf',
  },
  {
    icon: Shield,
    title: 'Protect PDF',
    desc: 'Encrypt your PDF files with a secure password locally.',
    href: '/protect-pdf',
  },
  {
    icon: Unlock,
    title: 'Unlock PDF',
    desc: 'Strip password encryption locks from PDF files client-side.',
    href: '/unlock-pdf',
  },
  {
    icon: Type,
    title: 'Watermark PDF',
    desc: 'Stamp configurable text overlays on all pages of a PDF document.',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'Page Numbers',
    desc: 'Add page numbers with custom layout positioning and labels.',
    href: '/add-page-numbers',
  },
  {
    icon: FileSignature,
    title: 'Sign PDF',
    desc: 'Draw or type your signature and visually stamp it on PDF pages.',
    href: '/sign-pdf',
  },
  {
    icon: FileText,
    title: 'PDF to Text',
    desc: 'Extract structured text layouts from PDF files to clipboard or TXT.',
    href: '/pdf-to-text',
  },
  {
    icon: Edit,
    title: 'Edit PDF',
    desc: 'Insert custom text annotation overlays on top of PDF layouts.',
    href: '/edit-pdf',
  },
  {
    icon: ShieldCheck,
    title: 'Verify Signature',
    desc: 'Inspect digital certificates and verify signed PDF integrity.',
    href: '/verify-signature',
  },
  {
    icon: Code,
    title: 'HTML to PDF',
    desc: 'Render your custom HTML/CSS code templates into A4 PDF pages locally.',
    href: '/html-to-pdf',
  },
  {
    icon: FileText,
    title: 'Markdown to PDF',
    desc: 'Write styled Markdown documents and compile them to clean A4 PDFs.',
    href: '/markdown-to-pdf',
  },
  {
    icon: Layers,
    title: 'Flatten PDF',
    desc: 'Merge forms, fields, and annotation layers into static read-only PDF text.',
    href: '/flatten-pdf',
  },
  {
    icon: Printer,
    title: 'Grayscale PDF',
    desc: 'Convert colorful PDF documents to black and white to save printer ink.',
    href: '/grayscale-pdf',
  },
  {
    icon: Columns,
    title: 'Compare PDF',
    desc: 'Audit document differences side-by-side with synchronized scrolling.',
    href: '/compare-pdf',
  },
  {
    icon: EyeOff,
    title: 'Redact PDF',
    desc: 'Draw black boxes over sensitive content — permanently burned into the document.',
    href: '/redact-pdf',
  },
  {
    icon: Crop,
    title: 'Crop PDF',
    desc: 'Trim scanner borders and excess whitespace from all PDF page margins.',
    href: '/crop-pdf',
  },
  {
    icon: BookOpen,
    title: 'Extract Pages',
    desc: 'Pull specific pages or ranges (1,3,5-8) into a new standalone PDF.',
    href: '/extract-pages',
  },
  {
    icon: Wrench,
    title: 'Repair PDF',
    desc: 'Recover corrupted PDF files by rebuilding internal cross-reference tables.',
    href: '/repair-pdf',
  },
  {
    icon: Info,
    title: 'PDF Metadata',
    desc: 'View and edit hidden document properties: title, author, subject, keywords.',
    href: '/pdf-metadata',
  },
  {
    icon: AlignCenter,
    title: 'Header & Footer',
    desc: 'Stamp custom text at the top and bottom of every page with page number tokens.',
    href: '/header-footer',
  },
  {
    icon: Maximize2,
    title: 'Resize PDF',
    desc: 'Normalize all pages to A4, Letter, A3, Legal, or A5 in portrait or landscape.',
    href: '/resize-pdf',
  },
  {
    icon: BookMarked,
    title: 'Bates Numbering',
    desc: 'Sequential legal stamping with custom prefix, suffix, and zero-padded numbering.',
    href: '/bates-numbering',
  },
  {
    icon: Moon,
    title: 'Invert PDF',
    desc: 'Pixel-invert every page for dark mode reading and eye strain reduction.',
    href: '/invert-pdf',
  },
  {
    icon: QrCode,
    title: 'QR to PDF',
    desc: 'Generate a clean A4 PDF with an embedded QR code for any URL or text.',
    href: '/qr-to-pdf',
  },
  {
    icon: Trash2,
    title: 'Delete Pages',
    desc: 'Remove individual pages or complete ranges of pages from your PDF file.',
    href: '/delete-pdf-pages',
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      <Navigation />
      <HeroSection />

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-24 bg-black relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-purple-400">
              <span className="w-8 h-px bg-purple-500/30" />
              SaaS Document suite
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[72px] font-display tracking-tight leading-[0.95] text-white">
              Organize, convert &amp; <br />
              <span className="text-white/45">manipulate PDFs.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
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
                  Open Tool &rarr;
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
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
