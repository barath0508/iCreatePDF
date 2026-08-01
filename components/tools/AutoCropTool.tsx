'use client';

import React, { useState, useRef } from 'react';
import { Upload, Crop, Download, CheckCircle2, RefreshCw, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CropMargins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function AutoCropTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cropMargins, setCropMargins] = useState<CropMargins>({ top: 20, bottom: 20, left: 20, right: 20 });
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const autoDetectMargins = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      setPageCount(pdf.numPages);

      // Analyze page 1
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.0 });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        let minX = canvas.width;
        let minY = canvas.height;
        let maxX = 0;
        let maxY = 0;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const isNonWhite = r < 240 || g < 240 || b < 240;

            if (isNonWhite) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        const detectedLeft = Math.max(0, Math.floor(minX));
        const detectedRight = Math.max(0, Math.floor(canvas.width - maxX));
        const detectedTop = Math.max(0, Math.floor(minY));
        const detectedBottom = Math.max(0, Math.floor(canvas.height - maxY));

        setCropMargins({
          left: Math.min(100, detectedLeft),
          right: Math.min(100, detectedRight),
          top: Math.min(100, detectedTop),
          bottom: Math.min(100, detectedBottom),
        });
      }
    } catch (err) {
      console.error('Auto margin detection failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyCrop = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const cropX = cropMargins.left;
        const cropY = cropMargins.bottom;
        const cropWidth = Math.max(50, width - cropMargins.left - cropMargins.right);
        const cropHeight = Math.max(50, height - cropMargins.top - cropMargins.bottom);

        page.setCropBox(cropX, cropY, cropWidth, cropHeight);
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error('Crop export failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative cursor-pointer border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[260px] border-border bg-card hover:border-brand/50 transition-all duration-300 shadow-sm"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-4">
            <Crop className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-display">Smart Auto-Crop & Margin Optimizer</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-1">
            Detect and trim blank margins, scanner borders, and excess whitespace to optimize PDFs for Kindle, tablets, and small screens.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-card border border-border rounded-2xl flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-brand" />
              <div>
                <h4 className="text-sm font-semibold text-foreground truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }}>
              Change File
            </Button>
          </div>

          {/* Auto Detection Button */}
          <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h4 className="text-sm font-bold text-foreground font-display">Smart Margin Detection</h4>
                <p className="text-xs text-muted-foreground">Analyze page pixels to auto-calculate optimal crop boundaries.</p>
              </div>
              <Button
                onClick={autoDetectMargins}
                disabled={isAnalyzing}
                className="bg-brand hover:bg-brand/90 text-foreground font-medium px-6 py-2 rounded-xl"
              >
                {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {isAnalyzing ? 'Analyzing Pixels...' : 'Auto-Detect Whitespace'}
              </Button>
            </div>

            {/* Custom Margin Sliders */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
                <div key={side} className="space-y-2">
                  <label className="text-xs font-mono capitalize text-muted-foreground flex justify-between">
                    <span>{side} Margin</span>
                    <span className="font-bold text-foreground">{cropMargins[side]} pt</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={cropMargins[side]}
                    onChange={(e) => setCropMargins((prev) => ({ ...prev, [side]: Number(e.target.value) }))}
                    className="w-full accent-brand"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={applyCrop}
              disabled={isProcessing}
              className="bg-brand hover:bg-brand/90 text-foreground font-medium px-8 py-3 rounded-xl"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Crop className="w-4 h-4 mr-2" />}
              {isProcessing ? 'Trimming Margins...' : 'Apply Crop & Export PDF'}
            </Button>
          </div>

          {downloadUrl && (
            <div className="p-6 bg-card border border-emerald-500/30 rounded-2xl flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-bold text-foreground font-display">PDF Cropped Successfully!</h4>
                  <p className="text-xs text-muted-foreground">Margins tightly trimmed without affecting text selectability.</p>
                </div>
              </div>
              <a href={downloadUrl} download={`cropped_${file.name}`}>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-semibold">
                  <Download className="w-4 h-4 mr-2" /> Download Cropped PDF
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
