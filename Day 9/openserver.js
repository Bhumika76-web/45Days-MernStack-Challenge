const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'resumeData';

const client = new MongoClient(uri);

async function connectAndPrint() { // Renamed for clarity
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('profiles');

    // NEW: Find one document in the collection.
    // The empty {} means "find any document".
    console.log('Searching for a document...');
    const myResume = await collection.findOne({});

    // NEW: Print the found document to the console.
    console.log('Found the following document:');
    console.log(myResume);

  } catch (err) {
    console.error('An error occurred ❌', err);
  } finally {
    await client.close();
  }
}

// Call the function
connectAndPrint();