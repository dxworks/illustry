import mongoose from "mongoose";
import { config } from "../config";

export function connectMongoose() {
  mongoose.connect(config.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    dbName: config.MONGODB_DBNAME,
    user: config.MONGODB_USER,
    pass: config.MONGODB_PASSWORD,
  });
}

mongoose.connection.on("error", (err: any) => {
  console.error(err);
});
