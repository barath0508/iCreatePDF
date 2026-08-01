'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Columns, Loader2, FileText, Sliders, SplitSquareVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PdfVisualDiffTool() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [diffMode, setDiffMode] = useState<'overlay' | 'sideBySide' | 'pixelDiff'>('overlay');
  const [textDiff, setTextDiff] = useState<{ added: string[]; removed: string[] }>({ added: [], removed: [] });

  const canvasRefA = useRef<HTMLCanvasElement>(null);
  const canvasRefB = useRef<HTMLCanvasElement>(null);
  const diffCanvasRef = useRef<HTMLCanvasElement>(null);

  const fileInputRefA = useRef<HTMLInputElement>(null);
  const fileInputRefB = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fileA || !fileB) return;

    let isMounted = true;
    const comparePages = async () => {
      setIsLoading(true);
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const bufferA = await fileA.arrayBuffer();
        const bufferB = await fileB.arrayBuffer();

        const docA = await pdfjsLib.getDocument({ data: new Uint8Array(bufferA) }).promise;
        const docB = await pdfjsLib.getDocument({ data: new Uint8Array(bufferB) }).promise;

        if (!isMounted) return;
        setTotalPages(Math.max(docA.numPages, docB.numPages));

        const pageA = currentPage <= docA.numPages ? await docA.getPage(currentPage) : null;
        const pageB = currentPage <= docB.numPages ? await docB.getPage(currentPage) : null;

        // Render page A
        if (pageA && canvasRefA.current) {
          const viewportA = pageA.getViewport({ scale: 1.2 });
          const canvasA = canvasRefA.current;
          canvasA.width = viewportA.width;
          canvasA.height = viewportA.height;
          const ctxA = canvasA.getContext('2d');
          if (ctxA) await pageA.render({ canvasContext: ctxA, viewport: viewportA, canvas: canvasA }).promise;
        }

        // Render page B
        if (pageB && canvasRefB.current) {
          const viewportB = pageB.getViewport({ scale: 1.2 });
          const canvasB = canvasRefB.current;
          canvasB.width = viewportB.width;
          canvasB.height = viewportB.height;
          const ctxB = canvasB.getContext('2d');
          if (ctxB) await pageB.render({ canvasContext: ctxB, viewport: viewportB, canvas: canvasB }).promise;
        }

        // Compute Pixel Diff if both canvases are rendered
        if (canvasRefA.current && canvasRefB.current && diffCanvasRef.current) {
          const canvasA = canvasRefA.current;
          const canvasB = canvasRefB.current;
          const diffCanvas = diffCanvasRef.current;

          const width = Math.max(canvasA.width, canvasB.width);
          const height = Math.max(canvasA.height, canvasB.height);
          diffCanvas.width = width;
          diffCanvas.height = height;

          const ctxDiff = diffCanvas.getContext('2d');
          const ctxA = canvasA.getContext('2d');
          const ctxB = canvasB.getContext('2d');

          if (ctxDiff && ctxA && ctxB) {
            const imgDataA = ctxA.getImageData(0, 0, canvasA.width, canvasA.height);
            const imgDataB = ctxB.getImageData(0, 0, canvasB.width, canvasB.height);
            const diffData = ctxDiff.createImageData(width, height);

            const len = diffData.data.length;
            for (let i = 0; i < len; i += 4) {
              const rA = imgDataA.data[i] || 255;
              const gA = imgDataA.data[i + 1] || 255;
              const bA = imgDataA.data[i + 2] || 255;

              const rB = imgDataB.data[i] || 255;
              const gB = imgDataB.data[i + 1] || 255;
              const bB = imgDataB.data[i + 2] || 255;

              const diffR = Math.abs(rA - rB);
              const diffG = Math.abs(gA - gB);
              const diffB = Math.abs(bA - bB);
              const isDifferent = diffR > 20 || diffG > 20 || diffB > 20;

              if (isDifferent) {
                // Highlight difference in bright magenta/red
                diffData.data[i] = 239;     // R
                diffData.data[i + 1] = 68;  // G
                diffData.data[i + 2] = 68;  // B
                diffData.data[i + 3] = 255; // A
              } else {
                // Dim background
                diffData.data[i] = rA;
                diffData.data[i + 1] = gA;
                diffData.data[i + 2] = bA;
                diffData.data[i + 3] = 120;
              }
            }
            ctxDiff.putImageData(diffData, 0, 0);
          }
        }

        // Text diff extraction
        if (pageA || pageB) {
          const textA = pageA ? (await pageA.getTextContent()).items.map((it: any) => it.str).join(' ') : '';
          const textB = pageB ? (await pageB.getTextContent()).items.map((it: any) => it.str).join(' ') : '';

          const wordsA = new Set(textA.split(/\s+/));
          const wordsB = new Set(textB.split(/\s+/));

          const added = Array.from(wordsB).filter((w) => w && !wordsA.has(w)).slice(0, 15);
          const removed = Array.from(wordsA).filter((w) => w && !wordsB.has(w)).slice(0, 15);

          setTextDiff({ added, removed });
        }
      } catch (err) {
        console.error('Diff calculation error:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    comparePages();
    return () => { isMounted = false; };
  }, [fileA, fileB, currentPage]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Upload Dual Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-mono text-muted-foreground mb-2 block">Document A (Original)</label>
          {!fileA ? (
            <div
              onClick={() => fileInputRefA.current?.click()}
              className="relative cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[140px] border-border bg-card hover:border-brand/50 transition-all"
            >
              <input type="file" ref={fileInputRefA} onChange={(e) => e.target.files && setFileA(e.target.files[0])} accept=".pdf" className="hidden" />
              <Upload className="w-6 h-6 text-brand mb-2" />
              <p className="text-xs font-semibold text-foreground">Upload Document A</p>
            </div>
          ) : (
            <div className="p-4 bg-card border border-border rounded-xl flex justify-between items-center">
              <span className="text-xs font-mono text-foreground truncate max-w-[200px]">{fileA.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setFileA(null)} className="text-xs text-red-400">Remove</Button>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-mono text-muted-foreground mb-2 block">Document B (Revision)</label>
          {!fileB ? (
            <div
              onClick={() => fileInputRefB.current?.click()}
              className="relative cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[140px] border-border bg-card hover:border-brand/50 transition-all"
            >
              <input type="file" ref={fileInputRefB} onChange={(e) => e.target.files && setFileB(e.target.files[0])} accept=".pdf" className="hidden" />
              <Upload className="w-6 h-6 text-brand mb-2" />
              <p className="text-xs font-semibold text-foreground">Upload Document B</p>
            </div>
          ) : (
            <div className="p-4 bg-card border border-border rounded-xl flex justify-between items-center">
              <span className="text-xs font-mono text-foreground truncate max-w-[200px]">{fileB.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setFileB(null)} className="text-xs text-red-400">Remove</Button>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Viewport */}
      {fileA && fileB && (
        <div className="space-y-6">
          {/* Mode Switcher & Controls */}
          <div className="p-4 bg-card border border-border rounded-2xl flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={diffMode === 'overlay' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDiffMode('overlay')}
                className={diffMode === 'overlay' ? 'bg-brand' : ''}
              >
                <SplitSquareVertical className="w-3.5 h-3.5 mr-1" /> Curtain Slider
              </Button>
              <Button
                variant={diffMode === 'pixelDiff' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDiffMode('pixelDiff')}
                className={diffMode === 'pixelDiff' ? 'bg-brand' : ''}
              >
                <Sliders className="w-3.5 h-3.5 mr-1" /> Pixel Diff Map
              </Button>
              <Button
                variant={diffMode === 'sideBySide' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDiffMode('sideBySide')}
                className={diffMode === 'sideBySide' ? 'bg-brand' : ''}
              >
                <Columns className="w-3.5 h-3.5 mr-1" /> Side by Side
              </Button>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>
                  Prev
                </Button>
                <span className="text-xs font-mono text-muted-foreground">Page {currentPage} of {totalPages}</span>
                <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            )}
          </div>

          {/* Interactive Visual Canvas Area */}
          <div className="p-6 bg-card border border-border rounded-2xl flex justify-center items-center relative min-h-[400px] overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand" />
              </div>
            )}

            {/* Hidden Canvases for Source Documents */}
            <canvas ref={canvasRefA} className={diffMode === 'sideBySide' ? 'max-w-[48%] rounded border border-border' : 'hidden'} />
            <canvas ref={canvasRefB} className={diffMode === 'sideBySide' ? 'max-w-[48%] rounded border border-border' : 'hidden'} />

            {/* Pixel Diff Map Mode */}
            <canvas ref={diffCanvasRef} className={diffMode === 'pixelDiff' ? 'max-w-full rounded border border-border shadow-lg' : 'hidden'} />

            {/* Curtain Slider Mode */}
            {diffMode === 'overlay' && (
              <div className="relative max-w-full overflow-hidden rounded border border-border">
                <div className="relative">
                  <canvas
                    ref={canvasRefA}
                    className="block max-w-full"
                  />
                  <div
                    className="absolute top-0 left-0 bottom-0 overflow-hidden border-r-2 border-brand"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <canvas
                      ref={canvasRefB}
                      className="block max-w-none"
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full mt-4 accent-brand cursor-pointer"
                />
                <p className="text-center text-xs text-muted-foreground mt-1">Drag slider to compare Document A vs Document B</p>
              </div>
            )}
          </div>

          {/* Text Diff Summary */}
          {(textDiff.added.length > 0 || textDiff.removed.length > 0) && (
            <div className="p-6 bg-card border border-border rounded-2xl space-y-3">
              <h4 className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand" /> Word-Level Key Changes (Page {currentPage})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                  <span className="font-bold text-emerald-400">Added Words in Document B:</span>
                  <p className="text-emerald-300/80">{textDiff.added.join(', ') || 'None detected'}</p>
                </div>
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
                  <span className="font-bold text-red-400">Removed Words from Document A:</span>
                  <p className="text-red-300/80">{textDiff.removed.join(', ') || 'None detected'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
