import { useState } from "react";
import { forgotPassword } from "../../services/authService.js";
import styles from "../LoginForm/LoginForm.module.css";
import AuthInput from "../../components/AuthInput/AuthInput.jsx";

export default function PasswordRecoveryForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email });
      setMessage(response.message || "Revisa tu correo para continuar.");
    } catch (err) {
      setMessage("Error al enviar el correo. Intenta nuevamente.");
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Correo electrónico</label>
          <AuthInput
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className={styles.loginButton} type="submit">
          Enviar enlace
        </button>
      </form>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}