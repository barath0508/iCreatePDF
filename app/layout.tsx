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
  metadataBase: new URL('https://www.icreatepdf.online'),
  title: 'Free Online PDF Tools: Merge, Compress, Convert & Edit Privately | iCreatePDF',
  description: 'Use free browser-based PDF tools to merge, split, compress, convert, edit, sign, and protect documents. Files stay on your device—no uploads or sign-up.',
  keywords: [
    'free online PDF tools',
    'private PDF tools',
    'merge PDF online',
    'compress PDF online',
    'convert JPG to PDF',
    'edit PDF online',
    'sign PDF online',
    'browser-based PDF editor',
    'no upload PDF tools',
  ],
  applicationName: 'iCreatePDF',
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
    title: 'Free Online PDF Tools That Keep Files Private | iCreatePDF',
    description: 'Merge, compress, convert, edit, sign, and protect PDFs directly in your browser. No uploads and no sign-up.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.icreatepdf.online',
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
    title: 'Free Online PDF Tools That Keep Files Private | iCreatePDF',
    description: 'Merge, compress, convert, edit, sign, and protect PDFs directly in your browser. No uploads and no sign-up.',
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

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8825674134696584"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Monetag Ad Tag */}
        <Script
          src="https://quge5.com/88/tag.min.js"
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
                  "url": "https://www.icreatepdf.online",
                  "logo": { "@type": "ImageObject", "url": "https://www.icreatepdf.online/logo.png" }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.icreatepdf.online/#website",
                  "name": "iCreatePDF",
                  "url": "https://www.icreatepdf.online",
                  "publisher": { "@id": "https://www.icreatepdf.online/#organization" },
                  "description": "Free browser-based PDF tools for converting, merging, editing, compressing, signing, and protecting files without server uploads."
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://www.icreatepdf.online/#webapp",
                  "name": "iCreatePDF",
                  "url": "https://www.icreatepdf.online",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web Browser",
                  "isAccessibleForFree": true,
                  "description": "Free, browser-based PDF tools for merging, converting, compressing, editing, signing, and protecting documents without server uploads.",
                  "featureList": [
                    "Merge and split PDF files",
                    "Convert images and documents to PDF",
                    "Compress, edit, sign, and protect PDFs",
                    "Private browser-based processing without server uploads"
                  ],
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  },
                  "publisher": { "@id": "https://www.icreatepdf.online/#organization" }
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
        {children}
        <Analytics />
        <SpeedInsights />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
