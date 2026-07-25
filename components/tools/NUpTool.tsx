'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function NUpTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [nUp, setNUp] = useState<2 | 4 | 6 | 9>(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
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
    } catch (err) {
      toast.error('Failed to read PDF file.');
    }
  };

  const triggerNUp = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(10);

    try {
      const buffer = await file.arrayBuffer();
      const { PDFDocument, PageSizes } = await import('pdf-lib');
      const srcDoc = await PDFDocument.load(buffer);
      const destDoc = await PDFDocument.create();

      const srcPageCount = srcDoc.getPageCount();
      const cols = nUp === 2 ? 2 : nUp === 4 ? 2 : 3;
      const rows = nUp === 2 ? 1 : nUp === 4 ? 2 : 3;
      const pagesPerSheet = cols * rows;

      const targetWidth = PageSizes.A4[0];
      const targetHeight = PageSizes.A4[1];

      for (let i = 0; i < srcPageCount; i += pagesPerSheet) {
        setProgress(Math.round((i / srcPageCount) * 90));
        const newPage = destDoc.addPage([targetWidth, targetHeight]);

        for (let cell = 0; cell < pagesPerSheet && i + cell < srcPageCount; cell++) {
          const [embedded] = await destDoc.embedPdf(srcDoc, [i + cell]);
          const cellWidth = targetWidth / cols;
          const cellHeight = targetHeight / rows;
          const col = cell % cols;
          const row = Math.floor(cell / cols);

          const scale = Math.min(cellWidth / embedded.width, cellHeight / embedded.height) * 0.92;
          const scaledW = embedded.width * scale;
          const scaledH = embedded.height * scale;

          const x = col * cellWidth + (cellWidth - scaledW) / 2;
          const y = targetHeight - (row + 1) * cellHeight + (cellHeight - scaledH) / 2;

          newPage.drawPage(embedded, {
            x,
            y,
            width: scaledW,
            height: scaledH,
          });
        }
      }

      const mergedBytes = await destDoc.save();
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      toast.success(`Generated ${nUp}-up PDF grid sheet!`);

      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: `${nUp}up-${file.name}`,
        size: blob.size,
        toolName: 'N-up PDF',
        href: '/tools/n-up-pdf',
        downloadUrl: url,
      });
    } catch (err: any) {
      toast.error(err?.message || 'Failed to process N-up PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${nUp}up-${file?.name || 'document.pdf'}`;
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
                <LayoutGrid className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag a PDF for N-up Grid</h3>
              <p className="text-xs text-foreground/40">Combine multiple pages into 2-up, 4-up, 6-up, or 9-up grid layouts.</p>
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
                  <span>{nUp}-up Imposition Complete! Ready for download.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">N-up Grid Options</h3>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono text-foreground/60 block">Pages Per Sheet Grid:</label>
            <div className="grid grid-cols-2 gap-2">
              {([2, 4, 6, 9] as const).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => { setNUp(num); setDownloadUrl(null); }}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                    nUp === num ? 'bg-foreground text-background border-foreground' : 'bg-background border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {num}-up Grid
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 text-brand animate-spin" /> Processing {nUp}-up...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download N-up PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={triggerNUp} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <LayoutGrid className="w-4 h-4" /> Generate {nUp}-up PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
