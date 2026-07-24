import React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { CookieConsentBanner } from '@/components/landing/cookie-consent-banner';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.icreatepdf.online'),
  title: 'iCreatePDF — Free Online PDF Tools: Merge, Compress, Convert, Edit & Sign Privately',
  description: 'Free browser-based PDF tools — merge, split, compress, convert, edit, sign, protect & OCR PDFs. 46+ tools. Files never leave your device. No uploads, no sign-up, no limits.',
  keywords: [
    // Core high-volume queries
    'free online PDF tools',
    'PDF tools no upload',
    'browser based PDF editor',
    'private PDF editor online',
    'offline PDF tools',
    // Merge
    'merge PDF online free',
    'combine PDF files',
    'join PDF files online',
    'merge multiple PDFs free',
    'how to merge PDF files',
    // Compress
    'compress PDF online free',
    'compress PDF without losing quality',
    'reduce PDF file size',
    'shrink PDF file size online',
    'PDF compressor free',
    // Convert — image to PDF
    'JPG to PDF converter free',
    'convert JPG to PDF online',
    'PNG to PDF online free',
    'image to PDF converter',
    'HEIC to PDF converter',
    'convert iPhone photos to PDF',
    // Convert — document to PDF
    'Word to PDF converter free',
    'DOCX to PDF online',
    'Excel to PDF converter',
    'TXT to PDF converter',
    'HTML to PDF converter',
    'Markdown to PDF converter',
    // Convert — PDF to image/text
    'PDF to JPG converter online',
    'PDF to text extractor',
    'PDF to Excel converter free',
    'extract text from PDF',
    // Edit
    'edit PDF online free',
    'add text to PDF online',
    'fill PDF form online',
    'fillable PDF builder',
    // Sign & Secure
    'sign PDF online free',
    'e-sign PDF browser',
    'protect PDF with password free',
    'unlock PDF online free',
    'encrypt PDF file',
    // OCR
    'PDF OCR online free',
    'scan to PDF online',
    'convert scanned PDF to text',
    'PDF text recognition',
    // Organize
    'split PDF online free',
    'organize PDF pages',
    'rotate PDF online free',
    'delete PDF pages',
    'extract pages from PDF',
    'reorder PDF pages',
    // Utilities
    'watermark PDF online',
    'add page numbers to PDF',
    'PDF accessibility checker',
    'redact PDF online free',
    'crop PDF online',
    'repair corrupted PDF',
    'PDF metadata editor',
    'grayscale PDF converter',
    'compare PDF files',
    'bates numbering PDF',
    'flatten PDF online',
    'invert PDF colors',
    'PDF dark mode',
    'QR code PDF generator',
    'barcode PDF generator',
    'certify PDF online',
    'bulk certificate generator',
    'read PDF aloud text to speech',
    'base64 to PDF converter',
    'prevent PDF copying',
    // Brand alternatives & comparisons
    'ilovepdf alternative free',
    'smallpdf alternative',
    'adobe acrobat alternative free',
    'PDF24 alternative',
    'no upload PDF converter',
    'client-side PDF processing',
    'WebAssembly PDF tools',
    'iCreatePDF',
  ],
  applicationName: 'iCreatePDF',
  authors: [{ name: 'Barath R', url: 'https://www.icreatepdf.online/about' }],
  creator: 'iCreatePDF',
  publisher: 'iCreatePDF',
  category: 'Productivity',
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'es': '/es',
      'hi': '/hi',
      'ta': '/ta',
      'x-default': '/',
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
    title: 'iCreatePDF — 46+ Free PDF Tools That Keep Your Files Private',
    description: 'Merge, compress, convert, edit, sign, OCR, and protect PDFs directly in your browser. Zero uploads. No sign-up. No limits. 100% private.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.icreatepdf.online',
    siteName: 'iCreatePDF',
    images: [
      {
        url: 'https://www.icreatepdf.online/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'iCreatePDF — Free PDF Tools. Private by Design.',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iCreatePDF — 46+ Free PDF Tools That Keep Your Files Private',
    description: 'Merge, compress, convert, edit, sign, OCR, and protect PDFs in your browser. No uploads. No sign-up. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
    creator: '@iCreatePDF',
    site: '@iCreatePDF',
  },
  verification: {
    google: '5IL2ygi_5ddVkO4JU80nuaffteIKPWKkjHmHLkfN9Hk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Google Consent Mode v2 Default Initialization */}
        <Script
          id="consent-mode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              let consent = null;
              try {
                consent = localStorage.getItem('cookie_consent');
              } catch (e) {}
              
              if (consent) {
                try {
                  const parsed = JSON.parse(consent);
                  gtag('consent', 'default', {
                    'ad_storage': parsed.ad_storage || 'denied',
                    'ad_user_data': parsed.ad_user_data || 'denied',
                    'ad_personalization': parsed.ad_personalization || 'denied',
                    'analytics_storage': parsed.analytics_storage || 'denied'
                  });
                } catch (e) {
                  gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'analytics_storage': 'denied'
                  });
                }
              } else {
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied',
                  'wait_for_update': 500
                });
              }
            `
          }}
        />
        {/* End Google Consent Mode */}

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TLT2V3B3');`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JKTBWMX1GJ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JKTBWMX1GJ');
            `
          }}
        />
        {/* End Google tag (gtag.js) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="iCreatePDF" />
        <meta name="theme-color" content="#7e5de0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="google-adsense-account" content="ca-pub-8825674134696584" />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8825674134696584"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Monetag Ad Tag */}
        <Script
          src=""
          data-zone="262948"
          data-cfasync="false"
          strategy="afterInteractive"
        />


        <Script
          id="register-sw"
          strategy="lazyOnload"
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
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.icreatepdf.online/#organization",
                  "name": "iCreatePDF",
                  "alternateName": "iCreatePDF Online",
                  "url": "https://www.icreatepdf.online",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.icreatepdf.online/logo.png",
                    "width": 512,
                    "height": 512
                  },
                  "sameAs": ["https://www.icreatepdf.online"],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "crop0339@gmail.com",
                    "contactType": "customer support",
                    "availableLanguage": ["English", "Spanish", "Hindi", "Tamil"]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.icreatepdf.online/#website",
                  "name": "iCreatePDF",
                  "url": "https://www.icreatepdf.online",
                  "publisher": { "@id": "https://www.icreatepdf.online/#organization" },
                  "description": "46+ free browser-based PDF tools for merging, converting, compressing, editing, signing, OCR, and protecting PDF documents without server uploads.",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://www.icreatepdf.online/#tools?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  },
                  "inLanguage": ["en", "es", "hi", "ta"]
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://www.icreatepdf.online/#webapp",
                  "name": "iCreatePDF",
                  "url": "https://www.icreatepdf.online",
                  "applicationCategory": "BusinessApplication",
                  "applicationSubCategory": "Document Management",
                  "operatingSystem": "Web Browser",
                  "browserRequirements": "Requires JavaScript and WebAssembly support",
                  "isAccessibleForFree": true,
                  "description": "46+ free, browser-based PDF tools for merging, converting, compressing, editing, signing, OCR, and protecting documents. Files are processed 100% locally — never uploaded to a server.",
                  "featureList": [
                    "Merge PDF files online without uploading",
                    "Split PDF pages into separate files",
                    "Compress PDF to reduce file size",
                    "Convert JPG, PNG, HEIC, Word, Excel to PDF",
                    "Convert PDF to JPG, text, or Excel",
                    "Edit PDF with text annotations",
                    "Sign PDF documents digitally",
                    "Password protect and encrypt PDF",
                    "Unlock and decrypt PDF files",
                    "OCR scanned PDFs to extract text",
                    "Rotate, crop, and resize PDF pages",
                    "Add watermarks and page numbers to PDF",
                    "Redact sensitive content from PDF",
                    "Compare two PDF files side by side",
                    "Flatten PDF form fields and annotations",
                    "Convert PDF to grayscale for printing",
                    "Add headers and footers to PDF",
                    "Repair corrupted PDF files",
                    "Edit PDF metadata and properties",
                    "Generate bulk PDF certificates from spreadsheet",
                    "Create fillable PDF forms",
                    "Bates numbering for legal documents",
                    "PDF accessibility WCAG checker",
                    "Read PDF aloud via text-to-speech",
                    "Private client-side WebAssembly processing",
                    "No file uploads to external servers",
                    "No account registration required",
                    "Unlimited file size and page count",
                    "Works offline once page is loaded"
                  ],
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                  },
                  "publisher": { "@id": "https://www.icreatepdf.online/#organization" },
                  "screenshot": "https://www.icreatepdf.online/opengraph-image",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "bestRating": "5",
                    "ratingCount": "2847",
                    "reviewCount": "2847"
                  }
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.icreatepdf.online/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Is iCreatePDF completely free to use?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. All 46+ PDF tools on iCreatePDF are 100% free with no page limits, file size restrictions, subscription fees, or account registration required."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Are my files uploaded to a server when using iCreatePDF?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Never. iCreatePDF processes all files entirely in your browser using WebAssembly and client-side JavaScript. Your documents never leave your device."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can I use iCreatePDF offline?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Once the page is loaded, all core PDF processing features work without an active internet connection since everything runs locally in your browser."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What PDF tools does iCreatePDF offer?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "iCreatePDF offers 46+ tools including: merge PDF, split PDF, compress PDF, convert JPG to PDF, Word to PDF, PDF to JPG, edit PDF, sign PDF, protect PDF, OCR PDF, watermark PDF, and many more — all free with no uploads."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is iCreatePDF a good alternative to iLovePDF, Smallpdf, or Adobe Acrobat?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. iCreatePDF is a free, private, and feature-rich alternative to iLovePDF, Smallpdf, and Adobe Acrobat. Unlike those services, iCreatePDF never uploads your files to a server, has no file size limits, and requires no account sign-up."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What file formats does iCreatePDF support?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "iCreatePDF supports JPG, PNG, WEBP, HEIC, BMP, Word (.docx), Excel (.xlsx), TXT, HTML, Markdown, RIS, and Base64 for converting to PDF. For existing PDFs, you can merge, split, compress, edit, sign, protect, unlock, OCR, and more."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />

      </head>
      <body className="font-sans antialiased bg-background text-foreground relative min-h-screen overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TLT2V3B3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Ambient background: single restrained brand glow + grid */}
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[70%] h-[45%] rounded-full bg-brand/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
          <SpeedInsights />
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
