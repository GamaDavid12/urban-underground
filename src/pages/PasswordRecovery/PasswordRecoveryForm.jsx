import React from 'react';
import { Link } from 'react-router';
import styles from "./PasswordRecovery.module.css";

const PasswordRecoveryForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Se enviará un enlace de recuperación al correo electrónico.");
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2 className="font-noto text-2xl text-white">¿Olvidaste tu contraseña?</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Introduce tu correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Restablecer contraseña
        </button>
      </form>

      <div className={styles.signupLink}>
        <p>¿No tienes una cuenta? <Link to="/registro">Registrarse</Link></p>
      </div>

      <div className={styles.termsLinks}>
        <a href="#">Términos y Condiciones</a>
        <a href="#">Soporte</a>
        <a href="#">Atención al Cliente</a>
      </div>
    </div>
  );
};

export default PasswordRecoveryForm;

