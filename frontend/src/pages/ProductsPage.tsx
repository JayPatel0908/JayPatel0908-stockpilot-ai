import { useMemo, useState } from 'react';
import { Package, Search, Plus, Filter, Download, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/dashboard/StatusHelpers';
import { products } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';
import { cx } from '@/lib/cx';
import type { Product, ProductStatus } from '@/types';

const categories = ['All', 'Electronics', 'Furniture', 'Home Goods', 'Accessories', 'Outdoor'];
const statusOptions: { key: 'all' | ProductStatus; label: string }[] = [
  { key: 'all', label: 'All Status' },
  { key: 'in_stock', label: 'In Stock' },
  { key: 'low_stock', label: 'Low Stock' },
  { key: 'out_of_stock', label: 'Out of Stock' },
];

export function ProductsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState<'all' | ProductStatus>('all');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCat = category === 'All' || p.category === category;
      const matchesStatus = status === 'all' || p.status === status;
      return matchesQuery && matchesCat && matchesStatus;
    });
  }, [query, category, status]);

  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (p: Product) => (
        <div className="flex items-center gap-3">
          <img src={p.image} alt="" className="h-11 w-11 rounded-lg object-cover ring-1 ring-ink-200" />
          <div className="min-w-0">
            <p className="font-600 text-ink-800 truncate max-w-[220px]">{p.name}</p>
            <p className="text-xs text-ink-400">{p.sku}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', header: 'Category', render: (p: Product) => <Badge variant="neutral">{p.category}</Badge> },
    {
      key: 'stock',
      header: 'Stock Qty',
      render: (p: Product) => (
        <div className="flex items-center gap-2">
          <span className="tabular-nums font-600 text-ink-800">{p.stock.toLocaleString()}</span>
          <span className="text-xs text-ink-400">/ {p.reorderLevel} min</span>
        </div>
      ),
    },
    {
      key: 'unitPrice',
      header: 'Unit Price',
      render: (p: Product) => <span className="tabular-nums text-ink-700">{formatCurrency(p.unitPrice)}</span>,
    },
    {
      key: 'value',
      header: 'Stock Value',
      render: (p: Product) => <span className="tabular-nums font-600 text-ink-800">{formatCurrency(p.stock * p.unitPrice)}</span>,
    },
    { key: 'status', header: 'Status', render: (p: Product) => <StatusBadge status={p.status} /> },
    {
      key: 'actions',
      header: '',
      render: () => (
        <button className="btn-ghost text-xs">Edit</button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Products"
        description="Manage your product catalog, pricing, and stock levels"
        icon={<Package className="h-5 w-5" />}
        action={
          <>
            <Button variant="secondary" size="sm" icon={<Download className="h-4 w-4" />}>Export</Button>
            <Button size="sm" icon={<Plus className="h-4 w-4" />}>Add Product</Button>
          </>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name or SKU…"
              className="input pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input pl-8 pr-8 appearance-none cursor-pointer w-auto"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
            </div>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'all' | ProductStatus)}
                className="input pr-8 appearance-none cursor-pointer w-auto"
              >
                {statusOptions.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-ink-400">
          <span className={cx('badge bg-ink-100 text-ink-600')}>{filtered.length} products</span>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <Table columns={columns} data={filtered} rowKey={(p) => p.id} emptyMessage="No products match your filters" />
      </Card>
    </div>
  );
}
