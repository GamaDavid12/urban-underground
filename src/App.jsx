import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './components/Background/Background';
import styles from './App.module.css';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.app}>
      <Background />


      <Router>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        )}

        <Routes>
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/" element={<ContactPage />} />
          <Route path="/categorias/remeras" element={<div>Página de Remeras</div>} />
          <Route path="/categorias/buzos-camperas" element={<div>Página de Buzos / Camperas</div>} />
          <Route path="/categorias/zapatillas" element={<div>Página de Zapatillas</div>} />
          <Route path="/categorias/gorras" element={<div>Página de Gorras</div>} />
          <Route path="/categorias/jeans" element={<div>Página de Jeans</div>} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
