import styles from './SocialAuthButton.module.css';

const SocialAuthButton = ({ icon: Icon, onClick, className }) => {
  return (
    <div onClick={onClick} className={`${styles.socialIconContainer} ${className || ''}`}>
      <Icon size={24} className={styles.socialIcon} />
    </div>
  );
};

export default SocialAuthButton;