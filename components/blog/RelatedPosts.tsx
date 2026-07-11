import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

interface Post {
  slug: string;
  title: string;
  category: string;
  color: string;
}

const allPosts: Post[] = [
  {
    slug: 'how-to-compress-pdf-without-losing-quality',
    title: 'How to Compress a PDF Without Losing Quality (2026 Guide)',
    category: 'PDF Compression',
    color: 'blue',
  },
  {
    slug: 'how-to-redact-pdf-online-free',
    title: 'How to Redact PDF Files Securely (2026 Guide)',
    category: 'Security & Privacy',
    color: 'blue',
  },
  {
    slug: 'how-to-extract-pages-from-pdf',
    title: 'How to Extract and Organize PDF Pages Free',
    category: 'PDF Editing',
    color: 'emerald',
  },
  {
    slug: 'how-to-edit-pdf-metadata',
    title: 'How to Edit PDF Metadata and Document Properties',
    category: 'Document Setup',
    color: 'pink',
  },
  {
    slug: 'bates-numbering-pdf-guide',
    title: 'What is Bates Numbering? (Complete Guide & PDF Tool)',
    category: 'Legal & Compliance',
    color: 'orange',
  },
  {
    slug: 'how-to-invert-pdf-colors-dark-mode',
    title: 'How to Invert PDF Colors for Night Reading',
    category: 'Reading Experience',
    color: 'purple',
  },
  {
    slug: 'how-to-merge-pdf-files-free',
    title: 'How to Merge Multiple PDFs Into One File — Free Guide',
    category: 'PDF Management',
    color: 'emerald',
  },
  {
    slug: 'how-to-sign-pdf-online-free',
    title: 'How to Add a Digital Signature to a PDF Online — Free',
    category: 'Digital Signatures',
    color: 'pink',
  },
  {
    slug: 'jpg-to-pdf-complete-guide',
    title: 'JPG to PDF: How to Convert Images to PDF Online Free',
    category: 'Image Conversion',
    color: 'orange',
  },
  {
    slug: 'how-to-convert-iphone-photos-to-pdf',
    title: 'How to Convert iPhone Photos (HEIC) to PDF',
    category: 'iPhone Guides',
    color: 'purple',
  },
  {
    slug: 'best-free-image-to-pdf-tools-2026',
    title: 'Best Free Image to PDF Online Tools (2026 Review)',
    category: 'Tools Review',
    color: 'violet',
  },
  {
    slug: 'how-to-prevent-copying-text-from-pdf',
    title: 'How to Prevent Copying Text from PDF Online Free',
    category: 'Security & Privacy',
    color: 'blue',
  },
  {
    slug: 'how-to-convert-scanned-pdf-to-text-ocr',
    title: 'How to Convert Scanned PDF to Text (Free Online OCR)',
    category: 'Text Extraction',
    color: 'emerald',
  },
  {
    slug: 'how-to-generate-certificates-in-bulk',
    title: 'How to Generate Certificates in Bulk from Excel',
    category: 'Document Setup',
    color: 'pink',
  },
  {
    slug: 'how-to-password-protect-and-unlock-pdf',
    title: 'How to Password Protect and Unlock PDF Files',
    category: 'Security & Privacy',
    color: 'blue',
  },
  {
    slug: 'how-to-convert-word-docx-to-pdf-free',
    title: 'How to Convert Word DOCX to PDF Free Online',
    category: 'Image Conversion',
    color: 'orange',
  },
  {
    slug: 'how-to-split-pdf-pages-free',
    title: 'How to Split and Delete PDF Pages Free',
    category: 'PDF Editing',
    color: 'emerald',
  },
  {
    slug: 'how-to-grayscale-and-flatten-pdf',
    title: 'How to Grayscale and Flatten PDF Documents',
    category: 'PDF Management',
    color: 'purple',
  },
  {
    slug: 'how-to-add-watermark-and-page-numbers-to-pdf',
    title: 'How to Add Watermark and Page Numbers to PDF',
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

export function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  // Find index of current post
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);
  
  // Get next 3 posts in a circular loop
  const related: Post[] = [];
  for (let i = 1; i <= 3; i++) {
    const nextIndex = (currentIndex + i) % allPosts.length;
    related.push(allPosts[nextIndex]);
  }

  return (
    <section className="border-t border-foreground/10 pt-12 mt-16 space-y-6">
      <h3 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-brand" />
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-6 rounded-2xl bg-card border border-foreground/5 hover:border-brand/30 hover:bg-card/80 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
          >
            <div className="space-y-3">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${colorMap[post.color] || colorMap.blue}`}>
                {post.category}
              </span>
              <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors font-display line-clamp-2 leading-snug">
                {post.title}
              </h4>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand group-hover:translate-x-1 transition-transform pt-4">
              Read Article <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
