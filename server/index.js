const express = require('express');
const multer = require('multer');
const path = require('path');
const os = require('os');
const cors=require('cors');
const app = express();
const port = 5000;

// Middleware to parse JSON (optional, not required for your current POST)
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
// Setup Multer storage (for future file uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// POST /generate-quiz – Return 10 hardcoded quiz questions
app.post('/generate-quiz', (req, res) => {
  const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctOption: "4",
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctOption: "Paris",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctOption: "Jupiter",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
      correctOption: "Shakespeare",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "O3"],
      correctOption: "H2O",
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
      correctOption: "Mount Everest",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
      correctOption: "Da Vinci",
    },
    {
      question: "What is the speed of light?",
      options: ["299,792 km/s", "150,000 km/s", "100,000 km/s", "1,000,000 km/s"],
      correctOption: "299,792 km/s",
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Einstein", "Galileo", "Tesla"],
      correctOption: "Einstein",
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "Nauru", "San Marino"],
      correctOption: "Vatican City",
    },
  ];

  res.json({ questions });
});

// Helper to get local IP address
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }
}

const localIP = getLocalIPAddress();

// Start server on all interfaces (network-accessible)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running:
  - Local:   http://localhost:${port}
  - Network: http://${localIP}:${port}`);
});
