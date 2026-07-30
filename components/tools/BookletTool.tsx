'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function BookletTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
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

  const triggerBooklet = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(10);

    try {
      const buffer = await file.arrayBuffer();
      const { PDFDocument, PageSizes } = await import('pdf-lib');
      const srcDoc = await PDFDocument.load(buffer);
      const destDoc = await PDFDocument.create();

      const numPages = srcDoc.getPageCount();
      // Calculate booklet total pages (multiple of 4)
      const bookletTotal = Math.ceil(numPages / 4) * 4;

      // Landscape A4 sheet: width = 841.89 pt (297mm), height = 595.28 pt (210mm)
      const sheetW = PageSizes.A4[1]; // 841.89 (landscape A4 width)
      const sheetH = PageSizes.A4[0]; // 595.28 (landscape A4 height)
      const pageW = sheetW / 2;

      for (let i = 0; i < bookletTotal / 2; i++) {
        setProgress(Math.round(((i * 2) / bookletTotal) * 90));

        // Saddle stitch ordering for page pairs:
        // Front: Page (total - i) on left, Page (1 + i) on right
        // Back: Page (2 + i) on left, Page (total - 1 - i) on right
        const leftPageIdx = i % 2 === 0 ? bookletTotal - 1 - i : i;
        const rightPageIdx = i % 2 === 0 ? i : bookletTotal - 1 - i;

        const sheet = destDoc.addPage([sheetW, sheetH]);

        if (leftPageIdx < numPages) {
          const [leftEmbed] = await destDoc.embedPdf(srcDoc, [leftPageIdx]);
          const scale = Math.min(pageW / leftEmbed.width, sheetH / leftEmbed.height) * 0.94;
          sheet.drawPage(leftEmbed, {
            x: (pageW - leftEmbed.width * scale) / 2,
            y: (sheetH - leftEmbed.height * scale) / 2,
            width: leftEmbed.width * scale,
            height: leftEmbed.height * scale,
          });
        }

        if (rightPageIdx < numPages) {
          const [rightEmbed] = await destDoc.embedPdf(srcDoc, [rightPageIdx]);
          const scale = Math.min(pageW / rightEmbed.width, sheetH / rightEmbed.height) * 0.94;
          sheet.drawPage(rightEmbed, {
            x: pageW + (pageW - rightEmbed.width * scale) / 2,
            y: (sheetH - rightEmbed.height * scale) / 2,
            width: rightEmbed.width * scale,
            height: rightEmbed.height * scale,
          });
        }
      }

      const mergedBytes = await destDoc.save();
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      toast.success('Booklet imposition generated successfully!');

      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: `booklet-${file.name}`,
        size: blob.size,
        toolName: 'Booklet Maker',
        href: '/booklet-pdf',
        downloadUrl: url,
      });
    } catch (err: any) {
      toast.error(err?.message || 'Failed to generate booklet PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `booklet-${file?.name || 'document.pdf'}`;
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
                <BookOpen className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag a PDF for Booklet Imposition</h3>
              <p className="text-xs text-foreground/40">Reorders pages into 2-page landscape spreads ready for saddle-stitch printing.</p>
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
                  <span>Booklet Spread PDF Ready! Print duplex (short edge) and fold.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Booklet Settings</h3>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Re-arranges page sequence into 2-page landscape sheets. Print double-sided on short edge, then fold in half.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 text-brand animate-spin" /> Generating booklet...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Booklet PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={triggerBooklet} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <BookOpen className="w-4 h-4" /> Create Booklet PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
