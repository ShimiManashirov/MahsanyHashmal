const express = require('express');
const { del } = require('express/lib/application');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
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
  collection = database.createCollection(name)
  console.log('collection created' + 'name' + name)
  client.close
  
}

//add one document to collection
async function add_doc(item_jason,collection_name) {
  connectToMongoDB()
  console.log('start adding document')
  database.collection(collection_name).insertOne(item_jason)
  console.log('finish adding document')
}

//delete user
async function delete_user(username,collection_name) {
  connectToMongoDB()
  database.collection(collection_name).findOneAndDelete({username : username} )
}



