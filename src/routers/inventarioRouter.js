import { Router } from "express";
import { connDB } from "../../db/connectDB.js";
import { autoIncrementID } from "../helpers/autoincrementID.js";
import {
  inventarioVerify,
  proxyInventario,
} from "../middlewares/proxyInventario.js";

const INVENTARIO = Router();

INVENTARIO.get("/", inventarioVerify, async (req, res) => {
  try {
    let db = await connDB();
    let coleccion = db.collection("inventories");
    let data = await coleccion.find().toArray();
    res.send({
      status: 200,
      message: "DATOS OBTENIDOS CORRECTAMENTE",
      data,
    });
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
 * ? Post hacía la colección de inventarios en la base de datos
 * * http://127.25.25.25:3300/inventarios
 */

INVENTARIO.post("/", inventarioVerify, proxyInventario, async (req, res) => {
  // {
  //   "inventory_winery_ID": 1,
  //   "inventory_product_ID":1,
  //   "inventory_cantity": 26,
  //   "inventory_created_by":1,
  //   "inventory_created_at": "2023-08-16"
  // }

  const nuevoID = await autoIncrementID("inventories");
  try {
    let db = await connDB();
    let coleccion = db.collection("inventories");

    await coleccion.insertOne({
      ID: nuevoID,
      ...req.body,
    });
    res.status(200).send({ status: 200, message: "DATO HA SIDO INSERTADO" });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "ERROR AL INSERTAR LOS DATOS",
      error: error,
    });
  }
});

/**
 * ? Put para trasladar cierta cantidad de un producto de una bodega a otra
 * * http://127.25.25.27:3300/inventarios/trasladar
 */
INVENTARIO.put("/trasladar", async (req, res) => {
  // {
  //   "product_id":1,
  //   "cantity":20,
  //   "wineryOrigin_id":1,
  //   "wineryDestiny_id":2
  // }

  const { product_id, cantity, wineryOrigin_id, wineryDestiny_id } = req.body;
  console.log(wineryOrigin_id);
  try {
    let db = await connDB();
    let coleccion = db.collection("inventories");

    let data = await coleccion
      .find({ ID_winery: wineryOrigin_id, ID_product: product_id })
      .toArray();

    if (cantity > data[0].cantity) {
      res.send("LA CANTIDAD QUE DESEAS TRANSFERIR NO ESTÁ DISPONIBLE");
    } else {
      await coleccion.updateOne(
        {
          ID_winery: wineryDestiny_id,
          ID_product: product_id,
        },
        {
          $inc: { cantity: cantity },
        }
      );
      await coleccion.updateOne(
        {
          ID_winery: wineryOrigin_id,
          ID_product: product_id,
        },
        {
          $inc: { cantity: -cantity },
        }
      );
    }
    res.send("CANTIDAD TRASLADADA CORRECTAMENTE");
  } catch (error) {
    res.send(error.message);
  }
});

export default INVENTARIO;
