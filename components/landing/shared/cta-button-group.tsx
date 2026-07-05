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
    <div className={cn('flex flex-wrap gap-4', className)}>
      <Link href={primary.href}>
        <Button size="lg" className="h-12 rounded-full px-8 font-medium">
          {primary.label}
        </Button>
      </Link>
      {secondary && (
        <Link href={secondary.href}>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-foreground/15 px-8 font-medium hover:bg-foreground/5"
          >
            {secondary.label}
          </Button>
        </Link>
      )}
    </div>
  );
}
