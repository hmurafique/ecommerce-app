import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/pay", (req, res) => {
  const { amount, paymentMethod, userId } = req.body;
  // simulate a success 95% of time
  const ok = Math.random() > 0.05;
  if (ok) {
    return res.json({ success: true, txId: `tx_${Date.now()}` });
  } else {
    return res.status(400).json({ success: false, error: "card_declined" });
  }
});

app.get("/health", (req, res) => res.json({ service: "payment-service", ok: true }));

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Payment service on ${PORT}`));
