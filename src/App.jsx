import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom';
import Background from './components/Background/Background.jsx';
import styles from './App.module.css';
import MainLayout from './layout/MainLayout.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import CartSidebar from './components/CartSidebar/CartSidebar.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';

import appRoutes from './routes';

import authBackgroundImage from './assets/underground.jpg';

const MainAppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const authPaths = ['/registro', '/iniciar-sesion', '/recuperar']; 
  const shouldShowFullLayout = !authPaths.includes(location.pathname);
  const shouldShowAuthBackground = authPaths.includes(location.pathname);

  const element = useRoutes(appRoutes);

  return (
    <>
      {}
      {shouldShowAuthBackground && (
        <Background backgroundImage={authBackgroundImage}>
          {element}
        </Background>
      )}

      {}
      {shouldShowFullLayout && <Navbar toggleSidebar={toggleSidebar} />}
      {shouldShowFullLayout && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <CartSidebar />

      {isSidebarOpen && shouldShowFullLayout && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {}
      {shouldShowFullLayout && (
        <MainLayout>
          {element}
        </MainLayout>
      )}

      {shouldShowFullLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <CartProvider>
          <MainAppContent />
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
