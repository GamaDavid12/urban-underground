import { useNavigate } from 'react-router-dom';
import styles from './NavigationButtons.module.css';
const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navButtonsContainer}>
      <button onClick={() => navigate(-1)} className={styles.navButton}>
        &lt; 
      </button>
      <button onClick={() => navigate(1)} className={styles.navButton}>
         &gt;
      </button>
    </div>
  );
};

export default NavigationButtons;