import type { ReactNode } from 'react';
import { twMerge } from '@/lib/cx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={twMerge('card', className)}>{children}</div>;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, icon, action, className }: CardHeaderProps) {
  return (
    <div className={twMerge('flex items-start justify-between gap-3 px-5 pt-5', className)}>
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink-500">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-sm font-700 text-ink-800 truncate">{title}</h3>
          {subtitle && <p className="text-xs text-ink-400 mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
