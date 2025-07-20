import styles from './AuthButton.module.css';

const AuthButton = ({ children, onClick, type = 'button', className }) => {
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${className || ''}`}>
      {children}
    </button>
  );
};

export default AuthButton;