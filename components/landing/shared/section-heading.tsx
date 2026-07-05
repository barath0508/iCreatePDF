import { cn } from '@/lib/utils';

export function SectionHeading({
  children,
  className,
  as: Tag = 'h2',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <Tag
      className={cn(
        'font-display text-4xl font-medium leading-[1.02] tracking-tight text-foreground md:text-5xl lg:text-[64px]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
