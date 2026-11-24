'use client';

import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { ToolWorkspace, WorkspaceFileItem } from '@/components/tools/shared/ToolWorkspace';
import { getPdfjs } from '@/lib/pdfjs-init';

export function PdfToWordTool() {
  const [files, setFiles] = useState<WorkspaceFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [docBlob, setDocBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      const preloaded: File[] = getPreloadedFiles();
      if (preloaded.length > 0) {
        setFiles([{ id: 'preloaded-1', file: preloaded[0] }]);
      }
    }
  }, []);

  const triggerConvert = async () => {
    if (files.length === 0) return;
    const currentFile = files[0].file;

    setIsProcessing(true);
    setProgress(10);
    setError(null);

    try {
      const buffer = await currentFile.arrayBuffer();
      const pdfjsLib = await getPdfjs();

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      let docBody = '';

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round((i / numPages) * 85));
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        let pageParagraphs: string[] = [];
        let currentLine = '';
        let lastY: number | null = null;

        for (const item of textContent.items as any[]) {
          if ('str' in item && item.str.trim()) {
            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 10) {
              if (currentLine.trim()) {
                pageParagraphs.push(currentLine.trim());
              }
              currentLine = item.str;
            } else {
              currentLine += (currentLine ? ' ' : '') + item.str;
            }
            lastY = item.transform[5];
          }
        }
        if (currentLine.trim()) {
          pageParagraphs.push(currentLine.trim());
        }

        const paragraphsHtml = pageParagraphs
          .map((p) => `<p style="margin: 0 0 10pt 0; font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.25;">${p}</p>`)
          .join('\n');

        docBody += `
          <div class="WordSection${i}" style="page-break-after: ${i < numPages ? 'always' : 'auto'};">
            <h2 style="font-family: Calibri, sans-serif; font-size: 13pt; color: #444; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-bottom: 12pt;">
              Page ${i}
            </h2>
            ${paragraphsHtml || '<p style="color: #888; font-style: italic;">[Image or Non-Text Elements]</p>'}
          </div>
        `;
      }

      // Format as compliant Microsoft Word XML/HTML document container
      const wordXmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${currentFile.name.replace(/\.pdf$/i, '')}</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            @page {
              size: 8.5in 11.0in;
              margin: 1.0in 1.0in 1.0in 1.0in;
              mso-header-margin: .5in;
              mso-footer-margin: .5in;
              mso-paper-source: 0;
            }
            body {
              font-family: Calibri, 'Segoe UI', Arial, sans-serif;
              font-size: 11pt;
              color: #222222;
            }
          </style>
        </head>
        <body>
          ${docBody}
        </body>
        </html>
      `;

      const blob = new Blob(['\ufeff', wordXmlContent], {
        type: 'application/msword;charset=utf-8',
      });

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDocBlob(blob);
      setProgress(100);

      toast.success('Converted PDF to editable Word document successfully!');

      try {
        const { addRecentFile } = require('@/lib/db');
        addRecentFile({
          name: `${currentFile.name.replace(/\.pdf$/i, '')}.doc`,
          size: blob.size,
          toolName: 'PDF to Word',
          href: '/pdf-to-word',
          downloadUrl: url,
          blob: blob,
        });
      } catch {}
    } catch (err: any) {
      toast.error(err?.message || 'Failed to convert PDF to Word.');
    } finally {
      setIsProcessing(false);
    }
  };

  const currentFile = files[0]?.file;
  const defaultWordName = currentFile
    ? `${currentFile.name.replace(/\.pdf$/i, '')}.doc`
    : 'document.doc';

  return (
    <ToolWorkspace
      toolId="pdf-to-word"
      toolName="PDF to Word"
      actionButtonText="Convert PDF to Word"
      actionButtonIcon={<FileText className="w-4 h-4" />}
      accept="application/pdf,.pdf"
      multiple={false}
      dropPromptTitle="Drop a PDF to extract into an editable Word document"
      dropPromptSubtitle="100% client-side text layout extraction. Opens cleanly in Microsoft Word and Google Docs."
      files={files}
      onFilesChange={(updated) => {
        setFiles(updated);
        setDownloadUrl(null);
        setDocBlob(null);
      }}
      isProcessing={isProcessing}
      progress={progress}
      progressStatusText="Extracting structured text to Word..."
      error={error}
      onClearError={() => setError(null)}
      downloadUrl={downloadUrl}
      outputBlob={docBlob}
      defaultOutputFileName={defaultWordName}
      onExecute={triggerConvert}
      onReset={() => {
        setFiles([]);
        setDownloadUrl(null);
        setDocBlob(null);
      }}
      optionsSlot={
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Extracts document text lines, headings, and paragraph blocks from your PDF into an editable Word document.
          </p>
          <div className="p-3 rounded-xl bg-background border border-border/70 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between text-foreground">
              <span>Target format:</span>
              <span className="font-bold">Word (.doc / OpenXML)</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Layout engine:</span>
              <span>Client-Side Layout Analyzer</span>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground/80">
            Once downloaded, double-click the file to edit text, change fonts, and adjust formatting in Microsoft Word, Google Docs, or LibreOffice.
          </p>
        </div>
      }
    />
  );
}
