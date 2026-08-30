import type {
  Product,
  Supplier,
  Warehouse,
  StockMovement,
  AiRecommendation,
  SalesPoint,
  CategoryShare,
  TrendPoint,
  TopProduct,
} from '@/types';

export const products: Product[] = [
  { id: 'P-1001', name: 'Aurora Wireless Earbuds Pro', sku: 'AWE-PRO-001', category: 'Electronics', stock: 1240, reorderLevel: 300, unitPrice: 149.0, cost: 82.0, warehouseId: 'W-01', supplierId: 'S-04', image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1002', name: 'Nimbus Mechanical Keyboard', sku: 'NMK-87-BLK', category: 'Electronics', stock: 86, reorderLevel: 120, unitPrice: 119.0, cost: 64.0, warehouseId: 'W-01', supplierId: 'S-02', image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'low_stock' },
  { id: 'P-1003', name: 'Vertex 27" 4K Monitor', sku: 'VX-27-4K', category: 'Electronics', stock: 0, reorderLevel: 40, unitPrice: 389.0, cost: 240.0, warehouseId: 'W-02', supplierId: 'S-04', image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'out_of_stock' },
  { id: 'P-1004', name: 'Helix Ergonomic Office Chair', sku: 'HEL-ERG-GRY', category: 'Furniture', stock: 212, reorderLevel: 60, unitPrice: 329.0, cost: 188.0, warehouseId: 'W-03', supplierId: 'S-01', image: 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1005', name: 'Lumen Smart LED Bulb (4-pack)', sku: 'LUM-LED-4P', category: 'Home Goods', stock: 1820, reorderLevel: 400, unitPrice: 32.0, cost: 14.0, warehouseId: 'W-02', supplierId: 'S-05', image: 'https://images.pexels.com/photos/4226856/pexels-photo-4226856.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1006', name: 'Pulse Fitness Tracker V3', sku: 'PUL-FT-V3', category: 'Electronics', stock: 54, reorderLevel: 150, unitPrice: 89.0, cost: 41.0, warehouseId: 'W-01', supplierId: 'S-04', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'low_stock' },
  { id: 'P-1007', name: 'Cascade Stainless Water Bottle', sku: 'CAS-WB-750', category: 'Home Goods', stock: 940, reorderLevel: 250, unitPrice: 24.0, cost: 8.5, warehouseId: 'W-03', supplierId: 'S-03', image: 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1008', name: 'Atlas Standing Desk Converter', sku: 'ATL-SDC-01', category: 'Furniture', stock: 38, reorderLevel: 50, unitPrice: 219.0, cost: 132.0, warehouseId: 'W-03', supplierId: 'S-01', image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'low_stock' },
  { id: 'P-1009', name: 'Orbit Bluetooth Speaker', sku: 'ORB-BS-50', category: 'Electronics', stock: 410, reorderLevel: 100, unitPrice: 79.0, cost: 36.0, warehouseId: 'W-02', supplierId: 'S-02', image: 'https://images.pexels.com/photos/1666320/pexels-photo-1666320.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1010', name: 'Sable Leather Laptop Bag', sku: 'SAB-LB-15', category: 'Accessories', stock: 176, reorderLevel: 80, unitPrice: 139.0, cost: 68.0, warehouseId: 'W-01', supplierId: 'S-06', image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1011', name: 'Quartz Aromatic Candle Set', sku: 'QZ-AC-SET', category: 'Home Goods', stock: 0, reorderLevel: 200, unitPrice: 45.0, cost: 16.0, warehouseId: 'W-02', supplierId: 'S-03', image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'out_of_stock' },
  { id: 'P-1012', name: 'Nimbus USB-C Hub 8-in-1', sku: 'NMK-HUB-8', category: 'Electronics', stock: 305, reorderLevel: 90, unitPrice: 59.0, cost: 24.0, warehouseId: 'W-01', supplierId: 'S-02', image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1013', name: 'Drift Outdoor Camping Tent 4P', sku: 'DRF-TENT-4', category: 'Outdoor', stock: 128, reorderLevel: 60, unitPrice: 189.0, cost: 94.0, warehouseId: 'W-03', supplierId: 'S-07', image: 'https://images.pexels.com/photos/1574868/pexels-photo-1574868.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1014', name: 'Forge Cast Iron Skillet 12"', sku: 'FRG-CI-12', category: 'Home Goods', stock: 72, reorderLevel: 100, unitPrice: 49.0, cost: 21.0, warehouseId: 'W-02', supplierId: 'S-03', image: 'https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'low_stock' },
  { id: 'P-1015', name: 'Vantage HD Webcam Pro', sku: 'VNT-WC-HD', category: 'Electronics', stock: 240, reorderLevel: 80, unitPrice: 99.0, cost: 47.0, warehouseId: 'W-01', supplierId: 'S-04', image: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
  { id: 'P-1016', name: 'Meridian Wool Throw Blanket', sku: 'MER-WT-QLT', category: 'Home Goods', stock: 198, reorderLevel: 70, unitPrice: 69.0, cost: 28.0, warehouseId: 'W-03', supplierId: 'S-06', image: 'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=240', status: 'in_stock' },
];

export const suppliers: Supplier[] = [
  { id: 'S-01', name: 'Northpeak Furniture Co.', contactName: 'Marcus Lindgren', email: 'm.lindgren@northpeak.co', phone: '+1 (206) 555-0142', country: 'Sweden', performanceScore: 94, onTimeRate: 96, leadTimeDays: 12, totalPurchases: 842000, openOrders: 3, category: 'Furniture' },
  { id: 'S-02', name: 'Shenzhen Tech Components', contactName: 'Wei Chen', email: 'wei.chen@sztech.cn', phone: '+86 755 5555 8821', country: 'China', performanceScore: 88, onTimeRate: 91, leadTimeDays: 21, totalPurchases: 1230000, openOrders: 7, category: 'Electronics' },
  { id: 'S-03', name: 'Hearthside Goods Ltd.', contactName: 'Olivia Brennan', email: 'olivia@hearthside.uk', phone: '+44 20 7946 0321', country: 'United Kingdom', performanceScore: 79, onTimeRate: 84, leadTimeDays: 18, totalPurchases: 412000, openOrders: 2, category: 'Home Goods' },
  { id: 'S-04', name: 'Pacific Electronics Group', contactName: 'David Okafor', email: 'd.okafor@pacificeg.com', phone: '+1 (408) 555-0117', country: 'United States', performanceScore: 91, onTimeRate: 93, leadTimeDays: 9, totalPurchases: 1860000, openOrders: 5, category: 'Electronics' },
  { id: 'S-05', name: 'Lumio Lighting Solutions', contactName: 'Priya Nair', email: 'priya@lumio.in', phone: '+91 80 4555 1200', country: 'India', performanceScore: 86, onTimeRate: 89, leadTimeDays: 24, totalPurchases: 318000, openOrders: 1, category: 'Home Goods' },
  { id: 'S-06', name: 'Cobalt & Co. Accessories', contactName: 'Sofia Marchetti', email: 'sofia@cobaltco.it', phone: '+39 02 8765 4321', country: 'Italy', performanceScore: 83, onTimeRate: 87, leadTimeDays: 15, totalPurchases: 296000, openOrders: 2, category: 'Accessories' },
  { id: 'S-07', name: 'Trailhead Outfitters', contactName: 'Jordan Hayes', email: 'j.hayes@trailhead.co', phone: '+1 (303) 555-0188', country: 'United States', performanceScore: 90, onTimeRate: 92, leadTimeDays: 11, totalPurchases: 224000, openOrders: 0, category: 'Outdoor' },
];

export const warehouses: Warehouse[] = [
  { id: 'W-01', name: 'East Coast Fulfillment', location: 'Newark, NJ', capacity: 50000, used: 38200, productCount: 2840, stockValue: 1840000, manager: 'Elena Rivera' },
  { id: 'W-02', name: 'West Coast Distribution', location: 'Long Beach, CA', capacity: 42000, used: 31600, productCount: 1960, stockValue: 1275000, manager: 'Tom Nakamura' },
  { id: 'W-03', name: 'Central Logistics Hub', location: 'Dallas, TX', capacity: 38000, used: 14800, productCount: 1240, stockValue: 682000, manager: 'Aisha Coleman' },
];

export const stockMovements: StockMovement[] = [
  { id: 'M-9001', productId: 'P-1001', productName: 'Aurora Wireless Earbuds Pro', type: 'stock_in', quantity: 500, toWarehouse: 'East Coast Fulfillment', user: 'Elena Rivera', timestamp: '2026-08-29T14:22:00Z', note: 'PO #4421 received' },
  { id: 'M-9002', productId: 'P-1006', productName: 'Pulse Fitness Tracker V3', type: 'stock_out', quantity: 120, fromWarehouse: 'East Coast Fulfillment', user: 'System', timestamp: '2026-08-29T11:08:00Z', note: 'Order #ORD-77820 fulfilled' },
  { id: 'M-9003', productId: 'P-1003', productName: 'Vertex 27" 4K Monitor', type: 'stock_out', quantity: 24, fromWarehouse: 'West Coast Distribution', user: 'Tom Nakamura', timestamp: '2026-08-29T09:45:00Z', note: 'Bulk order - Acme Corp' },
  { id: 'M-9004', productId: 'P-1007', productName: 'Cascade Stainless Water Bottle', type: 'transfer', quantity: 200, fromWarehouse: 'Central Logistics Hub', toWarehouse: 'East Coast Fulfillment', user: 'Aisha Coleman', timestamp: '2026-08-28T16:30:00Z' },
  { id: 'M-9005', productId: 'P-1011', productName: 'Quartz Aromatic Candle Set', type: 'adjustment', quantity: -8, fromWarehouse: 'West Coast Distribution', user: 'Tom Nakamura', timestamp: '2026-08-28T13:12:00Z', note: 'Damaged in transit write-off' },
  { id: 'M-9006', productId: 'P-1010', productName: 'Sable Leather Laptop Bag', type: 'stock_in', quantity: 150, toWarehouse: 'East Coast Fulfillment', user: 'Elena Rivera', timestamp: '2026-08-28T10:05:00Z', note: 'PO #4418 received' },
  { id: 'M-9007', productId: 'P-1014', productName: 'Forge Cast Iron Skillet 12"', type: 'stock_out', quantity: 28, fromWarehouse: 'West Coast Distribution', user: 'System', timestamp: '2026-08-27T17:50:00Z' },
  { id: 'M-9008', productId: 'P-1005', productName: 'Lumen Smart LED Bulb (4-pack)', type: 'stock_in', quantity: 800, toWarehouse: 'West Coast Distribution', user: 'Tom Nakamura', timestamp: '2026-08-27T15:20:00Z', note: 'PO #4415 received' },
  { id: 'M-9009', productId: 'P-1002', productName: 'Nimbus Mechanical Keyboard', type: 'adjustment', quantity: 12, fromWarehouse: 'East Coast Fulfillment', user: 'Elena Rivera', timestamp: '2026-08-27T09:40:00Z', note: 'Recount correction' },
  { id: 'M-9010', productId: 'P-1013', productName: 'Drift Outdoor Camping Tent 4P', type: 'stock_out', quantity: 45, fromWarehouse: 'Central Logistics Hub', user: 'System', timestamp: '2026-08-26T18:15:00Z' },
];

export const salesData: SalesPoint[] = [
  { month: 'Mar', sales: 248000, orders: 1820 },
  { month: 'Apr', sales: 271000, orders: 1960 },
  { month: 'May', sales: 259000, orders: 1880 },
  { month: 'Jun', sales: 312000, orders: 2240 },
  { month: 'Jul', sales: 338000, orders: 2410 },
  { month: 'Aug', sales: 374000, orders: 2680 },
];

export const categoryShare: CategoryShare[] = [
  { category: 'Electronics', value: 1840000, color: '#1385fb' },
  { category: 'Furniture', value: 682000, color: '#0ba364' },
  { category: 'Home Goods', value: 512000, color: '#faa323' },
  { category: 'Accessories', value: 296000, color: '#8b5cf6' },
  { category: 'Outdoor', value: 224000, color: '#f05858' },
];

export const inventoryTurnoverTrend: TrendPoint[] = [
  { label: 'Mar', value: 4.2 },
  { label: 'Apr', value: 4.5 },
  { label: 'May', value: 4.3 },
  { label: 'Jun', value: 5.1 },
  { label: 'Jul', value: 5.6 },
  { label: 'Aug', value: 6.2 },
];

export const topProducts: TopProduct[] = [
  { id: 'P-1001', name: 'Aurora Wireless Earbuds Pro', sku: 'AWE-PRO-001', revenue: 184800, unitsSold: 1240, turnoverRate: 8.4 },
  { id: 'P-1005', name: 'Lumen Smart LED Bulb (4-pack)', sku: 'LUM-LED-4P', revenue: 145920, unitsSold: 4560, turnoverRate: 11.2 },
  { id: 'P-1009', name: 'Orbit Bluetooth Speaker', sku: 'ORB-BS-50', revenue: 124820, unitsSold: 1580, turnoverRate: 7.1 },
  { id: 'P-1004', name: 'Helix Ergonomic Office Chair', sku: 'HEL-ERG-GRY', revenue: 102190, unitsSold: 310, turnoverRate: 5.2 },
  { id: 'P-1015', name: 'Vantage HD Webcam Pro', sku: 'VNT-WC-HD', revenue: 87120, unitsSold: 880, turnoverRate: 6.8 },
];

export const slowMovingProducts: TopProduct[] = [
  { id: 'P-1011', name: 'Quartz Aromatic Candle Set', sku: 'QZ-AC-SET', revenue: 4500, unitsSold: 100, turnoverRate: 0.8 },
  { id: 'P-1016', name: 'Meridian Wool Throw Blanket', sku: 'MER-WT-QLT', revenue: 8280, unitsSold: 120, turnoverRate: 1.1 },
  { id: 'P-1008', name: 'Atlas Standing Desk Converter', sku: 'ATL-SDC-01', revenue: 13140, unitsSold: 60, turnoverRate: 1.4 },
  { id: 'P-1014', name: 'Forge Cast Iron Skillet 12"', sku: 'FRG-CI-12', revenue: 9800, unitsSold: 200, turnoverRate: 1.6 },
];

export const aiRecommendations: AiRecommendation[] = [
  { id: 'A-1', type: 'restock', priority: 'high', title: 'Restock Pulse Fitness Tracker V3 urgently', description: 'Current stock (54 units) will deplete in ~6 days based on 30-day avg velocity of 9.2 units/day. Lead time from Pacific Electronics is 9 days.', impact: 'Prevent $48K lost revenue', action: 'Create PO for 300 units' },
  { id: 'A-2', type: 'overstock', priority: 'medium', title: 'Reduce Lumen Smart LED Bulb order quantity', description: 'Stock cover is 89 days against a 30-day target. Next replenishment should be reduced by ~40% to free up $14K in working capital.', impact: 'Free $14K working capital', action: 'Adjust auto-reorder rule' },
  { id: 'A-3', type: 'supplier', priority: 'high', title: 'Hearthside Goods on-time rate declining', description: 'On-time delivery dropped from 91% to 84% over the last 3 months. Consider qualifying a backup supplier for Home Goods category.', impact: 'Reduce stockout risk by 23%', action: 'Review supplier scorecard' },
  { id: 'A-4', type: 'pricing', priority: 'low', title: 'Price optimization opportunity on Aurora Earbuds', description: 'Demand elasticity model suggests a 5% price increase would lift margin by $4.2K/month with <2% volume impact.', impact: '+$50K annual margin', action: 'Run pricing simulation' },
  { id: 'A-5', type: 'forecast', priority: 'medium', title: 'Seasonal spike expected for Outdoor category', description: 'Historical patterns and current velocity indicate a 38% demand increase for camping gear in September. Pre-position inventory at Central Hub.', impact: 'Capture $32K extra sales', action: 'Plan transfer to W-03' },
];

export const purchaseOrders = [
  { id: 'PO-4421', supplier: 'Pacific Electronics Group', date: '2026-08-22', total: 41000, status: 'received', items: 3 },
  { id: 'PO-4422', supplier: 'Shenzhen Tech Components', date: '2026-08-25', total: 67200, status: 'in_transit', items: 5 },
  { id: 'PO-4423', supplier: 'Northpeak Furniture Co.', date: '2026-08-27', total: 28400, status: 'pending', items: 2 },
  { id: 'PO-4424', supplier: 'Lumio Lighting Solutions', date: '2026-08-28', total: 12800, status: 'pending', items: 1 },
  { id: 'PO-4418', supplier: 'Cobalt & Co. Accessories', date: '2026-08-20', total: 20850, status: 'received', items: 4 },
];

export const recentOrders = [
  { id: 'ORD-77820', customer: 'Acme Corporation', date: '2026-08-29', total: 10680, status: 'fulfilled', items: 12 },
  { id: 'ORD-77821', customer: 'Bluepeak Retail', date: '2026-08-29', total: 4280, status: 'picking', items: 6 },
  { id: 'ORD-77822', customer: 'Nordwell LLC', date: '2026-08-29', total: 1840, status: 'pending', items: 3 },
  { id: 'ORD-77823', customer: 'Vertex Direct', date: '2026-08-28', total: 9320, status: 'fulfilled', items: 8 },
  { id: 'ORD-77824', customer: 'Summit Stores', date: '2026-08-28', total: 2760, status: 'shipped', items: 4 },
  { id: 'ORD-77825', customer: 'Harbor & Co.', date: '2026-08-28', total: 5120, status: 'pending', items: 7 },
];
