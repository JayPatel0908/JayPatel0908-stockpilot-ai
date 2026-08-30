import {
  Warehouse as WarehouseIcon,
  MapPin,
  Package,
  DollarSign,
  TrendingUp,
  Plus,
  Users,
  Boxes,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Sparkline } from '@/components/charts/Sparkline';
import { warehouses } from '@/data/mockData';
import { formatCurrency, formatNumber } from '@/lib/format';

export function WarehousesPage() {
  const totalCapacity = warehouses.reduce((s, w) => s + w.capacity, 0);
  const totalUsed = warehouses.reduce((s, w) => s + w.used, 0);
  const totalValue = warehouses.reduce((s, w) => s + w.stockValue, 0);
  const totalProducts = warehouses.reduce((s, w) => s + w.productCount, 0);
  const overallPct = (totalUsed / totalCapacity) * 100;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Warehouses"
        description="Monitor capacity, stock value, and utilization across locations"
        icon={<WarehouseIcon className="h-5 w-5" />}
        action={<Button size="sm" icon={<Plus className="h-4 w-4" />}>Add Warehouse</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><WarehouseIcon className="h-5 w-5" /></div>
            <div><p className="text-xs font-600 uppercase text-ink-400">Warehouses</p><p className="font-display text-xl font-800 text-ink-900">{warehouses.length}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600"><DollarSign className="h-5 w-5" /></div>
            <div><p className="text-xs font-600 uppercase text-ink-400">Total Stock Value</p><p className="font-display text-xl font-800 text-ink-900">{formatCurrency(totalValue, true)}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-50 text-warning-600"><Boxes className="h-5 w-5" /></div>
            <div><p className="text-xs font-600 uppercase text-ink-400">Capacity Used</p><p className="font-display text-xl font-800 text-ink-900">{overallPct.toFixed(0)}%</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Package className="h-5 w-5" /></div>
            <div><p className="text-xs font-600 uppercase text-ink-400">Products Stored</p><p className="font-display text-xl font-800 text-ink-900">{formatNumber(totalProducts)}</p></div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {warehouses.map((w, idx) => {
          const pct = (w.used / w.capacity) * 100;
          const status = pct > 85 ? 'danger' : pct > 65 ? 'warning' : 'success';
          const statusLabel = pct > 85 ? 'Near Capacity' : pct > 65 ? 'High Usage' : 'Healthy';
          const color = pct > 85 ? 'bg-danger-500' : pct > 65 ? 'bg-warning-500' : 'bg-accent-500';
          const sparkColors = ['#0ba364', '#1385fb', '#e88410'];
          return (
            <Card key={w.id} className="overflow-hidden transition-all duration-200 hover:shadow-card-lg">
              <div className="relative h-24 bg-gradient-to-br from-brand-600 to-brand-800 p-5">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="font-display text-base font-800 text-white">{w.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-brand-100"><MapPin className="h-3 w-3" /> {w.location}</p>
                  </div>
                  <Badge variant={status}>{statusLabel}</Badge>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-600 text-ink-700">Capacity Usage</span>
                    <span className="text-xs text-ink-400 tabular-nums">{pct.toFixed(0)}%</span>
                  </div>
                  <ProgressBar value={w.used} max={w.capacity} colorClass={color} />
                  <p className="mt-1.5 text-xs text-ink-400 tabular-nums">
                    {formatNumber(w.used)} / {formatNumber(w.capacity)} units
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-ink-50 p-3">
                    <DollarSign className="h-4 w-4 text-ink-400 mb-1" />
                    <p className="text-xs text-ink-400">Stock Value</p>
                    <p className="font-display text-sm font-700 text-ink-800">{formatCurrency(w.stockValue, true)}</p>
                  </div>
                  <div className="rounded-lg bg-ink-50 p-3">
                    <Package className="h-4 w-4 text-ink-400 mb-1" />
                    <p className="text-xs text-ink-400">Products</p>
                    <p className="font-display text-sm font-700 text-ink-800">{formatNumber(w.productCount)}</p>
                  </div>
                  <div className="rounded-lg bg-ink-50 p-3">
                    <Users className="h-4 w-4 text-ink-400 mb-1" />
                    <p className="text-xs text-ink-400">Manager</p>
                    <p className="font-display text-sm font-700 text-ink-800 truncate">{w.manager.split(' ')[0]}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-ink-400" />
                    <span className="text-xs text-ink-400">Inflow trend</span>
                  </div>
                  <Sparkline
                    data={[20, 35, 28, 42, 38, 52, 48].map((v) => v * (idx + 1))}
                    width={80}
                    height={24}
                    color={sparkColors[idx]}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
