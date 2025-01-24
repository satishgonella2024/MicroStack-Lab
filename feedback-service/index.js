const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 5002;

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'microservices',
    password: process.env.DB_PASSWORD || 'password',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  });

app.use(bodyParser.json());
app.use(cors());

// Submit feedback
app.post('/feedback', async (req, res) => {
  const { user_id, message } = req.body;
  try {
    await pool.query('INSERT INTO feedback (user_id, message) VALUES ($1, $2)', [user_id, message]);
    res.json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch feedback by user
app.get('/feedback', async (req, res) => {
  const { user_id } = req.query;
  try {
    const result = await pool.query('SELECT * FROM feedback WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Feedback Service running on http://localhost:${PORT}`));