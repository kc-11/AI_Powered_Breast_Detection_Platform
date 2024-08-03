const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');
const { runChat } = require('./utils/gemini');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "breast_cancer",
  password: "srk@1234",
  port: 5432,
});


const SECRET_KEY = '1234'; // Replace with a secure secret key

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Routes
app.post('/predict', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imagePath = req.file.path;
  const pythonProcess = spawn('python', ['./ml/predict.py', imagePath]);

  let result = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    res.json({ result: result.trim() });
  });
});

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const botReply = await runChat(userMessage);
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// New routes for login and registration
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const client = await pool.connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
    const result = await client.query(query, [name, email, hashedPassword]);
    client.release();

    const token = jwt.sign({ userId: result.rows[0].id }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
      stack: error.stack,
      code: error.code
    });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});