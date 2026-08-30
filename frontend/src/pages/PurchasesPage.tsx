import { ShoppingCart, Plus, Download } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { purchaseOrders, suppliers } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/format';

const statusVariant: Record<string, 'success' | 'info' | 'warning' | 'neutral'> = {
  received: 'success',
  in_transit: 'info',
  pending: 'warning',
};

interface PO {
  id: string;
  supplier: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

export function PurchasesPage() {
  const columns = [
    { key: 'id', header: 'PO Number', render: (p: PO) => <span className="font-600 text-ink-800">{p.id}</span> },
    { key: 'supplier', header: 'Supplier', render: (p: PO) => <span className="text-ink-600">{p.supplier}</span> },
    { key: 'date', header: 'Date', render: (p: PO) => <span className="text-ink-500">{formatDate(p.date)}</span> },
    { key: 'items', header: 'Items', render: (p: PO) => <span className="tabular-nums text-ink-600">{p.items}</span> },
    { key: 'total', header: 'Total', render: (p: PO) => <span className="tabular-nums font-600 text-ink-800">{formatCurrency(p.total)}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (p: PO) => <Badge variant={statusVariant[p.status] ?? 'neutral'}>{p.status.replace('_', ' ')}</Badge>,
    },
    { key: 'actions', header: '', render: () => <button className="btn-ghost text-xs">View</button> },
  ];

  const totalSpend = purchaseOrders.reduce((s, p) => s + p.total, 0);
  const pending = purchaseOrders.filter((p) => p.status === 'pending').length;
  const inTransit = purchaseOrders.filter((p) => p.status === 'in_transit').length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Purchases"
        description="Manage purchase orders and track procurement spend"
        icon={<ShoppingCart className="h-5 w-5" />}
        action={
          <>
            <Button variant="secondary" size="sm" icon={<Download className="h-4 w-4" />}>Export</Button>
            <Button size="sm" icon={<Plus className="h-4 w-4" />}>New PO</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-600 uppercase text-ink-400">Total Spend (30d)</p>
          <p className="mt-1 font-display text-2xl font-800 text-ink-900">{formatCurrency(totalSpend)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-600 uppercase text-ink-400">Pending Orders</p>
          <p className="mt-1 font-display text-2xl font-800 text-ink-900">{pending}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-600 uppercase text-ink-400">In Transit</p>
          <p className="mt-1 font-display text-2xl font-800 text-ink-900">{inTransit}</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader title="Purchase Orders" subtitle={`${purchaseOrders.length} orders`} icon={<ShoppingCart className="h-4 w-4" />} />
        <div className="mt-3">
          <Table columns={columns} data={purchaseOrders} rowKey={(p) => p.id} />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader title="Supplier Spend Breakdown" subtitle="Procurement by vendor" icon={<Download className="h-4 w-4" />} />
        <div className="mt-3">
          <Table
            columns={[
              { key: 'name', header: 'Supplier', render: (s: typeof suppliers[number]) => <span className="font-600 text-ink-800">{s.name}</span> },
              { key: 'category', header: 'Category', render: (s: typeof suppliers[number]) => <span className="text-ink-500">{s.category}</span> },
              { key: 'totalPurchases', header: 'Total Spend', render: (s: typeof suppliers[number]) => <span className="tabular-nums font-600 text-ink-800">{formatCurrency(s.totalPurchases)}</span> },
              { key: 'openOrders', header: 'Open POs', render: (s: typeof suppliers[number]) => <span className="tabular-nums text-ink-600">{s.openOrders}</span> },
            ]}
            data={suppliers}
            rowKey={(s) => s.id}
          />
        </div>
      </Card>
    </div>
  );
}
