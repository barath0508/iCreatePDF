'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ALL_TOOLS, PDFTool, searchTools } from '@/lib/tools-data';

export default function SearchTool() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PDFTool[]>(ALL_TOOLS);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(searchTools(query));
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        const input = document.getElementById('search-tools-input');
        input?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <svg
          className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none"
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
          id="search-tools-input"
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any tool (e.g. merge, compress, word to pdf, sign)..."
          className="w-full pl-12 pr-20 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        ) : (
          <div className="absolute right-3 hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md">
            <span>⌘/Ctrl K</span>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
          <div className="p-2.5 text-xs font-semibold uppercase tracking-wider text-gray-400 flex justify-between items-center">
            <span>
              {results.length > 0
                ? `${results.length} tool${results.length === 1 ? '' : 's'} found`
                : 'No matching tools'}
            </span>
          </div>
          {results.length > 0 ? (
            results.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-3.5 hover:bg-blue-50 dark:hover:bg-gray-700/60 transition-colors"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {tool.category}
                    </span>
                    {tool.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {tool.description}
                  </p>
                </div>
                <span className="text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              We couldn&apos;t find any tool matching &quot;<span className="font-semibold">{query}</span>&quot;.
              <div className="mt-2 text-xs text-gray-400">
                Try searching for common tasks like <em>merge</em>, <em>compress</em>, <em>convert</em>, or <em>sign</em>.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
