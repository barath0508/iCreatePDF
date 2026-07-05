import { cn } from '@/lib/utils';

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 text-sm font-mono text-muted-foreground',
        className,
      )}
    >
      <span className="h-px w-8 bg-foreground/20" />
      {children}
    </span>
  );
}
