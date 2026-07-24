'use client';

import React, { useState, useRef } from 'react';
import { Upload, Eye, Loader2, Download, Printer } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function GrayscaleTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'application/pdf') {
      setError('Only PDF documents are supported.');
      return;
    }

    setFile(uploadedFile);
  };

  const triggerGrayscale = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      const outputPdfDoc = await PDFDocument.create();

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round(((i - 1) / numPages) * 100));
        
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 }); // High-quality rendering scale

        // Create canvas offscreen
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        // Render PDF page to canvas
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        // Apply grayscale filter to canvas contents
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let j = 0; j < data.length; j += 4) {
          const r = data[j];
          const g = data[j + 1];
          const b = data[j + 2];
          // Grayscale formula
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          data[j] = gray;     // Red
          data[j + 1] = gray; // Green
          data[j + 2] = gray; // Blue
        }
        ctx.putImageData(imgData, 0, 0);

        // Convert grayscale canvas to PNG
        const pngUrl = canvas.toDataURL('image/png');
        const pngResponse = await fetch(pngUrl);
        const pngBytes = await pngResponse.arrayBuffer();
        const pngImage = await outputPdfDoc.embedPng(pngBytes);

        // Append page to new PDF
        const newPage = outputPdfDoc.addPage([viewport.width, viewport.height]);
        newPage.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        });
      }

      const grayscalePdfBytes = await outputPdfDoc.save();
      const blob = new Blob([grayscalePdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to convert PDF pages to grayscale.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `grayscale-${file?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[220px] ${
                isDraggingOver
                  ? 'border-brand bg-brand/5'
                  : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                accept=".pdf"
                className="hidden"
              />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Printer className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                Select or drag a PDF file
              </h3>
              <p className="text-xs text-foreground/40">
                All pages are processed locally using Canvas filters.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl text-brand">
                    <Printer className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                    <p className="text-xs text-foreground/40">
                      PDF Document • {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground"
                >
                  Change File
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Printer className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Grayscale PDF</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Convert color document layouts, graphics, and images into black and white. Saves printer ink and cartridge levels.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Converting...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Grayscale PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Convert new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={triggerGrayscale}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <Eye className="w-4 h-4" />
                Convert to Grayscale
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
