import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/authService.js";
import styles from "../LoginForm/LoginForm.module.css";
import AuthInput from "../../components/AuthInput/AuthInput.jsx";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await resetPassword({ token, password });
      setMessage(response.message || "Contraseña actualizada correctamente");
      setTimeout(() => navigate("/iniciar-sesion"), 2000);
    } catch (err) {
      setMessage("Error al restablecer la contraseña. Intenta nuevamente.");
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Nueva contraseña</label>
          <AuthInput
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Confirmar contraseña</label>
          <AuthInput
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className={styles.loginButton} type="submit">
          Restablecer
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}