import {
  Package,
  DollarSign,
  AlertTriangle,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { AreaChart } from '@/components/charts/AreaChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { StatusBadge, MovementIcon, movementLabel } from '@/components/dashboard/StatusHelpers';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  products,
  stockMovements,
  salesData,
  categoryShare,
  aiRecommendations,
} from '@/data/mockData';
import { formatCurrency, formatRelativeTime } from '@/lib/format';
import type { PageKey, Product, StockMovement, AiRecommendation } from '@/types';

const priorityVariant = { high: 'danger', medium: 'warning', low: 'info' } as const;
const typeIcon = { restock: Package, overstock: AlertTriangle, pricing: DollarSign, supplier: Zap, forecast: Sparkles } as const;

interface DashboardPageProps {
  onNavigate: (page: PageKey) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const totalProducts = products.length * 178; // scaled catalog
  const inventoryValue = products.reduce((s, p) => s + p.stock * p.unitPrice, 0);
  const lowStock = products.filter((p) => p.status === 'low_stock' || p.status === 'out_of_stock');
  const monthlySales = salesData[salesData.length - 1].sales;

  const productColumns = [
    {
      key: 'name',
      header: 'Product',
      render: (p: Product) => (
        <div className="flex items-center gap-3">
          <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover ring-1 ring-ink-200" />
          <div className="min-w-0">
            <p className="font-600 text-ink-800 truncate max-w-[200px]">{p.name}</p>
            <p className="text-xs text-ink-400">{p.sku}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', header: 'Category', render: (p: Product) => <span className="text-ink-500">{p.category}</span> },
    {
      key: 'stock',
      header: 'Stock',
      render: (p: Product) => <span className="tabular-nums font-600 text-ink-800">{p.stock.toLocaleString()}</span>,
    },
    { key: 'status', header: 'Status', render: (p: Product) => <StatusBadge status={p.status} /> },
  ];

  const movementColumns = [
    {
      key: 'type',
      header: 'Type',
      render: (m: StockMovement) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-50">
            <MovementIcon type={m.type} />
          </div>
          <span className="font-500 text-ink-700">{movementLabel(m.type)}</span>
        </div>
      ),
    },
    {
      key: 'product',
      header: 'Product',
      render: (m: StockMovement) => <span className="text-ink-600 truncate max-w-[180px] block">{m.productName}</span>,
    },
    {
      key: 'qty',
      header: 'Qty',
      render: (m: StockMovement) => (
        <span className={`tabular-nums font-600 ${m.quantity < 0 ? 'text-danger-600' : 'text-accent-600'}`}>
          {m.quantity > 0 ? '+' : ''}{m.quantity}
        </span>
      ),
    },
    { key: 'user', header: 'By', render: (m: StockMovement) => <span className="text-ink-500">{m.user}</span> },
    {
      key: 'time',
      header: 'When',
      render: (m: StockMovement) => <span className="text-ink-400">{formatRelativeTime(m.timestamp)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Dashboard"
        description="Real-time overview of your inventory and supply chain operations"
        icon={<Package className="h-5 w-5" />}
        action={
          <>
            <Button variant="secondary" size="sm">Export</Button>
            <Button size="sm" icon={<Sparkles className="h-4 w-4" />}>Ask AI</Button>
          </>
        }
      />

      <div className="grid grid-cols-kpis gap-4">
        <KpiCard
          label="Total Products"
          value={totalProducts.toLocaleString()}
          deltaPct={4.2}
          icon={<Package className="h-5 w-5" />}
          accentClass="bg-brand-600"
          spark={[120, 132, 128, 140, 145, 152]}
          sparkColor="#1385fb"
        />
        <KpiCard
          label="Inventory Value"
          value={formatCurrency(inventoryValue, true)}
          deltaPct={8.6}
          icon={<DollarSign className="h-5 w-5" />}
          accentClass="bg-accent-600"
          spark={[1.2, 1.4, 1.5, 1.7, 1.9, 2.1]}
          sparkColor="#0ba364"
        />
        <KpiCard
          label="Low Stock Alerts"
          value={lowStock.length.toString()}
          deltaPct={-12}
          icon={<AlertTriangle className="h-5 w-5" />}
          accentClass="bg-warning-500"
          spark={[18, 14, 16, 12, 10, 8]}
          sparkColor="#e88410"
          sublabel="vs last week"
        />
        <KpiCard
          label="Monthly Sales"
          value={formatCurrency(monthlySales, true)}
          deltaPct={10.7}
          icon={<ShoppingCart className="h-5 w-5" />}
          accentClass="bg-brand-500"
          spark={[248, 271, 259, 312, 338, 374]}
          sparkColor="#41a7ff"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Sales Overview"
            subtitle="Revenue and order volume · last 6 months"
            icon={<ShoppingCart className="h-4 w-4" />}
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
              formatValue={(v) => formatCurrency(v, true)}
            />
          </div>
          <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3 text-xs text-ink-500">
            <span>Total revenue (6mo): <strong className="text-ink-800">{formatCurrency(salesData.reduce((s, d) => s + d.sales, 0))}</strong></span>
            <span>{salesData.reduce((s, d) => s + d.orders, 0).toLocaleString()} orders</span>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Inventory by Category"
            subtitle="Value distribution"
            icon={<Package className="h-4 w-4" />}
          />
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Low Stock Products"
            subtitle="Items at or below reorder level"
            icon={<AlertTriangle className="h-4 w-4" />}
            action={<Button variant="ghost" size="sm" onClick={() => onNavigate('products')}>View all <ArrowRight className="h-3.5 w-3.5" /></Button>}
          />
          <div className="mt-3">
            <Table columns={productColumns} data={lowStock} rowKey={(p) => p.id} onRowClick={() => onNavigate('products')} />
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="AI Recommendations"
            subtitle="Generated 2h ago"
            icon={<Sparkles className="h-4 w-4 text-brand-600" />}
            action={<Badge variant="brand">{aiRecommendations.length}</Badge>}
          />
          <div className="mt-2 max-h-[380px] space-y-1 overflow-y-auto px-3 pb-4 no-scrollbar">
            {aiRecommendations.slice(0, 4).map((rec: AiRecommendation) => {
              const Icon = typeIcon[rec.type];
              return (
                <div key={rec.id} className="rounded-xl p-3 transition-colors hover:bg-ink-50/70">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={priorityVariant[rec.priority]}>{rec.priority}</Badge>
                        <p className="text-xs text-ink-400">{rec.impact}</p>
                      </div>
                      <p className="mt-1.5 text-sm font-600 text-ink-800 leading-snug">{rec.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-500 line-clamp-2">{rec.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-ink-100 p-3">
            <Button variant="secondary" size="sm" className="w-full" onClick={() => onNavigate('ai-insights')}>
              View all insights <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Recent Stock Movements"
          subtitle="Latest inventory transactions across warehouses"
          icon={<Zap className="h-4 w-4" />}
          action={<Button variant="ghost" size="sm" onClick={() => onNavigate('inventory')}>View all <ArrowRight className="h-3.5 w-3.5" /></Button>}
        />
        <div className="mt-3">
          <Table columns={movementColumns} data={stockMovements.slice(0, 7)} rowKey={(m) => m.id} onRowClick={() => onNavigate('inventory')} />
        </div>
      </Card>
    </div>
  );
}
