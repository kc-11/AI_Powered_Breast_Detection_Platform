
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const User = require('./models/Users');
const Image = require('./models/image');
const { runChat } = require('./utils/gemini');

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = '1234';

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Multer (memory storage for buffer upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ROUTES
app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No image uploaded');

    // Save to MongoDB
    const imageDoc = new Image({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBuffer: req.file.buffer,
    });
    await imageDoc.save();

    // Save buffer as temp file
    const tempPath = path.join(__dirname, 'temp', `${Date.now()}.jpg`);
    fs.writeFileSync(tempPath, req.file.buffer);

    // Feed temp file to Python
    const pythonProcess = spawn('python', ['./ml/predict.py', tempPath]);
    let result = '';

    pythonProcess.stdout.on('data', (data) => result += data.toString());
    pythonProcess.stderr.on('data', (data) => console.error(`Error: ${data}`));
    pythonProcess.on('close', (code) => {
      fs.unlinkSync(tempPath); // delete temp file
      res.json({ result: result.trim() });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Prediction failed');
  }
});

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const botReply = await runChat(userMessage);
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Chat failed' });
  }
});

// Register
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
