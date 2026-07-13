'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Barcode as BarcodeIcon, Loader2, Download } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { sanitizeTextForPdf } from '@/lib/pdf';

type Symbology = 'code128' | 'ean13' | 'upca' | 'code39' | 'datamatrix' | 'pdf417';

interface SymbologyInfo {
  label: string;
  bcid: Symbology;
  placeholder: string;
  helper: string;
  is2d: boolean;
}

const SYMBOLOGIES: SymbologyInfo[] = [
  { label: 'Code 128', bcid: 'code128', placeholder: 'ABC-123456', helper: 'Alphanumeric, variable length. Used for shipping and inventory labels.', is2d: false },
  { label: 'EAN-13', bcid: 'ean13', placeholder: '5901234123457', helper: '12 or 13 digits. Standard retail product barcode (Europe/international).', is2d: false },
  { label: 'UPC-A', bcid: 'upca', placeholder: '036000291452', helper: '11 or 12 digits. Standard retail product barcode (US/Canada).', is2d: false },
  { label: 'Code 39', bcid: 'code39', placeholder: 'CODE39TEXT', helper: 'Alphanumeric + a few symbols. Common in logistics and defense.', is2d: false },
  { label: 'Data Matrix', bcid: 'datamatrix', placeholder: 'Any text or URL', helper: 'Compact 2D code, holds more data than a QR code in less space.', is2d: true },
  { label: 'PDF417', bcid: 'pdf417', placeholder: 'Any text, up to ~1kb', helper: '2D stacked barcode used on ID cards, boarding passes, and shipping labels.', is2d: true },
];

const sizeMap = { small: 2, medium: 3, large: 4 };

export function BarcodeToPdfTool() {
  const [content, setContent] = useState('');
  const [symbology, setSymbology] = useState<Symbology>('code128');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [barcodeSize, setBarcodeSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeSymbology = SYMBOLOGIES.find(s => s.bcid === symbology)!;

  const buildOptions = (scale: number) => ({
    bcid: symbology,
    text: content,
    scale,
    includetext: !activeSymbology.is2d,
    textxalign: 'center' as const,
    ...(activeSymbology.is2d ? {} : { height: 12 }),
  });

  useEffect(() => {
    setError(null);
    if (!content) return;
    const generate = async () => {
      try {
        const bwip = (await import('bwip-js/browser')).default;
        if (canvasRef.current) {
          bwip.toCanvas(canvasRef.current, buildOptions(sizeMap[barcodeSize]));
        }
      } catch {
        // Ignore live-preview errors while the user is still typing;
        // the real validation error surfaces on "Generate PDF".
      }
    };
    const t = setTimeout(generate, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, symbology, barcodeSize]);

  const process = async () => {
    if (!content) return;
    setIsProcessing(true); setError(null);
    try {
      const bwip = (await import('bwip-js/browser')).default;
      const barcodeCanvas = document.createElement('canvas');
      bwip.toCanvas(barcodeCanvas, buildOptions(sizeMap[barcodeSize] * 3));
      const barcodeDataUrl = barcodeCanvas.toDataURL('image/png');
      const barcodeBytes = await (await fetch(barcodeDataUrl)).arrayBuffer();

      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
      const page = doc.addPage([595, 842]); // A4
      const { width, height } = page.getSize();
      const img = await doc.embedPng(barcodeBytes);

      let y = height - 80;

      const sanitizedTitle = sanitizeTextForPdf(title);
      const sanitizedDescription = sanitizeTextForPdf(description);

      if (sanitizedTitle) {
        const titleSize = 20;
        const tw = fontBold.widthOfTextAtSize(sanitizedTitle.slice(0, 50), titleSize);
        page.drawText(sanitizedTitle.slice(0, 50), { x: (width - tw) / 2, y, size: titleSize, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
        y -= 30;
      }

      if (sanitizedDescription) {
        const descSize = 11;
        const words = sanitizedDescription.slice(0, 200).split(' ');
        let line = '';
        const lines: string[] = [];
        words.forEach(word => {
          if ((line + ' ' + word).length > 60) { lines.push(line); line = word; }
          else line = line ? `${line} ${word}` : word;
        });
        if (line) lines.push(line);
        lines.forEach(l => {
          const tw = font.widthOfTextAtSize(l, descSize);
          page.drawText(l, { x: (width - tw) / 2, y, size: descSize, font, color: rgb(0.4, 0.4, 0.4) });
          y -= 16;
        });
        y -= 10;
      }

      // Draw barcode centered, preserving its native aspect ratio
      const imgDims = img.scale(1);
      const maxDrawWidth = width - 120;
      const drawScale = Math.min(1, maxDrawWidth / imgDims.width);
      const drawWidth = imgDims.width * drawScale;
      const drawHeight = imgDims.height * drawScale;
      const codeX = (width - drawWidth) / 2;
      const codeY = y - drawHeight - 20;
      page.drawImage(img, { x: codeX, y: codeY, width: drawWidth, height: drawHeight });

      page.drawText(`Generated by iCreatePDF.com — ${activeSymbology.label}`, {
        x: (width - font.widthOfTextAtSize(`Generated by iCreatePDF.com — ${activeSymbology.label}`, 8)) / 2,
        y: 30, size: 8, font, color: rgb(0.7, 0.7, 0.7),
      });

      const bytes = await doc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || `Could not generate a valid ${activeSymbology.label} barcode. Check the input format and try again.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-foreground/40 uppercase">Barcode Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SYMBOLOGIES.map(s => (
                  <button
                    key={s.bcid}
                    onClick={() => { setSymbology(s.bcid); setDownloadUrl(null); }}
                    className={`px-3 py-2 rounded-xl text-xs transition-all ${symbology === s.bcid ? 'bg-brand text-foreground' : 'bg-foreground/5 text-foreground/50 hover:bg-foreground/10'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-foreground/35 pt-1">{activeSymbology.helper}</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-foreground/40 uppercase">Barcode Content *</label>
              <textarea
                value={content}
                onChange={e => { setContent(e.target.value); setDownloadUrl(null); }}
                placeholder={activeSymbology.placeholder}
                rows={2}
                className="w-full bg-background/40 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-brand resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-foreground/40 uppercase">Title (optional)</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Product SKU Label" className="w-full bg-background/40 border border-foreground/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-brand" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-foreground/40 uppercase">Description (optional)</label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="A short description below the title" className="w-full bg-background/40 border border-foreground/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-brand" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-foreground/40 uppercase">Barcode Size</label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map(s => (
                  <button key={s} onClick={() => setBarcodeSize(s)} className={`px-4 py-2 rounded-xl text-xs capitalize transition-all ${barcodeSize === s ? 'bg-brand text-foreground' : 'bg-foreground/5 text-foreground/50 hover:bg-foreground/10'}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          {content && (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl flex flex-col items-center gap-4">
              <p className="text-xs font-mono text-foreground/40 uppercase">Live Preview</p>
              <canvas ref={canvasRef} className="rounded-xl max-w-full" />
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <BarcodeIcon className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Barcode to PDF</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">Generate a clean A4 PDF with a Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode. Perfect for product labels, inventory tags, and shipping documents.</p>
          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Generating...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = 'barcode.pdf'; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Barcode PDF
                </Button>
                <Button variant="ghost" onClick={() => { setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Generate another</Button>
              </div>
            ) : (
              <Button disabled={!content.trim()} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${content.trim() ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'}`}>
                <BarcodeIcon className="w-4 h-4" />Generate PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
