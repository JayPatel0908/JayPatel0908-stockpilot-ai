import { twMerge } from '@/lib/cx';

type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';

const styles: Record<Variant, string> = {
  success: 'bg-accent-50 text-accent-700 ring-1 ring-accent-200/60',
  warning: 'bg-warning-50 text-warning-700 ring-1 ring-warning-200/60',
  danger: 'bg-danger-50 text-danger-700 ring-1 ring-danger-200/60',
  info: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200/60',
  neutral: 'bg-ink-100 text-ink-600 ring-1 ring-ink-200/60',
  brand: 'bg-brand-600 text-white',
};

interface BadgeProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = 'neutral', className, children }: BadgeProps) {
  return <span className={twMerge('badge', styles[variant], className)}>{children}</span>;
}
