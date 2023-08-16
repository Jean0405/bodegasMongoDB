import "reflect-metadata";
import { plainToInstance, classToPlain } from "class-transformer";
import { Inventario } from "../storage/inventarioDTO.js";
import { validate } from "class-validator";

const proxyInventario = async (req, res, next) => {
  try {
    let data = plainToInstance(Inventario, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, message: "ERROR DE RECEPCIÓN DE DATA ON DTO" });
  }
};

const inventarioVerify = (req, res, next) => {
  if (!req.rateLimit) return;

  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;

  payload = newPayload;

  let Clone = JSON.stringify(
    classToPlain(plainToInstance(Inventario, {}, { ignoreDecorators: true }))
  );

  let Verify = Clone === JSON.stringify(payload);

  !Verify
    ? res.status(406).send({ status: 406, message: "No estás autorizado" })
    : next();
};

export { proxyInventario, inventarioVerify };
