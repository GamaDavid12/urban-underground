import styles from './MainLayout.module.css';

function MainLayout({ children }) {
  return (
    <div className={styles.mainLayoutContainer}>
      <main className={styles.mainContent}>
        {children} 
      </main>
    </div>
  );
}

export default MainLayout;