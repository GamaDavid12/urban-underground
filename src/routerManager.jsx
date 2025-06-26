// src/routerManager.jsx
import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import routes from './routes';

const router = createMemoryRouter(routes);

const RouterManager = () => {
  return <RouterProvider router={router} />;
};

export default RouterManager;
