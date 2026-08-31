import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  decimal,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Suppliers
// ─────────────────────────────────────────────

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  contactPerson: varchar("contact_person", { length: 100 }),
  email: varchar("email", { length: 150 }),
  phone: varchar("phone", { length: 30 }),
  location: varchar("location", { length: 150 }),
  performanceScore: decimal("performance_score", {
    precision: 5,
    scale: 2,
  }),
  onTimeRate: decimal("on_time_rate", {
    precision: 5,
    scale: 2,
  }),
  leadTimeDays: integer("lead_time_days"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Warehouses
// ─────────────────────────────────────────────

export const warehouses = pgTable("warehouses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  location: varchar("location", { length: 150 }),
  managerName: varchar("manager_name", { length: 100 }),
  capacity: integer("capacity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  supplierId: integer("supplier_id")
    .references(() => suppliers.id),
  unitPrice: decimal("unit_price", {
    precision: 12,
    scale: 2,
  }).notNull(),
  reorderLevel: integer("reorder_level").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Inventory
// ─────────────────────────────────────────────

export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  warehouseId: integer("warehouse_id")
    .notNull()
    .references(() => warehouses.id),
  quantity: integer("quantity").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Inventory Movements
// ─────────────────────────────────────────────

export const inventoryMovements = pgTable("inventory_movements", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  warehouseId: integer("warehouse_id")
    .notNull()
    .references(() => warehouses.id),
  type: varchar("type", { length: 30 }).notNull(),
  quantity: integer("quantity").notNull(),
  reference: varchar("reference", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});