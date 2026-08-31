
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "StockPilot AI API",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/products", productsRouter);

export default app;
