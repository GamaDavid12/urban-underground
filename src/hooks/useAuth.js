import { useState, useEffect } from 'react';

const useAuth = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserEmail(null);
    setIsAuthenticated(false);
    window.location.href = '/'; 
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      try {
        const userData = JSON.parse(userJson);
        if (userData.email) {
          setUserEmail(userData.email);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error al parsear datos de usuario:", error);
        logout();
      }
    } else {
      setUserEmail(null);
      setIsAuthenticated(false);
    }
  }, []);

  return { userEmail, isAuthenticated, logout };
};

export default useAuth;