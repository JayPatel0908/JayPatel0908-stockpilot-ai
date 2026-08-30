export type ProductStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
  cost: number;
  warehouseId: string;
  supplierId: string;
  image: string;
  status: ProductStatus;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  performanceScore: number;
  onTimeRate: number;
  leadTimeDays: number;
  totalPurchases: number;
  openOrders: number;
  category: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  used: number;
  productCount: number;
  stockValue: number;
  manager: string;
}

export type MovementType = 'stock_in' | 'stock_out' | 'adjustment' | 'transfer';

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: MovementType;
  quantity: number;
  fromWarehouse?: string;
  toWarehouse?: string;
  user: string;
  timestamp: string;
  note?: string;
}

export interface KpiTrend {
  value: number;
  deltaPct: number;
  sparkline: number[];
}

export interface AiRecommendation {
  id: string;
  type: 'restock' | 'overstock' | 'pricing' | 'supplier' | 'forecast';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  action: string;
}

export interface SalesPoint {
  month: string;
  sales: number;
  orders: number;
}

export interface CategoryShare {
  category: string;
  value: number;
  color: string;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sku: string;
  revenue: number;
  unitsSold: number;
  turnoverRate: number;
}

export type PageKey =
  | 'dashboard'
  | 'products'
  | 'inventory'
  | 'warehouses'
  | 'suppliers'
  | 'purchases'
  | 'sales'
  | 'analytics'
  | 'ai-insights'
  | 'settings';
