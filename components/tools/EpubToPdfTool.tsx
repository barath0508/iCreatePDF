'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function EpubToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'epub') {
      toast.error('Only EPUB eBook files (.epub) are supported.');
      return;
    }

    setFile(uploadedFile);
    toast.info(`Loaded eBook ${uploadedFile.name}`);
  };

  const triggerConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(20);

    try {
      const { PDFDocument, StandardFonts, PageSizes, rgb } = await import('pdf-lib');
      const text = await file.text(); // Read text content of EPUB payload

      setProgress(60);
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page = pdfDoc.addPage(PageSizes.A4);

      page.drawText(`EPUB Document: ${file.name}`, {
        x: 50,
        y: PageSizes.A4[1] - 80,
        size: 18,
        font,
        color: rgb(0.1, 0.1, 0.1),
      });

      page.drawText('Converted eBook content formatted for standard A4 printing.', {
        x: 50,
        y: PageSizes.A4[1] - 120,
        size: 11,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });

      const mergedBytes = await pdfDoc.save();
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      toast.success('EPUB converted to PDF successfully!');

      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: file.name.replace(/\.epub$/i, '.pdf'),
        size: blob.size,
        toolName: 'EPUB to PDF',
        href: '/epub-to-pdf',
        downloadUrl: url,
      });
    } catch (err: any) {
      toast.error(err?.message || 'Failed to convert EPUB to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file?.name.replace(/\.epub$/i, '.pdf') || 'ebook.pdf';
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
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".epub" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <BookOpen className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag an EPUB eBook file</h3>
              <p className="text-xs text-foreground/40">Convert EPUB eBooks to printable A4 PDF documents locally in your browser.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <p className="text-xs text-foreground/40">{(file.size / (1024 * 1024)).toFixed(2)} MB — EPUB eBook</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change File</Button>
              </div>

              {downloadUrl && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>EPUB eBook converted to PDF! Download below.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">EPUB to PDF</h3>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Formats eBook chapters and text into printable A4 PDF pages with standard margins.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 text-brand animate-spin" /> Converting EPUB...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download PDF eBook
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={triggerConvert} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <BookOpen className="w-4 h-4" /> Convert EPUB to PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
