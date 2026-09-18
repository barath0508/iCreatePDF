'use client';

import React, { useState, useRef, useId } from 'react';
import { 
  Upload, 
  Layers, 
  Loader2, 
  Download, 
  FileText, 
  Plus, 
  Trash2, 
  Minus, 
  AlertCircle, 
  Archive, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { splitPdf, SplitRange } from '@/lib/pdf';
import { Button } from '@/components/ui/button';

interface SplitRangeItem {
  id: string;
  start: string | number;
  end: string | number;
}

type SplitMode = 'custom' | 'all' | 'fixed' | 'text';

export function SplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [splitMode, setSplitMode] = useState<SplitMode>('custom');
  
  // Custom range items with individual editable values
  const [ranges, setRanges] = useState<SplitRangeItem[]>([
    { id: '1', start: 1, end: 1 }
  ]);
  
  // Fixed interval setting (split every N pages)
  const [fixedInterval, setFixedInterval] = useState<number | string>(1);

  // Quick text range input (e.g. "1-3, 4-6, 7-10")
  const [textRangeInput, setTextRangeInput] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadParts, setDownloadParts] = useState<{ url: string; name: string; range: SplitRange }[]>([]);
  const [splitPartBytes, setSplitPartBytes] = useState<{ bytes: Uint8Array; name: string; range: SplitRange }[]>([]);
  const [isZipping, setIsZipping] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    try {
      const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
      if (hasPreloadedFiles()) {
        handleFiles(getPreloadedFiles());
      }
    } catch {
      // ignore if preloader module is missing in some environments
    }
  }, []);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadParts([]);
    setSplitPartBytes([]);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      
      setFile(uploadedFile);
      setPagesCount(count);
      setRanges([{ id: 'range-' + Date.now(), start: 1, end: count }]);
      setTextRangeInput(`1-${count}`);
    } catch (err) {
      console.error(err);
      setError(`Failed to read PDF file: ${uploadedFile.name}`);
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

  // --- Range manipulation functions ---
  const addRange = () => {
    // Pick sensible default for next range
    const lastRange = ranges[ranges.length - 1];
    let nextStart = 1;
    if (lastRange) {
      const lastEnd = parseInt(String(lastRange.end), 10) || 1;
      nextStart = Math.min(pagesCount, lastEnd + 1 <= pagesCount ? lastEnd + 1 : pagesCount);
    }
    const nextEnd = Math.max(nextStart, pagesCount);
    
    setRanges((prev) => [
      ...prev, 
      { id: 'range-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6), start: nextStart, end: nextEnd }
    ]);
  };

  const removeRange = (id: string) => {
    setRanges((prev) => prev.filter((r) => r.id !== id));
  };

  // Handles smooth typing: allows empty string so users can backspace/delete freely!
  const handleRangeInputChange = (id: string, key: 'start' | 'end', rawValue: string) => {
    // Only accept numeric characters or empty string
    const digitsOnly = rawValue.replace(/[^\d]/g, '');
    setRanges((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: digitsOnly } : r))
    );
  };

  // On blur: sanitizes empty or out-of-bounds inputs to valid bounds
  const handleRangeInputBlur = (id: string, key: 'start' | 'end') => {
    setRanges((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const valStr = String(r[key]).trim();
        let num = parseInt(valStr, 10);
        
        if (isNaN(num) || num < 1) {
          num = key === 'start' ? 1 : Math.max(1, parseInt(String(r.start), 10) || 1);
        } else if (num > pagesCount) {
          num = pagesCount;
        }

        return { ...r, [key]: num };
      })
    );
  };

  // Stepper increment / decrement
  const stepRange = (id: string, key: 'start' | 'end', delta: number) => {
    setRanges((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const current = parseInt(String(r[key]), 10) || (key === 'start' ? 1 : pagesCount);
        const nextVal = Math.max(1, Math.min(pagesCount, current + delta));
        return { ...r, [key]: nextVal };
      })
    );
  };

  // Swap From and To if user inverted them
  const swapRange = (id: string) => {
    setRanges((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        return { ...r, start: r.end, end: r.start };
      })
    );
  };

  // Parse comma-separated ranges e.g. "1-3, 4-6, 8, 9-10"
  const parseTextRanges = (input: string, max: number): SplitRange[] => {
    if (!input.trim()) return [];
    const segments = input.split(',');
    const parsed: SplitRange[] = [];

    for (const segment of segments) {
      const s = segment.trim();
      if (!s) continue;
      if (s.includes('-')) {
        const [startStr, endStr] = s.split('-');
        const p1 = parseInt(startStr?.trim() || '', 10);
        const p2 = parseInt(endStr?.trim() || '', 10);
        if (!isNaN(p1) && !isNaN(p2)) {
          const start = Math.max(1, Math.min(max, Math.min(p1, p2)));
          const end = Math.max(1, Math.min(max, Math.max(p1, p2)));
          parsed.push({ start, end });
        }
      } else {
        const p = parseInt(s, 10);
        if (!isNaN(p) && p >= 1 && p <= max) {
          parsed.push({ start: p, end: p });
        }
      }
    }
    return parsed;
  };

  // Compute active ranges to execute based on current mode
  const getComputedRanges = (): { ranges: SplitRange[]; error?: string } => {
    if (pagesCount <= 0) return { ranges: [] };

    if (splitMode === 'all') {
      const allPages: SplitRange[] = [];
      for (let i = 1; i <= pagesCount; i++) {
        allPages.push({ start: i, end: i });
      }
      return { ranges: allPages };
    }

    if (splitMode === 'fixed') {
      const interval = parseInt(String(fixedInterval), 10) || 1;
      const validInterval = Math.max(1, Math.min(pagesCount, interval));
      const intervalRanges: SplitRange[] = [];
      for (let start = 1; start <= pagesCount; start += validInterval) {
        const end = Math.min(pagesCount, start + validInterval - 1);
        intervalRanges.push({ start, end });
      }
      return { ranges: intervalRanges };
    }

    if (splitMode === 'text') {
      const parsed = parseTextRanges(textRangeInput, pagesCount);
      if (parsed.length === 0) {
        return { ranges: [], error: 'Please enter at least one valid range (e.g. 1-3, 5-8)' };
      }
      return { ranges: parsed };
    }

    // Custom mode
    const computed: SplitRange[] = [];
    for (let i = 0; i < ranges.length; i++) {
      const r = ranges[i];
      const startNum = parseInt(String(r.start), 10);
      const endNum = parseInt(String(r.end), 10);

      if (isNaN(startNum) || isNaN(endNum)) {
        return { ranges: [], error: `Range ${i + 1} has an empty page number. Please enter a valid number.` };
      }

      const start = Math.max(1, Math.min(pagesCount, startNum));
      const end = Math.max(1, Math.min(pagesCount, endNum));
      computed.push({ start, end });
    }

    return { ranges: computed };
  };

  const { ranges: computedRanges, error: validationError } = getComputedRanges();

  const triggerSplit = async () => {
    if (!file) return;
    if (validationError) {
      setError(validationError);
      return;
    }
    if (computedRanges.length === 0) {
      setError('Please specify at least one page range to split.');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const splitDocsBytes = await splitPdf(buffer, computedRanges, (p) => setProgress(Math.round(p)));
      
      const parts: { url: string; name: string; range: SplitRange }[] = [];
      const partsBytes: { bytes: Uint8Array; name: string; range: SplitRange }[] = [];
      const baseFileName = file.name.replace(/\.[^/.]+$/, '');

      splitDocsBytes.forEach((bytes, idx) => {
        const r = computedRanges[idx];
        const rangeStr = r.start === r.end ? `page-${r.start}` : `pages-${r.start}-to-${r.end}`;
        const name = `${baseFileName}-part-${idx + 1}-${rangeStr}.pdf`;
        const blob = new Blob([bytes as any], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        parts.push({ url, name, range: r });
        partsBytes.push({ bytes, name, range: r });
      });
      
      setDownloadParts(parts);
      setSplitPartBytes(partsBytes);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to split PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPart = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllZip = async () => {
    if (splitPartBytes.length === 0 || !file) return;
    setIsZipping(true);
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      splitPartBytes.forEach((part) => {
        zip.file(part.name, part.bytes);
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.[^/.]+$/, '')}-split-all.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err: any) {
      console.error('Failed to create ZIP:', err);
      setError('Failed to create ZIP package. You can download individual parts above.');
    } finally {
      setIsZipping(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPagesCount(0);
    setDownloadParts([]);
    setSplitPartBytes([]);
    setError(null);
    setRanges([{ id: '1', start: 1, end: 1 }]);
    setTextRangeInput('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Workspace area */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer touch-manipulation border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[260px] ${
                isDraggingOver
                  ? 'border-brand bg-brand/5'
                  : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                accept="application/pdf,.pdf"
                onClick={(e) => {
                  e.stopPropagation();
                  (e.target as HTMLInputElement).value = '';
                }}
                className="hidden"
              />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Upload className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                Select or drag a PDF file
              </h3>
              <p className="text-xs text-foreground/40 max-w-md mx-auto">
                Split PDF by custom ranges, single pages, or page counts. All operations are processed 100% locally and privately in your browser.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand/10 text-brand font-medium">
                      {pagesCount} {pagesCount === 1 ? 'page' : 'pages'} total
                    </span>
                    <span className="text-xs text-foreground/40 font-mono">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetAll}
                  className="text-xs text-foreground/40 hover:text-foreground"
                >
                  Change File
                </Button>
              </div>

              {/* Mode Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-foreground/50 uppercase tracking-wider block">
                  Split Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSplitMode('custom')}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all text-center flex flex-col items-center gap-1 ${
                      splitMode === 'custom'
                        ? 'bg-brand/10 border-brand/40 text-brand shadow-sm'
                        : 'bg-background/40 border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-background/60'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Custom Ranges</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSplitMode('all')}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all text-center flex flex-col items-center gap-1 ${
                      splitMode === 'all'
                        ? 'bg-brand/10 border-brand/40 text-brand shadow-sm'
                        : 'bg-background/40 border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-background/60'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Single Pages</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSplitMode('fixed')}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all text-center flex flex-col items-center gap-1 ${
                      splitMode === 'fixed'
                        ? 'bg-brand/10 border-brand/40 text-brand shadow-sm'
                        : 'bg-background/40 border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-background/60'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Every N Pages</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSplitMode('text')}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all text-center flex flex-col items-center gap-1 ${
                      splitMode === 'text'
                        ? 'bg-brand/10 border-brand/40 text-brand shadow-sm'
                        : 'bg-background/40 border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-background/60'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Text Syntax</span>
                  </button>
                </div>
              </div>

              {/* Mode 1: Custom Ranges */}
              {splitMode === 'custom' && (
                <div className="space-y-4 pt-2 border-t border-foreground/5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest">
                      Custom Page Ranges
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addRange}
                      className="h-8 text-xs border-foreground/10 hover:bg-foreground/5"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1 text-brand" />
                      Add Range
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {ranges.map((range, idx) => {
                      const startNum = parseInt(String(range.start), 10);
                      const endNum = parseInt(String(range.end), 10);
                      const isInverted = !isNaN(startNum) && !isNaN(endNum) && startNum > endNum;
                      const validCount = !isNaN(startNum) && !isNaN(endNum)
                        ? Math.max(1, Math.abs(endNum - startNum) + 1)
                        : null;

                      return (
                        <div
                          key={range.id}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isInverted
                              ? 'bg-amber-500/5 border-amber-500/30'
                              : 'bg-background/40 border-foreground/5'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-foreground/60 font-semibold w-16">
                                Range {idx + 1}
                              </span>
                              {validCount !== null && (
                                <span className="text-[11px] px-2 py-0.5 rounded-md bg-foreground/5 font-mono text-foreground/50">
                                  {validCount} {validCount === 1 ? 'page' : 'pages'}
                                </span>
                              )}
                            </div>

                            {/* Stepper Inputs for From and To */}
                            <div className="flex items-center gap-3 flex-wrap">
                              {/* From Input */}
                              <div className="flex items-center gap-1.5 bg-card/80 border border-foreground/10 rounded-lg p-1">
                                <span className="text-xs text-foreground/50 font-mono px-1">From:</span>
                                <button
                                  type="button"
                                  onClick={() => stepRange(range.id, 'start', -1)}
                                  disabled={parseInt(String(range.start), 10) <= 1}
                                  className="w-6 h-6 flex items-center justify-center rounded text-foreground/60 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed"
                                  title="Decrease page"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={range.start}
                                  placeholder="1"
                                  onChange={(e) => handleRangeInputChange(range.id, 'start', e.target.value)}
                                  onBlur={() => handleRangeInputBlur(range.id, 'start')}
                                  className="w-12 h-6 text-center bg-transparent text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => stepRange(range.id, 'start', 1)}
                                  disabled={parseInt(String(range.start), 10) >= pagesCount}
                                  className="w-6 h-6 flex items-center justify-center rounded text-foreground/60 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed"
                                  title="Increase page"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <ArrowRight className="w-3.5 h-3.5 text-foreground/20 hidden sm:block" />

                              {/* To Input */}
                              <div className="flex items-center gap-1.5 bg-card/80 border border-foreground/10 rounded-lg p-1">
                                <span className="text-xs text-foreground/50 font-mono px-1">To:</span>
                                <button
                                  type="button"
                                  onClick={() => stepRange(range.id, 'end', -1)}
                                  disabled={parseInt(String(range.end), 10) <= 1}
                                  className="w-6 h-6 flex items-center justify-center rounded text-foreground/60 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed"
                                  title="Decrease page"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={range.end}
                                  placeholder={String(pagesCount)}
                                  onChange={(e) => handleRangeInputChange(range.id, 'end', e.target.value)}
                                  onBlur={() => handleRangeInputBlur(range.id, 'end')}
                                  className="w-12 h-6 text-center bg-transparent text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => stepRange(range.id, 'end', 1)}
                                  disabled={parseInt(String(range.end), 10) >= pagesCount}
                                  className="w-6 h-6 flex items-center justify-center rounded text-foreground/60 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed"
                                  title="Increase page"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Remove Range Button */}
                              {ranges.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeRange(range.id)}
                                  className="p-1.5 text-foreground/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-auto sm:ml-0"
                                  title="Remove Range"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Inverted range alert */}
                          {isInverted && (
                            <div className="mt-2 pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-400">
                              <span className="flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                Start page ({startNum}) is greater than End page ({endNum}).
                              </span>
                              <button
                                type="button"
                                onClick={() => swapRange(range.id)}
                                className="underline hover:text-amber-300 ml-2 font-mono text-[11px]"
                              >
                                Swap (From {endNum} to {startNum})
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-foreground/40">
                    Tip: You can freely type, backspace, or click the <span className="font-mono text-foreground/60">+</span> and <span className="font-mono text-foreground/60">-</span> buttons to set page numbers.
                  </p>
                </div>
              )}

              {/* Mode 2: Single Pages */}
              {splitMode === 'all' && (
                <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 space-y-2">
                  <div className="flex items-center gap-2 text-brand font-medium text-sm">
                    <Layers className="w-4 h-4" />
                    Extract All Pages Individually
                  </div>
                  <p className="text-xs text-foreground/60">
                    Each page will be saved as its own 1-page PDF document. Splitting will generate <strong>{pagesCount}</strong> separate PDF files.
                  </p>
                </div>
              )}

              {/* Mode 3: Every N Pages */}
              {splitMode === 'fixed' && (
                <div className="p-4 rounded-xl bg-background/40 border border-foreground/10 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h5 className="text-xs font-mono uppercase text-foreground/60 tracking-wider">
                        Fixed Interval
                      </h5>
                      <p className="text-xs text-foreground/40 mt-0.5">
                        Split the document every N pages into equal parts.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-foreground/50">Every:</span>
                      <input
                        type="number"
                        min="1"
                        max={pagesCount}
                        value={fixedInterval}
                        onChange={(e) => setFixedInterval(Math.max(1, Math.min(pagesCount, parseInt(e.target.value) || 1)))}
                        className="w-16 h-8 text-center bg-card border border-foreground/10 rounded-lg text-foreground text-sm font-mono focus:outline-none focus:border-brand"
                      />
                      <span className="text-xs text-foreground/50">pages</span>
                    </div>
                  </div>

                  {pagesCount > 0 && (
                    <div className="p-2.5 rounded-lg bg-foreground/5 text-xs text-foreground/60 font-mono">
                      Will create approximately {Math.ceil(pagesCount / (parseInt(String(fixedInterval), 10) || 1))} documents.
                    </div>
                  )}
                </div>
              )}

              {/* Mode 4: Text Range Syntax */}
              {splitMode === 'text' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-mono text-foreground/50 uppercase tracking-wider block mb-1.5">
                      Enter Page Ranges
                    </label>
                    <input
                      type="text"
                      value={textRangeInput}
                      onChange={(e) => setTextRangeInput(e.target.value)}
                      placeholder={`e.g. 1-3, 4-6, 8, 9-${pagesCount}`}
                      className="w-full bg-background/40 border border-foreground/10 rounded-xl px-4 py-2.5 text-sm text-foreground font-mono placeholder:text-foreground/20 focus:outline-none focus:border-brand"
                    />
                    <p className="text-[11px] text-foreground/40 mt-1.5">
                      Separate ranges with commas. Example: <span className="font-mono text-foreground/60">1-5, 6-10, 12</span> (Document has {pagesCount} pages)
                    </p>
                  </div>

                  {computedRanges.length > 0 && (
                    <div className="p-3 bg-brand/5 border border-brand/10 rounded-xl space-y-1.5">
                      <span className="text-[11px] font-mono text-brand uppercase tracking-wider">
                        Detected {computedRanges.length} part{computedRanges.length > 1 ? 's' : ''}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {computedRanges.map((r, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-card border border-foreground/10 text-[11px] font-mono text-foreground/80"
                          >
                            Part {i + 1}: {r.start === r.end ? `Page ${r.start}` : `Pages ${r.start}–${r.end}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
              <Layers className="w-4 h-4 text-brand" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Split Summary</h3>
            </div>

            {file ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-background/40 border border-foreground/5 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Total Source Pages:</span>
                    <span className="font-mono font-medium text-foreground">{pagesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Split Mode:</span>
                    <span className="font-medium text-brand capitalize">{splitMode}</span>
                  </div>
                  <div className="flex justify-between border-t border-foreground/5 pt-2">
                    <span className="text-foreground/50">Resulting Files:</span>
                    <span className="font-mono font-bold text-foreground">
                      {computedRanges.length} {computedRanges.length === 1 ? 'part' : 'parts'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-foreground/40 leading-relaxed">
                  Extracted PDF parts are processed locally in WebAssembly memory with zero server uploads for complete confidentiality.
                </p>
              </div>
            ) : (
              <p className="text-xs text-foreground/50 leading-relaxed">
                Upload a document to extract page ranges or split into individual single-page files.
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-foreground/5 space-y-3">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Splitting PDF...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadParts.length > 0 ? (
              <div className="space-y-3">
                {/* Download All as ZIP */}
                {downloadParts.length > 1 && (
                  <Button
                    onClick={handleDownloadAllZip}
                    disabled={isZipping}
                    className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm"
                  >
                    {isZipping ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Archive className="w-4 h-4" />
                    )}
                    Download All as ZIP ({downloadParts.length} files)
                  </Button>
                )}

                {/* Individual Part Downloads */}
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {downloadParts.map((part, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      onClick={() => handleDownloadPart(part.url, part.name)}
                      className="w-full bg-background/40 hover:bg-emerald-600 hover:text-white border-foreground/10 text-foreground font-medium py-2.5 rounded-lg flex items-center justify-between gap-2 text-xs transition-colors"
                    >
                      <span className="truncate flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 flex-shrink-0" />
                        Part {idx + 1} ({part.range.start === part.range.end ? `p.${part.range.start}` : `p.${part.range.start}–${part.range.end}`})
                      </span>
                      <span className="text-[10px] opacity-60 font-mono">PDF</span>
                    </Button>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  onClick={resetAll}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  <RotateCcw className="w-3 h-3 mr-1.5" />
                  Split another file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file || computedRanges.length === 0 || !!validationError}
                onClick={triggerSplit}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file && computedRanges.length > 0 && !validationError
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-md'
                    : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Split PDF ({computedRanges.length} {computedRanges.length === 1 ? 'part' : 'parts'})
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
