'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ALL_TOOLS, PDFTool, searchTools } from '@/lib/tools-data';

export default function SearchTool() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PDFTool[]>(ALL_TOOLS);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const matched = searchTools(query);
    setResults(matched);
    setSelectedIndex(matched.length > 0 ? 0 : -1);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[selectedIndex + 1] as HTMLElement; // +1 for header
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Global Ctrl/Cmd + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Keyboard navigation within the input field
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : -1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      setIsOpen(false);
      router.push(results[selectedIndex].href);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectTool = useCallback((href: string) => {
    setIsOpen(false);
    router.push(href);
  }, [router]);

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto touch-manipulation">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <svg
          className="absolute left-3.5 sm:left-4 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground pointer-events-none transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          id="search-tools-input"
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={handleInputKeyDown}
          placeholder="Search any tool (e.g. merge, compress, word, sign)..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="w-full pl-10 sm:pl-12 pr-16 sm:pr-24 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base rounded-xl sm:rounded-2xl border border-border bg-card text-foreground shadow-xs placeholder:text-muted-foreground/75 focus:ring-2 focus:ring-foreground/30 focus:border-foreground/40 focus:outline-none transition-all"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              setSelectedIndex(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3.5 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            ✕
          </button>
        ) : (
          <div className="absolute right-2.5 sm:right-3 hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs text-muted-foreground bg-muted/60 border border-border rounded-md font-mono pointer-events-none select-none">
            <span>⌘K</span>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div
          ref={listRef}
          className="absolute z-50 left-0 right-0 mt-2 bg-card rounded-xl sm:rounded-2xl shadow-2xl border border-border max-h-[65vh] sm:max-h-96 overflow-y-auto overscroll-contain divide-y divide-border/60 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div className="p-2.5 sm:p-3 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex justify-between items-center bg-card/90 sticky top-0 z-10 backdrop-blur-md">
            <span>
              {results.length > 0
                ? `${results.length} tool${results.length === 1 ? '' : 's'} available`
                : 'No matching tools'}
            </span>
            <span className="hidden sm:inline text-[9px] text-muted-foreground/60">
              Use ↑↓ to navigate &bull; Enter to select
            </span>
          </div>

          {results.length > 0 ? (
            results.map((tool, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  onClick={() => handleSelectTool(tool.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between p-3 sm:p-3.5 transition-colors cursor-pointer min-h-[48px] ${
                    isSelected
                      ? 'bg-foreground/5 text-foreground'
                      : 'hover:bg-foreground/[0.03] text-foreground'
                  }`}
                >
                  <div className="flex flex-col min-w-0 pr-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className={`font-semibold text-xs sm:text-sm transition-colors ${
                        isSelected ? 'text-brand' : 'group-hover:text-brand'
                      }`}>
                        {tool.name}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                        {tool.category}
                      </span>
                      {tool.badge && (
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {tool.description}
                    </p>
                  </div>
                  <span className="text-muted-foreground/40 group-hover:text-foreground transform group-hover:translate-x-0.5 transition-all shrink-0 text-sm">
                    →
                  </span>
                </Link>
              );
            })
          ) : (
            <div className="p-6 sm:p-8 text-center text-xs sm:text-sm text-muted-foreground space-y-2">
              <p>
                We couldn&apos;t find any tool matching &quot;<span className="font-semibold text-foreground">{query}</span>&quot;.
              </p>
              <p className="text-[11px] sm:text-xs text-muted-foreground/75">
                Try searching for common tasks like <em>merge</em>, <em>compress</em>, <em>convert</em>, or <em>sign</em>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
