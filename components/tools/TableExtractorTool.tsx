'use client';

import React, { useState, useRef, useCallback } from 'react';
import { FileSpreadsheet, Loader2, Download, Copy, Check, Table as TableIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Word { text: string; x: number; y: number; width: number; }

function csvEscape(cell: string): string {
  if (/[",\n]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
  return cell;
}

function rowsToCsv(rows: string[][]): string {
  return rows.map(row => row.map(csvEscape).join(',')).join('\n');
}

function groupIntoRows(words: Word[], gapThreshold: number): string[][] {
  const yTol = 3;
  const lines: { y: number; words: Word[] }[] = [];
  words.forEach(w => {
    const line = lines.find(l => Math.abs(l.y - w.y) <= yTol);
    if (line) line.words.push(w);
    else lines.push({ y: w.y, words: [w] });
  });
  lines.sort((a, b) => b.y - a.y);
  lines.forEach(l => l.words.sort((a, b) => a.x - b.x));

  return lines.map(line => {
    const cells: string[] = [];
    let current = '';
    let prevEnd: number | null = null;
    line.words.forEach(w => {
      const gap = prevEnd !== null ? w.x - prevEnd : 0;
      if (prevEnd !== null && gap > gapThreshold) {
        cells.push(current.trim());
        current = w.text;
      } else {
        current = current ? `${current} ${w.text}` : w.text;
      }
      prevEnd = w.x + w.width;
    });
    if (current) cells.push(current.trim());
    return cells.filter(c => c.length > 0);
  }).filter(row => row.length > 0);
}

export function TableExtractorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [pageWords, setPageWords] = useState<Word[][]>([]);
  const [pageRows, setPageRows] = useState<string[][][]>([]);
  const [activePage, setActivePage] = useState(0);
  const [gapThreshold, setGapThreshold] = useState(10);
  const [isCopied, setIsCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setPageWords([]); setPageRows([]);
    const f = uploadedFiles[0];
    if (!f) return;
    if (f.type !== 'application/pdf') { setError('Only PDF documents are supported.'); return; }
    setFile(f);
  };

  const extract = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

      const allWords: Word[][] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const words: Word[] = (textContent.items as any[])
          .filter(it => it.str && it.str.trim().length > 0)
          .map(it => ({ text: it.str, x: it.transform[4], y: it.transform[5], width: it.width || 0 }));
        allWords.push(words);
      }
      setPageWords(allWords);
      setPageRows(allWords.map(words => groupIntoRows(words, gapThreshold)));
      setActivePage(0);
    } catch (err: any) {
      setError(err?.message || 'Failed to extract tables from PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const recompute = useCallback((threshold: number) => {
    setGapThreshold(threshold);
    if (pageWords.length) setPageRows(pageWords.map(words => groupIntoRows(words, threshold)));
  }, [pageWords]);

  const combinedCsv = pageRows.map((rows, i) => `Page ${i + 1}\n${rowsToCsv(rows)}`).join('\n\n');

  const handleDownload = () => {
    const blob = new Blob([combinedCsv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace(/\.pdf$/i, '')}-tables.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(combinedCsv);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const activeRows = pageRows[activePage] || [];
  const maxCols = activeRows.reduce((m, r) => Math.max(m, r.length), 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all text-center flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><FileSpreadsheet className="w-6 h-6 text-brand" /></div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag a PDF file</h3>
              <p className="text-xs text-foreground/40">Detects tabular layouts by text position and exports Excel-ready CSV — all locally in your browser.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-foreground/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl text-brand"><FileSpreadsheet className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                    <p className="text-xs text-foreground/40">PDF Document &middot; {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setPageWords([]); setPageRows([]); }} className="text-xs text-foreground/40 hover:text-foreground">Change File</Button>
              </div>

              {pageRows.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex gap-1.5 flex-wrap">
                      {pageRows.map((_, i) => (
                        <button key={i} onClick={() => setActivePage(i)} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${activePage === i ? 'bg-brand text-foreground' : 'bg-foreground/5 text-foreground/50 hover:bg-foreground/10'}`}>
                          Page {i + 1}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-mono text-foreground/40 uppercase whitespace-nowrap">Column Sensitivity</label>
                      <input type="range" min={4} max={30} step={1} value={gapThreshold} onChange={(e) => recompute(parseInt(e.target.value))} className="w-24 accent-brand" />
                    </div>
                  </div>

                  <div className="overflow-auto max-h-96 border border-foreground/10 rounded-xl">
                    <table className="w-full text-xs">
                      <tbody>
                        {activeRows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? 'bg-background/30' : ''}>
                            {Array.from({ length: maxCols }).map((_, ci) => (
                              <td key={ci} className="border border-foreground/5 px-3 py-2 text-foreground/80 whitespace-nowrap">{row[ci] ?? ''}</td>
                            ))}
                          </tr>
                        ))}
                        {activeRows.length === 0 && (
                          <tr><td className="px-3 py-6 text-center text-foreground/30">No table-like rows detected on this page.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <TableIcon className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Table Extractor</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">Reconstructs rows and columns from a PDF's text layout using position heuristics, then exports Excel-compatible CSV. Works best on clean, well-aligned tables — adjust column sensitivity if columns merge or split incorrectly.</p>
          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Detecting tables...</Button>
            ) : pageRows.length > 0 ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"><Download className="w-5 h-5" />Download CSV (all pages)</Button>
                <Button variant="ghost" onClick={handleCopy} className="w-full text-foreground/60 hover:text-foreground text-xs h-9 flex items-center justify-center gap-1.5">
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}{isCopied ? 'Copied' : 'Copy as CSV'}
                </Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={extract} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'}`}><FileSpreadsheet className="w-4 h-4" />Extract Tables</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
