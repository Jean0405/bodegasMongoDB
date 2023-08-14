import { Router } from "express";

const PRODUCT = Router();

PRODUCT.get("/", async (req, res) => {
  res.send("products done!");
});

export default PRODUCT;
