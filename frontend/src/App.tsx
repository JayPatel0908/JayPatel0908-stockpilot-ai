import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { SuppliersPage } from '@/pages/SuppliersPage';
import { WarehousesPage } from '@/pages/WarehousesPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { AiInsightsPage } from '@/pages/AiInsightsPage';
import { PurchasesPage } from '@/pages/PurchasesPage';
import { SalesPage } from '@/pages/SalesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import type { PageKey } from '@/types';

const pageTitles: Record<PageKey, string> = {
  dashboard: 'Dashboard',
  products: 'Products',
  inventory: 'Inventory',
  warehouses: 'Warehouses',
  suppliers: 'Suppliers',
  purchases: 'Purchases',
  sales: 'Sales',
  analytics: 'Analytics',
  'ai-insights': 'AI Insights',
  settings: 'Settings',
};

function App() {
  const [page, setPage] = useState<PageKey>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (p: PageKey) => {
    setPage(p);
    setMobileOpen(false);
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case 'products':
        return <ProductsPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'warehouses':
        return <WarehousesPage />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'purchases':
        return <PurchasesPage />;
      case 'sales':
        return <SalesPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'ai-insights':
        return <AiInsightsPage onNavigate={navigate} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <AppLayout
      current={page}
      onNavigate={navigate}
      title={pageTitles[page]}
      mobileOpen={mobileOpen}
      onOpenMobile={() => setMobileOpen(true)}
      onCloseMobile={() => setMobileOpen(false)}
    >
      {renderPage()}
    </AppLayout>
  );
}

export default App;
