const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const client = new MongoClient('mongodb+srv://shimitamiroz:shimitamiroz@shopdb.hqf0u.mongodb.net/');
const database = client.db('ShopDB');

//connect to DB
async function connectToMongoDB() {
  await client.connect();
    console.log("Connected successfully to MongoDB");
}
//creating a new collection
async function new_collection(name) {
  connectToMongoDB()
  console.log('start creating collection')
  const collection = database.createCollection(name)
  console.log('collection created' + 'name' + name)
  client.close
  
}

new_collection("test")