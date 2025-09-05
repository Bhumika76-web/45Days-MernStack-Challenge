const express = require('express');
const app = express();
const PORT = 3000;

const projects = [
  { id: 1, name: 'E-commerce Platform', description: 'A full-stack e-commerce website using the MERN stack.', role: 'Lead Developer' },
  { id: 2, name: 'Task Management App', description: 'A collaborative task manager with real-time updates.', role: 'Front-end Developer' },
  { id: 3, name: 'Portfolio Website', description: 'A personal portfolio to showcase skills and projects.', role: 'Developer' }
];

const experience = [
  { id: 1, company: 'Tech Solutions Inc.', role: 'Senior Software Engineer', period: '2020 - Present', responsibilities: 'Leading the development of scalable web applications.' },
  { id: 2, company: 'Web Innovators LLC', role: 'Junior Developer', period: '2018 - 2020', responsibilities: 'Assisted in the development of client websites.' }
];

app.get('/api', (req, res) => {
  res.json({ message: "API is running! Welcome to the Resume API." });
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/experience', (req, res) => {
  res.json(experience);
});

app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: `Project with ID ${projectId} not found.` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

