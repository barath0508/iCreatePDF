'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Layers, Trash2, RotateCw, Loader2, Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { organizePdf, PageEditInstruction } from '@/lib/pdf';
import { Button } from '@/components/ui/button';

interface PageThumbnail {
  originalIndex: number;
  rotation: number;
  delete: boolean;
  dataUrl: string;
}

export function OrganizeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumbnail[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPreviews, setIsLoadingPreviews] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  React.useEffect(() => {
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      handleFiles(getPreloadedFiles());
    }
  }, []);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    setPages([]);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    setFile(uploadedFile);
    setIsLoadingPreviews(true);

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();

      // Dynamically load PDFJS to avoid server-side render issues
      const pdfjsLib = await import('pdfjs-dist');
      // Set worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      const count = pdf.numPages;
      const loadedPages: PageThumbnail[] = [];

      for (let i = 1; i <= count; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.25 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          await page.render({ canvasContext: context, viewport, canvas }).promise;
          loadedPages.push({
            originalIndex: i - 1,
            rotation: 0,
            delete: false,
            dataUrl: canvas.toDataURL('image/jpeg', 0.8),
          });
        }
      }

      setPages(loadedPages);
    } catch (err) {
      console.error(err);
      setError('Failed to generate page previews. You can still merge/organize them, but page previews could not be loaded.');
    } finally {
      setIsLoadingPreviews(false);
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

  const rotatePage = (idx: number) => {
    setPages((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
    setDownloadUrl(null);
  };

  const toggleDeletePage = (idx: number) => {
    setPages((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, delete: !p.delete } : p))
    );
    setDownloadUrl(null);
  };

  const movePage = (idx: number, direction: -1 | 1) => {
    setPages((prev) => {
      const target = idx + direction;
      if (target < 0 || target >= prev.length) return prev;
      const updated = [...prev];
      [updated[idx], updated[target]] = [updated[target], updated[idx]];
      return updated;
    });
    setDownloadUrl(null);
  };

  const handleDragStart = (index: number) => {
    dragItemIndex.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItemIndex.current = index;
  };

  const handleDragEnd = () => {
    if (
      dragItemIndex.current !== null &&
      dragOverItemIndex.current !== null &&
      dragItemIndex.current !== dragOverItemIndex.current
    ) {
      const updated = [...pages];
      const dragged = updated.splice(dragItemIndex.current, 1)[0];
      updated.splice(dragOverItemIndex.current, 0, dragged);
      setPages(updated);
    }
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };

  const triggerOrganize = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const instructions: PageEditInstruction[] = pages.map((p) => ({
        originalIndex: p.originalIndex,
        rotation: p.rotation,
        delete: p.delete,
      }));

      const organizedBytes = await organizePdf(buffer, instructions, (p) => setProgress(Math.round(p)));
      const blob = new Blob([organizedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to organize PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `organized-${file?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Workspace Gallery */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[220px] ${
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
                <Upload className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                Select or drag a PDF file
              </h3>
              <p className="text-xs text-foreground/40">
                Reorder, rotate, or delete pages client-side.
              </p>
            </div>
          ) : isLoadingPreviews ? (
            <div className="p-12 text-center bg-card border border-foreground/10 rounded-2xl flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-brand animate-spin" />
              <p className="text-sm text-foreground/60">Generating page thumbnails...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest">
                  Pages Queue ({pages.length}) - Drag or use arrows to reorder
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setPages([]);
                    setDownloadUrl(null);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground"
                >
                  Change File
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {pages.map((img, idx) => (
                  <div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragEnter={() => handleDragEnter(idx)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className={`relative bg-card border rounded-xl overflow-hidden aspect-[3/4] flex flex-col justify-between cursor-move hover:border-brand/30 transition-all duration-300 ${
                      img.delete ? 'border-red-500/30 opacity-40' : 'border-foreground/5'
                    }`}
                  >
                    <div className="relative flex-1 bg-background/40 flex items-center justify-center overflow-hidden">
                      <img
                        src={img.dataUrl}
                        alt=""
                        style={{ transform: `rotate(${img.rotation}deg)` }}
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-background/85 text-[10px] text-foreground/70 rounded-full font-mono border border-foreground/10">
                        Page {img.originalIndex + 1}
                      </span>
                    </div>

                    <div className="flex border-t border-foreground/5 bg-card/60 p-2 gap-1 justify-between">
                      <button
                        type="button"
                        onClick={() => movePage(idx, -1)}
                        disabled={idx === 0}
                        className="p-1.5 hover:bg-foreground/5 hover:text-brand rounded-lg text-foreground/40 transition-colors disabled:opacity-20 disabled:pointer-events-none"
                        aria-label="Move page earlier"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => rotatePage(idx)}
                        className="p-1.5 hover:bg-foreground/5 hover:text-brand rounded-lg text-foreground/40 transition-colors"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleDeletePage(idx)}
                        className={`p-1.5 hover:bg-red-950/20 rounded-lg transition-colors ${
                          img.delete ? 'text-red-500' : 'text-foreground/40 hover:text-red-400'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => movePage(idx, 1)}
                        disabled={idx === pages.length - 1}
                        className="p-1.5 hover:bg-foreground/5 hover:text-brand rounded-lg text-foreground/40 transition-colors disabled:opacity-20 disabled:pointer-events-none"
                        aria-label="Move page later"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
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
        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Organize PDF</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Drag slides to rearrange the sequence of pages. Rotate pages or flag specific pages for deletion.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Generating...
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
                  Download PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setPages([]);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Upload new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={pages.length === 0}
                onClick={triggerOrganize}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  pages.length > 0 ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Organize PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
