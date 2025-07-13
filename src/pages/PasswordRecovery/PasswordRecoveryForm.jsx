import { Link } from 'react-router';
import styles from "./PasswordRecovery.module.css";
import AuthInput from '../../components/AuthInput/AuthInput';
import AuthButton from '../../components/AuthButton/AuthButton';

const PasswordRecoveryForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Se enviará un enlace de recuperación al correo electrónico.");
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2 className={styles.loginFormContainerH2}>¿Olvidaste tu contraseña?</h2>
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="email"
          label="Introduce tu correo electrónico"
          type="email"
          name="email"
          placeholder="example@mail.com"
          required
          className={styles.inputGroup}
        />
        <AuthButton type="submit" className={styles.loginButton}>
          Restablecer contraseña
        </AuthButton>
      </form>

      <div className={styles.signupLink}>
        <p>¿No tienes una cuenta? <Link to="/registro" className={styles.signupLinkAnchor}>Registrarse</Link></p>
      </div>

      <div className={styles.termsLinks}>
        <a href="#" className={styles.termsLink}>Términos y Condiciones</a>
        <a href="#" className={styles.termsLink}>Soporte</a>
        <a href="#" className={styles.termsLink}>Atención al Cliente</a>
      </div>
    </div>
  );
};

export default PasswordRecoveryForm;