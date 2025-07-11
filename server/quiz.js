const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load Gemini API key from env
const genAI = new GoogleGenerativeAI("AIzaSyBoWhvwEeRWAVp13ckaeP0CkeLNhUh3MS8");

// Generate quiz questions using Gemini
router.post('/generate-quiz', async (req, res) => {
  const { topic } = req.body;

  if (!topic) return res.status(400).json({ message: 'Topic is required' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Generate 10 difficult MCQ questions on "${topic}" in JSON format with options and correct answer. Format:
[
  {
    "question": "What is...",
    "options": ["A", "B", "C", "D"],
    "correctOption": "B"
  }
]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response text by removing any unwanted formatting (e.g., backticks)
    let cleanedText = text.replace(/```json|\n|```/g, '').trim();

    // Parse JSON from cleaned text
    const questions = JSON.parse(cleanedText);

    res.json({ questions });
  } catch (err) {
    console.error('Error generating quiz:', err);
    res.status(500).json({ message: 'Failed to generate quiz' });
  }
});

module.exports = router;
