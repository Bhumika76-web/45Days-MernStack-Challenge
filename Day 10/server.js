const express = require('express');
require('dotenv').config(); // <-- Import dotenv
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(express.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
    
    db = getDb();
  } else {
    console.error('Failed to connect to the database:', err);
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Resume API! Use /api/projects to see the projects.');
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection('projects').find().toArray();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the projects.' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = req.body;
    const result = await db.collection('projects').insertOne(newProject);
    res.status(201).json(result); 
  } catch (error) {
    res.status(500).json({ error: 'Could not create the project.' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    
    if (!ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID format.' });
    }
    const project = await db.collection('projects').findOne({ _id: new ObjectId(projectId) });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the project.' });
  }
});

