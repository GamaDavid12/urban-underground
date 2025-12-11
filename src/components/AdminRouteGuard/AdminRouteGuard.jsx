import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  return {
    isAuthenticated: !!user,
    userRole: user?.rol,
  };
};


const AdminRouteGuard = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const isUserAdmin = userRole === 'ADMIN';

  useEffect(() => {
    if (!isAuthenticated || !isUserAdmin) {
      console.log("Acceso denegado. Redirigiendo a /.");
      navigate('/', { replace: true }); 
    }
  }, [isAuthenticated, isUserAdmin, navigate]);

  return isUserAdmin ? children : null; 
};

export default AdminRouteGuard;