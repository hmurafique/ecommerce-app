import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo-product:27017/productdb";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Product DB connected"))
  .catch(err => console.error("Product DB error:", err));

app.use("/api/products", productRoutes);
app.get("/health", (req, res) => res.json({ service: "product-service", ok: true }));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Product service running on ${PORT}`));
