// src/components/PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/auth" />;
  }

  return children;
};

export default PrivateRoute;
