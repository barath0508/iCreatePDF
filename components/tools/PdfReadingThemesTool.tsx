'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, Moon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function PdfReadingThemesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [theme, setTheme] = useState<'sepia' | 'warm' | 'mint' | 'dark'>('sepia');
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

  const triggerApplyTheme = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(10);

    try {
      const buffer = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const { PDFDocument } = await import('pdf-lib');

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      const outputPdfDoc = await PDFDocument.create();

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round(((i - 1) / numPages) * 85));
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          await page.render({ canvasContext: ctx, viewport }).promise;

          // Apply color filter matrix on pixels
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          for (let p = 0; p < data.length; p += 4) {
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];

            if (theme === 'sepia') {
              data[p] = Math.min(255, r * 0.9 + 40);
              data[p + 1] = Math.min(255, g * 0.85 + 30);
              data[p + 2] = Math.min(255, b * 0.7 + 10);
            } else if (theme === 'warm') {
              data[p] = Math.min(255, r * 1.0 + 20);
              data[p + 1] = Math.min(255, g * 0.9 + 15);
              data[p + 2] = Math.min(255, b * 0.8);
            } else if (theme === 'mint') {
              data[p] = Math.min(255, r * 0.8);
              data[p + 1] = Math.min(255, g * 0.95 + 25);
              data[p + 2] = Math.min(255, b * 0.85 + 20);
            } else if (theme === 'dark') {
              data[p] = 255 - r;
              data[p + 1] = 255 - g;
              data[p + 2] = 255 - b;
            }
          }

          ctx.putImageData(imgData, 0, 0);

          const pngDataUrl = canvas.toDataURL('image/png');
          const pngImageBytes = await fetch(pngDataUrl).then((res) => res.arrayBuffer());
          const embeddedPng = await outputPdfDoc.embedPng(pngImageBytes);

          const newPage = outputPdfDoc.addPage([viewport.width, viewport.height]);
          newPage.drawImage(embeddedPng, { x: 0, y: 0, width: viewport.width, height: viewport.height });
        }
      }

      const mergedBytes = await outputPdfDoc.save();
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      toast.success(`Applied ${theme.toUpperCase()} reading theme!`);

      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: `themed-${theme}-${file.name}`,
        size: blob.size,
        toolName: 'PDF Reading Themes',
        href: '/tools/pdf-reading-themes',
        downloadUrl: url,
      });
    } catch (err: any) {
      toast.error(err?.message || 'Failed to apply reading theme.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `themed-${theme}-${file?.name || 'document.pdf'}`;
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
                <Moon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag a PDF for Reading Themes</h3>
              <p className="text-xs text-foreground/40">Apply Sepia, Warm Amber, Soft Mint, or High Contrast Dark filters to reduce eye strain.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <p className="text-xs text-foreground/40">{pagesCount} pages � {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change File</Button>
              </div>

              {downloadUrl && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Applied {theme.toUpperCase()} Reading Theme! PDF ready for download.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Reading Filter</h3>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono text-foreground/60 block">Select Theme Preset:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'sepia', label: '?? Warm Sepia' },
                { id: 'warm', label: '?? Soft Amber' },
                { id: 'mint', label: '?? Cool Mint' },
                { id: 'dark', label: '?? High Contrast Dark' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { setTheme(t.id as any); setDownloadUrl(null); }}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all text-left ${
                    theme === t.id ? 'bg-foreground text-background border-foreground' : 'bg-background border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 text-brand animate-spin" /> Tinting pages...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Tinted PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={triggerApplyTheme} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <Moon className="w-4 h-4" /> Apply {theme.toUpperCase()} Theme
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
