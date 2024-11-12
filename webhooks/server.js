// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const webhookData = req.body;
  console.log('Received Webhook Data:', webhookData);
  // Send a response to acknowledge receipt
  res.status(200).send('Webhook received successfully!');
});

// Test endpoint to simulate a webhook trigger
app.post('/trigger-webhook', (req, res) => {
  console.log('Webhook triggered manually');
  res.status(200).send('Webhook trigger request received!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
