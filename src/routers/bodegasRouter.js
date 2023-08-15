import { Router } from "express";
import { connDB } from "../../db/connectDB.js";
import { limitRequest } from "../helpers/limitRequest.js";

const BODEGAS = Router();

/**
 * ? Mostrar la cantidad total de automóviles disponibles en cada sucursal.
 *  * http://127.25.25.25:3300/bodegas
 */
BODEGAS.get("/", limitRequest(), async (req, res) => {
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

export default BODEGAS;
