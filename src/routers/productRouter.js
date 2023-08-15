import { Router } from "express";

const PRODUCTOS = Router();

PRODUCTOS.get("/", async (req, res) => {
  res.send("products done!");
});

export default PRODUCTOS;
