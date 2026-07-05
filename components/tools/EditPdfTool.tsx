'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Type, Loader2, Download, Plus, Trash2, Edit } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';

interface Annotation {
  id: string;
  text: string;
  x: number; // percentage based
  y: number; // percentage based
  color: string;
  fontSize: number;
}

export function EditPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Edit / Annotation states
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#ffffff');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PDF preview
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

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    setAnnotations([]);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
  };

  const addTextAnnotation = () => {
    if (!inputText.trim()) return;
    const newAnn: Annotation = {
      id: Math.random().toString(36).substring(7),
      text: inputText,
      x: 100, // starting position px
      y: 100,
      color: textColor,
      fontSize: fontSize,
    };
    setAnnotations([...annotations, newAnn]);
    setActiveAnnotationId(newAnn.id);
    setInputText('');
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
    if (activeAnnotationId === id) setActiveAnnotationId(null);
  };

  // Drag logic for annotations
  const handleDragStart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveAnnotationId(id);
    const ann = annotations.find(a => a.id === id);
    if (!ann) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initialAnnX = ann.x;
    const initialAnnY = ann.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      setAnnotations(prev => prev.map(a => {
        if (a.id === id) {
          return {
            ...a,
            x: Math.max(0, initialAnnX + dx),
            y: Math.max(0, initialAnnY + dy)
          };
        }
        return a;
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Hex to RGB parser for pdf-lib
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    return rgb(r, g, b);
  };

  const triggerSave = async () => {
    if (!file || !canvasRef.current) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const page = pdfDoc.getPage(currentPage - 1);
      const { width: pageWidth, height: pageHeight } = page.getSize();

      const canvas = canvasRef.current;
      const scaleX = pageWidth / canvas.clientWidth;
      const scaleY = pageHeight / canvas.clientHeight;

      // Burn annotations onto PDF
      for (const ann of annotations) {
        const targetX = ann.x * scaleX;
        // pdf-lib's y-coordinate starts from bottom, adjust for canvas coordinates
        const targetY = pageHeight - (ann.y * scaleY) - (ann.fontSize * scaleY);

        page.drawText(ann.text, {
          x: targetX,
          y: targetY,
          size: ann.fontSize * scaleX,
          color: hexToRgb(ann.color),
        });
      }

      const editedBytes = await pdfDoc.save();
      const blob = new Blob([editedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to edit PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `edited-${file?.name || 'document.pdf'}`;
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
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[220px] border-foreground/10 bg-card/40 hover:border-foreground/20"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                accept=".pdf"
                className="hidden"
              />
              <Plus className="w-6 h-6 text-brand mb-4" />
              <h3 className="text-xl font-display text-foreground mb-2">Select a PDF file to edit</h3>
              <p className="text-xs text-foreground/40">Open locally in browser sandbox.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* PDF Preview Container with annotations */}
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

                  {/* Annotation items */}
                  {annotations.map((ann) => (
                    <div
                      key={ann.id}
                      onMouseDown={(e) => handleDragStart(e, ann.id)}
                      className={`absolute cursor-move border px-2 py-1 rounded select-none ${
                        activeAnnotationId === ann.id ? 'border-brand bg-brand/10' : 'border-transparent bg-background/40'
                      }`}
                      style={{
                        left: `${ann.x}px`,
                        top: `${ann.y}px`,
                        color: ann.color,
                        fontSize: `${ann.fontSize}px`,
                        fontFamily: 'sans-serif',
                      }}
                    >
                      {ann.text}
                    </div>
                  ))}
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
            <Edit className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Edit PDF</h3>
          </div>

          {file && !downloadUrl && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-foreground/60">Add Text Annotation</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text overlay..."
                    className="flex-1 bg-background border border-foreground/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand"
                  />
                  <Button onClick={addTextAnnotation} className="bg-brand hover:bg-brand/90 text-foreground px-3">
                    Add
                  </Button>
                </div>
              </div>

              {/* Annotation Customizers */}
              {activeAnnotationId && (
                <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-foreground/5">
                    <span className="text-xs font-mono text-brand">Customizer</span>
                    <button onClick={() => deleteAnnotation(activeAnnotationId)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-foreground/40">Font Size ({fontSize}px)</label>
                    <input
                      type="range"
                      min="10"
                      max="48"
                      value={fontSize}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFontSize(val);
                        setAnnotations(annotations.map(a => a.id === activeAnnotationId ? { ...a, fontSize: val } : a));
                      }}
                      className="w-full accent-brand"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-foreground/40">Text Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTextColor(val);
                        setAnnotations(annotations.map(a => a.id === activeAnnotationId ? { ...a, color: val } : a));
                      }}
                      className="w-full h-8 border border-foreground/10 rounded bg-transparent cursor-pointer"
                    />
                  </div>
                </div>
              )}

              <Button
                disabled={isProcessing || annotations.length === 0}
                onClick={triggerSave}
                className="w-full bg-brand hover:bg-brand/90 text-foreground py-6 rounded-xl flex items-center justify-center gap-2"
              >
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                Burn &amp; Export PDF
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
                Download Edited PDF
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                  setAnnotations([]);
                }}
                className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
              >
                Edit another file
              </Button>
            </div>
          )}

          {!file && (
            <p className="text-xs text-foreground/50 leading-relaxed">
              Add structural text overlays on top of PDF documents completely inside browser memory. Move, scale, and customize colors, then burn them directly to document layers.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
