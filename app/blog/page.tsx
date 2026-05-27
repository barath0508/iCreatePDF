import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PDF Guides, Tips & Tutorials Blog | iCreatePDF',
  description: 'Free guides on converting, compressing, merging, signing, and editing PDF files. Expert tips for JPG to PDF, digital signatures, and document management.',
  keywords: 'pdf guides, pdf blog, convert pdf tutorial, compress pdf guide, merge pdf tutorial, sign pdf online guide, pdf tips 2026',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'PDF Guides, Tips & Tutorials | iCreatePDF Blog',
    description: 'Expert guides on PDF conversion, compression, signatures, and document management.',
    type: 'website',
  },
};

const blogPosts = [
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
    title: 'How to Convert iPhone Photos (HEIC) to PDF',
    excerpt: 'Step-by-step guide on how to convert HEIC/HEIF pictures from your iPhone to standard PDF documents easily without uploading them to unsecured servers.',
    date: 'May 20, 2026',
    readTime: '4 min read',
    category: 'iPhone Guides',
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
];

const colorMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
  pink: 'text-pink-400 bg-pink-500/10',
  orange: 'text-orange-400 bg-orange-500/10',
  purple: 'text-purple-400 bg-purple-500/10',
  violet: 'text-violet-400 bg-violet-500/10',
};

export default function BlogIndexPage() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />

      <div className="max-w-5xl mx-auto px-6 py-32 space-y-12 flex-1 w-full">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            Guides &amp; Articles
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            iCreatePDF Blog
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Expert guides on PDF conversion, compression, signatures, editing, and document management — all with your privacy in mind.
          </p>
        </div>

        {/* Featured post */}
        <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
          <div className="p-8 rounded-2xl bg-zinc-950 border border-white/5 hover:border-purple-500/30 transition-all duration-300 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-3 flex-1">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${colorMap[blogPosts[0].color]}`}>
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors font-display leading-snug">
                  {blogPosts[0].title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed max-w-2xl">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-white/40 pt-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{blogPosts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{blogPosts[0].readTime}</span>
                </div>
              </div>
              <div className="sm:pt-1 shrink-0">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
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
              className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-950 border border-white/5 hover:border-purple-500/30 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${colorMap[post.color]}`}>
                  {post.category}
                </span>
                <h2 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors font-display leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-xs text-white/50 leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-5">
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform"
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
