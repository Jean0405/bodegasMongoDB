import dotenv from "dotenv";
import express from "express";
// import { SERVER } from "./config/configServer.js";
import BODEGAS from "./routers/bodegasRouter.js";
import PRODUCTOS from "./routers/productRouter.js";

dotenv.config();
const SERVER = JSON.parse(process.env.CONFIG_SERVER);
const APP = express();

APP.use("/bodegas", BODEGAS);
APP.use("/productos", PRODUCTOS);

APP.listen(SERVER, () =>
  console.log(`http://${SERVER.hostname}:${SERVER.port}`)
);
