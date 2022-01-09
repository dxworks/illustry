import mongoose from 'mongoose';

const config = require('../config')

export const mongooseConnection =
    mongoose
        .connect(
            config.MONGODB_CONNECTION_URI
            , {useNewUrlParser: true, dbName: config.MONGODB_DBNAME, user: config.MONGODB_USER, pass: config.MONGODB_PASSWORD})

const db = mongoose.connection;

db.on('error', (err: any) => {
    console.error(err);
});