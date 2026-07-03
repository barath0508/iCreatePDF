import React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://icreatepdf.com'),
  title: {
    default: 'iCreatePDF - Fast, Free & Private Image to PDF Converter',
    template: '%s | iCreatePDF'
  },
  description: 'Convert JPG, PNG, WEBP, HEIC, and BMP to PDF 100% locally in your browser. Zero sign-up, zero server uploads, privacy first.',
  keywords: 'pdf editor, edit pdf, merge pdf online, split pdf free, compress pdf tool, crop pdf page, redact pdf text, bates numbering legal, convert to pdf, image to pdf, pdf metadata editor, sign pdf digitally, client-side pdf converter, secure pdf processor, local pdf tools, document converter, pdf utility, word to pdf converter, scan to pdf online, unlock password pdf, protect pdf file, delete pdf pages, crop pdf margins, pdf converter free, offline pdf editor, heic to pdf, png to pdf, jpeg to pdf, extract pages from pdf, combine pdf files, split pdf pages, compress pdf size, secure client-side pdf, pdf watermark creator, add page numbers to pdf, draw signature on pdf, flat pdf converter, black out pdf text, fix corrupted pdf, change author pdf, bates stamp generator, dark mode pdf, invert pdf background, scan documents to pdf, generate qr code pdf, compare two pdfs, pdf comparison tool, extract text from pdf, html to pdf free, compile markdown to pdf, smallpdf alternative, ilovepdf alternative, free online pdf merger, best pdf splitter, sign pdf free online, how to edit pdf document, online pdf manager, secure pdf sandbox',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'es': '/es',
      'hi': '/hi',
      'ta': '/ta',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'iCreatePDF - Privacy-First Image to PDF Converter',
    description: 'Convert your images to PDF instantly in the browser. Completely private, no file uploads to any server.',
    type: 'website',
    locale: 'en_US',
    url: 'https://icreatepdf.com',
    siteName: 'iCreatePDF',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'iCreatePDF logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iCreatePDF - Privacy-First Image to PDF Converter',
    description: 'Convert images to PDF 100% locally. Zero server uploads, absolute file privacy.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="iCreatePDF" />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* Performance Optimization Resource Hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    console.log('ServiceWorker registration successful with scope: ', reg.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "iCreatePDF",
              "url": "https://icreatepdf.com",
              "logo": "https://icreatepdf.com/logo.png",
              "description": "Convert images and docs to PDF 100% locally in the browser. Also merge, split, rotate, and compress PDF files with zero server uploads.",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 support",
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              }
            })
          }}
        />
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
      </head>
      <body className="font-sans antialiased bg-black text-white relative min-h-screen overflow-x-hidden">
        {/* Ambient premium background glows */}
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none opacity-40 select-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-950/20 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-950/15 blur-[130px]" />
          <div className="absolute top-[40%] right-[10%] w-[35%] h-[35%] rounded-full bg-blue-950/15 blur-[110px]" />
          {/* Elegant grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
