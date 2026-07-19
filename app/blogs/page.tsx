import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PDF Guides, Tips & Tutorials Blog | iCreatePDF',
  description: 'Free guides on converting, compressing, merging, signing, and editing PDF files. Expert tips for JPG to PDF, digital signatures, and document management.',
  keywords: 'pdf guides, pdf blog, convert pdf tutorial, compress pdf guide, merge pdf tutorial, sign pdf online guide, pdf tips 2026',
  alternates: buildAlternates('/blogs'),
  openGraph: {
    title: 'PDF Guides, Tips & Tutorials | iCreatePDF Blog',
    description: 'Expert guides on PDF conversion, compression, signatures, and document management.',
    type: 'website',
  },
};

const blogPosts = [
  {
    slug: 'how-to-convert-base64-to-pdf',
    title: 'How to Convert Base64 to PDF Online — Free Developer Guide',
    excerpt: 'Learn how to safely decode a Base64 string back into a PDF document, write custom scripts in JavaScript/Python, and decode payloads client-side.',
    date: 'July 19, 2026',
    readTime: '4 min read',
    category: 'Developer Tools',
    color: 'purple',
  },
  {
    slug: 'how-to-verify-pdf-signature',
    title: 'How to Verify a PDF Digital Signature Online — Free Guide',
    excerpt: 'Validate cryptographic signatures on a PDF and inspect signer identity, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Digital Signatures',
    color: 'emerald',
  },
  {
    slug: 'how-to-certify-pdf-with-fingerprint',
    title: 'How to Certify a PDF with a SHA-256 Fingerprint — Free Guide',
    excerpt: 'Stamp a PDF with a cryptographic fingerprint and scannable QR code to prove it hasn\'t been altered.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Security & Privacy',
    color: 'blue',
  },
  {
    slug: 'how-to-convert-markdown-to-pdf',
    title: 'How to Convert Markdown to PDF Online — Free Guide',
    excerpt: 'Convert styled Markdown files to formatted PDF documents, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'Document Setup',
    color: 'purple',
  },
  {
    slug: 'how-to-convert-txt-to-pdf',
    title: 'How to Convert TXT to PDF Online — Free Guide',
    excerpt: 'Convert plain text files or pasted text into styled PDF documents, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'Document Setup',
    color: 'pink',
  },
  {
    slug: 'how-to-convert-ris-to-pdf-bibliography',
    title: 'How to Convert RIS to PDF (Bibliography & Citations) — Free Guide',
    excerpt: 'Parse RIS bibliographic citation files and compile them into a formatted PDF bibliography.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Academic Tools',
    color: 'orange',
  },
  {
    slug: 'how-to-listen-to-pdf-text-to-speech',
    title: 'How to Listen to a PDF Read Aloud (Text-to-Speech) — Free Guide',
    excerpt: 'Listen to any PDF read aloud in your browser with adjustable voice and speed.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'Reading Experience',
    color: 'violet',
  },
  {
    slug: 'pdf-accessibility-checker-guide',
    title: 'How to Check PDF Accessibility (WCAG & Screen Reader Audit) — Free Guide',
    excerpt: 'Audit any PDF for screen-reader accessibility: tagging, declared language, and labeled form fields.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Accessibility',
    color: 'emerald',
  },
  {
    slug: 'how-to-add-header-footer-to-pdf',
    title: 'How to Add a Header and Footer to a PDF — Free Guide',
    excerpt: 'Add custom headers and footers to every page of a PDF, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'Document Setup',
    color: 'blue',
  },
  {
    slug: 'how-to-compare-two-pdf-files',
    title: 'How to Compare Two PDF Files Side-by-Side — Free Guide',
    excerpt: 'Compare two PDF document versions side-by-side with synchronized scrolling.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'Document Review',
    color: 'purple',
  },
  {
    slug: 'how-to-generate-qr-code-pdf',
    title: 'How to Generate a QR Code PDF Online — Free Guide',
    excerpt: 'Turn any URL or text into a QR code and download it as a clean, print-ready PDF, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'Document Setup',
    color: 'emerald',
  },
  {
    slug: 'how-to-generate-barcode-pdf',
    title: 'How to Generate a Barcode PDF Online — Free Guide',
    excerpt: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcodes and download as a print-ready PDF.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'Document Setup',
    color: 'blue',
  },
  {
    slug: 'how-to-delete-pages-from-pdf',
    title: 'How to Delete Pages from a PDF Online — Free Guide',
    excerpt: 'Cut, delete, or remove unwanted pages from a PDF document, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'PDF Editing',
    color: 'purple',
  },
  {
    slug: 'how-to-scan-documents-to-pdf',
    title: 'How to Scan Documents to PDF with Your Phone or Webcam — Free Guide',
    excerpt: 'Turn your phone or webcam camera into a document scanner, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Document Setup',
    color: 'pink',
  },
  {
    slug: 'how-to-organize-pdf-pages',
    title: 'How to Organize PDF Pages Online — Free Guide',
    excerpt: 'Rearrange, rotate, or delete specific pages in a PDF using visual thumbnails, in one pass.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'PDF Management',
    color: 'orange',
  },
  {
    slug: 'how-to-convert-html-to-pdf',
    title: 'How to Convert HTML to PDF Online — Free Guide',
    excerpt: 'Turn HTML and CSS templates into formatted PDF documents in your browser. No upload, no server rendering.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Document Setup',
    color: 'emerald',
  },
  {
    slug: 'how-to-convert-pdf-to-excel',
    title: 'How to Convert PDF to Excel Online — Free Guide',
    excerpt: 'Extract tables from a PDF into Excel-ready CSV files. Automatic row and column detection, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Data Extraction',
    color: 'blue',
  },
  {
    slug: 'how-to-crop-pdf-pages',
    title: 'How to Crop PDF Pages Online — Free Guide',
    excerpt: 'Trim margins, remove scanner borders, and cut white space from PDF pages, directly in your browser.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'PDF Editing',
    color: 'purple',
  },
  {
    slug: 'how-to-resize-pdf-pages',
    title: 'How to Resize PDF Pages to A4, Letter, or Custom Size — Free Guide',
    excerpt: 'Normalize every page of a PDF to a consistent size without losing content quality.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'Document Setup',
    color: 'pink',
  },
  {
    slug: 'how-to-repair-corrupted-pdf',
    title: 'How to Repair a Corrupted PDF Online — Free Guide',
    excerpt: 'Fix corrupted, damaged, or broken PDF files by rebuilding cross-reference tables and object streams.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Document Recovery',
    color: 'orange',
  },
  {
    slug: 'how-to-convert-pdf-to-jpg',
    title: 'How to Convert PDF to JPG Online — Free Guide',
    excerpt: 'Turn every page of a PDF into a JPG image in seconds, right in your browser. No uploads, no watermark, download as a ZIP instantly.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Image Conversion',
    color: 'emerald',
  },
  {
    slug: 'how-to-rotate-pdf-pages',
    title: 'How to Rotate PDF Pages Online — Free Guide',
    excerpt: 'Fix sideways or upside-down PDF pages in seconds. Rotate one page or the whole document, entirely in your browser.',
    date: 'July 18, 2026',
    readTime: '3 min read',
    category: 'PDF Editing',
    color: 'blue',
  },
  {
    slug: 'how-to-extract-text-from-pdf',
    title: 'How to Extract Text from a PDF Online — Free Guide',
    excerpt: 'Pull the raw text out of any PDF, page by page, entirely in your browser. No uploads, copy or download as .txt instantly.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'Text Extraction',
    color: 'purple',
  },
  {
    slug: 'how-to-edit-pdf-online-free',
    title: 'How to Edit a PDF Online for Free — Text Overlays & Annotations',
    excerpt: 'Add text, annotations, and overlays to any PDF directly in your browser. No account, no upload — download instantly.',
    date: 'July 18, 2026',
    readTime: '4 min read',
    category: 'PDF Editing',
    color: 'pink',
  },
  {
    slug: 'proof-zero-server-uploads-how-to-verify-offline-pdf-converter',
    title: 'Proof: How to Verify iCreatePDF is 100% Server-Free (Convert Offline)',
    excerpt: 'Wondering if your private documents are safe on online PDF tools? Here is a step-by-step guide to verify iCreatePDF is 100% server-free by running it completely offline.',
    date: 'July 16, 2026',
    readTime: '4 min read',
    category: 'Security & Privacy',
    color: 'blue',
  },
  {
    slug: 'how-to-create-fillable-pdf-forms-free',
    title: 'How to Create Fillable PDF Forms Free Online',
    excerpt: 'Learn how to easily create interactive fillable PDF forms client-side for free. Add text inputs, checkboxes, dropdown lists, and radio selectors in the browser sandbox.',
    date: 'July 12, 2026',
    readTime: '4 min read',
    category: 'Productivity Guides',
    color: 'purple',
  },
  {
    slug: 'how-to-compress-pdf-without-losing-quality',
    title: 'How to Compress a PDF Without Losing Quality (2026 Guide)',
    excerpt: 'Learn the best methods to reduce PDF file size while keeping images and text sharp. Compression levels explained, expert tips, and a file size target guide.',
    date: 'May 25, 2026',
    readTime: '5 min read',
    category: 'PDF Compression',
    color: 'blue',
  },
  {
    slug: 'how-to-redact-pdf-online-free',
    title: 'How to Redact PDF Files Online Free & Securely (2026 Guide)',
    excerpt: 'Learn how to black out sensitive information, text, and images from your PDFs. 100% private, browser-based redaction with no server uploads.',
    date: 'May 26, 2026',
    readTime: '5 min read',
    category: 'Security & Privacy',
    color: 'blue',
  },
  {
    slug: 'how-to-extract-pages-from-pdf',
    title: 'How to Extract and Organize PDF Pages Free (2026 Guide)',
    excerpt: 'Whether you need to extract a single receipt from a giant document, crop out scanner borders, or resize pages to A4, here is how to do it instantly in your browser.',
    date: 'May 26, 2026',
    readTime: '4 min read',
    category: 'PDF Editing',
    color: 'emerald',
  },
  {
    slug: 'how-to-edit-pdf-metadata',
    title: 'How to Edit PDF Metadata and Document Properties',
    excerpt: 'Clean up document traits, change the author, edit keywords, or add consistent headers and footers to your files securely in the browser.',
    date: 'May 26, 2026',
    readTime: '4 min read',
    category: 'Document Setup',
    color: 'pink',
  },
  {
    slug: 'bates-numbering-pdf-guide',
    title: 'What is Bates Numbering? (Complete Guide & PDF Tool)',
    excerpt: 'Discover the essential standard of legal page numbering, why it is critical for case files, and how to apply custom prefix, suffix, and padded numbers.',
    date: 'May 26, 2026',
    readTime: '5 min read',
    category: 'Legal & Compliance',
    color: 'orange',
  },
  {
    slug: 'how-to-invert-pdf-colors-dark-mode',
    title: 'How to Invert PDF Colors for Night Reading (Dark Mode PDF)',
    excerpt: 'Staring at bright white PDFs in a dark room causes digital eye strain. Learn how to convert pages to dark mode by inverting R, G, B colors.',
    date: 'May 26, 2026',
    readTime: '4 min read',
    category: 'Reading Experience',
    color: 'purple',
  },
  {
    slug: 'how-to-merge-pdf-files-free',
    title: 'How to Merge Multiple PDFs Into One File — Free & No Upload',
    excerpt: 'Combine bank statements, reports, contracts, and photos into a single PDF in seconds — entirely in your browser. Includes a comparison table vs other tools.',
    date: 'May 22, 2026',
    readTime: '4 min read',
    category: 'PDF Management',
    color: 'emerald',
  },
  {
    slug: 'how-to-sign-pdf-online-free',
    title: 'How to Add a Digital Signature to a PDF Online — Free',
    excerpt: 'Sign PDFs without software or uploads. Covers all signature types, legal validity across jurisdictions, step-by-step instructions, and verification.',
    date: 'May 20, 2026',
    readTime: '5 min read',
    category: 'Digital Signatures',
    color: 'pink',
  },
  {
    slug: 'jpg-to-pdf-complete-guide',
    title: 'JPG to PDF: The Complete Guide to Converting Images to PDF Free',
    excerpt: 'Everything about converting JPG, PNG, HEIC, and WEBP images to PDF — supported formats, quality settings, expert tips for best output, and FAQs.',
    date: 'May 18, 2026',
    readTime: '6 min read',
    category: 'Image Conversion',
    color: 'orange',
  },
  {
    slug: 'how-to-convert-iphone-photos-to-pdf',
    title: 'How to Convert HEIC Photos to PDF',
    excerpt: 'Step-by-step guide on how to convert HEIC/HEIF pictures from your mobile device to standard PDF documents easily without uploading them to unsecured servers.',
    date: 'May 20, 2026',
    readTime: '4 min read',
    category: 'Mobile Guides',
    color: 'purple',
  },
  {
    slug: 'best-free-image-to-pdf-tools-2026',
    title: 'Best Free Image to PDF Online Tools (2026 Review)',
    excerpt: 'A comprehensive review comparing the fastest, safest, and most featured online tools to merge your PNG, JPG, and WEBP images into PDFs.',
    date: 'May 15, 2026',
    readTime: '6 min read',
    category: 'Tools Review',
    color: 'violet',
  },
  {
    slug: 'how-to-prevent-copying-text-from-pdf',
    title: 'How to Prevent Copying Text from PDF Online Free',
    excerpt: 'Learn the absolute safest way to disable text highlighting, selection, and copy-pasting from your PDF documents client-side using local page rasterization.',
    date: 'May 28, 2026',
    readTime: '4 min read',
    category: 'Security & Privacy',
    color: 'blue',
  },
  {
    slug: 'how-to-convert-scanned-pdf-to-text-ocr',
    title: 'How to Convert Scanned PDF to Text (Free Online OCR)',
    excerpt: 'Learn how to extract copyable text from scanned documents and image-only PDF files using client-side OCR character recognition in English, Spanish, Tamil, and Hindi.',
    date: 'May 28, 2026',
    readTime: '5 min read',
    category: 'Text Extraction',
    color: 'emerald',
  },
  {
    slug: 'how-to-generate-certificates-in-bulk',
    title: 'How to Generate Certificates in Bulk from Excel List (2026 Guide)',
    excerpt: 'Need to create certificates, invitation cards, or tickets for hundreds of recipients? Learn how to generate personalized certificates client-side in bulk using a template and Excel.',
    date: 'May 29, 2026',
    readTime: '5 min read',
    category: 'Document Setup',
    color: 'pink',
  },
  {
    slug: 'how-to-password-protect-and-unlock-pdf',
    title: 'How to Password Protect and Unlock PDF Files Securely',
    excerpt: 'Learn how to encrypt your PDF files with owner/user passwords and strip passwords from encrypted files 100% locally in your browser sandbox.',
    date: 'May 29, 2026',
    readTime: '5 min read',
    category: 'Security & Privacy',
    color: 'blue',
  },
  {
    slug: 'how-to-convert-word-docx-to-pdf-free',
    title: 'How to Convert DOCX to PDF Free Without Layout Shifts',
    excerpt: 'Convert standard word processor files (.docx) into clean PDFs entirely client-side, preserving text layout, tables, and images without server uploads.',
    date: 'May 29, 2026',
    readTime: '4 min read',
    category: 'Image Conversion',
    color: 'orange',
  },
  {
    slug: 'how-to-split-pdf-pages-free',
    title: 'How to Split, Delete, and Extract PDF Pages Free (2026 Guide)',
    excerpt: 'Learn how to extract pages, split files, or delete specific pages visually with previews. Done entirely in the browser with no server uploads.',
    date: 'May 29, 2026',
    readTime: '4 min read',
    category: 'PDF Editing',
    color: 'emerald',
  },
  {
    slug: 'how-to-grayscale-and-flatten-pdf',
    title: 'How to Convert PDF to Grayscale and Flatten Form Layers',
    excerpt: 'Learn how to convert color PDFs to black & white for ink-saving printing, and flatten form fields, annotation layers, and signatures locally.',
    date: 'May 29, 2026',
    readTime: '4 min read',
    category: 'PDF Management',
    color: 'purple',
  },
  {
    slug: 'how-to-add-watermark-and-page-numbers-to-pdf',
    title: 'How to Add Custom Watermark and Page Numbers to PDF',
    excerpt: 'Learn how to stamp configurable watermarks and sequential page numbers on all pages of your PDF document securely in your browser.',
    date: 'May 29, 2026',
    readTime: '5 min read',
    category: 'Document Setup',
    color: 'pink',
  },
];

const colorMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
  pink: 'text-pink-400 bg-pink-500/10',
  orange: 'text-orange-400 bg-orange-500/10',
  purple: 'text-brand bg-brand/10',
  violet: 'text-violet-400 bg-violet-500/10',
};

export default function BlogIndexPage() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Blog' },
            ])
          ),
        }}
      />
      <Navigation />

      <div className="max-w-5xl mx-auto px-6 py-32 space-y-12 flex-1 w-full">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-semibold text-brand tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            Guides &amp; Articles
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl font-display">
            iCreatePDF Blog
          </h1>
          <p className="text-foreground/40 text-sm max-w-xl mx-auto">
            Expert guides on PDF conversion, compression, signatures, editing, and document management — all with your privacy in mind.
          </p>
          <p className="text-foreground/30 text-xs max-w-2xl mx-auto leading-relaxed pt-2">
            Welcome to the iCreatePDF learning resource library. Here you will find detailed guides, step-by-step tutorials, and industry compliance reviews focusing on client-side document processing. Learn how WebAssembly and modern browser capabilities let you compress, sign, redact, and convert PDFs 100% locally on your computer without ever uploading files to external cloud servers.
          </p>
        </div>

        {/* Featured post */}
        <Link href={`/blogs/${blogPosts[0].slug}`} className="group block">
          <div className="p-8 rounded-2xl bg-card border border-foreground/5 hover:border-brand/30 transition-all duration-300 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-3 flex-1">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${colorMap[blogPosts[0].color]}`}>
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl font-bold text-foreground group-hover:text-brand transition-colors font-display leading-snug">
                  {blogPosts[0].title}
                </h2>
                <p className="text-sm text-foreground/50 leading-relaxed max-w-2xl">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-foreground/40 pt-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{blogPosts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{blogPosts[0].readTime}</span>
                </div>
              </div>
              <div className="sm:pt-1 shrink-0">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand group-hover:translate-x-1 transition-transform">
                  Read Post <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Rest of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-card border border-foreground/5 hover:border-brand/30 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${colorMap[post.color]}`}>
                  {post.category}
                </span>
                <h2 className="text-base font-bold text-foreground group-hover:text-brand transition-colors font-display leading-snug">
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-xs text-foreground/50 leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-foreground/5 mt-5">
                <div className="flex items-center gap-3 text-xs text-foreground/40">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                </div>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand group-hover:translate-x-1 transition-transform"
                >
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
