import { Link, useNavigate } from "react-router";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { registerUser } from "../../services/authService.js";
import styles from "./Registro.module.css";
import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import SocialMediaButton from "../../components/SocialMediaButton/SocialMediaButton.jsx";
import Button from "../../components/Button/Button.jsx";

const Registro = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const data = { username, email, password };

    try {
      const res = await registerUser(data);
      console.log("✅ Usuario registrado:", res.user);

      if (res.token) localStorage.setItem("token", res.token);
      if (res.user) localStorage.setItem("user", JSON.stringify(res.user));

      setSuccess("Cuenta creada correctamente. Redirigiendo...");
      
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("❌ Error al registrar:", err);
      setError(err.message || "Error al registrar usuario.");
    }
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

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <Button type="submit" variant="gradient" text={"Registrarse"} />
      </form>

      <div className={styles.socialLogin}>
        <SocialMediaButton icon={FcGoogle} onClick={() => console.log("Google signup")} className={styles.socialIcon} />
        <SocialMediaButton icon={FaFacebookF} onClick={() => console.log("Facebook signup")} className={styles.socialIcon} />
      </div>

      <p className={styles.signupLink}>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/iniciar-sesion" className={styles.signupLinkAnchor}>
          Iniciar sesión
        </Link>
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