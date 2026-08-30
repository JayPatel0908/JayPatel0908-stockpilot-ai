import { useId } from 'react';

interface AreaChartProps {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
  gradientId?: string;
  formatValue?: (v: number) => string;
}

export function AreaChart({
  data,
  labels,
  height = 220,
  color = '#1385fb',
  formatValue = (v) => String(v),
}: AreaChartProps) {
  const uid = useId().replace(/:/g, '');
  const gid = `area-${uid}`;
  const width = 640;
  const padX = 8;
  const padY = 16;
  const w = width - padX * 2;
  const h = height - padY * 2;

  const max = Math.max(...data) * 1.12;
  const min = Math.min(...data, 0);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padX + (w / (data.length - 1)) * i;
    const y = padY + h - ((d - min) / range) * h;
    return { x, y, value: d, label: labels[i] };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${padY + h} L ${points[0].x.toFixed(1)} ${padY + h} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={padX}
          x2={width - padX}
          y1={padY + h * t}
          y2={padY + h * t}
          stroke="#eef2f8"
          strokeWidth="1"
        />
      ))}
      <path d={areaPath} fill={`url(#${gid})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="white" stroke={color} strokeWidth="2" />
          <text x={p.x} y={height - 2} textAnchor="middle" className="fill-ink-400" style={{ fontSize: 11 }}>
            {p.label}
          </text>
        </g>
      ))}
      {points.map((p, i) => (
        <title key={`t-${i}`}>{`${p.label}: ${formatValue(p.value)}`}</title>
      ))}
    </svg>
  );
}
