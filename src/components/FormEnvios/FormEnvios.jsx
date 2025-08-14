import React, { useState, useEffect } from 'react';
import styles from './FormEnvios.module.css';

// Estos son solo datos de ejemplo para los países y estados (cuando agregue la API lo modifico)
const paises = [
  { codigo: 'AR', nombre: 'Argentina', prefijo: '+54', estados: ['Buenos Aires', 'Córdoba', 'Santa Fe'] },
  { codigo: 'US', nombre: 'Estados Unidos', prefijo: '+1', estados: ['California', 'Texas', 'Nueva York'] },
  { codigo: 'ES', nombre: 'España', prefijo: '+34', estados: ['Madrid', 'Cataluña', 'Andalucía'] },
];

const FormEnvios = ({ onNextStep, onBackToCart }) => {
  const [formData, setFormData] = useState({
    correo: '',
    guardarDireccion: false,
    pais: '',
    nombre: '',
    apellido: '',
    direccion: '',
    apartamento: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    telefono: '',
    prefijoTelefono: '', 
  });
  const [estadosDisponibles, setEstadosDisponibles] = useState([]);
  const [sugerenciasDireccion, setSugerenciasDireccion] = useState([]);
  const [buscandoDireccion, setBuscandoDireccion] = useState(false);

  useEffect(() => {
    // Cuando cambio el país se actualiza la lista de estados.
    const paisSeleccionado = paises.find(p => p.codigo === formData.pais);
    if (paisSeleccionado) {
      setEstadosDisponibles(paisSeleccionado.estados);
      setFormData(prev => ({ ...prev, prefijoTelefono: paisSeleccionado.prefijo, estado: '' }));
    } else {
      setEstadosDisponibles([]);
      setFormData(prev => ({ ...prev, prefijoTelefono: '', estado: '' }));
    }
  }, [formData.pais]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDireccionChange = async (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, direccion: value }));
    
    if (value.length > 3 && !buscandoDireccion) {
      setBuscandoDireccion(true);
      // después tengo que agregar API de geolocalización
      
      // Simulación de una respuesta de API
      const mockSugerencias = [
        'Calle Falsa 123, Springfield',
        'Avenida Siempre Viva 742',
        'Calle de las Flores, 4',
      ];
      setSugerenciasDireccion(mockSugerencias);
      setBuscandoDireccion(false);
    } else if (value.length <= 3) {
      setSugerenciasDireccion([]);
    }
  };

  const handleSugerenciaClick = (sugerencia) => {
    setFormData(prev => ({ ...prev, direccion: sugerencia }));
    setSugerenciasDireccion([]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep(formData);
  };

  return (
    <section className={styles.container}>
       <nav className={styles.breadcrumb}>
        <button
          type="button"
          onClick={onBackToCart}
          className={styles.breadcrumbLink}
        >
          Carrito
        </button>
        <span className={styles.separator}>›</span>
        <span className={`${styles.breadcrumbCurrent}`}>Información</span>
        <span className={styles.separator}>›</span>
        <span className={styles.breadcrumbNext}>Envío</span>
        <span className={styles.separator}>›</span>
        <span className={styles.breadcrumbNext}>Pago</span>
      </nav>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Información de contacto</h2>

        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="guardarDireccion"
            checked={formData.guardarDireccion}
            onChange={handleChange}
          />
          Enviarme un correo electrónico con noticias y ofertas.
        </label>

        <h2 className={styles.title}>Dirección de envío</h2>
        
        {/* País/Región opciones */}
        <select
          name="pais"
          value={formData.pais}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="" disabled>País/Región</option>
          {paises.map(pais => (
            <option key={pais.codigo} value={pais.codigo}>{pais.nombre}</option>
          ))}
        </select>

        <div className={styles.row}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className={`${styles.input} ${styles.inputHalf}`}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className={`${styles.input} ${styles.inputHalf}`}
          />
        </div>

        {/* acá dirección con buscador */}
        <div className={styles.inputSearchContainer}>
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleDireccionChange}
            required
            className={`${styles.input} ${styles.inputSearch}`}
          />
          <span className={styles.searchIcon}>🔍</span>
          {sugerenciasDireccion.length > 0 && (
            <ul className={styles.sugerenciasList}>
              {sugerenciasDireccion.map((sugerencia, index) => (
                <li key={index} onClick={() => handleSugerenciaClick(sugerencia)}>
                  {sugerencia}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          name="apartamento"
          placeholder="Apartamento, suite, etc. (opcional)"
          value={formData.apartamento}
          onChange={handleChange}
          className={styles.input}
        />

        <div className={styles.row}>
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
            className={`${styles.input} ${styles.inputThird}`}
          />

          {/* Estado opciones */}
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            className={`${styles.select} ${styles.inputThird}`}
            disabled={!formData.pais} // si no selecciono un país al principio esta opción permanece deshabilitado
          >
            <option value="" disabled>Estado</option>
            {estadosDisponibles.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>

          <input
            type="text"
            name="codigoPostal"
            placeholder="Código postal"
            value={formData.codigoPostal}
            onChange={handleChange}
            required
            className={`${styles.input} ${styles.inputThird}`}
          />
        </div>

        {/* Teléfono con prefijo de cada pais*/}
        <div className={styles.inputGroup}>
          <span className={styles.inputGroupPrefix}>{formData.prefijoTelefono}</span>
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onBackToCart}
            className={styles.linkBack}
          >
            ‹ Volver al carrito
          </button>
          <button type="submit" className={styles.btnPrimary}>
            Continuar con el envío
          </button>
        </div>
      </form>

      <footer className={styles.footerLinks}>
        <a href="#">Política de reembolso</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Términos del servicio</a>
      </footer>
    </section>
  );
};

export default FormEnvios;