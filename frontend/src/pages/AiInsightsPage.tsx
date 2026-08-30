import { Sparkles, ArrowRight, Zap, Package, AlertTriangle, DollarSign, TrendingUp, Lightbulb, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Sparkline } from '@/components/charts/Sparkline';
import { aiRecommendations } from '@/data/mockData';
import type { AiRecommendation, PageKey } from '@/types';

const priorityVariant = { high: 'danger', medium: 'warning', low: 'info' } as const;
const typeIcon = { restock: Package, overstock: AlertTriangle, pricing: DollarSign, supplier: Zap, forecast: TrendingUp } as const;
const typeLabel = { restock: 'Restock', overstock: 'Overstock', pricing: 'Pricing', supplier: 'Supplier', forecast: 'Forecast' } as const;

interface AiInsightsPageProps {
  onNavigate: (page: PageKey) => void;
}

export function AiInsightsPage({ onNavigate }: AiInsightsPageProps) {
  const insights = [
    { label: 'Demand forecast accuracy', value: '94.2%', trend: '+2.1%', spark: [88, 90, 91, 92, 93, 94], color: '#0ba364' },
    { label: 'Stockouts prevented (30d)', value: '18', trend: '+5', spark: [8, 10, 12, 14, 15, 18], color: '#1385fb' },
    { label: 'Capital freed (30d)', value: '$84K', trend: '+$12K', spark: [40, 52, 60, 68, 72, 84], color: '#8b5cf6' },
    { label: 'Avg lead-time variance', value: '2.3d', trend: '−0.4d', spark: [4.2, 3.8, 3.5, 3.1, 2.7, 2.3], color: '#e88410' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="AI Insights"
        description="Predictive recommendations to optimize your inventory and supply chain"
        icon={<Sparkles className="h-5 w-5" />}
        action={<Button size="sm" icon={<Sparkles className="h-4 w-4" />}>Generate Report</Button>}
      />

      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 p-6">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 15% 25%, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-800 text-white">StockPilot AI Engine</h3>
                <p className="mt-0.5 text-sm text-brand-100">
                  Analyzed 16,400 data points across {aiRecommendations.length} recommendations · updated 2h ago
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-accent-200"><CheckCircle2 className="h-3.5 w-3.5" /> Models healthy</span>
                  <span className="flex items-center gap-1 text-brand-200"><Clock className="h-3.5 w-3.5" /> Next sync in 4h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((ins) => (
            <div key={ins.label} className="bg-white p-5">
              <p className="text-xs font-600 uppercase tracking-wide text-ink-400">{ins.label}</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="font-display text-2xl font-800 text-ink-900 tabular-nums">{ins.value}</p>
                <Sparkline data={ins.spark} width={64} height={24} color={ins.color} />
              </div>
              <p className="mt-1 text-xs font-600 text-accent-600">{ins.trend} vs last period</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {aiRecommendations.map((rec: AiRecommendation) => {
          const Icon = typeIcon[rec.type];
          return (
            <Card key={rec.id} className="p-5 transition-all duration-200 hover:shadow-card-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={priorityVariant[rec.priority]}>{rec.priority} priority</Badge>
                    <Badge variant="neutral">{typeLabel[rec.type]}</Badge>
                  </div>
                  <h4 className="mt-2 font-display text-base font-700 text-ink-900 leading-snug">{rec.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{rec.description}</p>

                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent-50 px-3 py-2">
                    <Lightbulb className="h-4 w-4 shrink-0 text-accent-600" />
                    <span className="text-sm font-600 text-accent-800">{rec.impact}</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm">{rec.action}</Button>
                    <Button variant="ghost" size="sm">Dismiss</Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-600 text-ink-800">Want deeper analysis?</p>
              <p className="text-sm text-ink-400">Run a full supply chain optimization simulation powered by StockPilot AI.</p>
            </div>
          </div>
          <Button onClick={() => onNavigate('analytics')}>Open Analytics <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </Card>
    </div>
  );
}
