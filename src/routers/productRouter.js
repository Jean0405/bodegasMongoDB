import { Router } from "express";
import { connDB } from "../../db/connectDB.js";
import { limitRequest } from "../helpers/limitRequest.js";

const PRODUCTOS = Router();

PRODUCTOS.get("/", limitRequest(), async (req, res) => {
  try {
    let db = await connDB();
    let coleccion = db.collection("products");
    let data = await coleccion.find().toArray();
    res
      .status(200)
      .send({ status: 200, message: "DATOS OBTENIDOS CORRECTAMENTE", data });
  } catch (error) {
    res.status(500).send({
      status: 500,
      errorInfo: {
        message: "ERROR AL OBTENER LOS DATOS",
        error: error.message,
      },
    });
  }
});

PRODUCTOS.post("/", limitRequest(), async (req, res) => {
  try {
    let db = await connDB();
    let coleccion = db.collection("products");
    await coleccion.insertOne(req.body);
  } catch (error) {
    res.status(500).send({
      status: 500,
      errorInfo: {
        message: "ERROR AL INSERTAR LOS DATOS",
        error: error.message,
      },
    });
  }
});

export default PRODUCTOS;
