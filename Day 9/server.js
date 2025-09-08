const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'resumeData';

const client = new MongoClient(uri);

async function connectAndInsert() {
  try {
    await client.connect();
    console.log(`Successfully connected to MongoDB ✅`);

    const db = client.db(dbName);
    const collection = db.collection('profiles');

    const sampleResume = {
      name: 'Bhumika Rajput',
      title: 'Full Stack Developer and Graphic Designer',
      experience: 1,
      skills: ['Node.js', 'React', 'MongoDB', 'Java', 'Canva']
    };

    const result = await collection.insertOne(sampleResume);
    console.log(`Successfully inserted document with _id: ${result.insertedId} 📄`);

  } catch (err) {
    console.error('Failed to connect or insert document ❌', err);
  } finally {
    await client.close();
  }
}

connectAndInsert();