import { MongoClient } from 'mongodb';
let db;

async function connectToDB(callback) {
    // 27017 is default port for MongoDB
    // const client = new MongoClient('mongodb://127.0.0.1:27017');
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.flb3538.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();

    db = client.db('react-blog-db');
    callback();
}

export {
    db, 
    connectToDB,
}