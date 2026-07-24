import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTALink {
  label: string;
  href: string;
}

export function CTAButtonGroup({
  primary,
  secondary,
  className,
}: {
  primary: CTALink;
  secondary?: CTALink;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-4 items-center', className)}>
      <Link href={primary.href}>
        <Button size="lg" className="h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-bold shadow-md">
          {primary.label}
        </Button>
      </Link>
      {secondary && (
        <Link href={secondary.href}>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-border bg-card px-8 font-medium hover:bg-muted text-foreground"
          >
            {secondary.label}
          </Button>
        </Link>
      )}
    </div>
  );
}
