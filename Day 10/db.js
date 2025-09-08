const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI not found in .env file. Please check your configuration.');
    }
    
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        console.log('Successfully connected to MongoDB Atlas!');
        return cb(); 
      })
      .catch((err) => {
        console.error('Connection to MongoDB failed:', err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};

