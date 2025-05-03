const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;
const SECRET_KEY = 'your_secret_key';

// Middleware
app.use(express.json());
app.use(cors());

const qaRoute = require('./qa'); // Make sure qa.js is in the same folder
app.use('/api', qaRoute);
app.use('/', require('./quiz')); // Import the quiz route
// MongoDB connection
mongoose.connect('mongodb+srv://hrshthnaidu:harshith@cluster0.xelcz.mongodb.net/smarted?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Mongoose Schema and Model
// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizSubmissions: [
    {
      subject: { type: String, required: true },
      marks: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
});

const User = mongoose.model('User', userSchema);



// Helper function
function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// Register Route
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Email, username, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email }); // <-- FIXED HERE
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword }); // <-- FIXED HERE
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken({ username: user.username, email: user.email });
    res.json({ token, username: user.username });

  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/submit-quiz", async (req, res) => {
  const { username, email, subject, marks } = req.body;

  if (!username || !email || !subject || marks == null) {
    return res.status(400).json({ message: "username, email, subject, and marks are required" });
  }

  try {
    // Find the user by email and username
    const user = await User.findOne({ email, username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add the quiz submission to the user's profile
    user.quizSubmissions.push({
      subject,
      marks,
      date: new Date()
    });

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: "Quiz submitted successfully" });
  } catch (err) {
    console.error("Error saving quiz submission:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Profile Route - Get average marks per subject without authentication
app.post("/profile", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const subjectMarksMap = {};

    user.quizSubmissions.forEach((submission) => {
      const { subject, marks } = submission;
      if (!subjectMarksMap[subject]) {
        subjectMarksMap[subject] = { total: 0, count: 0 };
      }
      subjectMarksMap[subject].total += marks;
      subjectMarksMap[subject].count += 1;
    });

    const averageMarks = {};
    for (const subject in subjectMarksMap) {
      const { total, count } = subjectMarksMap[subject];
      averageMarks[subject] = (total / count).toFixed(2);
    }

    res.json({ username: user.username, averageMarks });
  } catch (err) {
    console.error("Error fetching profile data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
