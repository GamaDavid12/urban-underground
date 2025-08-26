import styles from './MainLayout.module.css';
import NavigationButtons from '../components/NavigationButtons/NavigationButtons';

function MainLayout({ children }) {
  return (
    <div className={styles.mainLayoutContainer}>
      <main className={styles.mainContent}>
        {children} 
      </main>
      <NavigationButtons />
    </div>
  );
}

export default MainLayout;