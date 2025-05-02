// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';         // Top navigation bar
import PrivateRoute from './components/PrivateRoute'; // Route protection

// Page components
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';
import ForumPage from './pages/ForumPage';
import TodoPage from './pages/TodoPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public route for login/register */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Private routes (only accessible if logged in) */}
        <Route path="/" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
        <Route path="/quiz" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
        <Route path="/forum" element={<PrivateRoute><ForumPage /></PrivateRoute>} />
        <Route path="/todo" element={<PrivateRoute><TodoPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

        {/* Catch-all route */}
        <Route path="*" element={
          <div className="container text-center mt-5">
            <h1 className="display-4">404 - Page Not Found</h1>
            <p className="lead">The page you're looking for doesn't exist.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
