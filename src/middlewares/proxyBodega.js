import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { Bodega } from "../storage/bodegaDTO.js";
import { validate } from "class-validator";

const proxyBodega = async (req, res, next) => {
  try {
    let data = plainToInstance(Bodega, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(500).send({
      message: "ERROR DE RECEPCIÓN DE DATA 'undefined'",
      error: error.message,
    });
  }
};

export { proxyBodega };
