import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ground from './components/Background/Background'; 
import LoginForm from './pages/LoginForm/LoginForm';    
import Registro from './components/Registro/Registro'; 
import styles from './components/App/App.module.css'; 

const App = () => {
  return (
    <BrowserRouter> 
      <div className={styles.app}>
        <Ground /> 
        <Routes> 
          <Route path="/" element={<LoginForm />} /> 
          <Route path="/register" element={<Registro />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;