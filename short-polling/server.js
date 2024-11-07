// server.js
const express = require('express');
const app = express();
const cors=require('cors');
const PORT = 3000;

app.use(cors());

// Simulated data
let counter = 0;

// Route that sends data to client
app.get('/get-data', (req, res) => {
  counter += 1;  // Simulate data change
  res.json({ data: counter });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
