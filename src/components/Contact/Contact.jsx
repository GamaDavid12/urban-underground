import React, { useState } from "react";
import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import Button from "../Button/Button.jsx";

function Contact() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <AuthInput
          id="nombre"
          label="Nombre"
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre..."
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-group"
        />

        <AuthInput
          id="apellido"
          label="Apellido"
          type="text"
          name="apellido"
          placeholder="Ingresa tu apellido..."
          required
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="form-group"
        />

        <AuthInput
          id="email"
          label="Email"
          type="email"
          name="email"
          placeholder="Ingresa tu correo..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-group"
        />

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Deja tu consulta..."
            rows="5"
            required
          ></textarea>
        </div>

        <Button type="submit" text={"Enviar"} variant="gradient"/>
      </form>
    </div>
  );
}

export default Contact;