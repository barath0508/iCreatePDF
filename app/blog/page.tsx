import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PDF Guides & Document Management Blog | iCreatePDF',
  description: 'Learn how to convert, compress, and organize your images, PDF documents, and iPhone photos. Free guides and tools reviews.',
  keywords: 'pdf guides, image to pdf blog, convert heic to pdf guide, pdf tips 2026',
};

const blogPosts = [
  {
    slug: 'how-to-convert-iphone-photos-to-pdf',
    title: 'How to Convert iPhone Photos (HEIC) to PDF',
    excerpt: 'Step-by-step guide on how to convert HEIC/HEIF pictures from your iPhone to standard PDF documents easily without uploading them to unsecured servers.',
    date: 'May 20, 2026',
    readTime: '4 min read',
    category: 'iPhone Guides',
  },
  {
    slug: 'best-free-image-to-pdf-tools-2026',
    title: 'Best Free Image to PDF Online Tools (2026 Review)',
    excerpt: 'A comprehensive review comparing the fastest, safest, and most featured online tools to merge your PNG, JPG, and WEBP images into PDFs.',
    date: 'May 15, 2026',
    readTime: '6 min read',
    category: 'Tools Review',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-32 space-y-12 flex-1 w-full">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            Guides &amp; Articles
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            iCreatePDF Blog
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Get tips, tricks, and tutorials on digital documents, image formats, and online productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-950 border border-white/5 hover:border-purple-500/30 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors font-display">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-white/50 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform"
                >
                  Read Post
                  <ArrowRight className="w-3.5 h-3.5" />
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
