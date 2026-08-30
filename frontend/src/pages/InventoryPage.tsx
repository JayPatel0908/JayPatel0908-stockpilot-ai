import { useState } from 'react';
import {
  Boxes,
  ArrowDownRight,
  ArrowUpRight,
  SlidersHorizontal,
  ArrowRightLeft,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MovementIcon, movementLabel, StatusBadge } from '@/components/dashboard/StatusHelpers';
import { products, stockMovements, warehouses } from '@/data/mockData';
import { formatCurrency, formatRelativeTime } from '@/lib/format';
import type { StockMovement, MovementType } from '@/types';

const stockSummary = [
  {
    label: 'Stock In (30d)',
    value: '4,320 units',
    sub: '12 receipts',
    icon: ArrowDownRight,
    color: 'text-accent-600',
    bg: 'bg-accent-50',
  },
  {
    label: 'Stock Out (30d)',
    value: '3,180 units',
    sub: '284 orders',
    icon: ArrowUpRight,
    color: 'text-danger-600',
    bg: 'bg-danger-50',
  },
  {
    label: 'Adjustments (30d)',
    value: '48 entries',
    sub: '−26 net units',
    icon: SlidersHorizontal,
    color: 'text-warning-600',
    bg: 'bg-warning-50',
  },
  {
    label: 'Transfers (30d)',
    value: '640 units',
    sub: '8 transfers',
    icon: ArrowRightLeft,
    color: 'text-brand-600',
    bg: 'bg-brand-50',
  },
];

const adjustmentActions = [
  { label: 'Stock In', desc: 'Receive new inventory', icon: Plus, variant: 'primary' as const, type: 'stock_in' as MovementType },
  { label: 'Stock Out', desc: 'Remove or dispatch units', icon: Minus, variant: 'secondary' as const, type: 'stock_out' as MovementType },
  { label: 'Transfer', desc: 'Move between warehouses', icon: ArrowRightLeft, variant: 'secondary' as const, type: 'transfer' as MovementType },
  { label: 'Adjust', desc: 'Correct count discrepancies', icon: SlidersHorizontal, variant: 'secondary' as const, type: 'adjustment' as MovementType },
];

export function InventoryPage() {
  const [activeAction, setActiveAction] = useState<MovementType | null>(null);

  const totalUnits = products.reduce((s, p) => s + p.stock, 0);
  const totalValue = products.reduce((s, p) => s + p.stock * p.unitPrice, 0);

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
      render: (m: StockMovement) => (
        <div className="min-w-0">
          <p className="font-500 text-ink-700 truncate max-w-[200px]">{m.productName}</p>
          <p className="text-xs text-ink-400">{m.productId}</p>
        </div>
      ),
    },
    {
      key: 'qty',
      header: 'Quantity',
      render: (m: StockMovement) => (
        <span className={`tabular-nums font-600 ${m.quantity < 0 ? 'text-danger-600' : 'text-accent-600'}`}>
          {m.quantity > 0 ? '+' : ''}{m.quantity}
        </span>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (m: StockMovement) => (
        <span className="text-xs text-ink-500">
          {m.fromWarehouse && <span>{m.fromWarehouse}</span>}
          {m.fromWarehouse && m.toWarehouse && <span className="text-ink-300"> → </span>}
          {m.toWarehouse && <span>{m.toWarehouse}</span>}
          {!m.fromWarehouse && !m.toWarehouse && '—'}
        </span>
      ),
    },
    { key: 'user', header: 'User', render: (m: StockMovement) => <span className="text-ink-500">{m.user}</span> },
    { key: 'note', header: 'Note', render: (m: StockMovement) => <span className="text-ink-400 text-xs">{m.note ?? '—'}</span> },
    {
      key: 'time',
      header: 'When',
      render: (m: StockMovement) => <span className="text-ink-400">{formatRelativeTime(m.timestamp)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Inventory"
        description="Track stock levels, movements, and warehouse balances"
        icon={<Boxes className="h-5 w-5" />}
        action={<Button size="sm" icon={<RotateCcw className="h-4 w-4" />}>Sync Stock</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stockSummary.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-600 uppercase tracking-wide text-ink-400">{s.label}</p>
                  <p className="font-display text-lg font-800 text-ink-900">{s.value}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-ink-400">{s.sub}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Current Stock Overview"
            subtitle="Total units and value across all warehouses"
            icon={<Boxes className="h-4 w-4" />}
          />
          <div className="grid gap-4 p-5 sm:grid-cols-3">
            <div className="rounded-xl bg-ink-50 p-4">
              <p className="text-xs font-600 uppercase tracking-wide text-ink-400">Total Units</p>
              <p className="mt-1 font-display text-2xl font-800 text-ink-900 tabular-nums">{totalUnits.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-ink-50 p-4">
              <p className="text-xs font-600 uppercase tracking-wide text-ink-400">Stock Value</p>
              <p className="mt-1 font-display text-2xl font-800 text-ink-900 tabular-nums">{formatCurrency(totalValue, true)}</p>
            </div>
            <div className="rounded-xl bg-ink-50 p-4">
              <p className="text-xs font-600 uppercase tracking-wide text-ink-400">Avg Unit Value</p>
              <p className="mt-1 font-display text-2xl font-800 text-ink-900 tabular-nums">{formatCurrency(totalValue / totalUnits)}</p>
            </div>
          </div>
          <div className="space-y-4 px-5 pb-5">
            {warehouses.map((w) => {
              const pct = (w.used / w.capacity) * 100;
              const color = pct > 85 ? 'bg-danger-500' : pct > 65 ? 'bg-warning-500' : 'bg-accent-500';
              return (
                <div key={w.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-600 text-ink-700">{w.name}</span>
                    <span className="text-xs text-ink-400 tabular-nums">
                      {w.used.toLocaleString()} / {w.capacity.toLocaleString()} units
                    </span>
                  </div>
                  <ProgressBar value={w.used} max={w.capacity} colorClass={color} />
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader title="Stock Actions" subtitle="Record inventory changes" icon={<SlidersHorizontal className="h-4 w-4" />} />
          <div className="grid gap-3 p-5 sm:grid-cols-2">
            {adjustmentActions.map((a) => {
              const Icon = a.icon;
              const isActive = activeAction === a.type;
              return (
                <button
                  key={a.label}
                  onClick={() => setActiveAction(isActive ? null : a.type)}
                  className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? 'border-brand-400 bg-brand-50 ring-2 ring-brand-100'
                      : 'border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50'
                  }`}
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive ? 'bg-brand-600 text-white' : 'bg-ink-50 text-ink-500'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-600 text-ink-800">{a.label}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{a.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          {activeAction && (
            <div className="border-t border-ink-100 p-4 animate-fade-in">
              <p className="text-xs font-600 text-ink-500 mb-2">New {movementLabel(activeAction)} entry</p>
              <div className="space-y-2">
                <select className="input" defaultValue="">
                  <option value="" disabled>Select product…</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
                <input type="number" placeholder="Quantity" className="input" />
                <select className="input" defaultValue="">
                  <option value="" disabled>Warehouse…</option>
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
                <Button size="sm" className="w-full">Save Entry</Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title="Recent Movements"
          subtitle="Latest stock transactions"
          icon={<ArrowRightLeft className="h-4 w-4" />}
        />
        <div className="mt-3">
          <Table columns={movementColumns} data={stockMovements} rowKey={(m) => m.id} />
        </div>
      </Card>
    </div>
  );
}
