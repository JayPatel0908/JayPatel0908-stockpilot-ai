import "dotenv/config";
import { db } from "./index.js";
import {
  categories,
  suppliers,
  warehouses,
  products,
  inventory,
  inventoryMovements,
} from "./schema.js";

async function seed() {
  console.log("🌱 Seeding StockPilot AI database...");

  // Categories
  const categoryRows = await db
    .insert(categories)
    .values([
      { name: "Electronics" },
      { name: "Office Supplies" },
      { name: "Home & Kitchen" },
      { name: "Accessories" },
      { name: "Networking" },
    ])
    .onConflictDoNothing()
    .returning();

  console.log(`Categories ready: ${categoryRows.length}`);

  // Get all categories so the seed also works if they already existed
  const allCategories = await db.select().from(categories);

  const categoryMap = new Map(
    allCategories.map((category) => [category.name, category.id])
  );

  // Suppliers
  const supplierRows = await db
    .insert(suppliers)
    .values([
      {
        name: "TechSource India",
        contactPerson: "Rahul Sharma",
        email: "contact@techsource.example",
        phone: "+91 98765 43210",
        location: "Mumbai, Maharashtra",
        performanceScore: "92.50",
        onTimeRate: "94.00",
        leadTimeDays: 5,
      },
      {
        name: "OfficeHub Supplies",
        contactPerson: "Priya Mehta",
        email: "sales@officehub.example",
        phone: "+91 98765 12345",
        location: "Pune, Maharashtra",
        performanceScore: "88.00",
        onTimeRate: "91.50",
        leadTimeDays: 7,
      },
      {
        name: "HomeWare Distributors",
        contactPerson: "Amit Shah",
        email: "orders@homeware.example",
        phone: "+91 99887 66554",
        location: "Ahmedabad, Gujarat",
        performanceScore: "90.00",
        onTimeRate: "92.00",
        leadTimeDays: 6,
      },
    ])
    .onConflictDoNothing()
    .returning();

  console.log(`Suppliers ready: ${supplierRows.length}`);

  // Warehouses
  const warehouseRows = await db
    .insert(warehouses)
    .values([
      {
        name: "Mumbai Central Warehouse",
        location: "Andheri, Mumbai",
        managerName: "Vikram Patil",
        capacity: 10000,
      },
      {
        name: "Pune Distribution Center",
        location: "Hinjewadi, Pune",
        managerName: "Sneha Kulkarni",
        capacity: 7500,
      },
      {
        name: "Ahmedabad Warehouse",
        location: "Naroda, Ahmedabad",
        managerName: "Rakesh Patel",
        capacity: 6000,
      },
    ])
    .returning();

  console.log(`Warehouses ready: ${warehouseRows.length}`);

  if (categoryMap.size === 0 || warehouseRows.length === 0) {
    throw new Error("Required category or warehouse data is missing.");
  }

  const electronicsId = categoryMap.get("Electronics")!;
  const officeId = categoryMap.get("Office Supplies")!;
  const homeId = categoryMap.get("Home & Kitchen")!;
  const accessoriesId = categoryMap.get("Accessories")!;
  const networkingId = categoryMap.get("Networking")!;

  const supplierMap = new Map(
    supplierRows.map((supplier) => [supplier.name, supplier.id])
  );

  const techSourceId = supplierMap.get("TechSource India");
  const officeHubId = supplierMap.get("OfficeHub Supplies");
  const homeWareId = supplierMap.get("HomeWare Distributors");

  if (!techSourceId || !officeHubId || !homeWareId) {
    throw new Error("Required supplier data is missing.");
  }

  // Products
  const productRows = await db
    .insert(products)
    .values([
      {
        name: "Wireless Mechanical Keyboard",
        sku: "SP-KEY-001",
        categoryId: electronicsId,
        supplierId: techSourceId,
        unitPrice: "3499.00",
        reorderLevel: 20,
        imageUrl:
          "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
      },
      {
        name: "Wireless Mouse",
        sku: "SP-MOU-001",
        categoryId: accessoriesId,
        supplierId: techSourceId,
        unitPrice: "1299.00",
        reorderLevel: 30,
        imageUrl:
          "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
      },
      {
        name: "USB-C Hub 7-in-1",
        sku: "SP-HUB-001",
        categoryId: networkingId,
        supplierId: techSourceId,
        unitPrice: "2499.00",
        reorderLevel: 15,
      },
      {
        name: "27-inch 4K Monitor",
        sku: "SP-MON-001",
        categoryId: electronicsId,
        supplierId: techSourceId,
        unitPrice: "32999.00",
        reorderLevel: 10,
      },
      {
        name: "Ergonomic Office Chair",
        sku: "SP-CHR-001",
        categoryId: officeId,
        supplierId: officeHubId,
        unitPrice: "8999.00",
        reorderLevel: 8,
      },
      {
        name: "Premium Notebook",
        sku: "SP-NOT-001",
        categoryId: officeId,
        supplierId: officeHubId,
        unitPrice: "249.00",
        reorderLevel: 50,
      },
      {
        name: "LED Desk Lamp",
        sku: "SP-LMP-001",
        categoryId: homeId,
        supplierId: homeWareId,
        unitPrice: "1799.00",
        reorderLevel: 20,
      },
      {
        name: "Smart Power Strip",
        sku: "SP-PWR-001",
        categoryId: electronicsId,
        supplierId: techSourceId,
        unitPrice: "2199.00",
        reorderLevel: 15,
      },
      {
        name: "Bluetooth Speaker",
        sku: "SP-SPK-001",
        categoryId: electronicsId,
        supplierId: techSourceId,
        unitPrice: "2999.00",
        reorderLevel: 20,
      },
      {
        name: "Laptop Stand",
        sku: "SP-STD-001",
        categoryId: accessoriesId,
        supplierId: officeHubId,
        unitPrice: "1599.00",
        reorderLevel: 25,
      },
    ])
    .onConflictDoNothing()
    .returning();

  console.log(`Products inserted: ${productRows.length}`);

  // Use all products, including products that may already exist
  const allProducts = await db.select().from(products);

  // Inventory
  const inventoryRows = [];

  for (const product of allProducts) {
    inventoryRows.push(
      {
        productId: product.id,
        warehouseId: warehouseRows[0].id,
        quantity: Math.floor(Math.random() * 150) + 20,
      },
      {
        productId: product.id,
        warehouseId: warehouseRows[1].id,
        quantity: Math.floor(Math.random() * 100) + 10,
      }
    );
  }

  await db.insert(inventory).values(inventoryRows);

  console.log(`Inventory records created: ${inventoryRows.length}`);

  // Sample stock movements
  const movementRows = allProducts.slice(0, 6).map((product, index) => ({
    productId: product.id,
    warehouseId: warehouseRows[index % warehouseRows.length].id,
    type: "IN",
    quantity: 25 + index * 5,
    reference: `PO-${1001 + index}`,
    notes: "Initial stock received",
  }));

  await db.insert(inventoryMovements).values(movementRows);

  console.log(`Inventory movements created: ${movementRows.length}`);

  console.log("✅ StockPilot AI database seeded successfully.");
}

seed()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });