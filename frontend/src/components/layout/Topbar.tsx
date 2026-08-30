import { Search, Bell, Menu, ChevronDown, Calendar } from 'lucide-react';

interface TopbarProps {
  title: string;
  onOpenMobile: () => void;
}

export function Topbar({ title, onOpenMobile }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-ink-200/70 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <button onClick={onOpenMobile} className="btn-ghost lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden sm:block">
        <p className="text-xs text-ink-400">Welcome back, Elena</p>
        <h2 className="font-display text-sm font-700 text-ink-800">{title}</h2>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            placeholder="Search products, SKU, orders…"
            className="w-56 rounded-lg border border-ink-200 bg-ink-50/60 py-2 pl-9 pr-3 text-sm text-ink-700 placeholder:text-ink-400 transition-all focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 lg:w-72"
          />
        </div>

        <button className="btn-secondary hidden items-center gap-2 sm:flex">
          <Calendar className="h-4 w-4 text-ink-400" />
          <span className="text-xs">Aug 1 – 30, 2026</span>
          <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
        </button>

        <button className="relative btn-ghost">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-danger-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-danger-500" />
          </span>
        </button>

        <div className="flex items-center gap-2 rounded-lg border border-ink-200 py-1 pl-1 pr-2.5 transition-colors hover:bg-ink-50">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-700 text-white">
            ER
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-600 text-ink-800">Elena Rivera</p>
            <p className="text-[10px] text-ink-400">Operations Lead</p>
          </div>
          <ChevronDown className="hidden h-3.5 w-3.5 text-ink-400 sm:block" />
        </div>
      </div>
    </header>
  );
}
