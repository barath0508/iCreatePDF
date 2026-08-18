'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, Maximize2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function AdjustMarginsTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [marginMm, setMarginMm] = useState<number>(15);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF files are supported.');
      return;
    }

    try {
      const buffer = await uploadedFile.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const pdf = await PDFDocument.load(buffer);
      setFile(uploadedFile);
      setPagesCount(pdf.getPageCount());
      toast.info(`Loaded ${uploadedFile.name} (${pdf.getPageCount()} pages)`);
    } catch {
      toast.error('Failed to read PDF file.');
    }
  };

  const triggerAdjust = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(10);

    try {
      const buffer = await file.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const srcDoc = await PDFDocument.load(buffer);
      const destDoc = await PDFDocument.create();

      const ptMargin = (marginMm / 25.4) * 72; // Convert mm to PDF points
      const numPages = srcDoc.getPageCount();

      for (let i = 0; i < numPages; i++) {
        setProgress(Math.round((i / numPages) * 90));
        const [embedded] = await destDoc.embedPdf(srcDoc, [i]);

        const newW = embedded.width + ptMargin * 2;
        const newH = embedded.height + ptMargin * 2;

        const page = destDoc.addPage([newW, newH]);
        page.drawPage(embedded, {
          x: ptMargin,
          y: ptMargin,
          width: embedded.width,
          height: embedded.height,
        });
      }

      const mergedBytes = await destDoc.save();
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      toast.success(`Added ${marginMm}mm margins successfully!`);

      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: `margins-${file.name}`,
        size: blob.size,
        toolName: 'Adjust Margins',
        href: '/adjust-pdf-margins',
        downloadUrl: url,
      });
    } catch (err: any) {
      toast.error(err?.message || 'Failed to adjust PDF margins.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `margins-${file?.name || 'document.pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
                if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[220px] ${
                isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Maximize2 className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag a PDF to Adjust Margins</h3>
              <p className="text-xs text-foreground/40">Add extra border padding for hole-punching, binder binding, or margin notes.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <p className="text-xs text-foreground/40">{pagesCount} pages — {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change File</Button>
              </div>

              {downloadUrl && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Margins Updated (+{marginMm}mm)! File ready for download.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Margin Offsets</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono text-foreground/60">
              <span>Extra Margin Padding:</span>
              <span className="font-bold text-foreground">{marginMm} mm</span>
            </div>
            <input
              type="range"
              name="margin_offset_mm"
              min="5"
              max="50"
              step="5"
              value={marginMm}
              onChange={(e) => { setMarginMm(Number(e.target.value)); setDownloadUrl(null); }}
              toolname="adjust_pdf_margins"
              tooldescription="Add or expand margin padding around PDF page content"
              toolparamdescription="Margin offset size in millimeters (5mm to 50mm)"
              className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-foreground"
            />
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[10, 15, 25, 35].map((mm) => (
                <button
                  key={mm}
                  type="button"
                  onClick={() => { setMarginMm(mm); setDownloadUrl(null); }}
                  className={`py-1.5 rounded-lg border text-xs font-mono transition-all ${
                    marginMm === mm ? 'bg-foreground text-background border-foreground font-bold' : 'bg-background border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  +{mm}mm
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 text-brand animate-spin" /> Adjusting margins...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Adjusted PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={triggerAdjust} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <Maximize2 className="w-4 h-4" /> Apply +{marginMm}mm Margins
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
