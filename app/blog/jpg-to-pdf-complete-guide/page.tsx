import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'JPG to PDF: How to Convert Images to PDF Online Free | iCreatePDF',
  description: 'Convert JPG, PNG, WEBP, and HEIC images to PDF instantly in your browser. No signup, no upload, no file size limits. Step-by-step guide.',
  keywords: 'jpg to pdf, convert image to pdf free, png to pdf online, jpeg to pdf converter, convert photo to pdf 2026',
  alternates: buildAlternates('/blog/jpg-to-pdf-complete-guide'),
  openGraph: {
    title: 'JPG to PDF: Complete Guide to Converting Images to PDF Free',
    description: 'Convert any image format to PDF in your browser — free, private, and instant.',
    type: 'article',
    publishedTime: '2026-05-18T00:00:00Z',
  },
};

const formats = [
  { ext: 'JPG / JPEG', desc: 'The most common photo format from cameras and smartphones. Best for photos.', compatible: true },
  { ext: 'PNG', desc: 'Lossless format with transparency support. Perfect for screenshots and graphics.', compatible: true },
  { ext: 'WEBP', desc: 'Google\'s modern format offering better compression than JPG at similar quality.', compatible: true },
  { ext: 'HEIC / HEIF', desc: 'Apple\'s default iPhone photo format. Excellent quality at half the file size of JPG.', compatible: true },
  { ext: 'GIF', desc: 'Animated format. Only the first frame is typically embedded in PDFs.', compatible: true },
  { ext: 'BMP', desc: 'Uncompressed Windows bitmap. Very large files but no quality loss.', compatible: true },
];

const settings = [
  { name: 'Page Size', options: 'A4, Letter, A3, Legal, Custom dimensions', tip: 'A4 is the global standard for most document submissions.' },
  { name: 'Orientation', options: 'Portrait or Landscape', tip: 'Use Landscape for wide panorama photos or presentations.' },
  { name: 'Image Fit', options: 'Fit to Page, Fill Page, Actual Size', tip: '"Fit to Page" prevents cropping and maintains aspect ratio.' },
  { name: 'Margin', options: 'None, Small (5mm), Medium (10mm), Large (20mm)', tip: 'No margin maximises image area; use margins for print-ready documents.' },
  { name: 'Quality', options: 'High, Medium, Low', tip: 'High quality for archiving; Medium for email; Low for web sharing.' },
];

export default function JpgToPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'JPG to PDF: How to Convert Images to PDF Online Free | iCreatePDF',
          description: 'Convert JPG, PNG, WEBP, and HEIC images to PDF instantly in your browser. No signup, no upload, no file size limits. Step-by-step guide.',
          url: '/blog/jpg-to-pdf-complete-guide',
          datePublished: '2026-05-18T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">Image Conversion</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            JPG to PDF: The Complete Guide to Converting Images to PDF Online Free
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            From single photos to multi-image documents — everything you need to know about converting any image format to a professional PDF, right in your browser.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />May 18, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />6 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Converting images to PDF is one of the most frequently searched document tasks on the internet — and for good reason. PDFs preserve layout perfectly, are universally openable, and are the accepted standard for official submissions, applications, and professional sharing.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Supported Image Formats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {formats.map((f) => (
              <div key={f.ext} className="p-3 rounded-xl bg-card border border-foreground/5 flex items-start gap-3">
                <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded font-mono shrink-0">{f.ext}</span>
                <p className="text-xs text-foreground/50 leading-normal">{f.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Convert JPG to PDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/jpg-to-pdf" className="text-brand hover:underline">iCreatePDF — JPG to PDF</Link>.</li>
            <li>Drag and drop your images into the upload zone, or click to browse. Add as many as you need.</li>
            <li>Reorder the images by dragging thumbnails to set the page sequence.</li>
            <li>Configure your <strong className="text-foreground">PDF settings</strong> in the panel on the right (page size, orientation, quality, margins).</li>
            <li>Click <strong className="text-foreground">Convert to PDF</strong> and download your file. Done.</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">PDF Settings Explained</h2>
          <div className="space-y-3 my-4">
            {settings.map((s) => (
              <div key={s.name} className="p-4 rounded-xl bg-card border border-foreground/5 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-bold text-foreground">{s.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-foreground/40 font-mono leading-relaxed">{s.options}</p>
                </div>
                <div>
                  <p className="text-[10px] text-brand/80 leading-relaxed">{s.tip}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Why Convert Images to PDF?</h2>
          <p>
            While JPEG and PNG are excellent for photos, they have limitations when it comes to sharing and submissions:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li><strong className="text-foreground">Fixed layout</strong> — PDFs look identical on every device and screen size.</li>
            <li><strong className="text-foreground">Multi-page support</strong> — bundle dozens of images into a single file.</li>
            <li><strong className="text-foreground">Universal compatibility</strong> — every operating system, phone, and web browser can open a PDF.</li>
            <li><strong className="text-foreground">Compression</strong> — a PDF can be significantly smaller than the sum of its source images.</li>
            <li><strong className="text-foreground">Professional presentation</strong> — PDFs are the accepted standard for job applications, legal documents, academic submissions, and business proposals.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Tips for the Best Output Quality</h2>
          <div className="space-y-4">
            {[
              { tip: 'Use High quality for documents with small text', detail: 'If your images contain text (receipts, ID cards, typed documents), use the High quality setting to ensure text remains sharp and readable.' },
              { tip: 'Shoot photos in landscape for A4 pages', detail: 'A landscape-oriented photo fills an A4 page much better than a portrait one. If you cannot reshoot, use the Landscape orientation setting.' },
              { tip: 'Use PNG for screenshots and graphics', detail: 'PNG lossless compression preserves the sharp edges of UI screenshots, logos, and illustrations better than JPG.' },
              { tip: 'Remove EXIF data for privacy', detail: 'JPG photos contain embedded metadata (GPS location, device info, timestamps). While iCreatePDF strips most of this on conversion, you can use a dedicated EXIF remover tool for sensitive documents.' },
            ].map((t) => (
              <div key={t.tip} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1">
                <p className="text-sm font-bold text-foreground">💡 {t.tip}</p>
                <p className="text-xs text-foreground/50 leading-relaxed pl-5">{t.detail}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How many images can I convert at once?', a: 'There is no hard limit in iCreatePDF. The practical limit depends on your device memory. Most users process 20–100 images in a single session.' },
              { q: 'Will converting to PDF reduce image quality?', a: 'Only if you choose Medium or Low quality settings. With High quality, the image is embedded nearly losslessly and the visual difference is imperceptible.' },
              { q: 'Can I convert a PDF back to JPG?', a: 'Yes — use the PDF to JPG tool on iCreatePDF to extract each page as a high-resolution JPEG image.' },
              { q: 'Does the converter work on mobile?', a: 'Yes. iCreatePDF is fully responsive. You can select photos from your camera roll and convert them on iPhone, Android, or any tablet browser.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-950/20 to-purple-950/20 border border-orange-500/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Convert your images to PDF now</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">JPG, PNG, HEIC, WEBP — any format, any device, always free.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/jpg-to-pdf">
              <Button className="bg-orange-600 hover:bg-orange-700 text-foreground font-medium text-xs px-5 rounded-full group">
                JPG to PDF
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/png-to-pdf">
              <Button variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5 font-medium text-xs px-5 rounded-full">
                PNG to PDF
              </Button>
            </Link>
            <Link href="/heic-to-pdf">
              <Button variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5 font-medium text-xs px-5 rounded-full">
                HEIC to PDF
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}
