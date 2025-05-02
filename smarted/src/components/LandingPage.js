// src/pages/LandingPage.js
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="text-center mt-20">
        <h2 className="text-3xl font-semibold">Welcome to SmartEd</h2>
        <p className="mt-4 text-lg">Your interactive and personalized learning platform.</p>
        <div className="mt-6 space-x-4">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
          <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</Link>
        </div>
      </div>
    </>
  );
}
