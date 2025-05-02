// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar'; // Navbar component
import PrivateRoute from './components/PrivateRoute'; // Protecting the routes

// Page imports
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';
import ForumPage from './pages/ForumPage';
import TodoPage from './pages/TodoPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      {/* Navbar for navigation */}
      <Navbar />
      
      <Routes>
        {/* Public route for authentication */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected routes wrapped with PrivateRoute component */}
        <Route 
          path="/" 
          element={<PrivateRoute><LandingPage /></PrivateRoute>} 
        />
        <Route 
          path="/quiz" 
          element={<PrivateRoute><QuizPage /></PrivateRoute>} 
        />
        <Route 
          path="/forum" 
          element={<PrivateRoute><ForumPage /></PrivateRoute>} 
        />
        <Route 
          path="/todo" 
          element={<PrivateRoute><TodoPage /></PrivateRoute>} 
        />
        <Route 
          path="/profile" 
          element={<PrivateRoute><ProfilePage /></PrivateRoute>} 
        />

        {/* Fallback route for 404 */}
        <Route 
          path="*" 
          element={<h1 className="text-center mt-5">404 - Not Found</h1>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
