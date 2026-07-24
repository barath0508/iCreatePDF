'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, Loader2, Download, FileCode, Check, Eye, 
  RefreshCw, Layers, Sliders, Type, ZoomIn, ZoomOut, FileCheck, 
  Sparkles, CheckCircle2, ShieldCheck, Settings2, FileOutput
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { parseDocxMetadata, parsePageRange, sanitizeTextForPdf, DocxMetadata } from '@/lib/pdf';

export function WordToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<DocxMetadata | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Advanced Options
  const [qualityPreset, setQualityPreset] = useState<'ultra' | 'high' | 'compact'>('high');
  const [enableTextLayer, setEnableTextLayer] = useState<boolean>(true);
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [pageRangeMode, setPageRangeMode] = useState<'all' | 'custom'>('all');
  const [customPageRange, setCustomPageRange] = useState<string>('');
  
  // Interactive Preview State
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewPagesCount, setPreviewPagesCount] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState<number>(100);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      handleFiles(getPreloadedFiles());
    }
  }, []);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'docx') {
      setError('Only Word (.docx) documents are supported.');
      return;
    }

    setFile(uploadedFile);

    // Extract document metadata (word count, chars, images)
    try {
      const buffer = await uploadedFile.arrayBuffer();
      const meta = await parseDocxMetadata(buffer);
      setMetadata(meta);
      renderPreview(uploadedFile, buffer);
    } catch (err) {
      console.error('Metadata parsing error:', err);
    }
  };

  const renderPreview = async (docFile: File, buffer: ArrayBuffer) => {
    setIsPreviewLoading(true);
    try {
      const docx = await import('docx-preview');
      if (previewContainerRef.current) {
        previewContainerRef.current.innerHTML = '';
        await docx.renderAsync(buffer, previewContainerRef.current, undefined, {
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          useBase64URL: true,
          experimental: true,
          debug: false
        });

        // Count sections/pages generated
        const sections = previewContainerRef.current.querySelectorAll('section.docx');
        const count = sections.length || 1;
        setPreviewPagesCount(count);
        if (metadata) {
          setMetadata({ ...metadata, pageCount: count });
        }
      }
    } catch (err) {
      console.error('Preview render error:', err);
    } finally {
      setIsPreviewLoading(false);
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

  const triggerWordToPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(5);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      setProgress(15);

      // 1. Render docx in a isolated hidden container to extract precise page sections
      const hiddenContainer = document.createElement('div');
      hiddenContainer.style.position = 'fixed';
      hiddenContainer.style.left = '-9999px';
      hiddenContainer.style.top = '-9999px';
      hiddenContainer.style.opacity = '0';
      hiddenContainer.style.pointerEvents = 'none';
      document.body.appendChild(hiddenContainer);

      const docx = await import('docx-preview');
      await docx.renderAsync(buffer, hiddenContainer, undefined, {
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,
        breakPages: true,
        useBase64URL: true,
        experimental: true,
        debug: false
      });

      setProgress(30);
      await new Promise(resolve => setTimeout(resolve, 600));

      // Find section pages
      let sections = Array.from(hiddenContainer.querySelectorAll('section.docx')) as HTMLElement[];
      if (sections.length === 0) {
        sections = Array.from(hiddenContainer.querySelectorAll('section')) as HTMLElement[];
      }
      if (sections.length === 0) {
        const wrapper = hiddenContainer.querySelector('.docx-wrapper') as HTMLElement || hiddenContainer;
        sections = [wrapper];
      }

      const totalPages = sections.length;
      const targetPages = parsePageRange(pageRangeMode === 'all' ? 'all' : customPageRange, totalPages);

      // 2. Create high-DPI PDF document using pdf-lib & html2canvas
      const pdfDoc = await PDFDocument.create();
      const font = enableTextLayer ? await pdfDoc.embedFont(StandardFonts.Helvetica) : null;

      const html2canvas = (await import('html2canvas')).default;
      const dpiScale = qualityPreset === 'ultra' ? 3.5 : qualityPreset === 'high' ? 2.5 : 1.5;

      let processedCount = 0;
      const selectedIndices = Array.from(targetPages).sort((a, b) => a - b);

      for (const pageNum of selectedIndices) {
        const section = sections[pageNum - 1];
        if (!section) continue;

        // Default A4 dimensions in PDF points (1mm = 2.83465 pt)
        let pdfW = 595.28; 
        let pdfH = 841.89;

        if (orientation === 'landscape') {
          pdfW = 841.89;
          pdfH = 595.28;
        } else if (orientation === 'portrait') {
          pdfW = 595.28;
          pdfH = 841.89;
        } else {
          // Auto orientation: calculate from aspect ratio of section
          const secW = section.offsetWidth || 794;
          const secH = section.offsetHeight || 1123;
          if (secW > secH) {
            pdfW = 841.89;
            pdfH = 595.28;
          }
        }

        // Render section at high resolution canvas
        const canvas = await html2canvas(section, {
          scale: dpiScale,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgDataUrl = canvas.toDataURL('image/jpeg', qualityPreset === 'ultra' ? 0.98 : 0.90);
        const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());
        const embeddedImg = await pdfDoc.embedJpg(imgBytes);

        const page = pdfDoc.addPage([pdfW, pdfH]);
        page.drawImage(embeddedImg, {
          x: 0,
          y: 0,
          width: pdfW,
          height: pdfH
        });

        // Overlay transparent text layer for text selection & searching
        if (enableTextLayer && font) {
          const sectionRect = section.getBoundingClientRect();
          const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT);
          let node: Node | null;

          while ((node = walker.nextNode())) {
            const rawText = node.textContent?.trim();
            if (!rawText) continue;
            const parent = node.parentElement;
            if (!parent) continue;
            const rect = parent.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            const text = sanitizeTextForPdf(rawText);
            if (!text) continue;

            const relX = rect.left - sectionRect.left;
            const relY = rect.top - sectionRect.top;

            const pdfX = Math.max(0, (relX / sectionRect.width) * pdfW);
            const pdfFontSize = Math.max(6, Math.min(24, (rect.height / sectionRect.height) * pdfH * 0.85));
            const pdfY = Math.max(0, pdfH - ((relY + rect.height * 0.8) / sectionRect.height) * pdfH);

            try {
              page.drawText(text, {
                x: pdfX,
                y: pdfY,
                size: pdfFontSize,
                font,
                opacity: 0
              });
            } catch (e) {
              // Ignore unsupported character encodings
            }
          }
        }

        processedCount++;
        const currentProgress = 30 + Math.round((processedCount / selectedIndices.length) * 65);
        setProgress(currentProgress);
      }

      document.body.removeChild(hiddenContainer);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setProgress(100);
    } catch (err) {
      console.error(err);
      setError((err as any)?.message || 'Failed to convert Word file. Make sure the file is valid and not password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${file?.name.replace('.docx', '')}_converted.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setFile(null);
    setMetadata(null);
    setDownloadUrl(null);
    setError(null);
    setProgress(0);
    if (previewContainerRef.current) {
      previewContainerRef.current.innerHTML = '';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload / Live Document Preview */}
        <div className="lg:col-span-8 space-y-6">
          {!file ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer border-2 border-dashed rounded-3xl p-12 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[320px] ${
                isDraggingOver
                  ? 'border-brand bg-brand/10 shadow-lg shadow-brand/10'
                  : 'border-foreground/15 bg-card/60 hover:border-foreground/30 hover:bg-card/80'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                accept=".docx"
                className="hidden"
              />
              <div className="p-5 rounded-2xl bg-brand/10 border border-brand/20 mb-5 text-brand shadow-inner">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                Drop your Word (.docx) document here
              </h3>
              <p className="text-sm text-foreground/60 max-w-md mb-4">
                High-precision conversion preserving fonts, margins, tables, and images. 100% private, processed inside your browser memory.
              </p>
              <Button variant="outline" className="rounded-xl border-foreground/20 hover:bg-foreground/5 text-sm font-medium">
                Browse Files
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Document Header Card */}
              <div className="p-6 bg-card border border-foreground/10 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-500">
                    <FileCode className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-semibold text-foreground leading-tight">{file.name}</h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/50 mt-1">
                      <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      <span>•</span>
                      <span>Word Document (.docx)</span>
                      {metadata && metadata.wordCount > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-brand font-medium">{metadata.wordCount} words</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-xs text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-lg"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    Change Document
                  </Button>
                </div>
              </div>

              {/* Document Statistics Badges */}
              {metadata && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-card/60 border border-foreground/10 rounded-xl flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Pages</p>
                      <p className="text-sm font-semibold text-foreground">{previewPagesCount || metadata.pageCount || 1}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-card/60 border border-foreground/10 rounded-xl flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                      <Type className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Words</p>
                      <p className="text-sm font-semibold text-foreground">{metadata.wordCount}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-card/60 border border-foreground/10 rounded-xl flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Characters</p>
                      <p className="text-sm font-semibold text-foreground">{metadata.charCount}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-card/60 border border-foreground/10 rounded-xl flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Images</p>
                      <p className="text-sm font-semibold text-foreground">{metadata.imageCount}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Live Document Preview Container */}
              <div className="bg-card border border-foreground/10 rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-foreground/10 bg-card/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-brand" />
                    <span className="text-xs font-mono font-medium uppercase tracking-wider text-foreground/70">Document Live Preview</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoomScale(prev => Math.max(50, prev - 15))}
                      className="h-7 w-7 text-foreground/60 hover:text-foreground"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </Button>
                    <span className="text-xs font-mono text-foreground/60 w-12 text-center">{zoomScale}%</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoomScale(prev => Math.min(150, prev + 15))}
                      className="h-7 w-7 text-foreground/60 hover:text-foreground"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-foreground/[0.02] overflow-x-auto min-h-[420px] max-h-[600px] flex justify-center items-start">
                  {isPreviewLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-foreground/50">
                      <Loader2 className="w-6 h-6 animate-spin text-brand" />
                      <p className="text-xs font-mono">Rendering document preview...</p>
                    </div>
                  ) : (
                    <div 
                      ref={previewContainerRef}
                      className="transition-transform duration-200 origin-top docx-preview-rendered-wrapper"
                      style={{ transform: `scale(${zoomScale / 100})` }}
                    />
                  )}
                </div>
              </div>

            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-start gap-3">
              <div className="p-1 rounded-md bg-red-500/20 text-red-400 mt-0.5">
                !
              </div>
              <div>{error}</div>
            </div>
          )}
        </div>

        {/* Right Column: Settings & Conversion Action Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border border-foreground/10 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-foreground/10 pb-4">
              <Settings2 className="w-4 h-4 text-brand" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">Conversion Settings</h3>
            </div>

            {/* Quality Preset Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/70 flex items-center justify-between">
                <span>Output Resolution</span>
                <span className="text-[10px] font-mono text-brand">High-DPI</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setQualityPreset('compact')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    qualityPreset === 'compact'
                      ? 'border-brand bg-brand/10 text-brand font-semibold'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  Compact
                </button>
                <button
                  type="button"
                  onClick={() => setQualityPreset('high')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    qualityPreset === 'high'
                      ? 'border-brand bg-brand/10 text-brand font-semibold'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  High (200DPI)
                </button>
                <button
                  type="button"
                  onClick={() => setQualityPreset('ultra')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    qualityPreset === 'ultra'
                      ? 'border-brand bg-brand/10 text-brand font-semibold'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  Ultra (300DPI)
                </button>
              </div>
            </div>

            {/* Selectable Text Layer Toggle */}
            <div className="space-y-2 pt-2 border-t border-foreground/5">
              <label className="text-xs font-medium text-foreground/70 flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-foreground/50" />
                  Searchable Text Layer
                </span>
                <input
                  type="checkbox"
                  checked={enableTextLayer}
                  onChange={(e) => setEnableTextLayer(e.target.checked)}
                  className="rounded border-foreground/20 text-brand focus:ring-brand accent-brand h-4 w-4 cursor-pointer"
                />
              </label>
              <p className="text-[11px] text-foreground/40 leading-normal">
                Embeds an invisible vector text overlay so text in the generated PDF can be highlighted, selected, and searched.
              </p>
            </div>

            {/* Page Orientation */}
            <div className="space-y-2 pt-2 border-t border-foreground/5">
              <label className="text-xs font-medium text-foreground/70">Page Orientation</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOrientation('auto')}
                  className={`py-2 px-2 rounded-xl border text-xs font-medium transition-all ${
                    orientation === 'auto'
                      ? 'border-brand bg-brand/10 text-brand font-semibold'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  Auto
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation('portrait')}
                  className={`py-2 px-2 rounded-xl border text-xs font-medium transition-all ${
                    orientation === 'portrait'
                      ? 'border-brand bg-brand/10 text-brand font-semibold'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  Portrait
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation('landscape')}
                  className={`py-2 px-2 rounded-xl border text-xs font-medium transition-all ${
                    orientation === 'landscape'
                      ? 'border-brand bg-brand/10 text-brand font-semibold'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  Landscape
                </button>
              </div>
            </div>

            {/* Page Range Selection */}
            <div className="space-y-2 pt-2 border-t border-foreground/5">
              <label className="text-xs font-medium text-foreground/70">Page Range</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPageRangeMode('all')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    pageRangeMode === 'all'
                      ? 'border-brand bg-brand/10 text-brand font-semibold'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  All Pages
                </button>
                <button
                  type="button"
                  onClick={() => setPageRangeMode('custom')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    pageRangeMode === 'custom'
                      ? 'border-brand bg-brand/10 text-brand font-semibold'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  Custom Range
                </button>
              </div>

              {pageRangeMode === 'custom' && (
                <input
                  type="text"
                  placeholder="e.g. 1-3, 5"
                  value={customPageRange}
                  onChange={(e) => setCustomPageRange(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-foreground/15 bg-background text-foreground focus:outline-none focus:border-brand"
                />
              )}
            </div>

            {/* Primary Action Button */}
            <div className="pt-4 border-t border-foreground/10">
              {isProcessing ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-foreground/70">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-brand animate-spin" />
                      Rendering high-DPI PDF pages...
                    </span>
                    <span className="font-semibold text-brand">{progress}%</span>
                  </div>
                  <div className="w-full bg-foreground/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-brand h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              ) : downloadUrl ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    PDF created successfully!
                  </div>

                  <Button
                    onClick={handleDownload}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF Document
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleReset}
                    className="w-full text-foreground/50 hover:text-foreground text-xs h-9"
                  >
                    Convert Another Document
                  </Button>
                </div>
              ) : (
                <Button
                  disabled={!file}
                  onClick={triggerWordToPdf}
                  className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 shadow-md ${
                    file 
                      ? 'bg-brand hover:bg-brand/90 text-white shadow-brand/20' 
                      : 'bg-foreground/10 text-muted-foreground/60 cursor-not-allowed'
                  }`}
                >
                  <FileOutput className="w-5 h-5" />
                  Convert Word to High-Quality PDF
                </Button>
              )}
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="p-4 rounded-2xl bg-card/40 border border-foreground/10 text-xs text-foreground/50 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Your document data stays 100% inside your browser memory. No text or images are uploaded to external servers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
