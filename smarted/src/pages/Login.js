// pages/login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim()) {
      try {
        const response = await fetch('http://localhost:5000/username-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('username', username);
          navigate('/quiz');
        } else {
          alert('Login failed');
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('Error during login');
      }
    } else {
      alert('Enter username');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-control mb-3"
      />
      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
    </div>
  );
};

export default Login;
