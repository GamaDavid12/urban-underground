import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* para agregá más rutas  */}
    </Routes>
  );
};

export default AppRoutes;
