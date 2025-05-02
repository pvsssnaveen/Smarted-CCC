import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/quiz'); // Redirect to protected route
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
