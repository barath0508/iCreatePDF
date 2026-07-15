import React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { CookieConsentBanner } from '@/components/landing/cookie-consent-banner';

export const metadata: Metadata = {
  metadataBase: new URL('https://icreatepdf.online'),
  title: 'iCreatePDF - Fast, Free & Private Image to PDF Converter',
  description: 'Convert JPG, PNG, WEBP, HEIC, and BMP to PDF 100% locally in your browser. Zero sign-up, zero server uploads, privacy first.',
  keywords: 'pdf editor, edit pdf, merge pdf online, split pdf free, compress pdf tool, crop pdf page, redact pdf text, bates numbering legal, convert to pdf, image to pdf, pdf metadata editor, sign pdf digitally, client-side pdf converter, secure pdf processor, local pdf tools, document converter, pdf utility, word to pdf converter, scan to pdf online, unlock password pdf, protect pdf file, delete pdf pages, crop pdf margins, pdf converter free, offline pdf editor, heic to pdf, png to pdf, jpeg to pdf, extract pages from pdf, combine pdf files, split pdf pages, compress pdf size, secure client-side pdf, pdf watermark creator, add page numbers to pdf, draw signature on pdf, flat pdf converter, black out pdf text, fix corrupted pdf, change author pdf, bates stamp generator, dark mode pdf, invert pdf background, scan documents to pdf, generate qr code pdf, compare two pdfs, pdf comparison tool, extract text from pdf, html to pdf free, compile markdown to pdf, secure online pdf tools, private online pdf tools, free online pdf merger, best pdf splitter, sign pdf free online, how to edit pdf document, online pdf manager, secure pdf sandbox',
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
    url: 'https://icreatepdf.online',
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
        <script
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

        {/* Performance Optimization Resource Hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8825674134696584"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />


        <Script
          id="register-sw"
          strategy="afterInteractive"
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
              "url": "https://icreatepdf.online",
              "image": "https://icreatepdf.online/logo.png",
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
        {children}
        <Analytics />
        <SpeedInsights />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
