'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  Search,
  FileText,
  Combine,
  Scissors,
  FileDigit,
  ShieldCheck,
  Minimize2,
  Image as ImageIcon,
  FileImage,
  PenTool,
  Lock,
  Unlock,
  RotateCw,
  EyeOff,
  Wand2,
  Sliders,
  FileSpreadsheet,
  FileCode,
  QrCode,
  Volume2,
  FileSearch,
  Zap,
  Award,
  BookMarked,
  BookOpen,
  Camera,
  Code,
  Columns,
  Copy,
  Crop,
  Edit,
  Info,
  Layers,
  LayoutGrid,
  Maximize2,
  Monitor,
  Moon,
  Paperclip,
  Printer,
  Shield,
  ShieldAlert,
  SplitSquareVertical,
  Stamp,
  Trash2,
  Type,
  Hash,
  FileSignature,
  Accessibility,
  LucideIcon
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ALL_TOOLS } from '@/lib/tools-data';

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Combine,
  Scissors,
  FileDigit,
  ShieldCheck,
  Minimize2,
  Image: ImageIcon,
  FileImage,
  PenTool,
  Lock,
  Unlock,
  RotateCw,
  EyeOff,
  Wand2,
  Sliders,
  FileSpreadsheet,
  FileCode,
  QrCode,
  Volume2,
  FileSearch,
  Zap,
  Award,
  BookMarked,
  BookOpen,
  Camera,
  Code,
  Columns,
  Copy,
  Crop,
  Edit,
  Info,
  Layers,
  LayoutGrid,
  Maximize2,
  Monitor,
  Moon,
  Paperclip,
  Printer,
  Shield,
  ShieldAlert,
  SplitSquareVertical,
  Stamp,
  Trash2,
  Type,
  Hash,
  FileSignature,
  Accessibility
};

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
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search tools"
        className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-card/80 px-4 py-2 text-xs sm:text-sm font-semibold text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-card hover:text-foreground h-10"
      >
        <Search className="h-4 w-4 stroke-[2]" />
        <span className="hidden sm:inline">Search tools...</span>
        <kbd className="pointer-events-none hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-block">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 max-w-xl border-border bg-card shadow-2xl">
          <DialogTitle className="sr-only">Command Menu PDF Tools Search</DialogTitle>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-3 [&_[cmdk-item]]:rounded-lg">
            <div className="flex items-center border-b border-border px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-foreground" />
              <Command.Input
                placeholder="Type a tool name or action (e.g. Word to PDF, Merge, OCR)..."
                toolname="quick_search_pdf_tools"
                tooldescription="Quick search across all PDF conversion, editing, and security tools"
                toolparamdescription="PDF tool name or action to execute (e.g. word to pdf, merge, compress, protect, ocr, split)"
                className="flex h-12 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
              />
            </div>
            <Command.List className="max-h-[380px] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-xs font-mono text-muted-foreground">
                No matching PDF tool found.
              </Command.Empty>

              <Command.Group heading={`All ${ALL_TOOLS.length} PDF Tools`}>
                {ALL_TOOLS.map((tool) => {
                  const Icon = (tool.iconName && ICON_MAP[tool.iconName]) || FileText;
                  const searchTokens = `${tool.name} ${tool.description} ${tool.category} ${tool.keywords.join(' ')}`;

                  return (
                    <Command.Item
                      key={tool.href}
                      value={searchTokens}
                      onSelect={() => {
                        runCommand(() => router.push(tool.href));
                      }}
                      className="flex cursor-pointer items-center justify-between gap-3 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                          <Icon className="h-4 w-4 text-foreground stroke-[1.5]" />
                        </div>
                        <div className="truncate">
                          <p className="font-medium">{tool.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
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
