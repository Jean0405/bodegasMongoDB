import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const CONFIG_DB = JSON.parse(process.env.CONFIG_DB);

const URI = `mongodb+srv://${CONFIG_DB.user}:${CONFIG_DB.password}@practica.4b4nkjj.mongodb.net/${CONFIG_DB.database}`;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export async function connDB() {
  const client = new MongoClient(URI, OPTIONS);
  try {
    await client.connect();
    const db = client.db();
    return db;
  } catch (error) {
    throw new Error({ messarge: "Connection Refused", error: error.message });
  }
}
