import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Sparkline } from '@/components/charts/Sparkline';
import { cx } from '@/lib/cx';

interface KpiCardProps {
  label: string;
  value: string;
  deltaPct: number;
  icon: ReactNode;
  accentClass: string;
  spark: number[];
  sparkColor: string;
  sublabel?: string;
}

export function KpiCard({ label, value, deltaPct, icon, accentClass, spark, sparkColor, sublabel }: KpiCardProps) {
  const up = deltaPct > 0;
  const flat = deltaPct === 0;
  return (
    <div className="card group relative overflow-hidden p-5 transition-all duration-200 hover:shadow-card-lg">
      <div className={cx('absolute inset-x-0 top-0 h-1', accentClass)} />
      <div className="flex items-start justify-between">
        <div className={cx('flex h-10 w-10 items-center justify-center rounded-xl', accentClass, 'bg-opacity-10')}>
          <div className={cx('flex h-10 w-10 items-center justify-center rounded-xl text-white', accentClass)}>
            {icon}
          </div>
        </div>
        <div
          className={cx(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-600',
            up && 'bg-accent-50 text-accent-700',
            !up && !flat && 'bg-danger-50 text-danger-700',
            flat && 'bg-ink-100 text-ink-500'
          )}
        >
          {up && <TrendingUp className="h-3 w-3" />}
          {!up && !flat && <TrendingDown className="h-3 w-3" />}
          {flat && <Minus className="h-3 w-3" />}
          {Math.abs(deltaPct)}%
        </div>
      </div>
      <p className="mt-4 text-xs font-600 uppercase tracking-wide text-ink-400">{label}</p>
      <p className="mt-1 font-display text-2xl font-800 text-ink-900 tabular-nums">{value}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="text-xs text-ink-400">{sublabel ?? 'vs last month'}</span>
        <Sparkline data={spark} width={88} height={28} color={sparkColor} />
      </div>
    </div>
  );
}
