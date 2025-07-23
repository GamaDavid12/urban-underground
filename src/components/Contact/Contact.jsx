import React, { useState } from 'react';
import AuthInput from '../../components/AuthInput/AuthInput.jsx'; // Adjust path as needed
import AuthButton from '../../components/AuthButton/AuthButton.jsx'; // Adjust path as needed
// No need to import a Contact.css if we're keeping styles in index.css for these elements

function Contact() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', { nombre, apellido, email, mensaje });
    // Aquí podrías añadir lógica para enviar el formulario a un backend
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        {/* AuthInput for Nombre */}
        <AuthInput
          id="nombre"
          label="Nombre"
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre..."
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          // Pass the original form-group class to AuthInput's className
          // AuthInput's internal div.inputGroup will receive this class
          className="form-group"
        />

        {/* AuthInput for Apellido */}
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

        {/* AuthInput for Email */}
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

        {/* Textarea (remains as original to avoid style changes, 
            unless you create an AuthTextarea component) */}
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Deja tu consulta..."
            rows="5"
            required
            // The existing styling for textarea in index.css will apply
          ></textarea>
        </div>

        {/* AuthButton for submit */}
        <AuthButton
          type="submit"
          // Pass the original submit-button class to AuthButton's className
          className="submit-button"
        >
          Enviar
        </AuthButton>
      </form>
    </div>
  );
}

export default Contact;