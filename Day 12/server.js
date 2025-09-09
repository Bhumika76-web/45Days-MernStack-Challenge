// This is the main entry point for your application.

const express = require('express');
const { connectToDb } = require('./db');

// --- Import Your Route Files ---
// This line imports the router you created in routes/projects.js
const projectRoutes = require('./routes/projects');

const app = express();
const PORT = 3000;

// --- Middleware ---
// This allows the server to understand JSON data sent in request bodies
app.use(express.json());

// --- Main Route Configuration ---
// This tells Express that for any request to a URL starting with '/api/projects',
// it should use the routes defined in the 'projectRoutes' file.
app.use('/api/projects', projectRoutes);

// --- Database Connection and Server Startup ---
connectToDb((err) => {
  if (!err) {
    // Only start listening for requests after the database connection is successful
    app.listen(PORT, () => {
      console.log(`✅ Server is listening on http://localhost:${PORT}`);
      console.log('API endpoints for projects are available at http://localhost:3000/api/projects');
    });
  } else {
    console.error('❌ Failed to connect to the database. Server is not running.', err);
  }
});

