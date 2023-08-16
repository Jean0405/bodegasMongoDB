import { Router } from "express";
import { connDB } from "../../db/connectDB.js";
import { autoIncrementID } from "../helpers/autoincrementID.js";
import { productoVerify, proxyProducto } from "../middlewares/proxyProducto.js";

const PRODUCTOS = Router();

/**
 * ? Mostrar los productos almacenados en la colección
 *  * http://127.25.25.25:3300/productos
 */
PRODUCTOS.get("/", productoVerify, async (req, res) => {
  try {
    let db = await connDB();
    let coleccion = db.collection("products");
    let data = await coleccion.find().sort({ name: 1 }).toArray();
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

/**
 * ? Post hacía la colección de products en la base de datos
 *  * http://127.25.25.25:3300/productos
 */
PRODUCTOS.post("/", productoVerify, proxyProducto, async (req, res) => {
  // {
  //   "product_name": "Cerveza Aguila",
  //   "product_description": "Es muy buena pa tomar SIUUUU",
  //   "product_state": "activo",
  //   "product_created_by":1,
  //   "product_updated_by":null,
  //   "product_created_at": "2023-08-15",
  //   "product_updated_at":null,
  //   "product_deleted_at": null
  // }

  try {
    const nuevoID = await autoIncrementID("products");

    let db = await connDB();
    let coleccion = db.collection("products");
    await coleccion.insertOne({
      ID: nuevoID,
      ...req.body,
    });
    res.status(200).send({ status: 200, message: "DATO HA SIDO INSERTADO" });
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
