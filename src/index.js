import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/AppB.jsx'; // Asegúrate de importar desde la ruta correcta

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
