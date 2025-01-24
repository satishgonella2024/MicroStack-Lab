const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// In-memory database for feedback
const feedbacks = [];

// GET / (existing endpoint)
app.get('/', (req, res) => {
  res.send('Hello from the Backend!');
});

// GET /quote (new endpoint)
app.get('/quote', (req, res) => {
  const quotes = [
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "Hardships often prepare ordinary people for an extraordinary destiny."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

// POST /feedback (new endpoint)
app.post('/feedback', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  feedbacks.push({ name, message });
  res.json({ message: 'Feedback submitted successfully!' });
});

// GET /feedbacks (view all feedback)
app.get('/feedbacks', (req, res) => {
  res.json({ feedbacks });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});