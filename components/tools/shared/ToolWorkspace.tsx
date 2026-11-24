'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Upload,
  FileText,
  Trash2,
  ChevronUp,
  ChevronDown,
  Loader2,
  Download,
  CheckCircle2,
  RefreshCw,
  Plus,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { WorkflowNextActions } from '@/components/tools/shared/WorkflowNextActions';
import { MobileActionDock } from '@/components/tools/shared/MobileActionDock';
import { useClipboardFile } from '@/hooks/use-clipboard-file';

export interface WorkspaceFileItem {
  id: string;
  file: File;
  pagesCount?: number;
  previewUrl?: string;
  metadata?: Record<string, any>;
}

export interface ToolWorkspaceProps {
  toolId: string;
  toolName: string;
  actionButtonText: string;
  actionButtonIcon?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  dropPromptTitle?: string;
  dropPromptSubtitle?: string;
  files: WorkspaceFileItem[];
  onFilesChange: (files: WorkspaceFileItem[]) => void;
  optionsSlot?: React.ReactNode;
  isProcessing: boolean;
  progress?: number;
  progressStatusText?: string;
  error?: string | null;
  onClearError?: () => void;
  downloadUrl?: string | null;
  outputBlob?: Blob | null;
  defaultOutputFileName?: string;
  resultStatsSlot?: React.ReactNode;
  onExecute: () => void | Promise<void>;
  onReset?: () => void;
  allowReorder?: boolean;
}

export function ToolWorkspace({
  toolId,
  toolName,
  actionButtonText,
  actionButtonIcon = <FileText className="w-4 h-4" />,
  accept = 'application/pdf,.pdf',
  multiple = false,
  maxFiles,
  dropPromptTitle,
  dropPromptSubtitle = '100% Client-Side Memory Execution — Zero Server Uploads',
  files,
  onFilesChange,
  optionsSlot,
  isProcessing,
  progress = 0,
  progressStatusText = 'Processing...',
  error,
  onClearError,
  downloadUrl,
  outputBlob,
  defaultOutputFileName,
  resultStatsSlot,
  onExecute,
  onReset,
  allowReorder = false,
}: ToolWorkspaceProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [outputFileName, setOutputFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set default output filename when files change or default is passed
  useEffect(() => {
    if (defaultOutputFileName) {
      setOutputFileName(defaultOutputFileName);
    } else if (files.length > 0) {
      const baseName = files[0].file.name.replace(/\.[^/.]+$/, '');
      setOutputFileName(`${baseName}_processed.pdf`);
    }
  }, [defaultOutputFileName, files]);

  // Support universal clipboard paste (Ctrl+V)
  useClipboardFile({
    onFilePasted: (pastedFiles) => handleIncomingFiles(pastedFiles),
  });

  const handleIncomingFiles = async (uploadedFiles: FileList | File[]) => {
    onClearError?.();
    const newItems: WorkspaceFileItem[] = [];

    const fileArray = Array.from(uploadedFiles);
    for (const file of fileArray) {
      // Basic type validation if accept is defined
      if (accept.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        toast.error(`"${file.name}" is not a PDF file.`);
        continue;
      }

      let pagesCount: number | undefined;
      if (file.name.toLowerCase().endsWith('.pdf')) {
        try {
          const { PDFDocument } = await import('pdf-lib');
          const buffer = await file.arrayBuffer();
          const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
          pagesCount = doc.getPageCount();
        } catch {
          // Non-blocking parse error for password-protected or scanned docs
        }
      }

      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        pagesCount,
      });
    }

    if (newItems.length === 0) return;

    if (multiple) {
      const combined = [...files, ...newItems];
      if (maxFiles && combined.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed.`);
        onFilesChange(combined.slice(0, maxFiles));
      } else {
        onFilesChange(combined);
        toast.info(`Added ${newItems.length} file(s) to queue`);
      }
    } else {
      onFilesChange([newItems[0]]);
      toast.info(`Loaded ${newItems[0].file.name}`);
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
      handleIncomingFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    const updated = files.filter((f) => f.id !== id);
    onFilesChange(updated);
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= files.length) return;
    const reordered = [...files];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved);
    onFilesChange(reordered);
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = outputFileName.trim() || 'processed_document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-12 py-4 sm:py-8 pb-28 md:pb-12">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleIncomingFiles(e.target.files)}
        accept={accept}
        multiple={multiple}
        className="hidden"
        aria-label={`Select files for ${toolName}`}
        onClick={(e) => {
          (e.target as HTMLInputElement).value = '';
        }}
      />

      {/* Screen Reader Live Region for WCAG 2.2 */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isProcessing
          ? `${progressStatusText}: ${progress}% completed`
          : downloadUrl
          ? 'Operation completed successfully. Your document is ready for download.'
          : error
          ? `Error: ${error}`
          : ''}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Main Interactive Stage */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {files.length === 0 ? (
            /* Empty State / Dropzone */
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              tabIndex={0}
              role="button"
              aria-label={`Upload files for ${toolName}. Drag and drop or press enter to browse.`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className={`relative cursor-pointer touch-manipulation border-2 border-dashed rounded-3xl p-8 sm:p-14 transition-all duration-200 text-center flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px] outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 ${
                isDraggingOver
                  ? 'border-brand bg-brand/10 scale-[1.005]'
                  : 'border-border/80 bg-card/50 hover:bg-card/90 hover:border-foreground/30 shadow-xs'
              }`}
            >
              <div className="p-4 rounded-2xl bg-foreground/5 mb-4 border border-border/80 text-brand">
                <Upload className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-foreground mb-1.5">
                {dropPromptTitle || `Drop ${multiple ? 'PDF files' : 'your file'} here or click to browse`}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {dropPromptSubtitle}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-muted-foreground/75">
                <kbd className="px-2 py-0.5 rounded border border-border bg-background/80 shadow-2xs">Ctrl + V</kbd>
                <span>to paste from clipboard</span>
              </div>
            </div>
          ) : (
            /* File Queue List */
            <div className="p-5 sm:p-6 bg-card border border-border/80 rounded-3xl space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand" />
                    <span>Selected {multiple ? `Files (${files.length})` : 'File'}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Total: {formatFileSize(files.reduce((acc, curr) => acc + curr.file.size, 0))}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {multiple && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold gap-1.5 min-h-[36px]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add More</span>
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onFilesChange([]);
                      onReset?.();
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground min-h-[36px]"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {files.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-background border border-border/70 hover:border-foreground/20 transition-all text-xs font-mono"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-7 h-7 rounded-xl bg-foreground/5 border border-border flex items-center justify-center shrink-0 text-muted-foreground">
                        <span className="font-bold text-[11px]">{index + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground text-xs truncate max-w-[220px] sm:max-w-md font-sans">
                          {item.file.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {formatFileSize(item.file.size)}
                          {item.pagesCount ? ` • ${item.pagesCount} pages` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {allowReorder && multiple && (
                        <>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            disabled={index === 0}
                            onClick={() => moveFile(index, -1)}
                            aria-label={`Move ${item.file.name} up`}
                            className="text-muted-foreground hover:text-foreground disabled:opacity-30 h-8 w-8"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            disabled={index === files.length - 1}
                            onClick={() => moveFile(index, 1)}
                            aria-label={`Move ${item.file.name} down`}
                            className="text-muted-foreground hover:text-foreground disabled:opacity-30 h-8 w-8"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeFile(item.id)}
                        aria-label={`Remove ${item.file.name}`}
                        className="text-destructive/70 hover:text-destructive hover:bg-destructive/10 h-8 w-8 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ready / Download State Card */}
              {downloadUrl && (
                <div className="p-5 rounded-2xl bg-foreground/[0.03] border border-border/80 space-y-4 animate-in fade-in-0 duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Document Processed Successfully</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Ready to Download
                    </span>
                  </div>

                  {resultStatsSlot}

                  {/* Output Filename Input */}
                  <div className="space-y-1.5 pt-1">
                    <label htmlFor="output-filename-field" className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider block">
                      Save As Filename
                    </label>
                    <input
                      id="output-filename-field"
                      type="text"
                      value={outputFileName}
                      onChange={(e) => setOutputFileName(e.target.value)}
                      className="w-full text-xs font-mono bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm font-medium flex items-center justify-between">
              <span>{error}</span>
              {onClearError && (
                <button
                  type="button"
                  onClick={onClearError}
                  className="text-xs underline font-mono hover:opacity-80 ml-2"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>

        {/* Options & Action Panel (Sticky Desktop) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit bg-card border border-border/80 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3.5">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              {toolName} Options
            </h3>
          </div>

          {/* Tool specific options */}
          {optionsSlot}

          {/* Action Execution Button */}
          <div className="pt-2 border-t border-border/50">
            {isProcessing ? (
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    <span>{progressStatusText}</span>
                  </span>
                  <span className="font-bold text-foreground">{progress}%</span>
                </div>
                <div
                  className="w-full bg-foreground/10 rounded-full h-2 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="bg-brand h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  type="button"
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    onFilesChange([]);
                    onReset?.();
                  }}
                  className="w-full text-muted-foreground hover:text-foreground text-xs h-8"
                >
                  Process another file
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                disabled={files.length === 0}
                onClick={onExecute}
                className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-xs ${
                  files.length > 0
                    ? 'bg-foreground text-background hover:bg-foreground/90 font-bold'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {actionButtonIcon}
                <span>{actionButtonText}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Dock */}
      <MobileActionDock
        visible={files.length > 0}
        statusText={
          downloadUrl
            ? 'Ready to download'
            : isProcessing
            ? `${progressStatusText} ${progress}%`
            : `${files.length} file(s) loaded`
        }
        secondaryAction={
          files.length > 0 && !isProcessing && !downloadUrl
            ? {
                label: 'Clear',
                onClick: () => {
                  onFilesChange([]);
                  onReset?.();
                },
              }
            : undefined
        }
        primaryAction={
          downloadUrl
            ? {
                label: 'Download Document',
                onClick: handleDownload,
                icon: <Download className="w-4 h-4" />,
                className: 'bg-emerald-600 hover:bg-emerald-700 text-white',
              }
            : {
                label: actionButtonText,
                onClick: onExecute,
                disabled: files.length === 0,
                loading: isProcessing,
                icon: actionButtonIcon,
              }
        }
      />

      {/* Downstream Chained Actions */}
      {downloadUrl && (
        <WorkflowNextActions
          currentTool={toolId}
          fileBlob={outputBlob}
          fileName={outputFileName}
        />
      )}
    </div>
  );
}
