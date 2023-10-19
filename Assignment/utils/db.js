const { MongoClient, ObjectId } = require('mongodb');

process.env.MONGODB_URI = 'mongodb://calvinli:46b3FOcHPYrt5PAnEheOraqUjdApvPjjmmijPEoWYSB1O14pGjG5F6dhHAyRj6yrSC2KrW2gKOrfACDbkazo3A==@calvinli.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@calvinli@';

if (!process.env.MONGODB_URI) {
    // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
}

// Connect to MongoDB
async function connectToDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('volunteerDB');
    db.client = client;
    return db;
}

module.exports = { connectToDB, ObjectId };