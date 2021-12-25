import mongoose from 'mongoose';

const config = require('../config')

export const mongooseConnection =
    mongoose
        .connect(
            config.MONGODB_CONNECTION_URI
            , { useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', (err: any) => { throw err });