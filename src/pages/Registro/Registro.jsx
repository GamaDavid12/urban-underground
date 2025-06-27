import React from "react";
import { Link } from "react-router";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styles from "./Registro.module.css";
import TextField from "../../components/TextField/TextField";

const Registro = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registrarse clickeado!");
  };

  return (
    <div className={styles.RegistroContainer}>
      <h2 className="font-noto text-2xl text-white">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          required
        />
        <TextField
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
        />
        <TextField
          type="password"
          name="password"
          placeholder="Contraseña"
          required
        />
        <TextField
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          required
        />

        <button type="submit" className={styles.loginButton}>
          Registrarse
        </button>
      </form>

      <div className={styles.socialLogin}>
        <FcGoogle size={24} className={styles.socialIcon} />
        <FaFacebookF size={24} className={styles.socialIcon} />
      </div>

      <p className={styles.signupLink}>
        ¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link>
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
