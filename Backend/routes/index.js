const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { runChat } = require('../utils/gemini');

router.post('/predict', upload.single('image'), (req, res) => {
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
        res.json({ result });
    });
});

router.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const botReply = await runChat(userMessage);
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error in chat:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

module.exports = router;