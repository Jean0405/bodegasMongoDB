import { Router } from "express";
import { connDB } from "../../db/connectDB.js";
import { limitRequest } from "../helpers/limitRequest.js";
import { bodegaVerify, proxyBodega } from "../middlewares/proxyBodega.js";

const BODEGAS = Router();

/**
 * ? Mostrar la cantidad total de automóviles disponibles en cada sucursal.
 *  * http://127.25.25.25:3300/bodegas
 */
BODEGAS.get("/", limitRequest(), bodegaVerify, async (req, res) => {
  console.log(req.rateLimit);
  try {
    let db = await connDB();
    let coleccion = db.collection("wineries");
    let data = await coleccion.find().sort({ nombre: 1 }).toArray();
    res.send({ status: 200, message: "DATOS OBTENIDOS CORRECTAMENTE", data });
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

BODEGAS.post(
  "/",
  limitRequest(),
  bodegaVerify,
  proxyBodega,
  async (req, res) => {
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
      let db = await connDB();
      let coleccion = db.collection("wineries");
      await coleccion.insertOne(req.body);
      res.send({ status: 200, message: "DATO HA SIDO INSERTADO" });
    } catch (error) {
      res.status(500).send({
        status: 500,
        errorInfo: {
          message: "ERROR AL INSERTAR LOS DATOS",
          error: error.message,
        },
      });
    }
  }
);
export default BODEGAS;
