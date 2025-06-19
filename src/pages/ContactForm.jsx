import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
    alert('Gracias por tu mensaje.');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={form.apellido}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <textarea
        name="mensaje"
        placeholder="Escribí tu mensaje..."
        value={form.mensaje}
        onChange={handleChange}
        required
        rows={5}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>Enviar</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '400px',
    margin: '2rem auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  textarea: {
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }
};
