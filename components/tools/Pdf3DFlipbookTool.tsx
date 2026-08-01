'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, BookOpen, ChevronLeft, ChevronRight, Play, Pause, RefreshCw, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Pdf3DFlipbookTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const canvasRefLeft = useRef<HTMLCanvasElement>(null);
  const canvasRefRight = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    if (!file) return;

    let isMounted = true;
    const renderSpread = async () => {
      setIsLoading(true);
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

        if (!isMounted) return;
        setPageCount(pdf.numPages);

        // Render Left Page (Page N)
        if (currentPage <= pdf.numPages && canvasRefLeft.current) {
          const pageLeft = await pdf.getPage(currentPage);
          const viewportLeft = pageLeft.getViewport({ scale: 1.0 });
          const canvasL = canvasRefLeft.current;
          canvasL.width = viewportLeft.width;
          canvasL.height = viewportLeft.height;
          const ctxL = canvasL.getContext('2d');
          if (ctxL) await pageLeft.render({ canvasContext: ctxL, viewport: viewportLeft, canvas: canvasL }).promise;
        }

        // Render Right Page (Page N+1)
        if (currentPage + 1 <= pdf.numPages && canvasRefRight.current) {
          const pageRight = await pdf.getPage(currentPage + 1);
          const viewportRight = pageRight.getViewport({ scale: 1.0 });
          const canvasR = canvasRefRight.current;
          canvasR.width = viewportRight.width;
          canvasR.height = viewportRight.height;
          const ctxR = canvasR.getContext('2d');
          if (ctxR) await pageRight.render({ canvasContext: ctxR, viewport: viewportRight, canvas: canvasR }).promise;
        }
      } catch (err) {
        console.error('Flipbook render failed:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    renderSpread();
    return () => { isMounted = false; };
  }, [file, currentPage]);

  // Auto-play slideshow timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && pageCount > 0) {
      interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 2 > pageCount ? 1 : prev + 2));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, pageCount]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative cursor-pointer border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[260px] border-border bg-card hover:border-brand/50 transition-all duration-300 shadow-sm"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-display">Interactive 3D PDF Flipbook</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-1">
            Transform brochures, catalogs, e-books, and magazines into an interactive double-page 3D flipbook reader.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-card border border-border rounded-2xl flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-brand" />
              <div>
                <h4 className="text-sm font-semibold text-foreground truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-muted-foreground">{pageCount} total pages</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setFile(null)}>
              Change Document
            </Button>
          </div>

          {/* 3D Flipbook Double-Page Spread Viewport */}
          <div className="p-8 bg-card border border-border rounded-3xl relative min-h-[450px] flex items-center justify-center overflow-hidden shadow-2xl">
            {isLoading && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-20 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin text-brand" />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 max-w-full items-center justify-center transform transition-transform duration-500 perspective-1000">
              {/* Left Page Shell */}
              <div className="bg-white rounded-l-2xl border-r border-zinc-300 shadow-2xl overflow-hidden max-w-[480px]">
                <canvas ref={canvasRefLeft} className="w-full h-auto block" />
              </div>

              {/* Right Page Shell */}
              {currentPage + 1 <= pageCount && (
                <div className="bg-white rounded-r-2xl shadow-2xl overflow-hidden max-w-[480px]">
                  <canvas ref={canvasRefRight} className="w-full h-auto block" />
                </div>
              )}
            </div>
          </div>

          {/* Flipbook Controls */}
          <div className="p-4 bg-card border border-border rounded-2xl flex flex-wrap justify-between items-center gap-4 max-w-xl mx-auto">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 2))}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous Pages
            </Button>

            <span className="text-xs font-mono text-foreground font-semibold">
              Pages {currentPage} - {Math.min(currentPage + 1, pageCount)} of {pageCount}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage + 1 >= pageCount}
              onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 2))}
            >
              Next Pages <ChevronRight className="w-4 h-4 ml-1" />
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-brand hover:bg-brand/90"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isPlaying ? 'Pause' : 'Auto Flip'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
