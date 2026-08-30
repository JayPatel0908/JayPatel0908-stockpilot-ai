import { useState } from 'react';

interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  formatValue?: (v: number) => string;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  size = 180,
  thickness = 26,
  formatValue = (v) => String(v),
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const segments = data.map((d, i) => {
    const frac = d.value / total;
    const dash = frac * circumference;
    const seg = { ...d, dash, gap: circumference - dash, offset: -offset, index: i };
    offset += dash;
    return seg;
  });

  const active = hover !== null ? data[hover] : null;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#eef2f8" strokeWidth={thickness} />
          {segments.map((seg) => (
            <circle
              key={seg.index}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={hover === seg.index ? thickness + 4 : thickness}
              strokeDasharray={`${seg.dash} ${seg.gap}`}
              strokeDashoffset={seg.offset}
              strokeLinecap="butt"
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHover(seg.index)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-xl font-800 text-ink-900">
            {active ? formatValue(active.value) : centerValue ?? formatValue(total)}
          </span>
          <span className="text-xs text-ink-400 mt-0.5">{active ? active.label : centerLabel}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full min-w-0">
        {data.map((d, i) => (
          <button
            key={d.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-ink-50"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: d.color }} />
              <span className="text-ink-600 truncate">{d.label}</span>
            </span>
            <span className="font-600 text-ink-800 tabular-nums">{formatValue(d.value)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
