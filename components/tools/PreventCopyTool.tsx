'use client';

import React, { useState, useRef } from 'react';
import { Shield, Loader2, Download, Copy, AlertTriangle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function PreventCopyTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [quality, setQuality] = useState<'standard' | 'high'>('standard');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      return;
    }
    setFile(f);
  };

  const process = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      
      const srcPdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
      const outDoc = await PDFDocument.create();

      const scale = quality === 'high' ? 2.2 : 1.5;

      for (let i = 1; i <= srcPdf.numPages; i++) {
        setProgress(Math.round(((i - 1) / srcPdf.numPages) * 100));
        
        const page = await srcPdf.getPage(i);
        const vp = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        const ctx = canvas.getContext('2d')!;
        
        // Render PDF page to canvas
        await page.render({ canvasContext: ctx, viewport: vp, canvas: canvas as any }).promise;
        
        // Convert canvas image to JPEG format (highly optimized file size with high fidelity)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const response = await fetch(dataUrl);
        const imgBytes = await response.arrayBuffer();
        
        // Embed image to output PDF
        const img = await outDoc.embedJpg(imgBytes);
        const newPage = outDoc.addPage([vp.width, vp.height]);
        newPage.drawImage(img, { x: 0, y: 0, width: vp.width, height: vp.height });
      }

      const bytes = await outDoc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to process PDF.');
    } finally {
      setIsProcessing(false);
    }
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
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all text-center flex flex-col items-center justify-center min-h-[220px] ${
                isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Copy className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Upload PDF to prevent text copying</h3>
              <p className="text-xs text-foreground/40">Converts text pages to flat images so text cannot be highlighted or extracted.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl">
                    <Copy className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h4 className="text-base font-display text-foreground">{file.name}</h4>
                    <p className="text-xs text-foreground/40">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">
                  Change File
                </Button>
              </div>

              {!downloadUrl && (
                <div className="pt-4 border-t border-foreground/5 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-foreground/60 block">Select Quality Mode</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setQuality('standard')}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          quality === 'standard'
                            ? 'border-brand bg-brand/5 text-foreground'
                            : 'border-foreground/10 bg-background hover:border-foreground/20 text-foreground/70'
                        }`}
                      >
                        <p className="text-sm font-semibold">Standard Quality</p>
                        <p className="text-xs text-foreground/40 mt-1">Faster render, smaller output file size.</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuality('high')}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          quality === 'high'
                            ? 'border-brand bg-brand/5 text-foreground'
                            : 'border-foreground/10 bg-background hover:border-foreground/20 text-foreground/70'
                        }`}
                      >
                        <p className="text-sm font-semibold">High Quality</p>
                        <p className="text-xs text-foreground/40 mt-1">Slower render, ultra-crisp text output.</p>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex gap-3 items-start">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Rasterizing will convert pages to images. This removes fillable forms, links, and search indexing inside the output PDF.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Shield className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Anti-Copy Tool</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">
            Secures your PDF document against simple copy-pasting and direct text extraction. Perfect for protecting proprietary data, manuscripts, and design sheets.
          </p>
          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-brand" />
                    Rasterizing pages...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5">
                  <div className="bg-brand h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = `secured-${file?.name}`;
                    a.click();
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Secured PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Process another file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={process}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
                }`}
              >
                <Copy className="w-4 h-4" />
                Prevent Text Copying
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
