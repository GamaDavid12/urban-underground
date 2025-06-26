import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './Registro.module.css';

const Registro = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registrarse clickeado!');
  };

  return (
    <div className={styles.RegistroContainer}>
      <h2 className='font-noto text-2xl text-white'>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input type="text" id="username" name="username" placeholder="Nombre de usuario" required />
        </div>
        <div className={styles.inputGroup}>
          <input type="email" id="email" name="email" placeholder='Correo electrónico' required />
        </div>
        <div className={styles.inputGroup}>
          <input type="password" id="password" name="contraseña" placeholder="Contraseña" required />
        </div>
        <div className={styles.inputGroup}>
          <input type="password" id="confirmar password" name="Confirmar Contraseña" placeholder="Confirmar contraseña" required />
        </div>

        <button type="submit" className={styles.loginButton}>Registrarse</button>
      </form>

<div className={styles.socialLogin}>
    <FcGoogle size={24} className={styles.socialIcon} />
    <FaFacebookF size={24} className={styles.socialIcon} />
</div>



      <p className={styles.signupLink}>
        ¿Ya tienes una cuenta? <Link to="/">Iniciar Sesión</Link>
      </p>

      <div className={styles.termsLinks}>
        <a href="#">Términos y Condiciones</a>
        <a href="#">Soporte</a>
        <a href="#">Atención al Cliente</a>
      </div>
    </div>
  );
};

export default Registro;