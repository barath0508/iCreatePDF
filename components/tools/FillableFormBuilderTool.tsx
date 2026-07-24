'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Type, CheckSquare, List, Radio, Loader2, Download, Trash2, Plus, HelpCircle, Layers } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';

interface FormField {
  id: string;
  type: 'text' | 'checkbox' | 'dropdown' | 'radio';
  name: string;
  defaultValue: string;
  options: string[]; // for dropdown choices
  x: number; // x position in px on canvas
  y: number; // y position in px on canvas
  width: number; // width in px
  height: number; // height in px
  page: number; // page index (1-indexed)
}

export function FillableFormBuilderTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Form builder fields state
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);

  // Canvas size references
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PDF Page preview using PDF.js
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
            setCanvasDimensions({ width: viewport.width, height: viewport.height });
            await page.render({ canvasContext: context, viewport, canvas }).promise;
          }
        }
      } catch (err) {
        console.error('Error loading PDF preview:', err);
        setError('Failed to load PDF preview in browser.');
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
    setFields([]);
    setActiveFieldId(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
  };

  // Add field to the active page
  const addField = (type: 'text' | 'checkbox' | 'dropdown' | 'radio') => {
    if (!file) return;
    const canvasWidth = canvasDimensions.width || 500;
    const canvasHeight = canvasDimensions.height || 700;

    let width = 150;
    let height = 30;
    let namePrefix = 'text';

    if (type === 'checkbox') {
      width = 24;
      height = 24;
      namePrefix = 'checkbox';
    } else if (type === 'dropdown') {
      width = 150;
      height = 32;
      namePrefix = 'select';
    } else if (type === 'radio') {
      width = 24;
      height = 24;
      namePrefix = 'radio_group';
    }

    // Default centered placement
    const newField: FormField = {
      id: Math.random().toString(36).substring(7),
      type,
      name: `${namePrefix}_${fields.length + 1}`,
      defaultValue: type === 'checkbox' ? 'unchecked' : '',
      options: type === 'dropdown' ? ['Option 1', 'Option 2'] : [],
      x: canvasWidth / 2 - width / 2,
      y: canvasHeight / 2 - height / 2,
      width,
      height,
      page: currentPage,
    };

    setFields([...fields, newField]);
    setActiveFieldId(newField.id);
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
    if (activeFieldId === id) setActiveFieldId(null);
  };

  const updateFieldProperty = (id: string, property: keyof FormField, value: any) => {
    setFields(
      fields.map((f) => {
        if (f.id === id) {
          return { ...f, [property]: value };
        }
        return f;
      })
    );
  };

  // Drag coordinates calculator
  const getPoint = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      const touch = e.touches[0] ?? (e as TouchEvent).changedTouches?.[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.preventDefault();
    setActiveFieldId(id);
    const field = fields.find((f) => f.id === id);
    if (!field) return;

    const { x: startX, y: startY } = getPoint(e);
    const initialFieldX = field.x;
    const initialFieldY = field.y;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const { x: clientX, y: clientY } = getPoint(moveEvent);
      const dx = clientX - startX;
      const dy = clientY - startY;

      const canvasWidth = canvasDimensions.width || 500;
      const canvasHeight = canvasDimensions.height || 700;

      setFields((prev) =>
        prev.map((f) => {
          if (f.id === id) {
            return {
              ...f,
              x: Math.max(0, Math.min(canvasWidth - f.width, initialFieldX + dx)),
              y: Math.max(0, Math.min(canvasHeight - f.height, initialFieldY + dy)),
            };
          }
          return f;
        })
      );
    };

    const handleEnd = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
  };

  // Build the form PDF via pdf-lib
  const generateFormPdf = async () => {
    if (!file || !canvasDimensions.width) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const form = pdfDoc.getForm();

      const canvasWidth = canvasDimensions.width;
      const canvasHeight = canvasDimensions.height;

      // Group fields by page
      for (const field of fields) {
        const pageIndex = field.page - 1;
        const page = pdfDoc.getPage(pageIndex);
        const { width: pageWidth, height: pageHeight } = page.getSize();

        // Scaling factors from browser canvas coordinates to standard PDF points
        const scaleX = pageWidth / canvasWidth;
        const scaleY = pageHeight / canvasHeight;

        const pdfX = field.x * scaleX;
        // pdf-lib origin is bottom-left
        const pdfY = pageHeight - (field.y * scaleY) - (field.height * scaleY);
        const pdfW = field.width * scaleX;
        const pdfH = field.height * scaleY;

        // Strip special characters from field names (keep alphanumeric and underscores)
        const safeFieldName = field.name.replace(/[^a-zA-Z0-9_]/g, '');

        if (field.type === 'text') {
          const textField = form.createTextField(safeFieldName);
          textField.setText(field.defaultValue);
          textField.addToPage(page, { x: pdfX, y: pdfY, width: pdfW, height: pdfH });
        } else if (field.type === 'checkbox') {
          const checkBox = form.createCheckBox(safeFieldName);
          if (field.defaultValue === 'checked') {
            checkBox.check();
          } else {
            checkBox.uncheck();
          }
          checkBox.addToPage(page, { x: pdfX, y: pdfY, width: pdfW, height: pdfH });
        } else if (field.type === 'dropdown') {
          const dropdown = form.createDropdown(safeFieldName);
          if (field.options && field.options.length > 0) {
            dropdown.addOptions(field.options);
            if (field.defaultValue && field.options.includes(field.defaultValue)) {
              dropdown.select(field.defaultValue);
            }
          }
          dropdown.addToPage(page, { x: pdfX, y: pdfY, width: pdfW, height: pdfH });
        } else if (field.type === 'radio') {
          let radioGroup;
          try {
            radioGroup = form.getRadioGroup(safeFieldName);
          } catch {
            radioGroup = form.createRadioGroup(safeFieldName);
          }
          const optionValue = field.defaultValue || `option_${field.id}`;
          radioGroup.addOptionToPage(optionValue, page, { x: pdfX, y: pdfY, width: pdfW, height: pdfH });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error('Error generating fillable form:', err);
      setError('An error occurred while compiling PDF form widgets.');
    } finally {
      setIsProcessing(false);
    }
  };

  const activeField = fields.find((f) => f.id === activeFieldId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Workspace Area */}
      <div className="lg:col-span-8 space-y-6">
        {!file ? (
          // File upload dropzone
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingOver(false);
              if (e.dataTransfer.files) {
                handleFiles(e.dataTransfer.files);
              }
            }}
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
              isDraggingOver
                ? 'border-brand bg-brand/5 scale-[0.99]'
                : 'border-foreground/10 hover:border-foreground/20 bg-card/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              accept="application/pdf"
              className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto text-foreground/30 mb-4" />
            <h3 className="text-lg font-bold font-display mb-1">Upload Your Document PDF</h3>
            <p className="text-xs text-foreground/40 max-w-sm mx-auto mb-6">
              Drag in a PDF to start overlaying fillable text inputs, checkboxes, dropdowns, and radio buttons.
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold font-semibold text-xs px-6 py-3 rounded-full"
            >
              Select PDF File
            </Button>
          </div>
        ) : (
          // Interactive PDF Visual Sandbox
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-foreground/10">
              {/* Field creation toolbox */}
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addField('text')}
                  className="text-xs flex items-center gap-1.5"
                >
                  <Type className="w-3.5 h-3.5 text-brand" />
                  Text Input
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addField('checkbox')}
                  className="text-xs flex items-center gap-1.5"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Checkbox
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addField('dropdown')}
                  className="text-xs flex items-center gap-1.5"
                >
                  <List className="w-3.5 h-3.5 text-blue-400" />
                  Dropdown Menu
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addField('radio')}
                  className="text-xs flex items-center gap-1.5"
                >
                  <Radio className="w-3.5 h-3.5 text-orange-400" />
                  Radio Button
                </Button>
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={currentPage <= 1}
                  onClick={() => {
                    setCurrentPage((p) => p - 1);
                    setActiveFieldId(null);
                  }}
                  className="text-xs font-semibold"
                >
                  &larr; Prev
                </Button>
                <span className="text-xs font-mono text-foreground/60">
                  Page {currentPage} of {pagesCount || 1}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={currentPage >= pagesCount}
                  onClick={() => {
                    setCurrentPage((p) => p + 1);
                    setActiveFieldId(null);
                  }}
                  className="text-xs font-semibold"
                >
                  Next &rarr;
                </Button>
              </div>
            </div>

            {/* Draggable Sandbox canvas */}
            <div
              ref={containerRef}
              className="relative overflow-auto border border-foreground/10 rounded-2xl bg-card/40 p-4 flex justify-center min-h-[500px]"
            >
              {isPreviewLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-xs rounded-2xl">
                  <Loader2 className="w-8 h-8 text-brand animate-spin" />
                </div>
              )}

              <div className="relative">
                <canvas ref={canvasRef} className="shadow-2xl rounded-lg" />

                {/* Overlaid draggable visual widgets */}
                {!isPreviewLoading &&
                  fields
                    .filter((f) => f.page === currentPage)
                    .map((f) => {
                      const isActive = f.id === activeFieldId;
                      return (
                        <div
                          key={f.id}
                          style={{
                            position: 'absolute',
                            left: `${f.x}px`,
                            top: `${f.y}px`,
                            width: `${f.width}px`,
                            height: `${f.height}px`,
                          }}
                          onMouseDown={(e) => handleDragStart(e, f.id)}
                          onTouchStart={(e) => handleDragStart(e, f.id)}
                          className={`rounded border flex items-center justify-between px-2 cursor-move select-none ${
                            isActive
                              ? 'border-brand bg-brand/10 shadow-lg ring-1 ring-brand'
                              : 'border-foreground/20 bg-background/80 hover:border-brand/40 hover:bg-background/90'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-foreground/70 truncate mr-1">
                            {f.name}
                          </span>
                          <span className="text-[9px] uppercase font-bold text-foreground/40 bg-foreground/5 px-1 rounded shrink-0">
                            {f.type}
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control / Sidebar Panel */}
      <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
          <Layers className="w-4 h-4 text-brand" />
          <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Form Controls</h3>
        </div>

        {!file ? (
          // Help guidelines when empty
          <div className="space-y-4 text-xs text-foreground/50 leading-relaxed">
            <p className="font-semibold text-foreground">How it works:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Upload any standard PDF sheet template.</li>
              <li>Add fields using the toolbar (Text, Choice Dropdowns, Checkboxes).</li>
              <li>Position and resize fields directly on the PDF.</li>
              <li>Configure dropdown option lists and default states.</li>
              <li>Click "Compile PDF Form" to download the fillable PDF.</li>
            </ol>
            <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 text-foreground/60 space-y-2 mt-6">
              <p className="font-semibold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-brand" />
                100% Client-Side Sandbox
              </p>
              <p>
                Like all tools here, PDF compiling runs in browser memory buffer. Your documents are never uploaded to our servers.
              </p>
            </div>
          </div>
        ) : (
          // Field Property configurations or Save button
          <div className="space-y-6">
            {activeField ? (
              // Selected field property panel
              <div className="space-y-4 p-4 rounded-xl bg-foreground/5 border border-foreground/5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand font-mono">
                    Field Config
                  </h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteField(activeField.id)}
                    className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Delete
                  </Button>
                </div>

                {/* Field ID / Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-foreground/50 uppercase tracking-wide">
                    Field Identifier (Alphanumeric)
                  </label>
                  <input
                    type="text"
                    value={activeField.name}
                    onChange={(e) => updateFieldProperty(activeField.id, 'name', e.target.value)}
                    className="w-full text-xs bg-background border border-foreground/10 rounded-lg p-2 focus:outline-none focus:border-brand text-foreground"
                  />
                </div>

                {/* Default value / status */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-foreground/50 uppercase tracking-wide">
                    {activeField.type === 'checkbox' ? 'Default State' : 'Default Value'}
                  </label>
                  {activeField.type === 'checkbox' ? (
                    <select
                      value={activeField.defaultValue}
                      onChange={(e) => updateFieldProperty(activeField.id, 'defaultValue', e.target.value)}
                      className="w-full text-xs bg-background border border-foreground/10 rounded-lg p-2 focus:outline-none focus:border-brand text-foreground"
                    >
                      <option value="unchecked">Unchecked</option>
                      <option value="checked">Checked</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={activeField.defaultValue}
                      onChange={(e) => updateFieldProperty(activeField.id, 'defaultValue', e.target.value)}
                      className="w-full text-xs bg-background border border-foreground/10 rounded-lg p-2 focus:outline-none focus:border-brand text-foreground"
                    />
                  )}
                </div>

                {/* Options list for Dropdown choices */}
                {activeField.type === 'dropdown' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-foreground/50 uppercase tracking-wide">
                      Dropdown Options (comma separated)
                    </label>
                    <textarea
                      rows={2}
                      value={activeField.options.join(', ')}
                      onChange={(e) =>
                        updateFieldProperty(
                          activeField.id,
                          'options',
                          e.target.value.split(',').map((o) => o.trim()).filter((o) => o.length > 0)
                        )
                      }
                      className="w-full text-xs bg-background border border-foreground/10 rounded-lg p-2 focus:outline-none focus:border-brand text-foreground"
                    />
                  </div>
                )}

                {/* Numeric dimensions */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-foreground/50 uppercase tracking-wide">Width (px)</label>
                    <input
                      type="number"
                      value={activeField.width}
                      onChange={(e) => updateFieldProperty(activeField.id, 'width', parseInt(e.target.value) || 20)}
                      className="w-full text-xs bg-background border border-foreground/10 rounded-lg p-2 focus:outline-none focus:border-brand text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-foreground/50 uppercase tracking-wide">Height (px)</label>
                    <input
                      type="number"
                      value={activeField.height}
                      onChange={(e) => updateFieldProperty(activeField.id, 'height', parseInt(e.target.value) || 20)}
                      className="w-full text-xs bg-background border border-foreground/10 rounded-lg p-2 focus:outline-none focus:border-brand text-foreground"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Instruction prompt
              <div className="text-center p-4 rounded-xl border border-dashed border-foreground/10 text-xs text-foreground/40 leading-relaxed">
                Click a widget overlay to configure its field IDs, defaults, options, and sizing metrics.
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-4 border-t border-foreground/5 space-y-3">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-xs">
                  {error}
                </div>
              )}

              {downloadUrl ? (
                <div className="space-y-2">
                  <a href={downloadUrl} download={`fillable_${file.name}`}>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-3 rounded-full flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Fillable PDF
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDownloadUrl(null);
                      setFields([]);
                      setFile(null);
                    }}
                    className="w-full text-xs rounded-full"
                  >
                    Start New Form
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={generateFormPdf}
                  disabled={isProcessing || fields.length === 0}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold font-semibold text-xs px-4 py-3 rounded-full flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Compiling Fields...
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4" />
                      Compile PDF Form ({fields.length})
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
