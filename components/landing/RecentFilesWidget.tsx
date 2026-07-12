'use client';

import React, { useEffect, useState } from 'react';
import { History, FileText, Trash2, Download, X, ExternalLink } from 'lucide-react';
import { getRecentFiles, clearRecentFiles, RecentFile } from '@/lib/db';

export function RecentFilesWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([]);

  const loadFiles = async () => {
    const files = await getRecentFiles();
    setRecentFiles(files);
  };

  useEffect(() => {
    loadFiles();
    // Poll DB every 3 seconds to keep it sync'd in case they do conversions in other tabs
    const interval = setInterval(loadFiles, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Clear your local history? This will permanently delete references to these files from your browser.')) {
      await clearRecentFiles();
      setRecentFiles([]);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  if (recentFiles.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-card/95 hover:bg-card border border-border/80 p-3 px-4 rounded-full shadow-lg hover:shadow-brand/10 transition-all text-xs font-semibold text-foreground/80 hover:text-brand cursor-pointer select-none"
        >
          <History className="w-4 h-4 text-brand" />
          <span>Recent Files ({recentFiles.length})</span>
        </button>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div className="w-80 bg-card/95 backdrop-blur-xl border border-border/80 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
              <History className="w-3.5 h-3.5 text-brand" />
              <span>Recent Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                title="Clear History"
                className="p-1 hover:bg-foreground/5 rounded text-foreground/40 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-foreground/5 rounded text-foreground/40 hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Files List */}
          <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                className="group relative flex items-center justify-between p-2.5 bg-foreground/[0.01] hover:bg-foreground/[0.03] border border-border/40 hover:border-brand/35 rounded-xl transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-brand/5 border border-brand/10 text-brand flex-shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-foreground truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-[9px] text-foreground/45 flex items-center gap-1.5 mt-0.5">
                      <span>{file.toolName}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/20" />
                      <span>{formatSize(file.size)}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/20" />
                      <span>{formatDate(file.timestamp)}</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity ml-2">
                  {file.downloadUrl ? (
                    <a
                      href={file.downloadUrl}
                      download={file.name}
                      title="Download again"
                      className="p-1.5 hover:bg-brand/10 rounded-lg text-brand transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={file.href}
                      title="Re-run tool"
                      className="p-1.5 hover:bg-brand/10 rounded-lg text-brand transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-[9px] text-foreground/40 leading-normal text-center border-t border-border/40 pt-2">
            Files remain stored locally inside your browser sandbox.
          </div>
        </div>
      )}
    </div>
  );
}
