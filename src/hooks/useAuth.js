import { useState, useEffect } from 'react';

const useAuth = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Función para limpiar la sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserEmail(null);
    setIsAuthenticated(false);
    // Opcional: Recargar la página o redirigir a la página de inicio de sesión
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
          logout(); // Limpiar si los datos son incompletos
        }
      } catch (error) {
        console.error("Error al parsear datos de usuario:", error);
        logout(); // Limpiar si el JSON está corrupto
      }
    } else {
      setUserEmail(null);
      setIsAuthenticated(false);
    }
  }, []);

  return { userEmail, isAuthenticated, logout }; // Exportamos la función logout
};

export default useAuth;