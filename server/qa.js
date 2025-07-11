const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyBoWhvwEeRWAVp13ckaeP0CkeLNhUh3MS8");

router.post('/qa', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error('QA Error:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

module.exports = router;
