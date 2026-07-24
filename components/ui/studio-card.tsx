'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StudioCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function StudioCard({
  children,
  className,
  hoverEffect = true,
  ...props
}: StudioCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -2, transition: { duration: 0.18, ease: 'easeOut' } } : undefined}
      className={cn(
        'relative rounded-xl border border-border/80 bg-card/60 backdrop-blur-md p-6 text-card-foreground shadow-sm transition-colors duration-200 hover:border-foreground/20 hover:bg-card/90',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
