import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'iCreatePDF - Fast, Free & Private Image to PDF Converter',
  description: 'Convert JPG, PNG, WEBP, HEIC, and BMP to PDF 100% locally in your browser. Zero sign-up, zero server uploads, privacy first.',
  keywords: 'image to pdf, convert jpg to pdf, png to pdf, heic to pdf, browser pdf converter, client side pdf, icreatepdf',
  openGraph: {
    title: 'iCreatePDF - Privacy-First Image to PDF Converter',
    description: 'Convert your images to PDF instantly in the browser. Completely private, no file uploads to any server.',
    type: 'website',
    locale: 'en_US',
    url: 'https://icreatepdf.com',
    siteName: 'iCreatePDF',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
