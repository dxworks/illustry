module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    ILLUSTRY_SERVER_PORT: process.env.PORT || 7000,
    MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI || 'mongodb+srv://cluster0.zkjem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    MONGODB_DBNAME: process.env.MONGODB_DBNAME || null,
    MONGODB_USER: process.env.MONGODB_USER || 'vladimir',
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || 'password1234',
    }