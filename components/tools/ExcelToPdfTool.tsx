'use client';

import React, { useState, useRef } from 'react';
import { 
  FileSpreadsheet, Loader2, Download, Eye, FileText, 
  Settings, CheckSquare, Square, Columns, RefreshCw, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SheetData {
  name: string;
  headers: string[];
  rows: any[][];
}

export function ExcelToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);
  
  // Customization states
  const [title, setTitle] = useState<string>('');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [paperSize, setPaperSize] = useState<'a4' | 'letter' | 'legal' | 'a3'>('a4');
  const [margin, setMargin] = useState<number>(10); // in mm
  const [theme, setTheme] = useState<'default' | 'minimalist' | 'brand' | 'dark' | 'warm'>('brand');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showGridlines, setShowGridlines] = useState<boolean>(true);
  const [showHeaders, setShowHeaders] = useState<boolean>(true);
  const [wrapText, setWrapText] = useState<boolean>(true);
  
  // Column checklist
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});
  
  // Progress states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  // Pagination for preview
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetAll = () => {
    setFile(null);
    setSheets([]);
    setActiveSheetIndex(0);
    setTitle('');
    setVisibleColumns({});
    setError(null);
    setDownloadUrl(null);
    setProgress(0);
    setCurrentPage(1);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    await processFile(f);
  };

  const processFile = async (f: File) => {
    resetAll();
    setFile(f);
    setError(null);
    
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (ext !== 'xlsx' && ext !== 'xls' && ext !== 'csv') {
      setError('Unsupported file type. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.');
      return;
    }

    setIsProcessing(true);
    setProgress(20);

    try {
      const buffer = await f.arrayBuffer();
      const XLSX = await import('xlsx');
      setProgress(50);
      
      const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
      setProgress(75);

      const parsedSheets: SheetData[] = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        // Read headers and rows
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        if (rawData.length > 0) {
          // Identify headers
          const headers = rawData[0].map((h, i) => h !== undefined && h !== null ? String(h).trim() : `Column ${i + 1}`);
          const rows = rawData.slice(1);
          parsedSheets.push({
            name: sheetName,
            headers,
            rows,
          });
        }
      });

      if (parsedSheets.length === 0) {
        throw new Error('The spreadsheet appears to be empty.');
      }

      setSheets(parsedSheets);
      setActiveSheetIndex(0);
      
      // Initialize column visibility to true for all headers in the active sheet
      const initialVisible: Record<string, boolean> = {};
      parsedSheets[0].headers.forEach((header) => {
        initialVisible[header] = true;
      });
      setVisibleColumns(initialVisible);
      setProgress(100);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to parse spreadsheet.');
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // When changing sheets, update column visibility
  const selectSheet = (idx: number) => {
    setActiveSheetIndex(idx);
    setCurrentPage(1);
    const initialVisible: Record<string, boolean> = {};
    sheets[idx].headers.forEach((header) => {
      initialVisible[header] = true;
    });
    setVisibleColumns(initialVisible);
    setDownloadUrl(null);
  };

  const toggleColumn = (header: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [header]: !prev[header],
    }));
    setDownloadUrl(null);
  };

  const toggleAllColumns = (val: boolean) => {
    const activeSheet = sheets[activeSheetIndex];
    if (!activeSheet) return;
    const nextVisible: Record<string, boolean> = {};
    activeSheet.headers.forEach((header) => {
      nextVisible[header] = val;
    });
    setVisibleColumns(nextVisible);
    setDownloadUrl(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      await processFile(f);
    }
  };

  // Generate the PDF
  const generatePdf = async () => {
    const activeSheet = sheets[activeSheetIndex];
    if (!activeSheet) return;

    setIsProcessing(true);
    setProgress(10);
    setError(null);

    try {
      // Create temporary container for table HTML rendering
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      
      // Calculate width based on page size and orientation
      // A4 portrait is 210mm wide. With 10mm margins, content is 190mm ≈ 718px at 96 DPI
      // Let's set a standard content width to map neatly in HTML to PDF
      const contentWidth = orientation === 'landscape' ? '1050px' : '750px';
      container.style.width = contentWidth;
      container.style.padding = `${margin}mm`;
      container.style.background = theme === 'dark' ? '#09090b' : '#ffffff';
      container.style.color = theme === 'dark' ? '#f4f4f5' : '#09090b';
      
      // Global styles for print table pagination
      const style = document.createElement('style');
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;700&family=Geist:wght@400;500;600;700&display=swap');
        .pdf-render-body {
          font-family: 'Geist', sans-serif;
          line-height: 1.5;
        }
        .pdf-title {
          font-family: 'Geist', sans-serif;
          font-weight: 700;
          font-size: 24px;
          margin-bottom: 20px;
          color: ${theme === 'dark' ? '#f4f4f5' : '#09090b'};
        }
        .pdf-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Geist', sans-serif;
          font-size: ${fontSize === 'small' ? '9px' : fontSize === 'large' ? '14px' : '11px'};
          color: ${theme === 'dark' ? '#f4f4f5' : '#09090b'};
        }
        .pdf-table th {
          font-weight: 600;
          padding: 8px 10px;
          text-align: left;
        }
        .pdf-table td {
          padding: 7px 10px;
          vertical-align: top;
          word-break: ${wrapText ? 'break-word' : 'normal'};
          white-space: ${wrapText ? 'normal' : 'nowrap'};
        }
        
        /* Gridline config */
        ${showGridlines ? `
          .pdf-table th, .pdf-table td {
            border: 1px solid ${theme === 'dark' ? '#27272a' : '#e4e4e7'};
          }
        ` : `
          .pdf-table tr {
            border-bottom: 1px solid ${theme === 'dark' ? '#27272a' : '#e4e4e7'};
          }
        `}

        /* Theme configs */
        ${theme === 'brand' ? `
          .pdf-table th {
            background-color: #7e5de0;
            color: #ffffff;
          }
          .pdf-table tr:nth-child(even) {
            background-color: ${showGridlines ? 'transparent' : 'rgba(126, 93, 224, 0.04)'};
          }
        ` : ''}
        ${theme === 'default' ? `
          .pdf-table th {
            background-color: #f4f4f5;
            color: #09090b;
          }
          .pdf-table tr:nth-child(even) {
            background-color: #fafafa;
          }
        ` : ''}
        ${theme === 'minimalist' ? `
          .pdf-table th {
            border-bottom: 2px solid #27272a !important;
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            background: transparent;
            color: #27272a;
          }
          .pdf-table td {
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: 1px solid #f4f4f5 !important;
          }
        ` : ''}
        ${theme === 'warm' ? `
          .pdf-render-body {
            font-family: Georgia, serif;
          }
          .pdf-title {
            font-family: Georgia, serif;
            color: #451a03;
          }
          .pdf-table {
            font-family: Georgia, serif;
          }
          .pdf-table th {
            background-color: #fef3c7;
            color: #78350f;
            border-bottom: 2px solid #b45309;
          }
          .pdf-table tr:nth-child(even) {
            background-color: #fffbeb;
          }
        ` : ''}
        
        /* Avoid row page breaking */
        .pdf-table tr {
          page-break-inside: avoid;
        }
      `;
      container.appendChild(style);

      // Wrapper div
      const wrapper = document.createElement('div');
      wrapper.className = 'pdf-render-body';

      // Title
      if (title.trim()) {
        const titleEl = document.createElement('h1');
        titleEl.className = 'pdf-title';
        titleEl.textContent = title.trim();
        wrapper.appendChild(titleEl);
      }

      // Build Table
      const table = document.createElement('table');
      table.className = 'pdf-table';

      // Get visible columns indices
      const visibleIndices: number[] = [];
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');

      activeSheet.headers.forEach((header, index) => {
        if (visibleColumns[header]) {
          visibleIndices.push(index);
          if (showHeaders) {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
          }
        }
      });

      if (showHeaders) {
        thead.appendChild(headerRow);
        table.appendChild(thead);
      }

      // Table Body
      const tbody = document.createElement('tbody');
      activeSheet.rows.forEach((row) => {
        const tr = document.createElement('tr');
        let hasCells = false;
        visibleIndices.forEach((colIdx) => {
          const td = document.createElement('td');
          const val = row[colIdx];
          td.textContent = val !== undefined && val !== null ? String(val).trim() : '';
          tr.appendChild(td);
          if (val !== undefined && val !== null && String(val).trim() !== '') {
            hasCells = true;
          }
        });
        // Only append row if it has some non-empty cells
        if (hasCells) {
          tbody.appendChild(tr);
        }
      });
      table.appendChild(tbody);
      wrapper.appendChild(table);
      container.appendChild(wrapper);

      document.body.appendChild(container);
      setProgress(50);

      // Import html2pdf dynamically
      const html2pdf = (await import('html2pdf.js')).default || (await import('html2pdf.js'));
      setProgress(75);

      const opt = {
        margin:       [margin, margin, margin, margin] as [number, number, number, number],
        filename:     `${file?.name.substring(0, file.name.lastIndexOf('.')) || 'spreadsheet'}.pdf`,
        image:        { type: 'jpeg' as const, quality: 1.0 },
        html2canvas:  { 
          scale: 3.0, 
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: paperSize, 
          orientation: orientation 
        }
      };

      const pdfBlob = await html2pdf().from(container).set(opt).output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setDownloadUrl(url);
      setProgress(100);
      
      // Cleanup
      document.body.removeChild(container);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to generate PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${file?.name.substring(0, file.name.lastIndexOf('.')) || 'spreadsheet'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Preview Grid Pagination
  const activeSheet = sheets[activeSheetIndex];
  const displayedHeaders = activeSheet ? activeSheet.headers.filter(h => visibleColumns[h]) : [];
  const activeHeadersIndices = activeSheet ? activeSheet.headers.map((h, i) => visibleColumns[h] ? i : -1).filter(i => i !== -1) : [];
  
  const totalRows = activeSheet ? activeSheet.rows.length : 0;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  
  const displayedRows = activeSheet 
    ? activeSheet.rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) 
    : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
      {!file ? (
        // Dropzone Layout
        <div className="max-w-3xl mx-auto">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex flex-col items-center justify-center border-2 border-dashed border-foreground/10 hover:border-brand/40 bg-card hover:bg-brand/[0.01] rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 shadow-sm"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            <div className="p-5 rounded-2xl bg-brand/5 group-hover:bg-brand/10 text-brand mb-6 transition-all duration-300 scale-100 group-hover:scale-105">
              <FileSpreadsheet className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Select Excel or CSV Spreadsheet
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mb-1 leading-relaxed">
              Drag in your Excel workbook (.xlsx, .xls) or CSV sheet.
            </p>
            <p className="text-[10px] text-brand/50 font-mono">
              100% client-side conversion — files never leave your device
            </p>
          </div>
          
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        // Workspace Layout
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Main Workspace (Preview + Sheets) */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* Sheet Selection Tab bar */}
            {sheets.length > 1 && (
              <div className="flex flex-wrap gap-2 p-1.5 bg-card/60 border border-foreground/10 rounded-2xl overflow-x-auto">
                {sheets.map((sheet, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectSheet(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium font-mono tracking-wide transition-all ${
                      idx === activeSheetIndex
                        ? 'bg-brand text-white shadow-sm'
                        : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    {sheet.name}
                  </button>
                ))}
              </div>
            )}

            {/* Grid Table Preview Card */}
            <div className="bg-card border border-foreground/10 rounded-3xl overflow-hidden shadow-sm flex flex-col">
              <div className="flex justify-between items-center bg-card/60 px-6 py-4 border-b border-foreground/10">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand" />
                  <span className="text-xs font-mono font-medium text-foreground/80">
                    Preview: {activeSheet?.name} ({totalRows} rows)
                  </span>
                </div>
                <button
                  onClick={resetAll}
                  className="text-xs text-foreground/40 hover:text-red-400 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Clear File
                </button>
              </div>

              {/* Table wrapper */}
              <div className="overflow-x-auto max-h-[500px]">
                {displayedHeaders.length === 0 ? (
                  <div className="py-20 text-center text-xs text-muted-foreground">
                    No visible columns selected. Check columns in the configuration panel.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="bg-foreground/[0.02] border-b border-foreground/10">
                        {displayedHeaders.map((header, idx) => (
                          <th 
                            key={idx} 
                            className="px-4 py-3 font-semibold text-foreground/70 border-r border-foreground/5"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                      {displayedRows.map((row, rowIdx) => (
                        <tr 
                          key={rowIdx} 
                          className="hover:bg-foreground/[0.01] transition-colors"
                        >
                          {activeHeadersIndices.map((colIdx, cellIdx) => (
                            <td 
                              key={cellIdx} 
                              className="px-4 py-3 text-foreground/80 border-r border-foreground/5 max-w-[200px] truncate"
                            >
                              {row[colIdx] !== undefined && row[colIdx] !== null ? String(row[colIdx]) : ''}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center bg-card/60 px-6 py-4 border-t border-foreground/10">
                  <span className="text-xs text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-8 rounded-lg text-xs"
                    >
                      Prev
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="h-8 rounded-lg text-xs"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Config / Sidebar Action Panel */}
          <div className="xl:col-span-4 bg-card border border-foreground/10 rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
              <Settings className="w-4 h-4 text-brand" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">PDF Layout Settings</h3>
            </div>

            {/* Document Title input */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-foreground/60 block">
                Document Title (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Q3 Sales Report"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setDownloadUrl(null);
                }}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-brand/40 text-foreground"
              />
            </div>

            {/* Page Layout options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-foreground/60 block">
                  Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => {
                    setOrientation(e.target.value as any);
                    setDownloadUrl(null);
                  }}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand/40 text-foreground"
                >
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-foreground/60 block">
                  Paper Size
                </label>
                <select
                  value={paperSize}
                  onChange={(e) => {
                    setPaperSize(e.target.value as any);
                    setDownloadUrl(null);
                  }}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand/40 text-foreground"
                >
                  <option value="a4">A4</option>
                  <option value="letter">Letter</option>
                  <option value="legal">Legal</option>
                  <option value="a3">A3</option>
                </select>
              </div>
            </div>

            {/* Margin, Styling theme selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-foreground/60 block">
                  Margin (mm)
                </label>
                <select
                  value={margin}
                  onChange={(e) => {
                    setMargin(Number(e.target.value));
                    setDownloadUrl(null);
                  }}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand/40 text-foreground"
                >
                  <option value={0}>None (0mm)</option>
                  <option value={10}>Normal (10mm)</option>
                  <option value={20}>Wide (20mm)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-foreground/60 block">
                  Table Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => {
                    setTheme(e.target.value as any);
                    setDownloadUrl(null);
                  }}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand/40 text-foreground"
                >
                  <option value="brand">Brand Indigo</option>
                  <option value="default">Standard Grey</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="warm">Warm Amber</option>
                  <option value="dark">Sleek Dark</option>
                </select>
              </div>
            </div>

            {/* Typography & Rendering options */}
            <div className="space-y-4 pt-2 border-t border-foreground/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/70 font-mono">Font Size</span>
                <div className="flex bg-foreground/5 p-0.5 rounded-lg border border-foreground/10">
                  {(['small', 'medium', 'large'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setFontSize(sz);
                        setDownloadUrl(null);
                      }}
                      className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-mono tracking-wide transition-all ${
                        fontSize === sz
                          ? 'bg-brand text-white shadow-sm font-semibold'
                          : 'text-foreground/50 hover:text-foreground'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/70 font-mono">Gridlines</span>
                <input
                  type="checkbox"
                  checked={showGridlines}
                  onChange={(e) => {
                    setShowGridlines(e.target.checked);
                    setDownloadUrl(null);
                  }}
                  className="w-4 h-4 rounded accent-brand border-foreground/10 bg-foreground/5"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/70 font-mono">Header Row</span>
                <input
                  type="checkbox"
                  checked={showHeaders}
                  onChange={(e) => {
                    setShowHeaders(e.target.checked);
                    setDownloadUrl(null);
                  }}
                  className="w-4 h-4 rounded accent-brand border-foreground/10 bg-foreground/5"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/70 font-mono">Wrap Text</span>
                <input
                  type="checkbox"
                  checked={wrapText}
                  onChange={(e) => {
                    setWrapText(e.target.checked);
                    setDownloadUrl(null);
                  }}
                  className="w-4 h-4 rounded accent-brand border-foreground/10 bg-foreground/5"
                />
              </div>
            </div>

            {/* Column Checklist dropdown/collapsible list */}
            <div className="space-y-2 pt-4 border-t border-foreground/5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono uppercase tracking-wider text-foreground/60 flex items-center gap-1.5">
                  <Columns className="w-3.5 h-3.5" />
                  Select Columns
                </label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleAllColumns(true)}
                    className="text-[10px] text-brand hover:underline font-mono"
                  >
                    All
                  </button>
                  <button 
                    onClick={() => toggleAllColumns(false)}
                    className="text-[10px] text-muted-foreground hover:underline font-mono"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="max-h-[160px] overflow-y-auto border border-foreground/10 rounded-xl p-3 bg-foreground/[0.01] space-y-2">
                {activeSheet?.headers.map((header) => (
                  <button
                    key={header}
                    onClick={() => toggleColumn(header)}
                    className="flex items-center gap-2 text-left w-full text-xs font-mono text-foreground/80 hover:text-foreground transition-colors py-0.5"
                  >
                    {visibleColumns[header] ? (
                      <CheckSquare className="w-4 h-4 text-brand shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-foreground/20 shrink-0" />
                    )}
                    <span className="truncate">{header}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Render / Download Action Button */}
            <div className="pt-4 border-t border-foreground/5">
              {isProcessing ? (
                <Button disabled className="w-full bg-brand/50 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Compiling PDF ({progress}%)
                </Button>
              ) : downloadUrl ? (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setDownloadUrl(null)}
                    className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                  >
                    Reconfigure Layout Settings
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={generatePdf}
                  disabled={displayedHeaders.length === 0}
                  className="w-full bg-brand hover:bg-brand/90 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Eye className="w-4 h-4" />
                  Generate PDF
                </Button>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
