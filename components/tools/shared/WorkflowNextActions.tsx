'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  Minimize2,
  FileSignature,
  Shield,
  Combine,
  Scissors,
  Layers,
  FileImage,
  Stamp,
  FileText
} from 'lucide-react';
import { setPreloadedFiles } from '@/lib/preloader';

interface ActionOption {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface WorkflowNextActionsProps {
  currentTool: string;
  fileBlob?: Blob | null;
  fileName?: string;
  fileType?: string;
}

export function WorkflowNextActions({
  currentTool,
  fileBlob,
  fileName = 'document.pdf',
  fileType = 'application/pdf'
}: WorkflowNextActionsProps) {
  const router = useRouter();

  const getActionOptions = (): ActionOption[] => {
    switch (currentTool) {
      case 'compress-pdf':
        return [
          { title: 'Sign PDF', desc: 'Add drawn or typed signature', href: '/sign-pdf', icon: FileSignature },
          { title: 'Protect PDF', desc: 'Encrypt with AES-256 password', href: '/protect-pdf', icon: Shield },
          { title: 'Merge PDF', desc: 'Combine with other documents', href: '/merge-pdf', icon: Combine },
          { title: 'Split PDF', desc: 'Extract specific pages or ranges', href: '/split-pdf', icon: Scissors },
        ];
      case 'sign-pdf':
        return [
          { title: 'Protect PDF', desc: 'Encrypt with secure password', href: '/protect-pdf', icon: Shield },
          { title: 'Compress PDF', desc: 'Reduce MB before emailing', href: '/compress-pdf', icon: Minimize2 },
          { title: 'Flatten PDF', desc: 'Lock signature permanently', href: '/flatten-pdf', icon: Layers },
          { title: 'Certify PDF', desc: 'Stamp SHA-256 fingerprint', href: '/certify-pdf', icon: Stamp },
        ];
      case 'merge-pdf':
        return [
          { title: 'Compress PDF', desc: 'Optimize combined file size', href: '/compress-pdf', icon: Minimize2 },
          { title: 'Add Page Numbers', desc: 'Number all pages sequentially', href: '/add-page-numbers', icon: Layers },
          { title: 'Organize PDF', desc: 'Reorder or delete pages visually', href: '/organize-pdf', icon: Layers },
          { title: 'Sign PDF', desc: 'Draw & stamp signature', href: '/sign-pdf', icon: FileSignature },
        ];
      case 'protect-pdf':
        return [
          { title: 'Compress PDF', desc: 'Reduce encrypted file size', href: '/compress-pdf', icon: Minimize2 },
          { title: 'Sign PDF', desc: 'Add signature overlay', href: '/sign-pdf', icon: FileSignature },
          { title: 'Security Auditor', desc: 'Verify encryption strength', href: '/pdf-security-auditor', icon: Shield },
          { title: 'Merge PDF', desc: 'Combine with other files', href: '/merge-pdf', icon: Combine },
        ];
      case 'split-pdf':
        return [
          { title: 'Compress PDF', desc: 'Optimize split pages', href: '/compress-pdf', icon: Minimize2 },
          { title: 'Merge PDF', desc: 'Recombine select chapters', href: '/merge-pdf', icon: Combine },
          { title: 'Protect PDF', desc: 'Password protect pages', href: '/protect-pdf', icon: Shield },
          { title: 'Sign PDF', desc: 'Sign extracted page', href: '/sign-pdf', icon: FileSignature },
        ];
      case 'pdf-to-png':
      case 'pdf-to-jpg':
        return [
          { title: 'PNG to PDF', desc: 'Recombine images into PDF', href: '/png-to-pdf', icon: FileImage },
          { title: 'Compress PDF', desc: 'Reduce original PDF size', href: '/compress-pdf', icon: Minimize2 },
          { title: 'PDF to Word', desc: 'Extract editable text DOCX', href: '/pdf-to-word', icon: FileText },
          { title: 'PDF OCR', desc: 'Recognize scanned text', href: '/pdf-ocr', icon: FileText },
        ];
      default:
        // Default for converter tools (Word to PDF, JPG to PDF, etc.)
        return [
          { title: 'Compress PDF', desc: 'Shrink file size locally', href: '/compress-pdf', icon: Minimize2 },
          { title: 'Sign PDF', desc: 'Draw or stamp digital signature', href: '/sign-pdf', icon: FileSignature },
          { title: 'Protect PDF', desc: 'Add password encryption', href: '/protect-pdf', icon: Shield },
          { title: 'Merge PDF', desc: 'Combine with other files', href: '/merge-pdf', icon: Combine },
        ];
    }
  };

  const handleActionClick = (option: ActionOption) => {
    // If output is a PDF and target is a PDF consumer, hand off the file seamlessly!
    if (fileBlob && fileType.includes('pdf')) {
      const nextFile = new File([fileBlob], fileName, { type: 'application/pdf' });
      setPreloadedFiles([nextFile]);
    }
    router.push(option.href);
  };

  const options = getActionOptions();

  return (
    <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-muted/20 border border-border space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand uppercase tracking-wider">
        <Sparkles className="w-4 h-4" /> Recommended Next Steps
      </div>
      <div>
        <h4 className="text-lg font-bold font-display text-foreground">
          Continue With This Document
        </h4>
        <p className="text-xs text-muted-foreground">
          Transfer your processed file directly into another tool without re-uploading.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.href}
              onClick={() => handleActionClick(option)}
              type="button"
              className="p-4 rounded-2xl bg-card border border-border hover:border-brand/40 text-left transition-all duration-200 group hover:shadow-xs cursor-pointer flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between w-full">
                <div className="p-2 rounded-xl bg-brand/10 text-brand border border-brand/20 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground group-hover:text-brand transition-colors">
                  {option.title}
                </div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {option.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WorkflowNextActions;
