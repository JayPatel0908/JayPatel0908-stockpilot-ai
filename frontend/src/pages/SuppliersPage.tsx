import { Truck, Mail, Phone, Plus, Star, MapPin, Clock, Package } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { suppliers } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';
import type { Supplier } from '@/types';

function scoreColor(score: number): string {
  if (score >= 90) return 'bg-accent-500';
  if (score >= 80) return 'bg-brand-500';
  if (score >= 70) return 'bg-warning-500';
  return 'bg-danger-500';
}

function scoreVariant(score: number): 'success' | 'info' | 'warning' | 'danger' {
  if (score >= 90) return 'success';
  if (score >= 80) return 'info';
  if (score >= 70) return 'warning';
  return 'danger';
}

export function SuppliersPage() {
  const columns = [
    {
      key: 'name',
      header: 'Supplier',
      render: (s: Supplier) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ink-100 to-ink-200 font-700 text-ink-600">
            {s.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-600 text-ink-800 truncate max-w-[200px]">{s.name}</p>
            <p className="text-xs text-ink-400">{s.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      header: 'Contact',
      render: (s: Supplier) => (
        <div className="space-y-0.5">
          <p className="text-sm font-500 text-ink-700">{s.contactName}</p>
          <p className="flex items-center gap-1 text-xs text-ink-400"><Mail className="h-3 w-3" /> {s.email}</p>
          <p className="flex items-center gap-1 text-xs text-ink-400"><Phone className="h-3 w-3" /> {s.phone}</p>
        </div>
      ),
    },
    {
      key: 'country',
      header: 'Location',
      render: (s: Supplier) => (
        <span className="flex items-center gap-1.5 text-ink-600"><MapPin className="h-3.5 w-3.5 text-ink-400" /> {s.country}</span>
      ),
    },
    {
      key: 'performance',
      header: 'Performance',
      render: (s: Supplier) => (
        <div className="w-36">
          <div className="mb-1 flex items-center justify-between">
            <Badge variant={scoreVariant(s.performanceScore)}>
              <Star className="h-3 w-3" /> {s.performanceScore}
            </Badge>
            <span className="text-xs text-ink-400">{s.onTimeRate}% on-time</span>
          </div>
          <ProgressBar value={s.performanceScore} colorClass={scoreColor(s.performanceScore)} />
        </div>
      ),
    },
    {
      key: 'leadTime',
      header: 'Lead Time',
      render: (s: Supplier) => (
        <span className="flex items-center gap-1.5 text-ink-600 tabular-nums"><Clock className="h-3.5 w-3.5 text-ink-400" /> {s.leadTimeDays}d</span>
      ),
    },
    {
      key: 'purchases',
      header: 'Purchase History',
      render: (s: Supplier) => (
        <div>
          <p className="font-600 text-ink-800 tabular-nums">{formatCurrency(s.totalPurchases, true)}</p>
          <p className="text-xs text-ink-400">{s.openOrders} open orders</p>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <div className="flex items-center gap-1">
          <button className="btn-ghost text-xs">View</button>
          <button className="btn-ghost text-xs">Order</button>
        </div>
      ),
    },
  ];

  const avgScore = Math.round(suppliers.reduce((s, sup) => s + sup.performanceScore, 0) / suppliers.length);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Suppliers"
        description="Manage vendor relationships and track procurement performance"
        icon={<Truck className="h-5 w-5" />}
        action={<Button size="sm" icon={<Plus className="h-4 w-4" />}>Add Supplier</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Truck className="h-5 w-5" /></div>
            <div><p className="text-xs font-600 uppercase text-ink-400">Total Suppliers</p><p className="font-display text-xl font-800 text-ink-900">{suppliers.length}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600"><Star className="h-5 w-5" /></div>
            <div><p className="text-xs font-600 uppercase text-ink-400">Avg Performance</p><p className="font-display text-xl font-800 text-ink-900">{avgScore}<span className="text-sm text-ink-400">/100</span></p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-50 text-warning-600"><Package className="h-5 w-5" /></div>
            <div><p className="text-xs font-600 uppercase text-ink-400">Open Orders</p><p className="font-display text-xl font-800 text-ink-900">{suppliers.reduce((s, sup) => s + sup.openOrders, 0)}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Clock className="h-5 w-5" /></div>
            <div><p className="text-xs font-600 uppercase text-ink-400">Avg Lead Time</p><p className="font-display text-xl font-800 text-ink-900">{Math.round(suppliers.reduce((s, sup) => s + sup.leadTimeDays, 0) / suppliers.length)}<span className="text-sm text-ink-400"> days</span></p></div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader title="Supplier Directory" subtitle={`${suppliers.length} active suppliers`} icon={<Truck className="h-4 w-4" />} />
        <div className="mt-3">
          <Table columns={columns} data={suppliers} rowKey={(s) => s.id} />
        </div>
      </Card>
    </div>
  );
}
