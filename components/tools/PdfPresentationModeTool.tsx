'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Monitor,
  ChevronLeft,
  ChevronRight,
  PenTool,
  Flame,
  Highlighter,
  Trash2,
  Maximize,
  Minimize,
  Clock,
  FileText,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PdfPresentationModeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTool, setActiveTool] = useState<'laser' | 'pen' | 'highlighter' | 'none'>('laser');
  const [penColor, setPenColor] = useState('#2563eb'); // Default blue
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const interactiveCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const pageDrawingsRef = useRef<Map<number, string>>(new Map());

  // Timer counter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (file) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [file]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCurrentPage(1);
      setSeconds(0);
      pageDrawingsRef.current.clear();
    }
  };

  const saveCurrentPageDrawing = useCallback(() => {
    if (drawCanvasRef.current) {
      pageDrawingsRef.current.set(currentPage, drawCanvasRef.current.toDataURL());
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < pageCount) {
      saveCurrentPageDrawing();
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, pageCount, saveCurrentPageDrawing]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      saveCurrentPageDrawing();
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage, saveCurrentPageDrawing]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!file) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
          e.preventDefault();
          handleNextPage();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          handlePrevPage();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'l':
        case 'L':
          setActiveTool('laser');
          break;
        case 'p':
        case 'P':
          setActiveTool('pen');
          break;
        case 'h':
        case 'H':
          setActiveTool('highlighter');
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file, handleNextPage, handlePrevPage]);

  // PDF slide rendering
  useEffect(() => {
    if (!file) return;

    let isMounted = true;
    const renderSlide = async () => {
      try {
        setIsLoading(true);
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

        if (!isMounted) return;
        setPageCount(pdf.numPages);

        if (currentPage <= pdf.numPages && pdfCanvasRef.current) {
          const page = await pdf.getPage(currentPage);
          // Scale dynamically for sharp projection rendering
          const scale = isFullscreen ? 2.2 : 1.6;
          const viewport = page.getViewport({ scale });

          const canvas = pdfCanvasRef.current;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            await page.render({ canvasContext: ctx, viewport, canvas }).promise;
          }

          // Sync overlay drawing canvas and interactive canvas dimensions
          if (drawCanvasRef.current) {
            drawCanvasRef.current.width = viewport.width;
            drawCanvasRef.current.height = viewport.height;

            // Restore saved drawings for this specific slide
            const drawCtx = drawCanvasRef.current.getContext('2d');
            if (drawCtx) {
              drawCtx.clearRect(0, 0, viewport.width, viewport.height);
              const savedData = pageDrawingsRef.current.get(currentPage);
              if (savedData) {
                const img = new Image();
                img.onload = () => {
                  if (isMounted && drawCanvasRef.current) {
                    drawCtx.drawImage(img, 0, 0);
                  }
                };
                img.src = savedData;
              }
            }
          }

          if (interactiveCanvasRef.current) {
            interactiveCanvasRef.current.width = viewport.width;
            interactiveCanvasRef.current.height = viewport.height;
            const laserCtx = interactiveCanvasRef.current.getContext('2d');
            laserCtx?.clearRect(0, 0, viewport.width, viewport.height);
          }
        }
      } catch (err) {
        console.error('Slide render error:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    renderSlide();
    return () => {
      isMounted = false;
    };
  }, [file, currentPage, isFullscreen]);

  const clearCanvas = () => {
    if (drawCanvasRef.current) {
      const ctx = drawCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, drawCanvasRef.current.width, drawCanvasRef.current.height);
      pageDrawingsRef.current.delete(currentPage);
    }
  };

  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const canvas = interactiveCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    const coords = getCanvasCoordinates(clientX, clientY);
    lastPointRef.current = coords;
    isDrawingRef.current = true;

    if (activeTool === 'pen' || activeTool === 'highlighter') {
      const drawCanvas = drawCanvasRef.current;
      if (!drawCanvas) return;
      const ctx = drawCanvas.getContext('2d');
      if (!ctx) return;

      const scaleFactor = drawCanvas.width / 1000;

      if (activeTool === 'pen') {
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, Math.max(2, 2 * scaleFactor), 0, Math.PI * 2);
        ctx.fillStyle = penColor;
        ctx.fill();
      } else if (activeTool === 'highlighter') {
        // Broad highlighter dot initialization
        const highlightWidth = Math.max(16, 26 * scaleFactor);
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, highlightWidth / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(250, 204, 21, 0.4)';
        ctx.fill();
      }
    }
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    const coords = getCanvasCoordinates(clientX, clientY);

    // 1. Laser Pointer handling on dedicated interactive canvas (never touches drawing canvas)
    if (activeTool === 'laser') {
      const interactiveCanvas = interactiveCanvasRef.current;
      if (!interactiveCanvas) return;
      const laserCtx = interactiveCanvas.getContext('2d');
      if (!laserCtx) return;

      // Clear ONLY laser canvas
      laserCtx.clearRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);

      const scaleFactor = interactiveCanvas.width / 1000;
      const radius = Math.max(7, 9 * scaleFactor);

      // Outer laser halo
      laserCtx.save();
      laserCtx.beginPath();
      laserCtx.arc(coords.x, coords.y, radius * 1.8, 0, Math.PI * 2);
      laserCtx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      laserCtx.fill();

      // Glowing red dot
      laserCtx.beginPath();
      laserCtx.arc(coords.x, coords.y, radius, 0, Math.PI * 2);
      laserCtx.fillStyle = '#ef4444';
      laserCtx.shadowColor = '#f87171';
      laserCtx.shadowBlur = 18;
      laserCtx.fill();

      // White hot laser center
      laserCtx.beginPath();
      laserCtx.arc(coords.x, coords.y, radius * 0.4, 0, Math.PI * 2);
      laserCtx.fillStyle = '#ffffff';
      laserCtx.fill();
      laserCtx.restore();
    }

    // 2. Continuous stroke drawing for Pen & Highlighter
    if (isDrawingRef.current && (activeTool === 'pen' || activeTool === 'highlighter') && lastPointRef.current) {
      const drawCanvas = drawCanvasRef.current;
      if (!drawCanvas) return;
      const ctx = drawCanvas.getContext('2d');
      if (!ctx) return;

      const scaleFactor = drawCanvas.width / 1000;

      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(coords.x, coords.y);

      if (activeTool === 'pen') {
        ctx.strokeStyle = penColor;
        ctx.lineWidth = Math.max(3, 3.5 * scaleFactor);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      } else if (activeTool === 'highlighter') {
        // Translucent fluorescent yellow with smooth single-pass strokes
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
        ctx.lineWidth = Math.max(16, 26 * scaleFactor);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }

      ctx.stroke();
      lastPointRef.current = coords;
    }
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handlePointerLeave = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    // Clear laser dot when cursor leaves canvas
    if (interactiveCanvasRef.current) {
      const laserCtx = interactiveCanvasRef.current.getContext('2d');
      laserCtx?.clearRect(0, 0, interactiveCanvasRef.current.width, interactiveCanvasRef.current.height);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`w-full mx-auto transition-all ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden' : 'max-w-6xl px-4 py-8 space-y-6'}`}>
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative cursor-pointer touch-manipulation border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] border-border bg-card hover:border-brand/50 transition-all duration-300 shadow-sm"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="application/pdf,.pdf"
            onClick={(e) => {
              e.stopPropagation();
              (e.target as HTMLInputElement).value = '';
            }}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-4 shadow-xs">
            <Monitor className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-display">PDF Presentation & Laser Pointer Mode</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-1.5">
            Deliver presentations directly in your browser with real-time digital laser pointer, ink pen, yellow highlighter, slide timer, and seamless full-screen mode.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center text-xs text-muted-foreground font-mono">
            <span className="px-2.5 py-1 rounded-full bg-muted/60 border border-border">🎯 Red Laser</span>
            <span className="px-2.5 py-1 rounded-full bg-muted/60 border border-border">✨ Text Highlighter</span>
            <span className="px-2.5 py-1 rounded-full bg-muted/60 border border-border">🖥️ Fullscreen Slides</span>
            <span className="px-2.5 py-1 rounded-full bg-muted/60 border border-border">⌨️ Space / Arrows to Advance</span>
          </div>
        </div>
      ) : (
        <div ref={containerRef} className={`flex flex-col justify-between w-full h-full ${isFullscreen ? 'p-2 sm:p-4 bg-slate-950 text-white select-none' : 'space-y-6 bg-background p-4 rounded-3xl border border-border'}`}>
          {/* Header Controls Bar */}
          <div className={`p-3 bg-card/95 backdrop-blur-md border border-border rounded-2xl flex flex-wrap justify-between items-center gap-3 z-30 shadow-md ${isFullscreen ? 'bg-slate-900/90 border-slate-800' : ''}`}>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-brand shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                <span className="text-[10px] text-muted-foreground font-mono">Slide {currentPage} of {pageCount}</span>
              </div>
              <span className="text-xs bg-brand/10 text-brand px-2.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> {formatTime(seconds)}
              </span>
            </div>

            {/* Interactive Drawing Tools */}
            <div className="flex flex-wrap items-center gap-1.5 bg-background/80 p-1 rounded-xl border border-border shadow-xs">
              <Button
                variant={activeTool === 'laser' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('laser')}
                className={`h-8 px-3 text-xs font-semibold ${activeTool === 'laser' ? 'bg-red-600 hover:bg-red-500 text-white shadow-xs' : ''}`}
                title="Laser Pointer (L)"
              >
                <Flame className="w-3.5 h-3.5 mr-1" /> Laser
              </Button>
              <Button
                variant={activeTool === 'pen' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('pen')}
                className={`h-8 px-3 text-xs font-semibold ${activeTool === 'pen' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs' : ''}`}
                title="Digital Ink Pen (P)"
              >
                <PenTool className="w-3.5 h-3.5 mr-1" /> Pen
              </Button>
              <Button
                variant={activeTool === 'highlighter' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('highlighter')}
                className={`h-8 px-3 text-xs font-semibold ${activeTool === 'highlighter' ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold shadow-xs' : ''}`}
                title="Yellow Text Highlighter (H)"
              >
                <Highlighter className="w-3.5 h-3.5 mr-1" /> Highlight
              </Button>

              {activeTool === 'pen' && (
                <div className="flex items-center gap-1 px-1.5 border-l border-border/80">
                  {['#2563eb', '#dc2626', '#16a34a', '#000000'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setPenColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-4 h-4 rounded-full border border-white/50 transition-transform ${penColor === color ? 'scale-125 ring-2 ring-primary' : 'hover:scale-110'}`}
                      title={`Pen Color: ${color}`}
                    />
                  ))}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearCanvas}
                className="h-8 px-2.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Clear Current Slide Drawings"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={isFullscreen ? 'default' : 'outline'}
                size="sm"
                onClick={toggleFullscreen}
                className="h-8 px-3 text-xs font-semibold"
                title="Toggle Fullscreen (F)"
              >
                {isFullscreen ? (
                  <>
                    <Minimize className="w-3.5 h-3.5 mr-1" /> Exit
                  </>
                ) : (
                  <>
                    <Maximize className="w-3.5 h-3.5 mr-1" /> Fullscreen
                  </>
                )}
              </Button>
              {!isFullscreen && (
                <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="h-8 px-2.5 text-xs text-muted-foreground">
                  Change File
                </Button>
              )}
            </div>
          </div>

          {/* Presentation Slide Viewport with On-Slide Navigation */}
          <div className={`relative flex-1 flex items-center justify-center min-h-[420px] rounded-3xl overflow-hidden p-2 ${isFullscreen ? 'bg-slate-950 my-1' : 'bg-card border border-border shadow-2xl'}`}>
            <div className="relative inline-flex items-center justify-center max-w-full max-h-full">
              {/* PDF Background Canvas */}
              <canvas
                ref={pdfCanvasRef}
                className={`block max-w-full max-h-full h-auto w-auto rounded-xl shadow-2xl bg-white ${isFullscreen ? 'max-h-[calc(100vh-170px)]' : 'max-h-[680px]'}`}
              />

              {/* Persistent Drawing Canvas (Pen & Highlighter with multiply mix-blend for authentic highlighter text readability) */}
              <canvas
                ref={drawCanvasRef}
                className="absolute inset-0 w-full h-full rounded-xl pointer-events-none mix-blend-multiply z-10"
              />

              {/* Interactive Canvas (Captures pointer events & renders live laser pointer dot) */}
              <canvas
                ref={interactiveCanvasRef}
                onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
                onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerLeave}
                onTouchStart={(e) => {
                  if (e.touches[0]) {
                    handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                onTouchMove={(e) => {
                  if (e.touches[0]) {
                    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                onTouchEnd={handlePointerUp}
                className="absolute inset-0 w-full h-full rounded-xl z-20 cursor-crosshair touch-none"
              />

              {/* Floating Side Arrow: Previous Slide */}
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPage();
                  }}
                  title="Previous Slide (Left Arrow)"
                  aria-label="Previous Slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md shadow-2xl transition-all duration-200 opacity-70 hover:opacity-100 hover:scale-110 z-30 focus:outline-none ring-1 ring-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Floating Side Arrow: Next Slide */}
              {currentPage < pageCount && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPage();
                  }}
                  title="Next Slide (Right Arrow or Space)"
                  aria-label="Next Slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand/80 hover:bg-brand text-primary-foreground backdrop-blur-md shadow-2xl transition-all duration-200 opacity-85 hover:opacity-100 hover:scale-110 z-30 focus:outline-none ring-1 ring-brand/50"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* Slide Navigation Dock (Always visible & prominent in both windowed and fullscreen modes) */}
          <div className={`p-3 bg-card/95 backdrop-blur-md border border-border rounded-2xl flex flex-wrap justify-between items-center gap-3 z-30 shadow-lg mx-auto w-full max-w-2xl ${isFullscreen ? 'bg-slate-900/90 border-slate-800' : ''}`}>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={handlePrevPage}
              className="font-medium text-xs px-3 sm:px-4"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev Page
            </Button>

            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-foreground">
                Page <span className="text-brand">{currentPage}</span> of {pageCount}
              </span>
              <span className="hidden sm:inline-block text-[10px] text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded">
                [Space / →] Next
              </span>
            </div>

            <Button
              variant="default"
              size="sm"
              disabled={currentPage >= pageCount}
              onClick={handleNextPage}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs px-4 sm:px-5 shadow-xs"
              title="Next Slide (Right Arrow or Spacebar)"
            >
              Next Page <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
