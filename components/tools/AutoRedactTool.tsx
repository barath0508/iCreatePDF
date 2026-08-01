'use client';

import React, { useState, useRef } from 'react';
import { Upload, ShieldAlert, Download, FileText, CheckCircle2, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PiiMatch {
  id: string;
  pageIndex: number;
  type: 'Email' | 'Phone' | 'SSN/ID' | 'Credit Card' | 'IP Address' | 'Custom';
  text: string;
  bbox: { x: number; y: number; width: number; height: number; pageHeight: number };
  selected: boolean;
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const SSN_REGEX = /\b\d{3}-\d{2}-\d{4}\b|\b\d{9}\b/g;
const CREDIT_CARD_REGEX = /\b(?:\d[ -]*?){13,16}\b/g;
const IP_REGEX = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g;

export function AutoRedactTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matches, setMatches] = useState<PiiMatch[]>([]);
  const [customTerm, setCustomTerm] = useState('');
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [scanned, setScanned] = useState(false);
  const [redactedPdfUrl, setRedactedPdfUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMatches([]);
      setScanned(false);
      setRedactedPdfUrl(null);
    }
  };

  const scanDocument = async () => {
    if (!file) return;
    setIsScanning(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      setPdfPageCount(pdf.numPages);

      const foundMatches: PiiMatch[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1.0 });

        textContent.items.forEach((item: any) => {
          const str = item.str;
          if (!str || !str.trim()) return;

          const patterns: { type: PiiMatch['type']; regex: RegExp }[] = [
            { type: 'Email', regex: EMAIL_REGEX },
            { type: 'Phone', regex: PHONE_REGEX },
            { type: 'SSN/ID', regex: SSN_REGEX },
            { type: 'Credit Card', regex: CREDIT_CARD_REGEX },
            { type: 'IP Address', regex: IP_REGEX },
          ];

          if (customTerm.trim()) {
            const escaped = customTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            patterns.push({ type: 'Custom', regex: new RegExp(escaped, 'gi') });
          }

          patterns.forEach(({ type, regex }) => {
            let match;
            regex.lastIndex = 0;
            while ((match = regex.exec(str)) !== null) {
              const matchedText = match[0];
              const transform = item.transform; // [scaleX, skewY, skewX, scaleY, translateX, translateY]
              const x = transform[4];
              const y = transform[5];
              const width = item.width || matchedText.length * 7;
              const height = item.height || Math.abs(transform[3]) || 10;

              foundMatches.push({
                id: `${i}-${x}-${y}-${matchedText}-${foundMatches.length}`,
                pageIndex: i - 1,
                type,
                text: matchedText,
                bbox: { x, y, width, height, pageHeight: viewport.height },
                selected: true,
              });
            }
          });
        });
      }

      setMatches(foundMatches);
      setScanned(true);
    } catch (error) {
      console.error('Scanning failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const toggleMatch = (id: string) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m))
    );
  };

  const toggleSelectAll = (select: boolean) => {
    setMatches((prev) => prev.map((m) => ({ ...m, selected: select })));
  };

  const applyRedaction = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const { PDFDocument, rgb } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const selectedMatches = matches.filter((m) => m.selected);

      selectedMatches.forEach((match) => {
        const page = pdfDoc.getPage(match.pageIndex);
        const { x, y, width, height } = match.bbox;

        // Draw solid opaque black box over target
        page.drawRectangle({
          x: Math.max(0, x - 2),
          y: Math.max(0, y - 2),
          width: width + 4,
          height: height + 4,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setRedactedPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Redaction failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Upload Zone */}
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
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-display">Select PDF to Auto-Redact</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-1">
            Automatically detect and sanitize Emails, SSNs, Phone Numbers, Credit Cards, and Custom Terms locally.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Document Summary Bar */}
          <div className="p-4 bg-card border border-border rounded-2xl flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-brand" />
              <div>
                <h4 className="text-sm font-semibold text-foreground truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB {pdfPageCount > 0 && `• ${pdfPageCount} pages`}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setFile(null); setMatches([]); setScanned(false); setRedactedPdfUrl(null); }}
              >
                Change File
              </Button>
            </div>
          </div>

          {/* Configuration & Scan Bar */}
          {!scanned && (
            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-foreground font-display">Scan Preferences</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Add custom phrase or regex (e.g. CONFIDENTIAL)"
                    value={customTerm}
                    onChange={(e) => setCustomTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-brand"
                  />
                </div>
                <Button
                  onClick={scanDocument}
                  disabled={isScanning}
                  className="bg-brand hover:bg-brand/90 text-foreground font-medium px-6 py-2.5 rounded-xl"
                >
                  {isScanning ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <ShieldAlert className="w-4 h-4 mr-2" />}
                  {isScanning ? 'Scanning Text Stream...' : 'Scan PDF for Sensitive Data'}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Emails', 'Phone Numbers', 'SSNs / IDs', 'Credit Cards', 'IP Addresses'].map((label) => (
                  <span key={label} className="text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-full font-medium">
                    ✓ Auto-detect {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Scan Results & Selection */}
          {scanned && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-border">
                <div>
                  <h4 className="text-base font-bold text-foreground font-display">
                    {matches.length} Sensitive Match{matches.length !== 1 ? 'es' : ''} Found
                  </h4>
                  <p className="text-xs text-muted-foreground">Select matches to redact before exporting.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleSelectAll(true)}>Select All</Button>
                  <Button variant="outline" size="sm" onClick={() => toggleSelectAll(false)}>Deselect All</Button>
                </div>
              </div>

              {matches.length > 0 ? (
                <div className="max-h-80 overflow-y-auto border border-border rounded-2xl bg-card divide-y divide-border p-2">
                  {matches.map((m) => (
                    <div key={m.id} className="p-3 flex items-center justify-between hover:bg-background/50 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={m.selected}
                          onChange={() => toggleMatch(m.id)}
                          className="w-4 h-4 rounded border-border text-brand focus:ring-brand"
                        />
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand/10 text-brand">
                          {m.type}
                        </span>
                        <span className="text-xs font-mono text-foreground font-bold">{m.text}</span>
                        <span className="text-xs text-muted-foreground">Page {m.pageIndex + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-card border border-border rounded-2xl text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground">No sensitive patterns found!</p>
                  <p className="text-xs text-muted-foreground mt-1">Try adding a custom keyword search above if you are looking for specific terms.</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  onClick={applyRedaction}
                  disabled={isProcessing || matches.filter((m) => m.selected).length === 0}
                  className="bg-brand hover:bg-brand/90 text-foreground font-medium px-8 py-3 rounded-xl"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <ShieldAlert className="w-4 h-4 mr-2" />}
                  {isProcessing ? 'Applying Redactions...' : `Redact ${matches.filter((m) => m.selected).length} Target(s)`}
                </Button>
              </div>
            </div>
          )}

          {/* Download Output Bar */}
          {redactedPdfUrl && (
            <div className="p-6 bg-card border border-emerald-500/30 rounded-2xl flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-bold text-foreground font-display">PDF Redacted Successfully!</h4>
                  <p className="text-xs text-muted-foreground">All selected sensitive items burned into solid black boxes.</p>
                </div>
              </div>
              <a href={redactedPdfUrl} download={`redacted_${file.name}`}>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-semibold">
                  <Download className="w-4 h-4 mr-2" /> Download Redacted PDF
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
