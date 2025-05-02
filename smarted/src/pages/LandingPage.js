// pages/Landingpage.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/auth');
  };

  const backgroundStyle = {
    backgroundImage: `url('/bg.jpg')`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '1px 1px 5px black',
    textAlign: 'center',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(2, 2, 2, 0.5)',
    padding: '2rem',
    borderRadius: '10px',
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <h1 className="display-4 fw-bold mb-3">Welcome to SmartEd</h1>
        <p className="lead mb-4">Smart learning made simple and effective.</p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
