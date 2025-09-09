// This file handles the logic for connecting to the MongoDB Atlas database.

const { MongoClient } = require('mongodb');
require('dotenv').config(); // This loads the variables from your .env file

// This variable will be used to store the active database connection.
let dbConnection;

// We export an object containing methods to be used by other parts of our app.
module.exports = {
  /**
   * Establishes a connection to the MongoDB database.
   * It takes a callback function (cb) which it calls after the connection
   * is established or if an error occurs.
   */
  connectToDb: (cb) => {
    // Get the connection string from the .env file.
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('MONGO_URI not found in .env file. Please check your configuration.');
      return cb(new Error('MONGO_URI not found'));
    }
    
    // Use the MongoClient to connect to the database.
    MongoClient.connect(uri)
      .then((client) => {
        // Once connected, store the database connection object.
        // client.db() will connect to the database specified in your connection string.
        dbConnection = client.db(); // Connects to the default DB in your URI
        console.log('✅ Successfully connected to MongoDB Atlas!');
        return cb(); // Call the callback without an error to signal success.
      })
      .catch((err) => {
        // If an error occurs, log it and call the callback with the error.
        console.error('❌ Connection to MongoDB failed:', err);
        return cb(err);
      });
  },

  /**
   * Returns the database connection object once it has been established.
   * This allows other parts of the application (like your API routes) to
   * interact with the database.
   */
  getDb: () => dbConnection,
};

