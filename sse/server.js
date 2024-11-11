// server.js
const express = require('express');
const app = express();
const PORT = 3000;

let counter = 0;

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Endpoint for Server-Sent Events (SSE)
app.get('/events', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a comment to keep the connection open
  res.write(': Connection established\n\n');

  // Send updates every 2 seconds
  const intervalId = setInterval(() => {
    counter += 1;
    res.write(`data: ${JSON.stringify({ counter })}\n\n`);
  }, 2000);

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
    console.log('Client disconnected');
  });
});

// Endpoint to simulate a data change
app.post('/update', (req, res) => {
  counter += 10;
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
