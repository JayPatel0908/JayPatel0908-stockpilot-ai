import { useId, useState } from 'react';

interface BarChartProps {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
  formatValue?: (v: number) => string;
}

export function BarChart({
  data,
  labels,
  height = 220,
  color = '#1385fb',
  formatValue = (v) => String(v),
}: BarChartProps) {
  const uid = useId().replace(/:/g, '');
  const gid = `bar-${uid}`;
  const [hover, setHover] = useState<number | null>(null);
  const width = 640;
  const padX = 16;
  const padY = 16;
  const w = width - padX * 2;
  const h = height - padY * 2 - 18;

  const max = Math.max(...data) * 1.1 || 1;
  const slot = w / data.length;
  const barW = Math.min(40, slot * 0.5);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={padX} x2={width - padX} y1={padY + h * t} y2={padY + h * t} stroke="#eef2f8" strokeWidth="1" />
      ))}
      {data.map((d, i) => {
        const barH = (d / max) * h;
        const x = padX + slot * i + (slot - barW) / 2;
        const y = padY + h - barH;
        const isHover = hover === i;
        return (
          <g
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <rect
              x={padX + slot * i}
              y={padY}
              width={slot}
              height={h}
              fill="transparent"
            />
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={4}
              fill={`url(#${gid})`}
              opacity={isHover ? 1 : 0.85}
            />
            {isHover && (
              <g>
                <rect x={x + barW / 2 - 38} y={y - 28} width={76} height={22} rx={6} fill="#1f2533" />
                <text x={x + barW / 2} y={y - 13} textAnchor="middle" fill="white" style={{ fontSize: 11, fontWeight: 600 }}>
                  {formatValue(d)}
                </text>
              </g>
            )}
            <text x={padX + slot * i + slot / 2} y={height - 2} textAnchor="middle" className="fill-ink-400" style={{ fontSize: 11 }}>
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
