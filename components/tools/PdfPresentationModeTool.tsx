'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Monitor, Play, ChevronLeft, ChevronRight, PenTool, Flame, Highlighter, Trash2, Maximize, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PdfPresentationModeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTool, setActiveTool] = useState<'laser' | 'pen' | 'highlighter' | 'none'>('laser');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDrawing = useRef(false);

  // Timer counter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (file) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [file]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCurrentPage(1);
      setSeconds(0);
    }
  };

  useEffect(() => {
    if (!file) return;

    let isMounted = true;
    const renderSlide = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

        if (!isMounted) return;
        setPageCount(pdf.numPages);

        if (currentPage <= pdf.numPages && pdfCanvasRef.current) {
          const page = await pdf.getPage(currentPage);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = pdfCanvasRef.current;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          if (ctx) await page.render({ canvasContext: ctx, viewport, canvas }).promise;

          if (drawCanvasRef.current) {
            drawCanvasRef.current.width = viewport.width;
            drawCanvasRef.current.height = viewport.height;
          }
        }
      } catch (err) {
        console.error('Slide render error:', err);
      }
    };

    renderSlide();
    return () => { isMounted = false; };
  }, [file, currentPage]);

  const clearCanvas = () => {
    if (drawCanvasRef.current) {
      const ctx = drawCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, drawCanvasRef.current.width, drawCanvasRef.current.height);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const drawCanvas = drawCanvasRef.current;
    if (!drawCanvas) return;
    const ctx = drawCanvas.getContext('2d');
    if (!ctx) return;

    const rect = drawCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'laser') {
      clearCanvas();
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#f87171';
      ctx.shadowBlur = 15;
      ctx.fill();
    } else if (isDrawing.current) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'laser') return;
    isDrawing.current = true;

    const drawCanvas = drawCanvasRef.current;
    if (!drawCanvas) return;
    const ctx = drawCanvas.getContext('2d');
    if (!ctx) return;

    const rect = drawCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (activeTool === 'pen') {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1.0;
    } else if (activeTool === 'highlighter') {
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 18;
      ctx.globalAlpha = 0.4;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

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
            <Monitor className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-display">PDF Presentation & Laser Pointer Mode</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-1">
            Present PDF slide decks with real-time digital laser pointer, ink pen, yellow highlighter, slide timer, and fullscreen mode.
          </p>
        </div>
      ) : (
        <div ref={containerRef} className="space-y-6 bg-background p-4 rounded-3xl">
          {/* Header Controls */}
          <div className="p-4 bg-card border border-border rounded-2xl flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-brand" />
              <span className="text-xs font-semibold text-foreground truncate max-w-xs">{file.name}</span>
              <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> {formatTime(seconds)}
              </span>
            </div>

            {/* Interactive Drawing Tools */}
            <div className="flex gap-2 bg-background p-1 rounded-xl border border-border">
              <Button
                variant={activeTool === 'laser' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('laser')}
                className={activeTool === 'laser' ? 'bg-red-600 hover:bg-red-500 text-white' : ''}
              >
                <Flame className="w-3.5 h-3.5 mr-1" /> Laser Pointer
              </Button>
              <Button
                variant={activeTool === 'pen' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('pen')}
                className={activeTool === 'pen' ? 'bg-blue-600 hover:bg-blue-500 text-white' : ''}
              >
                <PenTool className="w-3.5 h-3.5 mr-1" /> Digital Pen
              </Button>
              <Button
                variant={activeTool === 'highlighter' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('highlighter')}
                className={activeTool === 'highlighter' ? 'bg-yellow-500 hover:bg-yellow-400 text-black' : ''}
              >
                <Highlighter className="w-3.5 h-3.5 mr-1" /> Highlighter
              </Button>
              <Button variant="ghost" size="sm" onClick={clearCanvas} className="text-xs text-muted-foreground">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                <Maximize className="w-3.5 h-3.5 mr-1" /> {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFile(null)}>Change PDF</Button>
            </div>
          </div>

          {/* Presentation Slide Viewport */}
          <div className="p-4 bg-card border border-border rounded-3xl relative flex items-center justify-center min-h-[500px] overflow-hidden shadow-2xl">
            <div className="relative max-w-full">
              <canvas ref={pdfCanvasRef} className="block max-w-full h-auto rounded-xl shadow-lg" />
              <canvas
                ref={drawCanvasRef}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="absolute inset-0 cursor-crosshair max-w-full h-auto rounded-xl z-10"
              />
            </div>
          </div>

          {/* Slide Navigation Bar */}
          <div className="p-4 bg-card border border-border rounded-2xl flex justify-between items-center max-w-md mx-auto">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => { clearCanvas(); setCurrentPage((p) => Math.max(1, p - 1)); }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous Slide
            </Button>
            <span className="text-xs font-mono font-bold text-foreground">
              Slide {currentPage} of {pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= pageCount}
              onClick={() => { clearCanvas(); setCurrentPage((p) => Math.min(pageCount, p + 1)); }}
            >
              Next Slide <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
