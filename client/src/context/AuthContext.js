import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile/completion-status`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
          setIsProfileComplete(response.data.isProfileComplete);
        } catch (error) {
          setIsAuthenticated(false);
          setIsProfileComplete(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsProfileComplete(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isProfileComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
