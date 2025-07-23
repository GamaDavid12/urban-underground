import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom';
import Background from './components/Background/Background.jsx';
import styles from './App.module.css';
import MainLayout from './layout/MainLayout.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import './index.css';

import appRoutes from './routes';

const MainAppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const authPaths = ['/', '/registro', '/iniciar-sesion', '/recuperar']; 
  const shouldShowFullLayout = !authPaths.includes(location.pathname);

  const shouldShowAuthBackground = authPaths.includes(location.pathname);

  const element = useRoutes(appRoutes);

  return (
    <>
      {shouldShowAuthBackground && <Background />} 

      {shouldShowFullLayout && <Navbar toggleSidebar={toggleSidebar} />}
      {shouldShowFullLayout && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}

      {isSidebarOpen && shouldShowFullLayout && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {shouldShowFullLayout ? (
        <MainLayout>
          {element}
        </MainLayout>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh', 
          width: '100%' 
        }}>
          {element}
        </div>
      )}

      {shouldShowFullLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <MainAppContent />
      </Router>
    </div>
  );
}

export default App;