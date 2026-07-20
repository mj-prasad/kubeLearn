const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API endpoint to add two numbers
app.get('/api/add', (req, res) => {
  const { a, b } = req.query;

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Please provide both parameters "a" and "b".' });
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  const result = numA + numB;
  return res.json({ a: numA, b: numB, result });
});

// Health check endpoint (very useful for Kubernetes liveness/readiness probes)
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Calculator service listening on port ${PORT}`);
});
