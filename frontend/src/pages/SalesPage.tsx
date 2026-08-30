import { TrendingUp, Download, Plus } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { AreaChart } from '@/components/charts/AreaChart';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { recentOrders, salesData, topProducts } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/format';

const statusVariant: Record<string, 'success' | 'info' | 'warning' | 'neutral'> = {
  fulfilled: 'success',
  shipped: 'info',
  picking: 'warning',
  pending: 'neutral',
};

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

export function SalesPage() {
  const columns = [
    { key: 'id', header: 'Order #', render: (o: Order) => <span className="font-600 text-ink-800">{o.id}</span> },
    { key: 'customer', header: 'Customer', render: (o: Order) => <span className="text-ink-600">{o.customer}</span> },
    { key: 'date', header: 'Date', render: (o: Order) => <span className="text-ink-500">{formatDate(o.date)}</span> },
    { key: 'items', header: 'Items', render: (o: Order) => <span className="tabular-nums text-ink-600">{o.items}</span> },
    { key: 'total', header: 'Total', render: (o: Order) => <span className="tabular-nums font-600 text-ink-800">{formatCurrency(o.total)}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (o: Order) => <Badge variant={statusVariant[o.status] ?? 'neutral'}>{o.status}</Badge>,
    },
  ];

  const totalRevenue = recentOrders.reduce((s, o) => s + o.total, 0);
  const avgOrder = totalRevenue / recentOrders.length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Sales"
        description="Track orders, revenue, and customer demand"
        icon={<TrendingUp className="h-5 w-5" />}
        action={
          <>
            <Button variant="secondary" size="sm" icon={<Download className="h-4 w-4" />}>Export</Button>
            <Button size="sm" icon={<Plus className="h-4 w-4" />}>New Order</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-600 uppercase text-ink-400">Revenue (30d)</p>
          <p className="mt-1 font-display text-2xl font-800 text-ink-900">{formatCurrency(salesData.reduce((s, d) => s + d.sales, 0))}</p>
          <p className="mt-0.5 text-xs font-600 text-accent-600">+10.7% vs prev</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-600 uppercase text-ink-400">Orders (30d)</p>
          <p className="mt-1 font-display text-2xl font-800 text-ink-900">{salesData.reduce((s, d) => s + d.orders, 0).toLocaleString()}</p>
          <p className="mt-0.5 text-xs font-600 text-accent-600">+11.2% vs prev</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-600 uppercase text-ink-400">Avg Order Value</p>
          <p className="mt-1 font-display text-2xl font-800 text-ink-900">{formatCurrency(avgOrder)}</p>
          <p className="mt-0.5 text-xs font-600 text-ink-400">flat</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-600 uppercase text-ink-400">Fulfillment Rate</p>
          <p className="mt-1 font-display text-2xl font-800 text-ink-900">98.4%</p>
          <p className="mt-0.5 text-xs font-600 text-accent-600">+1.2%</p>
        </Card>
      </div>

      <Card>
        <CardHeader title="Revenue Trend" subtitle="Monthly sales revenue" icon={<TrendingUp className="h-4 w-4" />} />
        <div className="px-3 pb-3 pt-4">
          <AreaChart data={salesData.map((d) => d.sales)} labels={salesData.map((d) => d.month)} height={240} formatValue={(v) => formatCurrency(v, true)} />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader title="Recent Orders" subtitle={`${recentOrders.length} orders`} icon={<TrendingUp className="h-4 w-4" />} />
          <div className="mt-3">
            <Table columns={columns} data={recentOrders} rowKey={(o) => o.id} />
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader title="Top Products by Revenue" subtitle="Best performers" icon={<TrendingUp className="h-4 w-4" />} />
          <div className="mt-3">
            <Table
              columns={[
                { key: 'name', header: 'Product', render: (p: typeof topProducts[number]) => <span className="font-600 text-ink-800 truncate max-w-[180px] block">{p.name}</span> },
                { key: 'unitsSold', header: 'Units', render: (p: typeof topProducts[number]) => <span className="tabular-nums text-ink-600">{p.unitsSold.toLocaleString()}</span> },
                { key: 'revenue', header: 'Revenue', render: (p: typeof topProducts[number]) => <span className="tabular-nums font-600 text-ink-800">{formatCurrency(p.revenue)}</span> },
              ]}
              data={topProducts}
              rowKey={(p) => p.id}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
