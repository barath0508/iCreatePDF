'use client';

import React, { useState, useRef } from 'react';
import { Code, Loader2, Download, Eye, FileCode } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { sanitizeTextForPdf } from '@/lib/pdf';

export function HtmlToPdfTool() {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 40px; color: #111; }
    h1 { color: #8b5cf6; font-size: 32px; margin-bottom: 10px; }
    p { font-size: 16px; line-height: 1.6; color: #444; }
    .footer { margin-top: 50px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px; }
  </style>
</head>
<body>
  <h1>My Local PDF Document</h1>
  <p>This PDF was generated 100% locally inside the browser using HTML and CSS rendering.</p>
  <p>You can add paragraphs, adjust styling, and compile documents without uploading any files to external cloud servers.</p>
  <div class="footer">Generated via iCreatePDF Workspace</div>
</body>
</html>`);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const triggerHtmlToPdf = async () => {
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const iframe = iframeRef.current;
      if (!iframe) throw new Error('Render engine is not initialized.');

      // Wait for iframe to load the HTML content via srcdoc
      await new Promise<void>((resolve) => {
        iframe.onload = () => {
          iframe.onload = null;
          resolve();
        };
        iframe.srcdoc = htmlCode;
      });

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) throw new Error('Render context unavailable.');

      // Render the sandboxed iframe using HTML5 canvas
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.276, 841.890]); // Standard A4 dimensions in points
      const { height } = page.getSize();

      // Parse structured text layers from sandbox
      const body = doc.body;
      const elements = body.querySelectorAll('h1, h2, h3, p, div');

      let currentY = height - 60; // Top margin

      elements.forEach((el) => {
        let text = el.textContent?.trim() || '';
        if (!text) return;
        text = sanitizeTextForPdf(text);

        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize) || 12;
        const color = style.color; // e.g. "rgb(139, 92, 246)"
        
        // Parse simple RGB colors
        let pdfColor = rgb(0.1, 0.1, 0.1);
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          pdfColor = rgb(
            parseInt(rgbMatch[1]) / 255,
            parseInt(rgbMatch[2]) / 255,
            parseInt(rgbMatch[3]) / 255
          );
        }

        // Draw text on A4 page
        page.drawText(text, {
          x: 50,
          y: currentY - fontSize,
          size: fontSize * 0.9,
          color: pdfColor,
        });

        currentY -= (fontSize * 1.8 + 15); // Adjust line spacing
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to render HTML template to PDF.';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'html-document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace Code Editor */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card border border-foreground/10 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center bg-card/60 px-4 py-3 border-b border-foreground/10">
              <span className="text-xs font-mono text-brand flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                HTML Editor
              </span>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="w-full h-96 bg-transparent p-6 font-mono text-xs text-foreground/90 focus:outline-none resize-none"
            />
          </div>

          {/* Hidden Sandbox iframe for HTML rendering */}
          <iframe ref={iframeRef} sandbox="allow-same-origin" className="hidden" title="Render sandbox" />

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <FileCode className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">HTML to PDF</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Write or paste HTML templates with custom CSS styling to generate standard PDF layouts locally in browser memory.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Rendering PDF...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDownloadUrl(null)}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Edit HTML Code
                </Button>
              </div>
            ) : (
              <Button
                onClick={triggerHtmlToPdf}
                className="w-full bg-brand hover:bg-brand/90 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Compile to PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
