import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo-order:27017/orderdb";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Order DB connected"))
  .catch(err => console.error("Order DB error:", err));

app.use("/api/orders", orderRoutes);
app.get("/health", (req, res) => res.json({ service: "order-service", ok: true }));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Order service running on ${PORT}`));
