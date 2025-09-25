import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo-auth:27017/authdb";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Auth DB connected"))
  .catch(err => console.error("Auth DB error:", err));

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => res.json({ service: "auth-service", ok: true }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Auth service running on ${PORT}`));
