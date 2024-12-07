import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { getCurrentUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to fetch user', error);
        handleTokenExpiration();
      }
    };

    fetchUser();

    const handleTokenExpiration = () => {
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    };

    // Optionally, you can set up a periodic check if needed
    const intervalId = setInterval(fetchUser, 60000); // Check every 60 seconds

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };