'use client';

import React, { useState, useEffect } from 'react';
import { FileImage, Image as ImageIcon, Sliders } from 'lucide-react';
import { toast } from 'sonner';
import { ToolWorkspace, WorkspaceFileItem } from '@/components/tools/shared/ToolWorkspace';
import { getPdfjs } from '@/lib/pdfjs-init';

export function PdfToPngTool() {
  const [files, setFiles] = useState<WorkspaceFileItem[]>([]);
  const [renderDpi, setRenderDpi] = useState<'standard' | 'high'>('standard');
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  useEffect(() => {
    try {
      const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
      if (hasPreloadedFiles()) {
        const preloaded: File[] = getPreloadedFiles();
        if (preloaded.length > 0) {
          setFiles([{ id: 'preloaded-1', file: preloaded[0] }]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const triggerPdfToPng = async () => {
    if (files.length === 0) return;
    const currentFile = files[0].file;

    setIsProcessing(true);
    setProgress(5);
    setError(null);

    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      const arrayBuffer = await currentFile.arrayBuffer();
      const pdfjsLib = await getPdfjs();

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      const count = pdf.numPages;

      const scale = renderDpi === 'high' ? 2.0 : 1.5;

      for (let i = 1; i <= count; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const context = canvas.getContext('2d', { alpha: true });

        if (context) {
          if (!transparentBg) {
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, canvas.width, canvas.height);
          }

          await page.render({
            canvasContext: context,
            viewport,
            canvas,
            background: transparentBg ? 'rgba(0,0,0,0)' : 'rgb(255,255,255)',
          }).promise;

          const blob: Blob | null = await new Promise((resolve) => {
            canvas.toBlob((b) => resolve(b), 'image/png');
          });

          if (blob) {
            zip.file(`page-${String(i).padStart(3, '0')}.png`, blob);
          }
        }

        // Free memory immediately
        canvas.width = 0;
        canvas.height = 0;

        setProgress(Math.round((i / count) * 90));
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipContent);
      setDownloadUrl(url);
      setZipBlob(zipContent);
      setProgress(100);

      toast.success(`Converted ${count} pages to PNG images successfully!`);

      try {
        const { addRecentFile } = require('@/lib/db');
        addRecentFile({
          name: `${currentFile.name.replace(/\.pdf$/i, '')}_png.zip`,
          size: zipContent.size,
          toolName: 'PDF to PNG',
          href: '/pdf-to-png',
          downloadUrl: url,
          blob: zipContent,
        });
      } catch {}
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || 'Failed to convert PDF to PNG images.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const currentFile = files[0]?.file;
  const defaultZipName = currentFile
    ? `${currentFile.name.replace(/\.pdf$/i, '')}_png_images.zip`
    : 'pdf_pages_png.zip';

  return (
    <ToolWorkspace
      toolId="pdf-to-png"
      toolName="PDF to PNG"
      actionButtonText="Extract Pages as PNG"
      actionButtonIcon={<FileImage className="w-4 h-4" />}
      accept="application/pdf,.pdf"
      multiple={false}
      dropPromptTitle="Drop a PDF to convert each page into lossless PNG images"
      dropPromptSubtitle="100% private in-browser rendering. Supports optional transparent backgrounds and high resolution."
      files={files}
      onFilesChange={(updated) => {
        setFiles(updated);
        setDownloadUrl(null);
        setZipBlob(null);
      }}
      isProcessing={isProcessing}
      progress={progress}
      progressStatusText="Rendering pages to lossless PNG..."
      error={error}
      onClearError={() => setError(null)}
      downloadUrl={downloadUrl}
      outputBlob={zipBlob}
      defaultOutputFileName={defaultZipName}
      onExecute={triggerPdfToPng}
      onReset={() => {
        setFiles([]);
        setDownloadUrl(null);
        setZipBlob(null);
      }}
      optionsSlot={
        <div className="space-y-4">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
            Resolution & Background
          </label>
          <div className="space-y-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setRenderDpi('standard')}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                renderDpi === 'standard'
                  ? 'border-brand bg-brand/5 ring-1 ring-brand/30'
                  : 'border-border/60 bg-background/50 hover:border-foreground/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Standard Web (150 DPI)</span>
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                  Fast
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Optimized for digital sharing, email attachments, and web viewing.
              </p>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setRenderDpi('high')}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                renderDpi === 'high'
                  ? 'border-brand bg-brand/5 ring-1 ring-brand/30'
                  : 'border-border/60 bg-background/50 hover:border-foreground/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">High Definition (300 DPI)</span>
                <span className="text-[10px] font-mono text-brand bg-brand/10 px-2 py-0.5 rounded-full font-bold">
                  Crisp
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Pin-sharp rasterization ideal for archival or detailed graphic inspection.
              </p>
            </button>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-background/50 cursor-pointer hover:border-foreground/20">
            <input
              type="checkbox"
              checked={transparentBg}
              onChange={(e) => setTransparentBg(e.target.checked)}
              disabled={isProcessing}
              className="rounded border-border text-brand focus:ring-brand h-4 w-4"
            />
            <div className="text-xs">
              <span className="font-bold text-foreground block">Transparent Background</span>
              <span className="text-muted-foreground text-[11px]">Keep page background transparent instead of opaque white</span>
            </div>
          </label>
        </div>
      }
    />
  );
}
