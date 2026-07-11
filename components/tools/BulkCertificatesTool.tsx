'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Loader2, Download, Table, Plus, Settings, Trash2, ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StandardFonts, rgb } from 'pdf-lib';

interface Placeholder {
  id: string; // Column header name
  x: number; // Percent from left (0 - 100)
  y: number; // Percent from top (0 - 100)
  fontSize: number;
  fontFamily: 'Helvetica' | 'TimesRoman' | 'Courier';
  isBold: boolean;
  color: string; // Hex color string
  alignment: 'left' | 'center' | 'right';
}

export function BulkCertificatesTool() {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [placeholders, setPlaceholders] = useState<Placeholder[]>([]);
  const [activePlaceholderId, setActivePlaceholderId] = useState<string | null>(null);
  const [nameColumn, setNameColumn] = useState<string>('');
  const [pdfSize, setPdfSize] = useState<{ width: number; height: number } | null>(null);
  const [displayWidth, setDisplayWidth] = useState(600);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadZipUrl, setDownloadZipUrl] = useState<string | null>(null);
  const [isDraggingOverTemplate, setIsDraggingOverTemplate] = useState(false);
  const [isDraggingOverData, setIsDraggingOverData] = useState(false);

  const templateInputRef = useRef<HTMLInputElement>(null);
  const dataInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeDragRef = useRef<{ id: string; startX: number; startY: number; startLeft: number; startTop: number } | null>(null);

  // Resize listener to keep display width synchronized
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setDisplayWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [templateFile, dataFile]);

  // Render PDF template page 1 on canvas
  useEffect(() => {
    if (!templateFile) return;

    const renderTemplate = async () => {
      try {
        setError(null);
        const buffer = await templateFile.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const nativeWidth = unscaledViewport.width;
        const nativeHeight = unscaledViewport.height;
        setPdfSize({ width: nativeWidth, height: nativeHeight });

        // Render at high DPI (2.0x scale) for crisp preview
        const vp = page.getViewport({ scale: 2.0 });
        
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext('2d')!;
          await page.render({ canvasContext: ctx, viewport: vp, canvas: canvas as any }).promise;
          
          if (containerRef.current) {
            setDisplayWidth(containerRef.current.clientWidth);
          }
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to render PDF template preview.');
      }
    };

    renderTemplate();
  }, [templateFile, dataFile]);

  // Handle template file upload
  const handleTemplateFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    setDownloadZipUrl(null);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') {
      setError('Only PDF templates are supported.');
      return;
    }
    setTemplateFile(f);
  };

  // Handle spreadsheet file upload
  const handleDataFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    setDownloadZipUrl(null);
    const f = uploadedFiles[0];
    if (!f) return;

    const ext = f.name.split('.').pop()?.toLowerCase();
    if (ext !== 'xlsx' && ext !== 'xls' && ext !== 'csv') {
      setError('Supported spreadsheets: .xlsx, .xls, .csv');
      return;
    }

    try {
      const buffer = await f.arrayBuffer();
      const XLSX = await import('xlsx');
      const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      if (jsonData.length < 2) {
        setError('Spreadsheet must contain at least a header row and one data row.');
        return;
      }

      const rawHeaders = jsonData[0].map(h => String(h || '').trim());
      const parsedHeaders = rawHeaders.filter(h => h !== '');

      const parsedRows = jsonData.slice(1).map(row => {
        const rowObj: Record<string, string> = {};
        rawHeaders.forEach((header, idx) => {
          if (header) {
            rowObj[header] = row[idx] !== undefined ? String(row[idx]).trim() : '';
          }
        });
        return rowObj;
      }).filter(rowObj => Object.values(rowObj).some(val => val !== ''));

      if (parsedRows.length === 0) {
        setError('No valid data rows found in the spreadsheet.');
        return;
      }

      setHeaders(parsedHeaders);
      setRows(parsedRows);
      setNameColumn(parsedHeaders[0]);
      setDataFile(f);
    } catch (err: any) {
      console.error(err);
      setError('Failed to parse spreadsheet file.');
    }
  };

  // Add a placeholder to mapping workspace
  const addPlaceholder = (header: string) => {
    if (placeholders.some(p => p.id === header)) return;

    const newPlaceholder: Placeholder = {
      id: header,
      x: 50, // default center
      y: 40,
      fontSize: 24,
      fontFamily: 'Helvetica',
      isBold: true,
      color: '#000000',
      alignment: 'center',
    };

    setPlaceholders([...placeholders, newPlaceholder]);
    setActivePlaceholderId(header);
  };

  // Drag placeholder handlers
  const handleDragStart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const placeholder = placeholders.find(p => p.id === id);
    if (!placeholder || !containerRef.current) return;

    setActivePlaceholderId(id);
    activeDragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: placeholder.x,
      startTop: placeholder.y,
    };
  };

  // Global mousemove and mouseup listeners for drag and drop to avoid stale closures
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const dragInfo = activeDragRef.current;
      const container = containerRef.current;
      if (!dragInfo || !container) return;

      const deltaX = e.clientX - dragInfo.startX;
      const deltaY = e.clientY - dragInfo.startY;

      const containerRect = container.getBoundingClientRect();
      const deltaPercentX = (deltaX / containerRect.width) * 100;
      const deltaPercentY = (deltaY / containerRect.height) * 100;

      const newX = Math.max(0, Math.min(100, dragInfo.startLeft + deltaPercentX));
      const newY = Math.max(0, Math.min(100, dragInfo.startTop + deltaPercentY));

      setPlaceholders(prev =>
        prev.map(p => (p.id === dragInfo.id ? { ...p, x: parseFloat(newX.toFixed(2)), y: parseFloat(newY.toFixed(2)) } : p))
      );
    };

    const handleGlobalMouseUp = () => {
      if (activeDragRef.current) {
        activeDragRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  // Update style values for active placeholder
  const updatePlaceholderStyle = (key: keyof Placeholder, value: any) => {
    setPlaceholders(prev =>
      prev.map(p => (p.id === activePlaceholderId ? { ...p, [key]: value } : p))
    );
  };

  // Helper: Hex string to PDF-lib color rgb values
  const hexToRgbColor = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return rgb(r / 255, g / 255, b / 255);
  };

  // Run certificate generation
  const handleGenerate = async (mode: 'zip' | 'pdf') => {
    if (!templateFile || rows.length === 0 || placeholders.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setDownloadUrl(null);
    setDownloadZipUrl(null);
    setStatusMessage('Loading PDF template...');

    try {
      const templateBuffer = await templateFile.arrayBuffer();
      const { PDFDocument, StandardFonts } = await import('pdf-lib');
      
      let outDoc = mode === 'pdf' ? await PDFDocument.create() : null;
      let zip: any = null;
      
      if (mode === 'zip') {
        setStatusMessage('Initializing ZIP library...');
        const JSZip = (await import('jszip')).default;
        zip = new JSZip();
      }

      const totalRows = rows.length;

      for (let idx = 0; idx < totalRows; idx++) {
        const row = rows[idx];
        setStatusMessage(`Processing row ${idx + 1} of ${totalRows}: ${row[nameColumn] || 'Row'}`);
        setProgress(Math.round((idx / totalRows) * 50)); // First 50% for rendering

        // Load fresh document for modifications
        const doc = await PDFDocument.load(templateBuffer);
        const pages = doc.getPages();
        const page = pages[0];
        const { width, height } = page.getSize();

        // Stamping placeholders
        for (const ph of placeholders) {
          const textVal = row[ph.id] || '';
          if (!textVal) continue;

          // Resolve Font
          let selectedFont;
          if (ph.fontFamily === 'TimesRoman') {
            selectedFont = ph.isBold ? StandardFonts.TimesRomanBold : StandardFonts.TimesRoman;
          } else if (ph.fontFamily === 'Courier') {
            selectedFont = ph.isBold ? StandardFonts.CourierBold : StandardFonts.Courier;
          } else {
            selectedFont = ph.isBold ? StandardFonts.HelveticaBold : StandardFonts.Helvetica;
          }

          const font = await doc.embedFont(selectedFont);
          const color = hexToRgbColor(ph.color);
          const textWidth = font.widthOfTextAtSize(textVal, ph.fontSize);

          // Compute X base on alignment
          let xPdf = (ph.x / 100) * width;
          if (ph.alignment === 'center') {
            xPdf = xPdf - textWidth / 2;
          } else if (ph.alignment === 'right') {
            xPdf = xPdf - textWidth;
          }

          // Compute Y (HTML Top-to-Bottom, PDF Bottom-to-Top)
          // Adjust y baseline using font-size offsets (size/3 makes text match drag box baseline visual center)
          const yPdf = height - (ph.y / 100) * height - ph.fontSize / 3;

          page.drawText(textVal, {
            x: xPdf,
            y: yPdf,
            size: ph.fontSize,
            font,
            color,
          });
        }

        const generatedBytes = await doc.save();

        if (mode === 'pdf' && outDoc) {
          // Copy page into combined PDF
          const tempDoc = await PDFDocument.load(generatedBytes);
          const [copiedPage] = await outDoc.copyPages(tempDoc, [0]);
          outDoc.addPage(copiedPage);
        } else if (mode === 'zip' && zip) {
          // Add file to ZIP archive
          const fileNameRaw = row[nameColumn] ? row[nameColumn].replace(/[^a-zA-Z0-9_\-]/g, '_') : `row_${idx + 1}`;
          zip.file(`Certificate - ${fileNameRaw}.pdf`, generatedBytes);
        }
      }

      // Generate downloadable bundle
      if (mode === 'pdf' && outDoc) {
        setStatusMessage('Assembling combined PDF document...');
        const combinedBytes = await outDoc.save();
        const blob = new Blob([combinedBytes as any], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
      } else if (mode === 'zip' && zip) {
        setStatusMessage('Compressing certificates into ZIP folder...');
        const zipBlob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
          setProgress(50 + Math.round(metadata.percent / 2)); // Final 50% for compressing
        });
        setDownloadZipUrl(URL.createObjectURL(zipBlob));
      }

      setStatusMessage('Certificates generated successfully.');
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Bulk generation failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const activePlaceholder = placeholders.find(p => p.id === activePlaceholderId);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Upload / Workspace Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Uploader Panel */}
          {(!templateFile || !dataFile) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Template Uploader */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOverTemplate(true); }}
                onDragLeave={() => setIsDraggingOverTemplate(false)}
                onDrop={(e) => { e.preventDefault(); setIsDraggingOverTemplate(false); e.dataTransfer.files && handleTemplateFiles(e.dataTransfer.files); }}
                onClick={() => templateInputRef.current?.click()}
                className={`cursor-pointer border border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] transition-all duration-300 ${
                  isDraggingOverTemplate ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
                }`}
              >
                <input type="file" ref={templateInputRef} onChange={(e) => e.target.files && handleTemplateFiles(e.target.files)} accept=".pdf" className="hidden" />
                <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                  <FileText className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {templateFile ? templateFile.name : 'Upload PDF Template'}
                </h3>
                <p className="text-xs text-foreground/40 max-w-[200px] mx-auto">
                  Drag in your single-page certificate or letter PDF layout.
                </p>
              </div>

              {/* Data List Uploader */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOverData(true); }}
                onDragLeave={() => setIsDraggingOverData(false)}
                onDrop={(e) => { e.preventDefault(); setIsDraggingOverData(false); e.dataTransfer.files && handleDataFiles(e.dataTransfer.files); }}
                onClick={() => dataInputRef.current?.click()}
                className={`cursor-pointer border border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] transition-all duration-300 ${
                  isDraggingOverData ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
                }`}
              >
                <input type="file" ref={dataInputRef} onChange={(e) => e.target.files && handleDataFiles(e.target.files)} accept=".xlsx,.xls,.csv" className="hidden" />
                <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                  <Table className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {dataFile ? dataFile.name : 'Upload Spreadsheet List'}
                </h3>
                <p className="text-xs text-foreground/40 max-w-[200px] mx-auto">
                  Drag in your Excel (.xlsx, .xls) or CSV table containing row details.
                </p>
              </div>

            </div>
          )}

          {/* Draggable Certificate Workspace */}
          {templateFile && dataFile && (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-6">
              
              {/* File Info Header */}
              <div className="flex justify-between items-center border-b border-foreground/5 pb-4">
                <div className="flex gap-6 text-xs text-foreground/50">
                  <div>
                    <span className="font-mono">Template:</span> <span className="text-foreground font-medium">{templateFile.name}</span>
                  </div>
                  <div>
                    <span className="font-mono">Spreadsheet:</span> <span className="text-foreground font-medium">{dataFile.name} ({rows.length} rows)</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTemplateFile(null);
                    setDataFile(null);
                    setHeaders([]);
                    setRows([]);
                    setPlaceholders([]);
                    setActivePlaceholderId(null);
                    setDownloadUrl(null);
                    setDownloadZipUrl(null);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground h-8"
                >
                  Reset Workspace
                </Button>
              </div>

              {/* Mapper Work Area */}
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Column Headers Picker */}
                <div className="w-full md:w-48 shrink-0 space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/60 block">Available Columns</label>
                  <p className="text-[11px] text-foreground/40 leading-relaxed">Click a column label to add it as a placeholder on the canvas template.</p>
                  <div className="flex flex-row md:flex-col flex-wrap gap-2 pt-2">
                    {headers.map(header => {
                      const isAdded = placeholders.some(p => p.id === header);
                      return (
                        <button
                          key={header}
                          onClick={() => !isAdded && addPlaceholder(header)}
                          disabled={isAdded}
                          className={`px-3 py-2 rounded-xl text-xs font-medium text-left border flex items-center justify-between w-full transition-all ${
                            isAdded
                              ? 'bg-foreground/5 border-foreground/5 text-foreground/30 cursor-not-allowed'
                              : 'bg-background hover:bg-foreground/[0.02] border-foreground/10 hover:border-foreground/20 text-foreground'
                          }`}
                        >
                          <span className="truncate">{header}</span>
                          {!isAdded && <Plus className="w-3.5 h-3.5 text-brand shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PDF Canvas Preview & Overlay Wrapper */}
                <div className="flex-1 bg-background/50 border border-foreground/5 rounded-xl p-4 flex justify-center items-center overflow-hidden">
                  <div
                    ref={containerRef}
                    className="relative select-none shadow-lg rounded-lg border border-foreground/10 overflow-hidden bg-white"
                    style={{
                      margin: '0 auto',
                      width: '100%',
                      maxWidth: pdfSize ? `${pdfSize.width}px` : 'none',
                      aspectRatio: pdfSize ? `${pdfSize.width} / ${pdfSize.height}` : 'auto',
                    }}
                  >
                    <canvas ref={canvasRef} className="max-w-full block" style={{ width: '100%', height: 'auto' }} />
                    
                    {/* Render visual absolute placeholders */}
                    {placeholders.map(ph => {
                      const isActive = ph.id === activePlaceholderId;
                      const ratio = pdfSize ? displayWidth / pdfSize.width : 1;
                      return (
                        <div
                          key={ph.id}
                          onMouseDown={(e) => handleDragStart(e, ph.id)}
                          className={`absolute cursor-move select-none px-3 py-1.5 rounded-lg border shadow-sm transition-shadow group flex items-center gap-1.5 ${
                            isActive
                              ? 'border-brand bg-brand/10 ring-2 ring-brand/20 shadow-brand/10'
                              : 'border-foreground/20 bg-background/90 hover:border-foreground/40 hover:bg-background'
                          }`}
                          style={{
                            left: `${ph.x}%`,
                            top: `${ph.y}%`,
                            transform: ph.alignment === 'center'
                              ? 'translate(-50%, -50%)'
                              : ph.alignment === 'right'
                              ? 'translate(-100%, -50%)'
                              : 'translate(0%, -50%)',
                            color: ph.color,
                            fontSize: `${Math.max(6, ph.fontSize * ratio)}px`, // scaled for visual canvas display
                            fontFamily: ph.fontFamily === 'Courier' ? 'Courier New, monospace' : ph.fontFamily === 'TimesRoman' ? 'Georgia, serif' : 'system-ui, sans-serif',
                            fontWeight: ph.isBold ? 'bold' : 'normal',
                          }}
                        >
                          <span>{`{{${ph.id}}}`}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlaceholders(placeholders.filter(p => p.id !== ph.id));
                              if (activePlaceholderId === ph.id) setActivePlaceholderId(null);
                            }}
                            className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-0.5 rounded transition-all shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex gap-2 items-start">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

        </div>

        {/* Right Configuration & Generation panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Settings className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Generator Controls</h3>
          </div>

          {!templateFile || !dataFile ? (
            <p className="text-xs text-foreground/40 leading-relaxed">
              Upload your single-page certificate PDF template and your recipient spreadsheet list (Excel/CSV) to configure text mapping, fonts, and bulk downloads.
            </p>
          ) : (
            <div className="space-y-6">
              
              {/* Placement config panel */}
              {activePlaceholder ? (
                <div className="space-y-4 p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand">Configure: {`{{${activePlaceholder.id}}}`}</span>
                    <button
                      onClick={() => {
                        setPlaceholders(placeholders.filter(p => p.id !== activePlaceholder.id));
                        setActivePlaceholderId(null);
                      }}
                      className="text-foreground/40 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Font Family selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-foreground/50">Font Family</label>
                    <select
                      value={activePlaceholder.fontFamily}
                      onChange={(e) => updatePlaceholderStyle('fontFamily', e.target.value)}
                      className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand"
                    >
                      <option value="Helvetica">Helvetica (Sans-Serif)</option>
                      <option value="TimesRoman">Times Roman (Serif)</option>
                      <option value="Courier">Courier (Monospace)</option>
                    </select>
                  </div>

                  {/* Font Size & Bold */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-foreground/50">Font Size (pt)</label>
                      <input
                        type="number"
                        value={activePlaceholder.fontSize}
                        onChange={(e) => updatePlaceholderStyle('fontSize', parseInt(e.target.value) || 12)}
                        min={6}
                        max={144}
                        className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5 flex flex-col justify-end">
                      <button
                        type="button"
                        onClick={() => updatePlaceholderStyle('isBold', !activePlaceholder.isBold)}
                        className={`w-full py-2 rounded-lg border text-xs font-medium transition-all ${
                          activePlaceholder.isBold
                            ? 'bg-brand/10 border-brand text-brand'
                            : 'bg-background border-foreground/10 text-foreground/70 hover:border-foreground/20'
                        }`}
                      >
                        Bold Weight
                      </button>
                    </div>
                  </div>

                  {/* Alignment & Color */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-foreground/50">Align</label>
                      <select
                        value={activePlaceholder.alignment}
                        onChange={(e) => updatePlaceholderStyle('alignment', e.target.value)}
                        className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-foreground/50">Color</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={activePlaceholder.color}
                          onChange={(e) => updatePlaceholderStyle('color', e.target.value)}
                          className="w-8 h-8 rounded border border-foreground/10 bg-transparent p-0 cursor-pointer overflow-hidden"
                        />
                        <input
                          type="text"
                          value={activePlaceholder.color}
                          onChange={(e) => updatePlaceholderStyle('color', e.target.value)}
                          className="w-full bg-background border border-foreground/10 rounded-lg px-2 py-2 text-[11px] font-mono text-foreground focus:outline-none focus:border-brand"
                        />
                      </div>
                    </div>
                  </div>

                  {/* X and Y coordinate offsets */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-foreground/40">X Position (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={activePlaceholder.x}
                        onChange={(e) => updatePlaceholderStyle('x', parseFloat(e.target.value) || 0)}
                        className="w-full bg-background border border-foreground/10 rounded-lg px-2 py-1 text-xs text-foreground focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-foreground/40">Y Position (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={activePlaceholder.y}
                        onChange={(e) => updatePlaceholderStyle('y', parseFloat(e.target.value) || 0)}
                        className="w-full bg-background border border-foreground/10 rounded-lg px-2 py-1 text-xs text-foreground focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-foreground/10 text-center text-xs text-foreground/40 leading-relaxed">
                  Select a variable label on the canvas preview to adjust its font size, alignments, and branding colors.
                </div>
              )}

              {/* Filename naming variable & settings */}
              <div className="space-y-4 border-t border-foreground/5 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-foreground/60 block">Naming Field (For files inside ZIP)</label>
                  <select
                    value={nameColumn}
                    onChange={(e) => setNameColumn(e.target.value)}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-brand"
                  >
                    {headers.map(h => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Progress & Generation Panel */}
              <div className="pt-4 border-t border-foreground/5">
                {isProcessing ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono text-foreground/60">
                      <span className="flex items-center gap-2 truncate">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-brand shrink-0" />
                        <span className="truncate">{statusMessage}</span>
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-foreground/5 rounded-full h-1.5">
                      <div className="bg-brand h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ) : downloadUrl || downloadZipUrl ? (
                  <div className="space-y-3">
                    
                    {downloadUrl && (
                      <Button
                        onClick={() => {
                          const a = document.createElement('a');
                          a.href = downloadUrl;
                          a.download = `combined-certificates-${templateFile.name}`;
                          a.click();
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download Combined PDF
                      </Button>
                    )}

                    {downloadZipUrl && (
                      <Button
                        onClick={() => {
                          const a = document.createElement('a');
                          a.href = downloadZipUrl;
                          a.download = `certificates-bundle.zip`;
                          a.click();
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download ZIP Folder
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setDownloadUrl(null);
                        setDownloadZipUrl(null);
                      }}
                      className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                    >
                      Make another batch
                    </Button>

                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      disabled={placeholders.length === 0}
                      onClick={() => handleGenerate('pdf')}
                      className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                        placeholders.length > 0 ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                      Generate Combined PDF
                    </Button>
                    
                    <Button
                      disabled={placeholders.length === 0}
                      onClick={() => handleGenerate('zip')}
                      className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                        placeholders.length > 0 ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      Generate ZIP (Individual PDFs)
                    </Button>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
