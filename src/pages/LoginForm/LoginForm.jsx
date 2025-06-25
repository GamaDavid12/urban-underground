import React from 'react';
import { Link } from 'react-router-dom';
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
          <input type="text" id="username" name="username" placeholder="Nombre de usuario" required />
        </div>
        <div className={styles.inputGroup}>
          <input type="password" id="password" name="password" placeholder="Contraseña" required />
        </div>
        <div className={styles.rememberMe}>
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe">Recuérdame</label>
        </div>
        <button type="submit" className={styles.loginButton}>Iniciar Sesión</button>
      </form>
      <p className={styles.forgotPassword}>
        ¿Olvidaste tu contraseña? <a href="#">Restablecer</a>
      </p>

      <div className={styles.socialLogin}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/768px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" />
      </div>

      <p className={styles.signupLink}>
        ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
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