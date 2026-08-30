import {
  LayoutDashboard,
  Package,
  Warehouse as WarehouseIcon,
  Truck,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  Sparkles,
  Settings,
  Boxes,
  X,
} from 'lucide-react';
import type { PageKey } from '@/types';
import { cx } from '@/lib/cx';

interface NavItem {
  key: PageKey;
  label: string;
  icon: typeof LayoutDashboard;
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { key: 'analytics', label: 'Analytics', icon: BarChart3 },
      { key: 'ai-insights', label: 'AI Insights', icon: Sparkles },
    ],
  },
  {
    label: 'Operations',
    items: [
      { key: 'products', label: 'Products', icon: Package },
      { key: 'inventory', label: 'Inventory', icon: Boxes },
      { key: 'warehouses', label: 'Warehouses', icon: WarehouseIcon },
      { key: 'suppliers', label: 'Suppliers', icon: Truck },
    ],
  },
  {
    label: 'Transactions',
    items: [
      { key: 'purchases', label: 'Purchases', icon: ShoppingCart },
      { key: 'sales', label: 'Sales', icon: TrendingUp },
    ],
  },
  {
    label: 'System',
    items: [{ key: 'settings', label: 'Settings', icon: Settings }],
  },
];

interface SidebarProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cx(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-ink-200/70 bg-white transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink-200/70 px-5">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
              <Boxes className="h-5 w-5 text-white" strokeWidth={2.4} />
            </div>
            <div className="leading-tight">
              <p className="font-display text-base font-800 text-ink-900">StockPilot</p>
              <p className="text-[10px] font-600 uppercase tracking-wider text-brand-600">AI Inventory</p>
            </div>
          </div>
          <button onClick={onCloseMobile} className="btn-ghost lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 no-scrollbar">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-3 pb-1.5 text-[10px] font-700 uppercase tracking-wider text-ink-300">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = current === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => onNavigate(item.key)}
                      className={cx('nav-item', active && 'nav-item-active')}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
                      <span>{item.label}</span>
                      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-ink-200/70 p-3">
          <div className="rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 p-3.5 ring-1 ring-brand-100/60">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-600" />
              <p className="text-xs font-700 text-ink-800">AI Copilot</p>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink-500">
              5 new recommendations ready for review.
            </p>
            <button
              onClick={() => onNavigate('ai-insights')}
              className="mt-2 text-xs font-600 text-brand-600 hover:text-brand-700"
            >
              View insights →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
