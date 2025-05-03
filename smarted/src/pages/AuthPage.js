import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthPage() {
  const [tab, setTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = 'https://smartedbackend.onrender.com';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(`${BASE_URL}/login`, loginData);
      const { token, username } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(`${BASE_URL}/register`, registerData);
      setSuccess('Registration successful! Please login.');
      setRegisterData({ email: '', username: '', password: '' });
      setTab('login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login / Register</h1>

      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn me-2 ${tab === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setTab('login');
            setError(null);
            setSuccess(null);
          }}
        >
          Login
        </button>
        <button
          className={`btn ${tab === 'register' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => {
            setTab('register');
            setError(null);
            setSuccess(null);
          }}
        >
          Register
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {tab === 'login' && (
            <form onSubmit={handleLogin} className="border p-4 rounded shadow">
              <h4 className="mb-3">Login</h4>
              <div className="mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          )}

          {tab === 'register' && (
            <form onSubmit={handleRegister} className="border p-4 rounded shadow">
              <h4 className="mb-3">Register</h4>
              <div className="mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Username</label>
                <input
                  className="form-control"
                  type="text"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
