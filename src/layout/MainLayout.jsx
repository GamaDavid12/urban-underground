import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import styles from './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className={styles.app || 'app-container'}>
      <Navbar />
      <main className={styles.mainContent || 'main-content'}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;