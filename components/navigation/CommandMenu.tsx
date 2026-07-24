'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  Search,
  FileText,
  Merge,
  Split,
  FileDigit,
  ShieldCheck,
  Minimize2,
  Image as ImageIcon,
  PenTool,
  Lock,
  Unlock,
  RotateCw,
  EyeOff,
  Wand2,
  Grid,
  FileSpreadsheet,
  FileCode,
  QrCode,
  Volume2,
  FileSearch,
  Zap,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const ALL_TOOLS = [
  { name: 'Merge PDF', path: '/tools/merge-pdf', category: 'Organize', icon: Merge, desc: 'Combine multiple PDFs into a single document' },
  { name: 'Split PDF', path: '/tools/split-pdf', category: 'Organize', icon: Split, desc: 'Extract pages or split PDF into separate files' },
  { name: 'Compress PDF', path: '/tools/compress-pdf', category: 'Optimize', icon: Minimize2, desc: 'Reduce PDF file size while maintaining quality' },
  { name: 'Edit PDF', path: '/tools/edit-pdf', category: 'Edit', icon: PenTool, desc: 'Add text, shapes, and annotations to PDF' },
  { name: 'Sign PDF', path: '/tools/sign-pdf', category: 'Security', icon: PenTool, desc: 'Sign PDFs with drawn, text, or image signatures' },
  { name: 'Protect PDF', path: '/tools/protect-pdf', category: 'Security', icon: Lock, desc: 'Encrypt PDF with password protection' },
  { name: 'Unlock PDF', path: '/tools/unlock-pdf', category: 'Security', icon: Unlock, desc: 'Remove password and restrictions from PDF' },
  { name: 'Word to PDF', path: '/tools/word-to-pdf', category: 'Convert', icon: FileText, desc: 'Convert DOCX files directly into PDF' },
  { name: 'Excel to PDF', path: '/tools/excel-to-pdf', category: 'Convert', icon: FileSpreadsheet, desc: 'Convert XLS/XLSX spreadsheets to PDF' },
  { name: 'JPG to PDF', path: '/tools/jpg-to-pdf', category: 'Convert', icon: ImageIcon, desc: 'Convert JPG images to PDF document' },
  { name: 'PNG to PDF', path: '/tools/png-to-pdf', category: 'Convert', icon: ImageIcon, desc: 'Convert PNG images into clean PDF' },
  { name: 'PDF to Text', path: '/tools/pdf-to-text', category: 'Convert', icon: FileText, desc: 'Extract plain text content from PDF' },
  { name: 'PDF to JPG', path: '/tools/pdf-to-jpg', category: 'Convert', icon: ImageIcon, desc: 'Convert PDF pages into high-res images' },
  { name: 'PDF OCR', path: '/tools/pdf-ocr', category: 'Advanced', icon: EyeOff, desc: 'Extract text from scanned PDFs using Tesseract OCR' },
  { name: 'Organize PDF', path: '/tools/organize-pdf', category: 'Organize', icon: Grid, desc: 'Reorder, delete, or rotate pages in PDF' },
  { name: 'Rotate PDF', path: '/tools/rotate-pdf', category: 'Organize', icon: RotateCw, desc: 'Rotate PDF pages orientation' },
  { name: 'Watermark PDF', path: '/tools/watermark-pdf', category: 'Edit', icon: Wand2, desc: 'Stamp text or image watermarks onto PDF' },
  { name: 'Page Numbers', path: '/tools/add-page-numbers', category: 'Edit', icon: FileDigit, desc: 'Add page numbers with custom position and format' },
  { name: 'Redact PDF', path: '/tools/redact-pdf', category: 'Security', icon: EyeOff, desc: 'Black out sensitive text and data from PDF' },
  { name: 'Scan to PDF', path: '/tools/scan-to-pdf', category: 'Convert', icon: ImageIcon, desc: 'Scan document using camera and save as PDF' },
  { name: 'Markdown to PDF', path: '/tools/markdown-to-pdf', category: 'Convert', icon: FileCode, desc: 'Convert formatted Markdown into styled PDF' },
  { name: 'Bates Numbering', path: '/tools/bates-numbering', category: 'Advanced', icon: FileDigit, desc: 'Add legal Bates numbering sequence to PDFs' },
  { name: 'Certify PDF', path: '/tools/certify-pdf', category: 'Security', icon: ShieldCheck, desc: 'Sign and certify document authenticity' },
  { name: 'QR to PDF', path: '/tools/qr-to-pdf', category: 'Convert', icon: QrCode, desc: 'Generate QR codes and embed into PDF' },
  { name: 'Read Aloud PDF', path: '/tools/read-aloud-pdf', category: 'Advanced', icon: Volume2, desc: 'Text-to-speech engine for reading PDF aloud' },
  { name: 'Bulk Certificates', path: '/tools/bulk-certificates', category: 'Advanced', icon: FileText, desc: 'Generate hundreds of certificates from CSV' },
  { name: 'PDF Accessibility Checker', path: '/tools/pdf-accessibility-checker', category: 'Advanced', icon: FileSearch, desc: 'Validate PDF WCAG and UA accessibility standards' },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    []
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-card hover:text-foreground"
      >
        <Search className="h-3.5 w-3.5 stroke-[2]" />
        <span className="hidden sm:inline">Search tools...</span>
        <kbd className="pointer-events-none hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-block">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 max-w-xl border-border bg-card shadow-2xl">
          <VisuallyHidden>
            <DialogTitle>Command Menu PDF Tools Search</DialogTitle>
          </VisuallyHidden>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-3 [&_[cmdk-item]]:rounded-lg">
            <div className="flex items-center border-b border-border px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-foreground" />
              <Command.Input
                placeholder="Type a tool name or action (e.g. Merge, Compress, OCR)..."
                className="flex h-12 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
              />
            </div>
            <Command.List className="max-h-[340px] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-xs font-mono text-muted-foreground">
                No matching PDF tool found.
              </Command.Empty>

              <Command.Group heading="PDF Tools Suite">
                {ALL_TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Command.Item
                      key={tool.path}
                      onSelect={() => {
                        runCommand(() => router.push(tool.path));
                      }}
                      className="flex cursor-pointer items-center justify-between gap-3 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                          <Icon className="h-4 w-4 text-foreground stroke-[1.5]" />
                        </div>
                        <div className="truncate">
                          <p className="font-medium">{tool.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{tool.desc}</p>
                        </div>
                      </div>
                      <span className="shrink-0 rounded border border-border bg-background px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                        {tool.category}
                      </span>
                    </Command.Item>
                  );
                })}
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
