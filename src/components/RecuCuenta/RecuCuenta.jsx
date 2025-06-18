import React from 'react';
import styles from './RecuCuenta.module.css';

const RecuCuenta = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Iniciar sesión clickeado!');
  };

  return (
    <div className={styles.RecuCuentaContainer}>
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
        {/* Aquí deberías usar tus propias imágenes para los iconos de Google y Facebook */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/768px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" />
      </div>

      <p className={styles.signupLink}>
        ¿No tienes una cuenta? <a href="#">Registrarse</a>
      </p>

      <div className={styles.termsLinks}>
        <a href="#">Términos y Condiciones</a>
        <a href="#">Soporte</a>
        <a href="#">Atención al Cliente</a>
      </div>
    </div>
  );
};

export default RecuCuenta;