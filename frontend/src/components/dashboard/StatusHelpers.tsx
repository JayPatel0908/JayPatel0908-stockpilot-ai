import type { ProductStatus, MovementType } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ArrowDownRight, ArrowUpRight, ArrowRightLeft, SlidersHorizontal } from 'lucide-react';

export function StatusBadge({ status }: { status: ProductStatus }) {
  if (status === 'in_stock') return <Badge variant="success">In Stock</Badge>;
  if (status === 'low_stock') return <Badge variant="warning">Low Stock</Badge>;
  return <Badge variant="danger">Out of Stock</Badge>;
}

export function MovementIcon({ type }: { type: MovementType }) {
  if (type === 'stock_in') return <ArrowDownRight className="h-4 w-4 text-accent-600" />;
  if (type === 'stock_out') return <ArrowUpRight className="h-4 w-4 text-danger-600" />;
  if (type === 'transfer') return <ArrowRightLeft className="h-4 w-4 text-brand-600" />;
  return <SlidersHorizontal className="h-4 w-4 text-warning-600" />;
}

export function movementLabel(type: MovementType): string {
  return { stock_in: 'Stock In', stock_out: 'Stock Out', transfer: 'Transfer', adjustment: 'Adjustment' }[type];
}
