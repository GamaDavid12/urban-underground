import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Iniciar sesión clickeado!');
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2 className='font-noto text-2xl text-white'>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input type="text" name="username" placeholder="Nombre de usuario" required />
        </div>
        <div className={styles.inputGroup}>
          <input type="password" name="password" placeholder="Contraseña" required />
        </div>
        <div className={styles.rememberMe}>
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe">Recuérdame</label>
        </div>
        <button type="submit" className={styles.loginButton}>Iniciar Sesión</button>
      </form>

      <p className={styles.forgotPassword}>
        ¿Olvidaste tu contraseña? <Link to="/recuperar">Restablecer</Link>
      </p>

      <div className={styles.socialLogin}>
             <FcGoogle size={24} className={styles.socialIcon} />
             <FaFacebookF size={24} className={styles.socialIcon} />
           </div>

      <p className={styles.signupLink}>
        ¿No tienes una cuenta? <Link to="/registro">Registrarse</Link>
      </p>

      <div className={styles.termsLinks}>
        <a href="#">Términos y Condiciones</a>
        <a href="#">Soporte</a>
        <a href="#">Atención al Cliente</a>
      </div>
    </div>
  );
};

export default LoginForm;
