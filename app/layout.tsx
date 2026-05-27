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
  keywords: 'image to pdf, convert jpg to pdf, png to pdf, heic to pdf, merge pdf, split pdf, rotate pdf, compress pdf, client side pdf, icreatepdf',
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
