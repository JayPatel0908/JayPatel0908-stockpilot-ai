import {
  BarChart3,
  TrendingUp,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { DonutChart } from '@/components/charts/DonutChart';
import {
  salesData,
  inventoryTurnoverTrend,
  categoryShare,
  topProducts,
  slowMovingProducts,
} from '@/data/mockData';
import { formatCurrency } from '@/lib/format';
import type { TopProduct } from '@/types';

export function AnalyticsPage() {
  const topColumns = [
    {
      key: 'rank',
      header: '#',
      render: (_: TopProduct, i: number) => <span className="text-ink-400 font-600">{i + 1}</span>,
    } as const,
    {
      key: 'name',
      header: 'Product',
      render: (p: TopProduct) => (
        <div className="min-w-0">
          <p className="font-600 text-ink-800 truncate max-w-[220px]">{p.name}</p>
          <p className="text-xs text-ink-400">{p.sku}</p>
        </div>
      ),
    },
    {
      key: 'revenue',
      header: 'Revenue',
      render: (p: TopProduct) => <span className="tabular-nums font-600 text-ink-800">{formatCurrency(p.revenue)}</span>,
    },
    {
      key: 'units',
      header: 'Units Sold',
      render: (p: TopProduct) => <span className="tabular-nums text-ink-600">{p.unitsSold.toLocaleString()}</span>,
    },
    {
      key: 'turnover',
      header: 'Turnover Rate',
      render: (p: TopProduct) => (
        <div className="flex items-center gap-2">
          <ProgressBar value={p.turnoverRate} max={12} colorClass="bg-accent-500" className="w-20" />
          <span className="tabular-nums text-xs font-600 text-ink-600">{p.turnoverRate}x</span>
        </div>
      ),
    },
  ];

  const slowColumns = [
    {
      key: 'name',
      header: 'Product',
      render: (p: TopProduct) => (
        <div className="min-w-0">
          <p className="font-600 text-ink-800 truncate max-w-[220px]">{p.name}</p>
          <p className="text-xs text-ink-400">{p.sku}</p>
        </div>
      ),
    },
    {
      key: 'revenue',
      header: 'Revenue',
      render: (p: TopProduct) => <span className="tabular-nums text-ink-600">{formatCurrency(p.revenue)}</span>,
    },
    {
      key: 'units',
      header: 'Units Sold',
      render: (p: TopProduct) => <span className="tabular-nums text-ink-600">{p.unitsSold.toLocaleString()}</span>,
    },
    {
      key: 'turnover',
      header: 'Turnover Rate',
      render: (p: TopProduct) => (
        <div className="flex items-center gap-2">
          <ProgressBar value={p.turnoverRate} max={12} colorClass="bg-danger-500" className="w-20" />
          <span className="tabular-nums text-xs font-600 text-danger-600">{p.turnoverRate}x</span>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Recommendation',
      render: () => <Badge variant="warning">Consider discounting</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Analytics"
        description="Deep insights into sales performance and inventory efficiency"
        icon={<BarChart3 className="h-5 w-5" />}
        action={<Button variant="secondary" size="sm" icon={<Download className="h-4 w-4" />}>Export Report</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Sales Trends"
            subtitle="Monthly revenue over the last 6 months"
            icon={<TrendingUp className="h-4 w-4" />}
            action={
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5 font-600 text-ink-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> Revenue
                </span>
              </div>
            }
          />
          <div className="px-3 pb-3 pt-4">
            <AreaChart
              data={salesData.map((d) => d.sales)}
              labels={salesData.map((d) => d.month)}
              height={240}
              color="#1385fb"
              formatValue={(v) => formatCurrency(v, true)}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Revenue by Category" subtitle="Distribution" icon={<Package className="h-4 w-4" />} />
          <div className="px-5 pb-5 pt-4">
            <DonutChart
              data={categoryShare.map((c) => ({ label: c.category, value: c.value, color: c.color }))}
              size={170}
              formatValue={(v) => formatCurrency(v, true)}
              centerLabel="Total"
              centerValue={formatCurrency(categoryShare.reduce((s, c) => s + c.value, 0), true)}
            />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Inventory Turnover Rate"
            subtitle="Times inventory sold per month — higher is better"
            icon={<TrendingUp className="h-4 w-4" />}
            action={<Badge variant="success"><ArrowUpRight className="h-3 w-3" /> +47% YoY</Badge>}
          />
          <div className="px-4 pb-4 pt-4">
            <BarChart
              data={inventoryTurnoverTrend.map((d) => d.value)}
              labels={inventoryTurnoverTrend.map((d) => d.label)}
              height={220}
              color="#0ba364"
              formatValue={(v) => `${v}x`}
            />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Order Volume"
            subtitle="Monthly orders processed"
            icon={<BarChart3 className="h-4 w-4" />}
          />
          <div className="px-4 pb-4 pt-4">
            <BarChart
              data={salesData.map((d) => d.orders)}
              labels={salesData.map((d) => d.month)}
              height={220}
              color="#1385fb"
              formatValue={(v) => `${v} orders`}
            />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Top Performing Products"
            subtitle="Highest revenue contributors"
            icon={<ArrowUpRight className="h-4 w-4 text-accent-600" />}
            action={<Badge variant="success">Best sellers</Badge>}
          />
          <div className="mt-3">
            <Table
              columns={topColumns as unknown as Parameters<typeof Table<TopProduct>>[0]['columns']}
              data={topProducts}
              rowKey={(p) => p.id}
            />
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Slow-Moving Products"
            subtitle="Low turnover — tying up capital"
            icon={<ArrowDownRight className="h-4 w-4 text-danger-600" />}
            action={<Badge variant="danger"><AlertTriangle className="h-3 w-3" /> Action needed</Badge>}
          />
          <div className="mt-3">
            <Table columns={slowColumns} data={slowMovingProducts} rowKey={(p) => p.id} />
          </div>
        </Card>
      </div>
    </div>
  );
}
