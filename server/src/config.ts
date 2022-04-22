import * as fs from "fs";
import path from "path";

let devEnv: any = {}
let devEnvFilePath = path.resolve(__dirname, '../..', 'config.dev.json')
console.log(devEnvFilePath)
if (fs.existsSync(devEnvFilePath)) {
    devEnv = JSON.parse(fs.readFileSync(devEnvFilePath).toString())
}

export const config = {
    ENV: process.env.NODE_ENV || 'development',
    ILLUSTRY_SERVER_PORT: process.env.PORT || 7000,
    MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI || devEnv?.mongoUrl,
    MONGODB_DBNAME: process.env.MONGODB_DBNAME || devEnv?.mongoDbName,
    MONGODB_USER: process.env.MONGODB_USER || devEnv?.mongoUser,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || devEnv?.mongoPass,
}