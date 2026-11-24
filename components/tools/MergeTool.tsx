'use client';

import React, { useState, useEffect } from 'react';
import { Combine } from 'lucide-react';
import { mergePdfs } from '@/lib/pdf';
import { toast } from 'sonner';
import { ToolWorkspace, WorkspaceFileItem } from '@/components/tools/shared/ToolWorkspace';

export function MergeTool() {
  const [files, setFiles] = useState<WorkspaceFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      const preloaded: File[] = getPreloadedFiles();
      const items: WorkspaceFileItem[] = preloaded.map((f) => ({
        id: Math.random().toString(36).substring(2, 9),
        file: f,
      }));
      setFiles(items);
    }
  }, []);

  const triggerMerge = async () => {
    if (files.length < 2) {
      const msg = 'Please add at least 2 PDF files to merge.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsProcessing(true);
    setProgress(5);
    setError(null);

    try {
      const buffers = await Promise.all(files.map((f) => f.file.arrayBuffer()));
      const mergedBytes = await mergePdfs(buffers, (p) => setProgress(Math.round(p)));

      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      setMergedBlob(blob);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);

      toast.success(`Merged ${files.length} PDFs into 1 file successfully!`);

      // Cache reference in IndexedDB
      try {
        const { addRecentFile } = require('@/lib/db');
        addRecentFile({
          name: `merged-icreatepdf-${Date.now()}.pdf`,
          size: blob.size,
          toolName: 'Merge PDF',
          href: '/merge-pdf',
          downloadUrl: url,
          blob: blob,
        });
      } catch {}
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || 'Failed to merge PDF files.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWorkspace
      toolId="merge-pdf"
      toolName="Merge PDF"
      actionButtonText="Merge PDF Files"
      actionButtonIcon={<Combine className="w-4 h-4" />}
      accept="application/pdf,.pdf"
      multiple={true}
      allowReorder={true}
      dropPromptTitle="Drop PDF files to merge into one"
      dropPromptSubtitle="Add 2 or more PDFs. Drag to reorder. 100% private in-browser WebAssembly merge."
      files={files}
      onFilesChange={(updated) => {
        setFiles(updated);
        setDownloadUrl(null);
      }}
      isProcessing={isProcessing}
      progress={progress}
      progressStatusText="Merging documents..."
      error={error}
      onClearError={() => setError(null)}
      downloadUrl={downloadUrl}
      outputBlob={mergedBlob}
      defaultOutputFileName={`merged-icreatepdf-${Date.now()}.pdf`}
      onExecute={triggerMerge}
      onReset={() => {
        setFiles([]);
        setDownloadUrl(null);
        setMergedBlob(null);
      }}
      optionsSlot={
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            PDF documents will be merged in the exact order shown on the left.
          </p>
          <div className="p-3 rounded-xl bg-background border border-border/70 space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between text-foreground">
              <span>Files to merge:</span>
              <span className="font-bold">{files.length}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated pages:</span>
              <span>{files.reduce((sum, f) => sum + (f.pagesCount || 0), 0) || 'Calculating...'}</span>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground/80">
            Use the arrow buttons next to each file to adjust the merge sequence.
          </p>
        </div>
      }
    />
  );
}
