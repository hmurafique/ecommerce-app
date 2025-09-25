import express from "express";
import mongoose from "mongoose";
import axios from "axios";

const router = express.Router();

const OrderSchema = new mongoose.Schema({
  userId: String,
  items: [{ productId: String, qty: Number, price: Number }],
  amount: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", OrderSchema);

// place order
router.post("/", async (req, res, next) => {
  try {
    const { userId, items, paymentMethod } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: "No items" });

    // compute amount
    const amount = items.reduce((s, it) => s + (it.price * it.qty), 0);

    // call payment-service (mock)
    const payResp = await axios.post(process.env.PAYMENT_URL || "http://payment-service:5004/pay", {
      amount, paymentMethod, userId
    }, { timeout: 5000 });

    if (!payResp.data || !payResp.data.success) {
      return res.status(400).json({ error: "Payment failed", detail: payResp.data });
    }

    const order = new Order({ userId, items, amount, status: "paid" });
    await order.save();

    // notify (optional): you can call notification service here
    // axios.post("http://notification-service:5005/notify", { userId, message: "Order placed" }).catch(()=>{});

    res.status(201).json(order);
  } catch (err) { next(err); }
});

// list orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) { next(err); }
});

export default router;
