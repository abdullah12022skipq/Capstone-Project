import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to the login page if not logged in
    }
  }, [navigate]);

  return isLoggedIn ? <Outlet /> : null; // Render the protected routes when logged in
};

export default PrivateRoute;
