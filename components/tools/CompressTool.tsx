'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Layers, Loader2, Download, FileText, CheckCircle2, TrendingDown, Gauge, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { WorkflowNextActions } from '@/components/tools/shared/WorkflowNextActions';
import { MobileActionDock } from '@/components/tools/shared/MobileActionDock';
import { useClipboardFile } from '@/hooks/use-clipboard-file';
import { compressPdfFile, CompressionLevel } from '@/lib/pdf';

export function CompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('balanced');
  const [customFileName, setCustomFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      handleFiles(getPreloadedFiles());
    }
  }, []);

  useClipboardFile({ onFilePasted: (files) => handleFiles(files) });

  // Power user shortcut: Ctrl+Enter to trigger compression
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (file && !isProcessing && !downloadUrl) {
          e.preventDefault();
          triggerCompress();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file, isProcessing, downloadUrl]);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      const msg = 'Only PDF files are supported.';
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const pdf = await PDFDocument.load(arrayBuffer);
      
      setFile(uploadedFile);
      setPagesCount(pdf.getPageCount());
      setCustomFileName(`compressed-${uploadedFile.name}`);
      toast.info(`Loaded ${uploadedFile.name} (${pdf.getPageCount()} pages)`);
    } catch (err) {
      console.error(err);
      const msg = `Failed to read PDF file: ${uploadedFile.name}`;
      setError(msg);
      toast.error(msg);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragLeave = () => {
    setIsDraggingOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const triggerCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(5);
    setError(null);

    try {
      const blob = await compressPdfFile(file, compressionLevel, (p) => setProgress(p));
      setCompressedSize(blob.size);
      setCompressedBlob(blob);

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);

      const savings = Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100));
      toast.success(`PDF Compressed successfully! Saved ${savings}% space.`);

      // Cache reference in IndexedDB
      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: customFileName.trim() || `compressed-${file.name}`,
        size: blob.size,
        toolName: 'Compress PDF',
        href: '/compress-pdf',
        downloadUrl: url,
        blob: blob,
      });
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || 'Failed to compress PDF.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = customFileName.trim() || `compressed-${file?.name || 'document.pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const savingsPercent = file && compressedSize ? Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100)) : 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-12 py-6 sm:py-10 pb-24 md:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Workspace */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer touch-manipulation border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[220px] ${
                isDraggingOver
                  ? 'border-brand bg-brand/5'
                  : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                accept="application/pdf,.pdf"
                onClick={(e) => {
                e.stopPropagation();
                (e.target as HTMLInputElement).value = '';
              }}
              className="hidden"
              />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Upload className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                Select or drag a PDF file to compress
              </h3>
              <p className="text-xs text-foreground/40">
                Compression is processed 100% locally on your browser.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <p className="text-xs text-foreground/40">
                    {pagesCount} pages • {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
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

              {downloadUrl && (
                <div className="p-5 rounded-2xl bg-foreground/[0.03] border border-border/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Compression Ready</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {savingsPercent}% Smaller
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="p-3 rounded-xl bg-background border border-border/60">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block">Original Size</span>
                      <span className="text-sm font-mono font-bold text-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border/60">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block">Compressed Size</span>
                      <span className="text-sm font-mono font-bold text-emerald-400">{(compressedSize / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                  </div>

                  <div className="w-full bg-background rounded-full h-2 border border-border/40 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, 100 - savingsPercent))}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel - Sticky on Desktop */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit bg-card border border-foreground/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Compress PDF</h3>
          </div>

          {/* Compression Level Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Compression Level
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setCompressionLevel('balanced')}
                disabled={isProcessing}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  compressionLevel === 'balanced'
                    ? 'border-brand bg-brand/5 ring-1 ring-brand/30'
                    : 'border-border/60 bg-background/50 hover:border-foreground/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Recommended</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Balanced
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Optimizes raster images to 150 DPI. Sharp text and ~60% size reduction.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCompressionLevel('extreme')}
                disabled={isProcessing}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  compressionLevel === 'extreme'
                    ? 'border-brand bg-brand/5 ring-1 ring-brand/30'
                    : 'border-border/60 bg-background/50 hover:border-foreground/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Maximum Compression</span>
                  <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    ~200KB Target
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Downsamples to 96 DPI. Best for government exam portals & email caps.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCompressionLevel('structural')}
                disabled={isProcessing}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  compressionLevel === 'structural'
                    ? 'border-brand bg-brand/5 ring-1 ring-brand/30'
                    : 'border-border/60 bg-background/50 hover:border-foreground/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Lossless Structural</span>
                  <span className="text-[10px] font-mono font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                    Fast
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Compresses PDF object tables only. 100% original image quality kept.
                </p>
              </button>
            </div>
          </div>

          {/* Editable File Name when ready */}
          {downloadUrl && (
            <div className="space-y-1.5 pt-2 border-t border-border/50">
              <label htmlFor="custom-filename-input" className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider block">
                File Name
              </label>
              <input
                id="custom-filename-input"
                type="text"
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
                className="w-full text-xs font-mono bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="compressed-document.pdf"
              />
            </div>
          )}

          <div className="pt-3 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Compressing...
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
                  Download Compressed PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Compress new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={triggerCompress}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Compress PDF</span>
                <kbd className="hidden sm:inline-block ml-1 rounded border border-foreground/20 bg-background/50 px-1 py-0.5 text-[10px] font-mono text-muted-foreground">
                  ↵
                </kbd>
              </Button>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Sticky Action Dock */}
      <MobileActionDock
        visible={!!file}
        statusText={
          downloadUrl
            ? `Ready • ${savingsPercent}% smaller`
            : isProcessing
            ? `Compressing... ${progress}%`
            : file
            ? `${file.name.slice(0, 18)}... (${(file.size / (1024 * 1024)).toFixed(2)} MB)`
            : undefined
        }
        secondaryAction={
          file && !isProcessing && !downloadUrl
            ? {
                label: 'Change',
                onClick: () => {
                  setFile(null);
                  setDownloadUrl(null);
                },
              }
            : undefined
        }
        primaryAction={
          downloadUrl
            ? {
                label: 'Download Compressed PDF',
                onClick: handleDownload,
                icon: <Download className="w-4 h-4" />,
                className: 'bg-emerald-600 hover:bg-emerald-700 text-white',
              }
            : {
                label: 'Compress PDF',
                onClick: triggerCompress,
                disabled: !file,
                loading: isProcessing,
                icon: <FileText className="w-4 h-4" />,
              }
        }
      />

      {downloadUrl && (
        <WorkflowNextActions
          currentTool="compress-pdf"
          fileBlob={compressedBlob}
          fileName={`compressed-${file?.name || 'document.pdf'}`}
        />
      )}
    </div>
  );
}
