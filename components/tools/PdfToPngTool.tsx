'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Loader2,
  Download,
  FileImage,
  Sparkles,
  Check,
  Copy,
  Layers,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Sliders,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RenderedPage {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
}

export function PdfToPngTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentRenderPage, setCurrentRenderPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadZipUrl, setDownloadZipUrl] = useState<string | null>(null);
  const [renderedPages, setRenderedPages] = useState<RenderedPage[]>([]);
  const [scale, setScale] = useState<number>(1.5); // 1x, 1.5x, 2x
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  const [pageRangeMode, setPageRangeMode] = useState<'all' | 'custom'>('all');
  const [customRange, setCustomRange] = useState<string>('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfjsRef = useRef<typeof import('pdfjs-dist') | null>(null);

  // Preload pdfjs-dist on mount
  useEffect(() => {
    import('pdfjs-dist')
      .then((lib) => {
        lib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${lib.version}/build/pdf.worker.min.mjs`;
        pdfjsRef.current = lib;
      })
      .catch(() => {});
  }, []);

  // Universal clipboard paste listener (Ctrl + V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const pastedFile = items[i].getAsFile();
          if (pastedFile && pastedFile.type === 'application/pdf') {
            handleFiles([pastedFile]);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadZipUrl(null);
    setRenderedPages([]);
    setProgress(0);

    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdfjsLib = pdfjsRef.current ?? (await import('pdfjs-dist'));
      if (!pdfjsRef.current) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        pdfjsRef.current = pdfjsLib;
      }

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      setFile(uploadedFile);
      setPagesCount(pdf.numPages);
    } catch (err) {
      console.error(err);
      setError(`Failed to read PDF file: ${uploadedFile.name}. File may be password protected or damaged.`);
    }
  };

  const parsePageNumbers = (total: number): number[] => {
    if (pageRangeMode === 'all' || !customRange.trim()) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = new Set<number>();
    const parts = customRange.split(',').map((p) => p.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const max = Math.min(total, Math.max(start, end));
          for (let p = min; p <= max; p++) {
            pages.add(p);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= total) {
          pages.add(num);
        }
      }
    }

    const sorted = Array.from(pages).sort((a, b) => a - b);
    return sorted.length > 0 ? sorted : Array.from({ length: total }, (_, i) => i + 1);
  };

  const convertPdfToPng = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setRenderedPages([]);
    setDownloadZipUrl(null);

    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = pdfjsRef.current ?? (await import('pdfjs-dist'));
      if (!pdfjsRef.current) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        pdfjsRef.current = pdfjsLib;
      }

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      const targetPages = parsePageNumbers(pdf.numPages);
      const totalToRender = targetPages.length;

      const pageResults: RenderedPage[] = [];

      for (let idx = 0; idx < totalToRender; idx++) {
        const pageNum = targetPages[idx];
        setCurrentRenderPage(pageNum);

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { alpha: true });
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (!transparentBg) {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
        }

        await page.render({
          canvasContext: context,
          viewport,
          canvas,
          background: transparentBg ? 'rgba(0,0,0,0)' : 'rgb(255,255,255)',
        }).promise;

        const dataUrl = canvas.toDataURL('image/png');
        const blob: Blob | null = await new Promise((resolve) => {
          canvas.toBlob((b) => resolve(b), 'image/png');
        });

        if (blob) {
          zip.file(`page-${pageNum}.png`, blob);
          pageResults.push({
            pageNumber: pageNum,
            dataUrl,
            blob,
            width: viewport.width,
            height: viewport.height,
          });
        }

        setProgress(Math.round(((idx + 1) / totalToRender) * 100));
      }

      setRenderedPages(pageResults);

      if (pageResults.length > 1) {
        const zipContent = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(zipContent);
        setDownloadZipUrl(zipUrl);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to convert PDF pages to PNG.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadZip = () => {
    if (!downloadZipUrl || !file) return;
    const link = document.createElement('a');
    link.href = downloadZipUrl;
    link.download = `${file.name.replace(/\.pdf$/i, '')}-png-images.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSingle = (page: RenderedPage) => {
    if (!file) return;
    const link = document.createElement('a');
    link.href = page.dataUrl;
    link.download = `${file.name.replace(/\.pdf$/i, '')}-page-${page.pageNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = async (page: RenderedPage, index: number) => {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': page.blob }),
        ]);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Interactive Uploader / Configuration Card */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingOver(false);
              if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-10 sm:p-16 text-center transition-all duration-200 flex flex-col items-center justify-center min-h-[280px] ${
              isDraggingOver
                ? 'border-brand bg-brand/5 scale-[0.99]'
                : 'border-border/80 bg-muted/20 hover:border-brand/60 hover:bg-muted/30'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              accept="application/pdf,.pdf"
              className="hidden"
            />
            <div className="p-4 rounded-2xl bg-brand/10 text-brand mb-4 border border-brand/20 shadow-xs">
              <Upload className="w-8 h-8 stroke-[1.75]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground mb-2">
              Select or Drag a PDF File
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              Extract every page as a high-fidelity, lossless PNG image. Works 100% locally in your browser.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 bg-card px-3 py-1 rounded-full border border-border">
                <ShieldCheck className="w-3.5 h-3.5 text-brand" /> Zero Server Uploads
              </span>
              <span className="hidden sm:inline-block">•</span>
              <span className="hidden sm:inline-block">Paste with Ctrl+V</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-muted/30 border border-border">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-brand/10 text-brand border border-brand/20">
                  <FileImage className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{file.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {pagesCount} pages • {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for PNG export
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFile(null);
                  setRenderedPages([]);
                  setDownloadZipUrl(null);
                }}
                className="text-xs font-medium self-start sm:self-center"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Change File
              </Button>
            </div>

            {/* Conversion Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-card border border-border">
              {/* Resolution / DPI */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-brand" /> Resolution Quality
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Standard', value: 1.0, sub: '72 DPI' },
                    { label: 'High-Res', value: 1.5, sub: '150 DPI' },
                    { label: 'Ultra HD', value: 2.0, sub: '300 DPI' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setScale(item.value)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        scale === item.value
                          ? 'border-brand bg-brand/10 text-brand font-semibold shadow-xs'
                          : 'border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] opacity-70 font-mono">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Range */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-brand" /> Page Range
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPageRangeMode('all')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      pageRangeMode === 'all'
                        ? 'border-brand bg-brand/10 text-brand'
                        : 'border-border bg-muted/20 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    All ({pagesCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPageRangeMode('custom')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      pageRangeMode === 'custom'
                        ? 'border-brand bg-brand/10 text-brand'
                        : 'border-border bg-muted/20 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {pageRangeMode === 'custom' && (
                  <input
                    type="text"
                    value={customRange}
                    onChange={(e) => setCustomRange(e.target.value)}
                    placeholder="e.g. 1, 3-5, 8"
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl bg-background border border-border focus:outline-none focus:border-brand"
                  />
                )}
              </div>

              {/* Background Transparency */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand" /> Alpha Transparency
                </label>
                <button
                  type="button"
                  onClick={() => setTransparentBg(!transparentBg)}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    transparentBg
                      ? 'border-brand bg-brand/10 text-brand font-semibold shadow-xs'
                      : 'border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-xs font-bold">
                      {transparentBg ? 'Transparent Canvas' : 'Opaque White Background'}
                    </div>
                    <div className="text-[10px] opacity-70 font-mono">
                      {transparentBg ? 'Alpha channel preserved' : 'Standard clean white sheet'}
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      transparentBg ? 'border-brand bg-brand text-white' : 'border-border'
                    }`}
                  >
                    {transparentBg && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Action Button & Progress */}
            <div className="space-y-4 pt-2">
              {isProcessing ? (
                <div className="space-y-3 p-6 rounded-2xl bg-muted/30 border border-border">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-2 text-foreground font-semibold">
                      <Loader2 className="w-4 h-4 animate-spin text-brand" />
                      Rendering page {currentRenderPage} of {pagesCount}...
                    </span>
                    <span className="font-bold text-brand">{progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand transition-all duration-200 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <Button
                  onClick={convertPdfToPng}
                  className="w-full py-6 text-base font-semibold bg-brand text-white hover:bg-brand/90 rounded-2xl shadow-sm transition-all"
                >
                  <FileImage className="w-5 h-5 mr-2" />
                  Convert to Lossless PNG
                </Button>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Rendered Results Gallery */}
      {renderedPages.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h3 className="text-xl font-bold font-display text-foreground">
                Converted PNG Pages ({renderedPages.length})
              </h3>
              <p className="text-xs text-muted-foreground">
                Rendered at {scale}x scale with 100% client-side privacy.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {downloadZipUrl && (
                <Button
                  onClick={handleDownloadZip}
                  className="bg-brand text-white hover:bg-brand/90 text-xs font-semibold rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All as ZIP
                </Button>
              )}
            </div>
          </div>

          {/* Grid of Pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderedPages.map((page, idx) => (
              <div
                key={page.pageNumber}
                className="group relative bg-card border border-border hover:border-brand/40 rounded-2xl p-4 transition-all duration-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="relative aspect-[3/4] bg-muted/30 rounded-xl overflow-hidden border border-border/50 flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.dataUrl}
                    alt={`Page ${page.pageNumber}`}
                    className="max-w-full max-h-full object-contain rounded shadow-xs"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-background/90 backdrop-blur-xs text-[10px] font-mono font-semibold border border-border">
                    Page {page.pageNumber}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{page.width} × {page.height} px</span>
                    <span>{(page.blob.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleDownloadSingle(page)}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs font-medium rounded-xl hover:border-brand hover:text-brand"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </Button>
                    <Button
                      onClick={() => handleCopyImage(page, idx)}
                      variant="ghost"
                      size="sm"
                      className="px-2.5 text-xs text-muted-foreground hover:text-foreground rounded-xl"
                      title="Copy PNG image to clipboard"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Chaining: "Next Actions" Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-muted/20 border border-border space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Recommended Next Steps
            </div>
            <h4 className="text-lg font-bold font-display text-foreground">
              What would you like to do next?
            </h4>
            <p className="text-xs text-muted-foreground max-w-xl">
              Seamlessly continue processing your files with other free in-browser privacy tools.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <Link
                href="/png-to-pdf"
                className="p-3.5 rounded-2xl bg-card border border-border hover:border-brand/40 text-left transition-all group"
              >
                <div className="text-xs font-bold text-foreground group-hover:text-brand flex items-center justify-between">
                  PNG to PDF <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Re-combine images into a PDF
                </div>
              </Link>
              <Link
                href="/compress-pdf"
                className="p-3.5 rounded-2xl bg-card border border-border hover:border-brand/40 text-left transition-all group"
              >
                <div className="text-xs font-bold text-foreground group-hover:text-brand flex items-center justify-between">
                  Compress PDF <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Shrink PDF file size locally
                </div>
              </Link>
              <Link
                href="/sign-pdf"
                className="p-3.5 rounded-2xl bg-card border border-border hover:border-brand/40 text-left transition-all group"
              >
                <div className="text-xs font-bold text-foreground group-hover:text-brand flex items-center justify-between">
                  Sign PDF <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Add custom digital signature
                </div>
              </Link>
              <Link
                href="/protect-pdf"
                className="p-3.5 rounded-2xl bg-card border border-border hover:border-brand/40 text-left transition-all group"
              >
                <div className="text-xs font-bold text-foreground group-hover:text-brand flex items-center justify-between">
                  Protect PDF <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Encrypt with AES-256 password
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfToPngTool;
