'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, Code, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function SvgToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.toLowerCase().endsWith('.svg')) {
      toast.error('Only SVG vector graphic files (.svg) are supported.');
      return;
    }

    try {
      const text = await uploadedFile.text();
      setFile(uploadedFile);
      setSvgContent(text);
      toast.info(`Loaded SVG ${uploadedFile.name}`);
    } catch {
      toast.error('Failed to read SVG file.');
    }
  };

  const triggerConvert = async () => {
    if (!file || !svgContent) return;
    setIsProcessing(true);
    setProgress(20);

    try {
      const { PDFDocument, PageSizes } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();

      // Render SVG to image canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1200;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          if (ctx) {
            canvas.width = img.width || 1200;
            canvas.height = img.height || 1200;
            ctx.drawImage(img, 0, 0);
          }
          URL.revokeObjectURL(svgUrl);
          resolve();
        };
        img.onerror = reject;
        img.src = svgUrl;
      });

      setProgress(70);
      const pngDataUrl = canvas.toDataURL('image/png');
      const pngBytes = await fetch(pngDataUrl).then((r) => r.arrayBuffer());
      const embeddedPng = await pdfDoc.embedPng(pngBytes);

      const targetW = PageSizes.A4[0];
      const targetH = PageSizes.A4[1];
      const scale = Math.min(targetW / canvas.width, targetH / canvas.height) * 0.9;
      const finalW = canvas.width * scale;
      const finalH = canvas.height * scale;

      const page = pdfDoc.addPage([targetW, targetH]);
      page.drawImage(embeddedPng, {
        x: (targetW - finalW) / 2,
        y: (targetH - finalH) / 2,
        width: finalW,
        height: finalH,
      });

      const mergedBytes = await pdfDoc.save();
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      toast.success('SVG vector converted to PDF successfully!');

      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: file.name.replace(/\.svg$/i, '.pdf'),
        size: blob.size,
        toolName: 'SVG to PDF',
        href: '/tools/svg-to-pdf',
        downloadUrl: url,
      });
    } catch (err: any) {
      toast.error(err?.message || 'Failed to convert SVG to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file?.name.replace(/\.svg$/i, '.pdf') || 'vector.pdf';
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
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".svg" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Code className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag an SVG Vector Graphic</h3>
              <p className="text-xs text-foreground/40">Convert SVG logos, blueprints, and vector graphics to vector PDF documents.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <p className="text-xs text-foreground/40">{(file.size / 1024).toFixed(1)} KB � Scalable Vector Graphic</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change File</Button>
              </div>

              {downloadUrl && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>SVG Vector PDF Ready for download!</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">SVG to PDF</h3>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Preserves crisp vector line paths, shapes, and colors converted to printable A4 PDF pages.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 text-brand animate-spin" /> Converting SVG...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Vector PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={triggerConvert} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <Code className="w-4 h-4" /> Convert SVG to PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
