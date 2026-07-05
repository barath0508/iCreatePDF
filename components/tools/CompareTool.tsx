'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Columns, Loader2, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CompareTool() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);

  const [isLoadingA, setIsLoadingA] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);

  const [pagesCountA, setPagesCountA] = useState(0);
  const [pagesCountB, setPagesCountB] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const canvasRefA = useRef<HTMLCanvasElement>(null);
  const canvasRefB = useRef<HTMLCanvasElement>(null);

  const fileInputRefA = useRef<HTMLInputElement>(null);
  const fileInputRefB = useRef<HTMLInputElement>(null);

  // Render PDF A Page
  useEffect(() => {
    if (!fileA) return;

    let isMounted = true;
    const renderPageA = async () => {
      setIsLoadingA(true);
      try {
        const arrayBuffer = await fileA.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;
        setPagesCountA(pdf.numPages);

        if (currentPage <= pdf.numPages) {
          const page = await pdf.getPage(currentPage);
          const viewport = page.getViewport({ scale: 1.0 });

          const canvas = canvasRefA.current;
          if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              await page.render({ canvasContext: context, viewport, canvas }).promise;
            }
          }
        }
      } catch (err) {
        console.error('Error rendering PDF A:', err);
      } finally {
        if (isMounted) setIsLoadingA(false);
      }
    };

    renderPageA();
    return () => {
      isMounted = false;
    };
  }, [fileA, currentPage]);

  // Render PDF B Page
  useEffect(() => {
    if (!fileB) return;

    let isMounted = true;
    const renderPageB = async () => {
      setIsLoadingB(true);
      try {
        const arrayBuffer = await fileB.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;
        setPagesCountB(pdf.numPages);

        if (currentPage <= pdf.numPages) {
          const page = await pdf.getPage(currentPage);
          const viewport = page.getViewport({ scale: 1.0 });

          const canvas = canvasRefB.current;
          if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              await page.render({ canvasContext: context, viewport, canvas }).promise;
            }
          }
        }
      } catch (err) {
        console.error('Error rendering PDF B:', err);
      } finally {
        if (isMounted) setIsLoadingB(false);
      }
    };

    renderPageB();
    return () => {
      isMounted = false;
    };
  }, [fileB, currentPage]);

  const maxPages = Math.max(pagesCountA, pagesCountB);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      
      {/* Upload Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Document A */}
        <div>
          <label className="text-xs font-mono text-foreground/60 mb-2 block">Document A (Original)</label>
          {!fileA ? (
            <div
              onClick={() => fileInputRefA.current?.click()}
              className="relative cursor-pointer border border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[140px] border-foreground/10 bg-card/40 hover:border-foreground/20 transition-all duration-300"
            >
              <input
                type="file"
                ref={fileInputRefA.current ? undefined : fileInputRefA}
                onChange={(e) => e.target.files && setFileA(e.target.files[0])}
                accept=".pdf"
                className="hidden"
              />
              <Upload className="w-5 h-5 text-brand mb-2" />
              <p className="text-xs text-foreground/80">Select Document A</p>
            </div>
          ) : (
            <div className="p-4 bg-card border border-foreground/10 rounded-xl flex justify-between items-center">
              <span className="text-xs text-foreground truncate max-w-[200px]">{fileA.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setFileA(null)} className="text-xs text-red-400">Remove</Button>
            </div>
          )}
        </div>

        {/* Document B */}
        <div>
          <label className="text-xs font-mono text-foreground/60 mb-2 block">Document B (Revision)</label>
          {!fileB ? (
            <div
              onClick={() => fileInputRefB.current?.click()}
              className="relative cursor-pointer border border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[140px] border-foreground/10 bg-card/40 hover:border-foreground/20 transition-all duration-300"
            >
              <input
                type="file"
                ref={fileInputRefB.current ? undefined : fileInputRefB}
                onChange={(e) => e.target.files && setFileB(e.target.files[0])}
                accept=".pdf"
                className="hidden"
              />
              <Upload className="w-5 h-5 text-brand mb-2" />
              <p className="text-xs text-foreground/80">Select Document B</p>
            </div>
          ) : (
            <div className="p-4 bg-card border border-foreground/10 rounded-xl flex justify-between items-center">
              <span className="text-xs text-foreground truncate max-w-[200px]">{fileB.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setFileB(null)} className="text-xs text-red-400">Remove</Button>
            </div>
          )}
        </div>

      </div>

      {/* Synchronized Document Scroll Workspaces */}
      {(fileA || fileB) && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* View A */}
            <div className="bg-card border border-foreground/10 rounded-2xl p-4 flex justify-center items-center relative min-h-[300px] overflow-hidden">
              {isLoadingA && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-brand" />
                </div>
              )}
              {fileA ? (
                <canvas ref={canvasRefA} className="shadow-2xl rounded max-w-full" />
              ) : (
                <span className="text-xs text-foreground/30">Document A not loaded</span>
              )}
            </div>

            {/* View B */}
            <div className="bg-card border border-foreground/10 rounded-2xl p-4 flex justify-center items-center relative min-h-[300px] overflow-hidden">
              {isLoadingB && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-brand" />
                </div>
              )}
              {fileB ? (
                <canvas ref={canvasRefB} className="shadow-2xl rounded max-w-full" />
              ) : (
                <span className="text-xs text-foreground/30">Document B not loaded</span>
              )}
            </div>

          </div>

          {/* Sync Navigation Bar */}
          {maxPages > 1 && (
            <div className="flex justify-between items-center bg-card/60 p-4 rounded-xl border border-foreground/5 max-w-md mx-auto">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous Page
              </Button>
              <span className="text-xs text-foreground/60">
                Page {currentPage} of {maxPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage >= maxPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next Page
              </Button>
            </div>
          )}
        </div>
      )}

      {!fileA && !fileB && (
        <div className="text-center p-12 bg-card/45 border border-foreground/5 rounded-2xl space-y-3">
          <Columns className="w-8 h-8 text-brand mx-auto" />
          <h4 className="text-base font-semibold text-foreground">Upload two files to start side-by-side comparison</h4>
          <p className="text-xs text-foreground/40 max-w-sm mx-auto leading-relaxed">
            Verify content differences, layout updates, and text variations side-by-side 100% locally.
          </p>
        </div>
      )}

    </div>
  );
}
