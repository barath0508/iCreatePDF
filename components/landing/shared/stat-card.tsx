import { cn } from '@/lib/utils';

export function StatCard({
  icon: Icon,
  title,
  description,
  active = false,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6 transition-colors lg:p-8',
        active ? 'border-brand/40 bg-brand/[0.06]' : 'border-border bg-card/40',
        className,
      )}
    >
      {Icon && (
        <div
          className={cn(
            'mb-4 flex h-10 w-10 items-center justify-center rounded-xl border',
            active ? 'border-brand/40 bg-brand/10 text-brand' : 'border-border bg-foreground/[0.03] text-muted-foreground',
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
