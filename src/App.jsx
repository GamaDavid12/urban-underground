import React from 'react';
import Background from './components/Background/Background';
import styles from './App.module.css';
import RouterManager from './routerManager';

const App = () => {
  return (
    <div className={styles.app}>
      <Background />
      <RouterManager />
    </div>
  );
};

export default App;