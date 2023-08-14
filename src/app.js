import dotenv from "dotenv";
import express from "express";
// import { SERVER } from "./config/configServer.js";
import PRODUCT from "./routers/productRouter.js";

dotenv.config();
const SERVER = JSON.parse(process.env.CONFIG_SERVER);
const APP = express();

APP.use("/product", PRODUCT);

APP.listen(SERVER, () =>
  console.log(`http://${SERVER.hostname}:${SERVER.port}`)
);
