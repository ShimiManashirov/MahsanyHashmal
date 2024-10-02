
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to server');

    // Get the database
    const db = client.db(dbName);

    // Here you can perform database operations
    // For example:
    // const collection = db.collection('documents');
    // const result = await collection.insertOne({ name: 'John', age: 30 });

    return db;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

// Usage
connectToDatabase()
  .then(db => {
    // Use the database object for further operations
  })
  .catch(console.error)
  .finally(() => client.close());