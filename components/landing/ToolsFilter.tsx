'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StudioCard } from '@/components/ui/studio-card';
import {
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText, Shield, FileSignature, Edit, ShieldCheck,
  Code, Layers, Printer, Columns, EyeOff, Crop, BookOpen, Wrench, Info,
  AlignCenter, Maximize2, Moon, QrCode, BookMarked, Trash2,
  Volume2, Stamp, FileSpreadsheet, Accessibility, Copy, FileSearch, Award, Search, ArrowRight,
  LucideIcon,
} from 'lucide-react';

// Icon map — resolved server-side by name, rendered client-side
const ICON_MAP: Record<string, LucideIcon> = {
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText, Shield, FileSignature, Edit, ShieldCheck,
  Code, Layers, Printer, Columns, EyeOff, Crop, BookOpen, Wrench, Info,
  AlignCenter, Maximize2, Moon, QrCode, BookMarked, Trash2,
  Volume2, Stamp, FileSpreadsheet, Accessibility, Copy, FileSearch, Award,
};

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

export function ToolsFilter({ tools }: ToolsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'convert' | 'organize' | 'secure' | 'utilities'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Filtering and Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12 bg-card/80 border border-border rounded-2xl p-4 max-w-7xl mx-auto backdrop-blur-md shadow-sm">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Tools' },
            { id: 'convert', label: 'Convert' },
            { id: 'organize', label: 'Organize' },
            { id: 'secure', label: 'Secure & Sign' },
            { id: 'utilities', label: 'Utilities' },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-foreground text-background shadow-xs font-bold'
                    : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 h-11 text-xs sm:text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/30 transition-all text-foreground placeholder:text-muted-foreground font-sans shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted-foreground hover:text-foreground z-10"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTools.map((tool, idx) => {
            const IconComponent = ICON_MAP[tool.iconName];
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group block h-full animate-tool-in"
                style={{ animationDelay: `${Math.min(idx * 18, 180)}ms`, animationFillMode: 'both' }}
              >
                <StudioCard className="h-full flex flex-col justify-between p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background group-hover:border-foreground/40 transition-colors">
                        {IconComponent && (
                          <IconComponent className="w-5 h-5 text-foreground stroke-[1.5]" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-border px-2 py-0.5 rounded-md">
                        {tool.category}
                      </span>
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
