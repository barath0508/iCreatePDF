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
import { SectionEyebrow } from '@/components/landing/shared/section-eyebrow';
import { SectionHeading } from '@/components/landing/shared/section-heading';
import { Reveal } from '@/components/landing/shared/reveal';
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
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is iCreatePDF completely free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, iCreatePDF is 100% free with no page limits, file size restrictions, or registration requirements. All conversion and document editing features are fully unlocked for everyone."
                }
              },
              {
                "@type": "Question",
                "name": "Are my documents secure on iCreatePDF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. iCreatePDF works entirely client-side. Your files are processed locally in your browser sandbox using WebAssembly and Javascript. They are never uploaded to any external server, ensuring absolute privacy."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use iCreatePDF offline?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Since all processing runs locally within your browser sandbox, once the page is loaded, the tools do not need an active internet connection to modify, merge, compress, or convert your PDF files."
                }
              },
              {
                "@type": "Question",
                "name": "Do you upload my files to any remote server?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, never. Unlike conventional PDF tools that upload your sensitive documents to cloud servers, iCreatePDF compiles everything directly on your CPU. Your data never leaves your local device."
                }
              },
              {
                "@type": "Question",
                "name": "What file formats are supported by iCreatePDF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support converting JPG, PNG, WEBP, HEIC, BMP, Word (.docx), TXT, HTML, and Markdown to PDF. You can also merge, split, rotate, compress, protect, unlock, sign, grayscale, flatten, and edit existing PDFs."
                }
              },
              {
                "@type": "Question",
                "name": "How does local browser-based PDF processing work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We leverage cutting-edge browser technologies like WebAssembly (Wasm) compiles of C/C++ library engines, Javascript binary arrays, and HTML5 canvas APIs to perform heavy-duty document computations directly in your browser memory space."
                }
              }
            ]
          })
        }}
      />
      <HeroSection />

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-24 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <SectionEyebrow className="justify-center">Document suite</SectionEyebrow>
            <Reveal>
              <SectionHeading className="text-center">
                Organize, convert &amp; <br />
                <span className="text-muted-foreground">manipulate PDFs.</span>
              </SectionHeading>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, idx) => (
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
                    Open Tool &rarr;
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
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
