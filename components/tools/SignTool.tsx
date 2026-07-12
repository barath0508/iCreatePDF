'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, PenTool, Type, Loader2, Download, Check, FileSignature } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function SignTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      const files = getPreloadedFiles();
      if (files.length > 0) {
        setFile(files[0]);
      }
    }
  }, []);
  const [pagesCount, setPagesCount] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Signature creation states
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState('');
  const [sigPngDataUrl, setSigPngDataUrl] = useState<string | null>(null);
  
  // Placement states
  const [sigPosition, setSigPosition] = useState({ x: 50, y: 50 }); // percentage based
  const [sigSize, setSigSize] = useState(150); // width in pixels
  const [isDraggingSig, setIsDraggingSig] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  // Load PDF Page rendering
  useEffect(() => {
    if (!file) return;

    let isMounted = true;
    const loadPreview = async () => {
      setIsPreviewLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;
        setPagesCount(pdf.numPages);

        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1.2 });

        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: context, viewport, canvas }).promise;
          }
        }
      } catch (err) {
        console.error('Error loading PDF preview:', err);
      } finally {
        if (isMounted) setIsPreviewLoading(false);
      }
    };

    loadPreview();
    return () => {
      isMounted = false;
    };
  }, [file, currentPage]);

  // Drawing Pad Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = padCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#7e5de0';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = padCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearDrawing = () => {
    const canvas = padCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = padCanvasRef.current;
    if (!canvas) return;

    if (signatureType === 'draw') {
      // Check if signature is empty
      const buffer = new Uint32Array(canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height).data.buffer || []);
      const hasContent = buffer.some(color => color !== 0);
      if (!hasContent) {
        setError('Please draw your signature first.');
        return;
      }
      setSigPngDataUrl(canvas.toDataURL('image/png'));
    } else {
      if (!typedName) {
        setError('Please type your name first.');
        return;
      }
      // Render typed text on canvas
      const textCanvas = document.createElement('canvas');
      textCanvas.width = 400;
      textCanvas.height = 150;
      const ctx = textCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, 400, 150);
        ctx.fillStyle = '#7e5de0';
        ctx.font = 'italic 48px Georgia';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(typedName, 200, 75);
        setSigPngDataUrl(textCanvas.toDataURL('image/png'));
      }
    }
    setError(null);
  };

  // Drag handlers for overlay signature (mouse + touch)
  const getPoint = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      const touch = e.touches[0] ?? (e as TouchEvent).changedTouches?.[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
  };

  const onSignatureDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDraggingSig(true);
    const { x, y } = getPoint(e);
    dragStart.current = {
      x: x - sigPosition.x,
      y: y - sigPosition.y
    };
  };

  const onSignatureDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDraggingSig || !containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const { x: clientX, y: clientY } = getPoint(e);

    let x = clientX - dragStart.current.x;
    let y = clientY - dragStart.current.y;

    // Constrain inside container bounds
    x = Math.max(0, Math.min(x, rect.width - sigSize));
    y = Math.max(0, Math.min(y, rect.height - (sigSize * 0.375))); // aspect ratio

    setSigPosition({ x, y });
  };

  const onSignatureDragEnd = () => {
    setIsDraggingSig(false);
  };

  useEffect(() => {
    if (isDraggingSig) {
      window.addEventListener('mousemove', onSignatureDragMove);
      window.addEventListener('mouseup', onSignatureDragEnd);
      window.addEventListener('touchmove', onSignatureDragMove, { passive: false });
      window.addEventListener('touchend', onSignatureDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onSignatureDragMove);
      window.removeEventListener('mouseup', onSignatureDragEnd);
      window.removeEventListener('touchmove', onSignatureDragMove);
      window.removeEventListener('touchend', onSignatureDragEnd);
    };
  }, [isDraggingSig]);

  const triggerSign = async () => {
    if (!file || !sigPngDataUrl || !canvasRef.current) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      
      const sigResponse = await fetch(sigPngDataUrl);
      const sigBytes = await sigResponse.arrayBuffer();
      const sigImage = await pdfDoc.embedPng(sigBytes);

      const page = pdfDoc.getPage(currentPage - 1);
      const { width: pageWidth, height: pageHeight } = page.getSize();

      // Render coordinates conversion
      const canvas = canvasRef.current;
      const scaleX = pageWidth / canvas.clientWidth;
      const scaleY = pageHeight / canvas.clientHeight;

      const renderedWidth = sigSize * scaleX;
      const renderedHeight = (sigSize * 0.375) * scaleY; // Preserve aspect ratio

      const targetX = sigPosition.x * scaleX;
      // pdf-lib uses bottom-left origin (y = 0 is bottom)
      const targetY = pageHeight - (sigPosition.y * scaleY) - renderedHeight;

      page.drawImage(sigImage, {
        x: targetX,
        y: targetY,
        width: renderedWidth,
        height: renderedHeight,
      });

      const signedBytes = await pdfDoc.save();
      const blob = new Blob([signedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to apply signature to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `signed-${file?.name || 'document.pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && setFile(e.dataTransfer.files[0]); }}
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[220px] border-foreground/10 bg-card/40 hover:border-foreground/20"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                accept=".pdf"
                className="hidden"
              />
              <Upload className="w-6 h-6 text-brand mb-4" />
              <h3 className="text-xl font-display text-foreground mb-2">Select a PDF file to sign</h3>
              <p className="text-xs text-foreground/40">Processed locally inside browser memory.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* PDF Preview Container with Interactive Signature Overlay */}
              <div 
                ref={containerRef}
                className="relative bg-card border border-foreground/10 rounded-2xl p-4 flex justify-center items-center select-none overflow-hidden"
              >
                {isPreviewLoading && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-20 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-brand" />
                  </div>
                )}

                <div className="relative w-fit h-fit mx-auto shadow-2xl rounded">
                  <canvas ref={canvasRef} className="rounded max-w-full max-h-[500px]" />

                  {sigPngDataUrl && !downloadUrl && (
                    <div
                      onMouseDown={onSignatureDragStart}
                      onTouchStart={onSignatureDragStart}
                      className="absolute cursor-move touch-none border border-dashed border-brand bg-brand/10 active:border-purple-400"
                      style={{
                        left: `${sigPosition.x}px`,
                        top: `${sigPosition.y}px`,
                        width: `${sigSize}px`,
                        height: `${sigSize * 0.375}px`,
                      }}
                    >
                      <img 
                        src={sigPngDataUrl} 
                        alt="Signature overlay" 
                        className="w-full h-full object-contain pointer-events-none" 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              {pagesCount > 1 && (
                <div className="flex justify-between items-center bg-card/60 p-3 rounded-xl border border-foreground/5">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Prev
                  </Button>
                  <span className="text-xs text-foreground/60">
                    Page {currentPage} of {pagesCount}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentPage >= pagesCount}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </Button>
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

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <FileSignature className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Sign PDF</h3>
          </div>

          {file && !sigPngDataUrl && (
            <div className="space-y-4">
              <div className="flex bg-background border border-foreground/10 rounded-xl p-1">
                <Button
                  onClick={() => setSignatureType('draw')}
                  className={`flex-1 rounded-lg text-xs py-2 h-auto ${signatureType === 'draw' ? 'bg-brand text-foreground' : 'bg-transparent text-foreground/60'}`}
                >
                  <PenTool className="w-3.5 h-3.5 mr-1" />
                  Draw
                </Button>
                <Button
                  onClick={() => setSignatureType('type')}
                  className={`flex-1 rounded-lg text-xs py-2 h-auto ${signatureType === 'type' ? 'bg-brand text-foreground' : 'bg-transparent text-foreground/60'}`}
                >
                  <Type className="w-3.5 h-3.5 mr-1" />
                  Type
                </Button>
              </div>

              {signatureType === 'draw' ? (
                <div className="space-y-2">
                  <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
                    <canvas
                      ref={padCanvasRef}
                      width={400}
                      height={150}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-[150px] cursor-crosshair bg-card"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button onClick={clearDrawing} className="text-xs text-foreground/40 hover:text-foreground">Clear Pad</button>
                    <Button size="sm" onClick={saveSignature} className="bg-brand hover:bg-brand/90 text-foreground">
                      Create
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="Type your signature name"
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-brand"
                  />
                  <Button onClick={saveSignature} className="w-full bg-brand hover:bg-brand/90 text-foreground py-3">
                    Generate
                  </Button>
                </div>
              )}
            </div>
          )}

          {file && sigPngDataUrl && !downloadUrl && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-foreground/60 bg-foreground/5 border border-foreground/10 rounded-xl p-3">
                <span>Signature Loaded</span>
                <button onClick={() => setSigPngDataUrl(null)} className="text-brand hover:underline">Change</button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-foreground/60 flex justify-between">
                  <span>Signature Width</span>
                  <span>{sigSize}px</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="350"
                  value={sigSize}
                  onChange={(e) => setSigSize(Number(e.target.value))}
                  className="w-full accent-brand"
                />
              </div>

              <p className="text-xs text-foreground/40 italic">
                Drag the signature block on the PDF preview to position it exactly where you need it.
              </p>

              <Button
                disabled={isProcessing}
                onClick={triggerSign}
                className="w-full bg-brand hover:bg-brand/90 text-foreground py-6 rounded-xl flex items-center justify-center gap-2"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Sign &amp; Save PDF
              </Button>
            </div>
          )}

          {downloadUrl && (
            <div className="space-y-2">
              <Button
                onClick={handleDownload}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Signed PDF
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                  setSigPngDataUrl(null);
                  setTypedName('');
                  setSigPosition({ x: 50, y: 50 });
                }}
                className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
              >
                Sign another document
              </Button>
            </div>
          )}

          {!file && (
            <p className="text-xs text-foreground/50 leading-relaxed">
              Legally sign and stamp PDF files locally in seconds. Draw or type a cursive visual representation of your signature and drag it onto any page.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
