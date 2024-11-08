// server.js
const express = require('express');
const app = express();
const cors=require('cors');
const PORT = 3000;

app.use(cors());

// Simulated data and pending clients
let counter = 0;
let clients = [];

// Endpoint for long polling
app.get('/long-poll', (req, res) => {
  // Store the client's response object for later use
  clients.push(res);

  // After 10 seconds, send a timeout response to the client (optional)
  setTimeout(() => {
    if (clients.includes(res)) {
      clients = clients.filter(client => client !== res);
      res.json({ data: counter, message: "No new updates (timeout)" });
    }
  }, 10000); // 10 seconds timeout
});

// Endpoint to update data (simulate data change)
app.post('/update', (req, res) => {
  counter += 1;

  // Notify all connected clients of the new update
  clients.forEach(client => client.json({ data: counter }));
  clients = []; // Clear the clients list after responding
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});