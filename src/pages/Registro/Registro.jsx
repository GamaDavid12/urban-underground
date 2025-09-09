import { Link } from 'react-router';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './Registro.module.css';
import AuthInput from '../../components/AuthInput/AuthInput';
import SocialMediaButton from '../../components/SocialMediaButton/SocialMediaButton';
import Button from '../../components/Button/Button';

const Registro = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrarse clickeado!');
  };

  return (
    <div className={styles.RegistroContainer}>
      <h2 className={styles.RegistroContainerH2}>Registrarse</h2>
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
          id="email"
          type="email"
          name="email"
          placeholder="Correo electrónico"
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
        <AuthInput
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          required
          className={styles.inputGroup}
        />
        <Button type="submit" variant='gradient' text={"Registrarse"} />
      </form>

      <div className={styles.socialLogin}>
        <SocialMediaButton icon={FcGoogle} onClick={() => console.log('Google signup')} className={styles.socialIcon} />
        <SocialMediaButton icon={FaFacebookF} onClick={() => console.log('Facebook signup')} className={styles.socialIcon} />
      </div>

      <p className={styles.signupLink}>
        ¿Ya tienes una cuenta? <Link to="/iniciar-sesion" className={styles.signupLinkAnchor}>Iniciar sesión</Link>
      </p>

      <div className={styles.termsLinks}>
        <a href="#" className={styles.termsLink}>Términos y Condiciones</a>
        <a href="#" className={styles.termsLink}>Soporte</a>
        <a href="#" className={styles.termsLink}>Atención al Cliente</a>
      </div>
    </div>
  );
};

export default Registro;