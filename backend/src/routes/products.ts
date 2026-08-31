import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { products, categories, suppliers } from "../db/schema.js";

const router = Router();

// GET /api/products
router.get("/", async (_req, res) => {
  try {
    const result = await db
      .select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        categoryId: products.categoryId,
        categoryName: categories.name,
        supplierId: products.supplierId,
        supplierName: suppliers.name,
        unitPrice: products.unitPrice,
        reorderLevel: products.reorderLevel,
        imageUrl: products.imageUrl,
        isActive: products.isActive,
        createdAt: products.createdAt,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(suppliers, eq(products.supplierId, suppliers.id));

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("GET /api/products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const result = await db
      .select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        categoryId: products.categoryId,
        categoryName: categories.name,
        supplierId: products.supplierId,
        supplierName: suppliers.name,
        unitPrice: products.unitPrice,
        reorderLevel: products.reorderLevel,
        imageUrl: products.imageUrl,
        isActive: products.isActive,
        createdAt: products.createdAt,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(suppliers, eq(products.supplierId, suppliers.id))
      .where(eq(products.id, id));

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("GET /api/products/:id error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
});

export default router;