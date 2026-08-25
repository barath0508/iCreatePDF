'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { StudioCard } from '@/components/ui/studio-card';
import {
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText, Shield, FileSignature, Edit, ShieldCheck,
  Code, Layers, Printer, Columns, EyeOff, Crop, BookOpen, Wrench, Info,
  AlignCenter, Maximize2, Moon, QrCode, BookMarked, Trash2,
  Volume2, Stamp, FileSpreadsheet, Accessibility, Copy, FileSearch, Award,
  Heart, Search, ArrowRight, ShieldAlert, Paperclip, SplitSquareVertical, Monitor,
  LucideIcon,
} from 'lucide-react';
import { getFavorites, toggleFavorite } from '@/lib/favorites';

// Icon map — resolved server-side by name, rendered client-side
const ICON_MAP: Record<string, LucideIcon> = {
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText, Shield, FileSignature, Edit, ShieldCheck,
  Code, Layers, Printer, Columns, EyeOff, Crop, BookOpen, Wrench, Info,
  AlignCenter, Maximize2, Moon, QrCode, BookMarked, Trash2,
  Volume2, Stamp, FileSpreadsheet, Accessibility, Copy, FileSearch, Award,
  ShieldAlert, Paperclip, SplitSquareVertical, Monitor,
};

const POPULAR_TOOLS = new Set([
  '/tools/merge-pdf',
  '/tools/compress-pdf',
  '/tools/jpg-to-pdf',
  '/tools/sign-pdf',
  '/tools/pdf-ocr',
]);

const NEW_TOOLS = new Set([
  '/tools/pdf-accessibility-checker',
  '/tools/bulk-certificates',
  '/tools/ris-to-pdf',
]);

export interface ToolItem {
  iconName: string;
  title: string;
  desc: string;
  href: string;
  category: string;
}

interface ToolsFilterProps {
  tools: ToolItem[];
}

type Category = 'all' | 'convert' | 'organize' | 'secure' | 'utilities' | 'favorites';

export function ToolsFilter({ tools }: ToolsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleFavorite(href);
    setFavorites(new Set(updated));
  }, []);

  const filteredTools = tools.filter((tool) => {
    if (activeCategory === 'favorites') return favorites.has(tool.href);
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favCount = tools.filter((t) => favorites.has(t.href)).length;

  const TABS: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'convert', label: 'Convert' },
    { id: 'organize', label: 'Organize' },
    { id: 'secure', label: 'Secure & Sign' },
    { id: 'utilities', label: 'Utilities' },
    ...(favCount > 0 ? [{ id: 'favorites' as Category, label: `Favorites (${favCount})` }] : []),
  ];

  return (
    <>
      {/* Filtering and Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12 bg-card/80 border border-border rounded-2xl p-4 max-w-7xl mx-auto backdrop-blur-md shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none flex-nowrap sm:flex-wrap">
          {TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            const isFavTab = tab.id === 'favorites';
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-foreground text-background shadow-xs font-bold'
                    : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                {isFavTab && <Heart className="w-3 h-3 fill-current" />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        {activeCategory !== 'favorites' && (
          <form
            onSubmit={(e) => e.preventDefault()}
            toolname="search_pdf_tools"
            tooldescription="Filter and search across all PDF editing, conversion, and security tools"
            toolautosubmit="true"
            className="relative w-full lg:w-80 shrink-0"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            <input
              type="text"
              name="search"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setSearchQuery('')}
              toolparamdescription="Search keyword or tool name to filter PDF utilities (e.g., merge, compress, protect, ocr, split, watermark)"
              className="w-full pl-10 pr-10 py-2.5 h-11 text-xs sm:text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/30 transition-all text-foreground placeholder:text-muted-foreground font-sans shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted-foreground hover:text-foreground z-10"
              >
                Clear
              </button>
            )}
          </form>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="tools-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTools.map((tool, idx) => {
            const IconComponent = ICON_MAP[tool.iconName];
            const isFav = favorites.has(tool.href);
            const isPopular = POPULAR_TOOLS.has(tool.href);
            const isNew = NEW_TOOLS.has(tool.href);

            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group block h-full animate-tool-in"
                style={{ animationDelay: `${Math.min(idx * 18, 180)}ms`, animationFillMode: 'both' }}
              >
                <StudioCard className="relative h-full flex flex-col justify-between p-6">
                  {(isPopular || isNew) && (
                    <span className={`absolute top-3 right-3 text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border pointer-events-none ${
                      isNew
                        ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                        : 'border-foreground/20 text-muted-foreground bg-foreground/5'
                    }`}>
                      {isNew ? 'New' : 'Popular'}
                    </span>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background group-hover:border-foreground/40 transition-colors">
                        {IconComponent && (
                          <IconComponent className="w-5 h-5 text-foreground stroke-[1.5]" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleToggleFavorite(e, tool.href)}
                          title={isFav ? 'Remove from favorites' : 'Pin to favorites'}
                          className={`p-2 sm:p-1.5 rounded-lg transition-all min-h-[36px] min-w-[36px] flex items-center justify-center ${
                            isFav
                              ? 'text-foreground opacity-100'
                              : 'text-muted-foreground/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-muted-foreground'
                          }`}
                          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart className={`w-3.5 h-3.5 transition-all ${isFav ? 'fill-current scale-110' : ''}`} />
                        </button>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-border px-2 py-0.5 rounded-md">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground font-display group-hover:text-muted-foreground transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>Launch Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform group-hover:translate-x-1" />
                  </div>
                </StudioCard>
              </Link>
            );
          })}
        </div>
      ) : activeCategory === 'favorites' ? (
        <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl max-w-md mx-auto">
          <Heart className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground">No favorites yet</p>
          <p className="text-xs text-muted-foreground mt-1">Hover over any tool card and click the heart icon to pin it here.</p>
          <button
            onClick={() => setActiveCategory('all')}
            className="mt-4 px-4 py-1.5 text-xs font-mono bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-colors"
          >
            Browse All Tools
          </button>
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl max-w-md mx-auto">
          <p className="text-sm font-medium text-foreground">No matching PDF tool found</p>
          <p className="text-xs text-muted-foreground mt-1">Try searching for alternative keywords like merge, compress, or OCR.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="mt-4 px-4 py-1.5 text-xs font-mono bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-colors"
          >
            Reset Search Filters
          </button>
        </div>
      )}
    </>
  );
}

