import { Link } from 'react-router';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './LoginForm.module.css';
import AuthInput from '../../components/AuthInput/AuthInput';
import SocialAuthButton from '../../components/SocialAuthButton/SocialAuthButton';
import Button from '../../components/Button/Button';

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciar sesión clickeado!');
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2 className={styles.loginFormContainerH2}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="username"
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          required
          className={styles.inputGroup}
        />
        <AuthInput
          id="password"
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          className={styles.inputGroup}
        />
        <div className={styles.rememberMe}>
          <input type="checkbox" id="rememberMe" name="rememberMe" className={styles.rememberMeCheckbox} />
          <label htmlFor="rememberMe">Recuérdame</label>
        </div>
        <Button variant='gradient' text="Iniciar Sesión" type="submit"/>
      </form>

      <p className={styles.forgotPassword}>
        ¿Olvidaste tu contraseña? <Link to="/recuperar" className={styles.forgotPasswordLink}>Restablecer</Link>
      </p>

      <div className={styles.socialLogin}>
        <SocialAuthButton icon={FcGoogle} onClick={() => console.log('Google login')} className={styles.socialIcon} />
        <SocialAuthButton icon={FaFacebookF} onClick={() => console.log('Facebook login')} className={styles.socialIcon} />
      </div>

      <p className={styles.signupLink}>
        ¿No tienes una cuenta? <Link to="/registro" className={styles.signupLinkAnchor}>Registrarse</Link>
      </p>

      <div className={styles.termsLinks}>
        <a href="#" className={styles.termsLink}>Términos y Condiciones</a>
        <a href="#" className={styles.termsLink}>Soporte</a>
        <a href="#" className={styles.termsLink}>Atención al Cliente</a>
      </div>
    </div>
  );
};

export default LoginForm;