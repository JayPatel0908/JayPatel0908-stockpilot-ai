import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import type { PageKey } from '@/types';

interface AppLayoutProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  title: string;
  mobileOpen: boolean;
  onOpenMobile: () => void;
  onCloseMobile: () => void;
  children: ReactNode;
}

export function AppLayout({ current, onNavigate, title, mobileOpen, onOpenMobile, onCloseMobile, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar current={current} onNavigate={onNavigate} mobileOpen={mobileOpen} onCloseMobile={onCloseMobile} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onOpenMobile={onOpenMobile} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px] animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
