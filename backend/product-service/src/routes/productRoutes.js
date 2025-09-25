import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// create
router.post("/", async (req, res, next) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) { next(err); }
});

// list
router.get("/", async (req, res, next) => {
  try {
    const list = await Product.find();
    res.json(list);
  } catch (err) { next(err); }
});

// get
router.get("/:id", async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) { next(err); }
});

// update
router.put("/:id", async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) { next(err); }
});

// delete
router.delete("/:id", async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
