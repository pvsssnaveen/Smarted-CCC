// src/pages/AuthPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [tab, setTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const DEFAULT_EMAIL = 'stud@g.com';
  const DEFAULT_PASSWORD = '12345';

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Login button clicked'); // Debugging: Confirm login button is clicked
    console.log('Login Data:', loginData); // Debugging: Check login data

    if (
      loginData.email === DEFAULT_EMAIL &&
      loginData.password === DEFAULT_PASSWORD
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      console.log('Login successful! Setting localStorage and redirecting to landing page...'); // Debugging: Confirm login success
      console.log('LocalStorage:', localStorage.getItem('isLoggedIn')); // Debugging: Check if localStorage is updated
      navigate('/'); // Redirect to landing page
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.email && registerData.password) {
      alert(`Registered with Email: ${registerData.email}`);
      setTab('login'); // Switch to login tab after registration
    } else {
      setError('Please fill in both fields to register.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Please Login / Register</h1>

      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn me-2 ${tab === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setTab('login')}
        >
          Login
        </button>
        <button
          className={`btn ${tab === 'register' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => setTab('register')}
        >
          Register
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Show error message if any */}
          {error && <div className="alert alert-danger">{error}</div>}

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
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
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
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
