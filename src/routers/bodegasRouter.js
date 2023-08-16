import { Router } from "express";
import { connDB } from "../../db/connectDB.js";
import { bodegaVerify, proxyBodega } from "../middlewares/proxyBodega.js";
import { autoIncrementID } from "../helpers/autoincrementID.js";

const BODEGAS = Router();

/**
 * ? Mostrar las bodegas alamcenada ordenadas alfabeticamente.
 *  * http://127.25.25.25:3300/bodegas
 */
BODEGAS.get("/", bodegaVerify, async (req, res) => {
  try {
    let db = await connDB();
    let coleccion = db.collection("wineries");
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
 * ? Post hacía la colección bodegas en la base de datos
 *  * http://127.25.25.25:3300/bodegas
 */
BODEGAS.post("/", bodegaVerify, proxyBodega, async (req, res) => {
  // {
  //   "winery_id": 2,
  //   "winery_name": "Bodega Bucaros 22",
  //   "responsible_id": 1,
  //   "winery_state": "activo",
  //   "winery_created_by": 1,
  //   "winery_updated_by":null,
  //   "winery_created_at": "2023-10-10T08:15:26Z",
  //   "winery_updated_at":null,
  //   "winery_deleted_at":null
  // }
  try {
    const nuevoID = await autoIncrementID("wineries");
    console.log(nuevoID);
    let db = await connDB();
    let coleccion = db.collection("wineries");
    await coleccion.insertOne({
      ID: nuevoID,
      ...req.body,
    });
    res.send({ status: 200, message: "DATO HA SIDO INSERTADO" });
  } catch (error) {
    res.status(500).send({
      status: 500,
      errorInfo: {
        message: "ERROR AL INSERTAR LOS DATOS",
        error: error,
      },
    });
  }
});
export default BODEGAS;
