import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function SectionHeader({ title, description, icon, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card ring-1 ring-ink-200/60">
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-display text-xl font-800 text-ink-900 sm:text-2xl">{title}</h1>
          {description && <p className="mt-0.5 text-sm text-ink-500">{description}</p>}
        </div>
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
