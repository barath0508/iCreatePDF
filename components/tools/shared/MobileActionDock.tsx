'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface MobileActionDockProps {
  /** Short summary of current selection/state, e.g. "3 files (4.2 MB)" */
  statusText?: React.ReactNode;
  /** Primary call-to-action button properties */
  primaryAction: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    className?: string;
  };
  /** Secondary action (e.g. "Clear", "Change file", or reset) */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
  };
  /** Optional extra slot for small controls (e.g. compression level pill, rotate) */
  children?: React.ReactNode;
  /** Whether the dock should be visible (default: true) */
  visible?: boolean;
}

/**
 * MobileActionDock
 *
 * Pinned thumb-accessible action bar for mobile viewports (< 768px).
 * Eliminates the need for mobile users to scroll down past files/canvases
 * to reach the conversion or download button.
 */
export function MobileActionDock({
  statusText,
  primaryAction,
  secondaryAction,
  children,
  visible = true,
}: MobileActionDockProps) {
  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Mobile action bar"
      className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-card/95 backdrop-blur-2xl border-t border-border shadow-[0_-8px_32px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-200"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="px-4 pt-3 flex flex-col gap-2 max-w-lg mx-auto">
        {/* Optional small control row or status */}
        {(statusText || children || secondaryAction) && (
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground min-h-[22px]">
            <div className="truncate flex-1 font-medium">{statusText}</div>
            <div className="flex items-center gap-2 shrink-0">
              {children}
              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled}
                  className={`text-xs text-foreground/60 hover:text-foreground underline underline-offset-2 transition-colors disabled:opacity-40 min-h-[32px] px-1 flex items-center ${
                    secondaryAction.className || ''
                  }`}
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Primary Action Button (Thumb Zone) */}
        <Button
          type="button"
          size="lg"
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled || primaryAction.loading}
          className={`w-full min-h-[48px] rounded-xl font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-transform ${
            primaryAction.className ||
            'bg-foreground text-background hover:bg-foreground/90'
          }`}
        >
          {primaryAction.loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              {primaryAction.icon}
              <span>{primaryAction.label}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default MobileActionDock;
