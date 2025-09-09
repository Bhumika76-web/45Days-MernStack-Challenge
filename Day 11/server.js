// Day 11: CRUD Operations - Update & Delete

const express = require('express');
// ObjectId is crucial for working with the unique _id field in MongoDB
const { ObjectId } = require('mongodb'); 
const { connectToDb, getDb } = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Database Connection ---
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`✅ Server is listening on http://localhost:${PORT}`);
    });
    db = getDb();
  } else {
    console.error('❌ Failed to connect to the database:', err);
  }
});

// --- API Routes ---

// GET (Read) all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection('projects').find().toArray();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});

// POST (Create) a new project
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = req.body;
    const result = await db.collection('projects').insertOne(newProject);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not create a new document' });
  }
});

// PUT (Update) a project by its ID
app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate that the ID is a valid ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(id) }, // Filter to find the document by its ID
      { $set: updates }        // The $set operator updates the fields
    );

    // Check if a document was actually found and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'No project found with this ID' });
    }

    res.status(200).json({ message: 'Project updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Could not update the document' });
  }
});

// DELETE a project by its ID
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await db.collection('projects').deleteOne(
      { _id: new ObjectId(id) } // Filter to find the document by its ID
    );

    // Check if a document was actually found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No project found with this ID' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the document' });
  }
});

