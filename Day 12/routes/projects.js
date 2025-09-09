const express = require('express');
const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // Note the ../ to go up one directory

// Create a router instance
const router = express.Router();

// GET (Read) all projects
router.get('/', async (req, res) => {
  const db = getDb();
  try {
    const projects = await db.collection('projects').find().toArray();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});

// POST (Create) a new project
router.post('/', async (req, res) => {
  const db = getDb();
  try {
    const newProject = req.body;
    const result = await db.collection('projects').insertOne(newProject);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not create a new document' });
  }
});

// PUT (Update) a project by ID
router.put('/:id', async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const updates = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const result = await db.collection('projects').updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'No project found with this ID' });
    }
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not update the document' });
  }
});

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
  const db = getDb();
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No project found with this ID' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the document' });
  }
});

// Export the router to be used in the main server.js file
module.exports = router;
