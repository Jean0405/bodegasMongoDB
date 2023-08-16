import "reflect-metadata";
import { classToPlain, plainToInstance } from "class-transformer";
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
      message: "ERROR DE RECEPCIÓN DE DATA ON DTO",
      error: error.message,
    });
  }
};

const bodegaVerify = (req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;
  let Clone = JSON.stringify(
    classToPlain(plainToInstance(Bodega, {}, { ignoreDecorators: true }))
  );
  let Verify = Clone === JSON.stringify(payload);
  !Verify
    ? res.status(406).send({ status: 406, message: "No estás autorizado" })
    : next();
};

export { proxyBodega, bodegaVerify };
