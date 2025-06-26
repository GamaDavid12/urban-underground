// src/routes.jsx
import React from 'react';
import LoginForm from './pages/LoginForm/LoginForm';
import Registro from './pages/Registro/Registro';
import PasswordRecoveryForm from './pages/PasswordRecovery/PasswordRecoveryForm';

const routes = [
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/registro',
    element: <Registro />,
  },
  {
    path: '/recuperar',
    element: <PasswordRecoveryForm />,
  },
];

export default routes;

