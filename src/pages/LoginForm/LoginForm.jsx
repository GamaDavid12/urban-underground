import { Link, useNavigate } from "react-router";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { loginUser } from "../../services/authService.js";
import styles from "./LoginForm.module.css";
import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import SocialMediaButton from "../../components/SocialMediaButton/SocialMediaButton.jsx";
import Button from "../../components/Button/Button.jsx";

const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await loginUser(data);
      console.log("✅ Usuario logueado:", res.user);

      if (res.token) localStorage.setItem("token", res.token);
      if (res.user) localStorage.setItem("user", JSON.stringify(res.user));

      if (res.user?.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      setError("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2 className={styles.loginFormContainerH2}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
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
        <div className={styles.rememberMe}>
          <input type="checkbox" id="rememberMe" name="rememberMe" className={styles.rememberMeCheckbox} />
          <label htmlFor="rememberMe">Recuérdame</label>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <Button variant="gradient" text="Iniciar Sesión" type="submit" />
      </form>

      <p className={styles.forgotPassword}>
        ¿Olvidaste tu contraseña?{" "}
        <Link to="/recuperar" className={styles.forgotPasswordLink}>
          Restablecer
        </Link>
      </p>

      <div className={styles.socialLogin}>
        <SocialMediaButton icon={FcGoogle} onClick={() => console.log("Google login")} className={styles.socialIcon} />
        <SocialMediaButton icon={FaFacebookF} onClick={() => console.log("Facebook login")} className={styles.socialIcon} />
      </div>

      <p className={styles.signupLink}>
        ¿No tienes una cuenta?{" "}
        <Link to="/registro" className={styles.signupLinkAnchor}>
          Registrarse
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

export default LoginForm;