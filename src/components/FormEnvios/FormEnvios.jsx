import React, { useState, useEffect } from 'react';
import styles from './FormEnvios.module.css';
import { useCart } from '../../context/CartContext';

const paises = [
  { codigo: 'AR', nombre: 'Argentina', prefijo: '+54', estados: ['Buenos Aires', 'Córdoba', 'Santa Fe'] },
  { codigo: 'US', nombre: 'Estados Unidos', prefijo: '+1', estados: ['California', 'Texas', 'Nueva York'] },
  { codigo: 'ES', nombre: 'España', prefijo: '+34', estados: ['Madrid', 'Cataluña', 'Andalucía'] },
];

const FormEnvios = ({ onNextStep }) => {
  const { toggleCartSidebar, setContactInfo, setShippingAddress, contactInfo, shippingAddress } = useCart();

  const [formData, setFormData] = useState({
    correo: contactInfo?.correo || '',
    guardarDireccion: false,
    pais: shippingAddress?.pais || '',
    nombre: shippingAddress?.nombre || '',
    apellido: shippingAddress?.apellido || '',
    direccion: shippingAddress?.direccion || '',
    apartamento: shippingAddress?.apartamento || '',
    ciudad: shippingAddress?.ciudad || '',
    estado: shippingAddress?.estado || '',
    codigoPostal: shippingAddress?.codigoPostal || '',
    telefono: shippingAddress?.telefono || '',
    prefijoTelefono: shippingAddress?.prefijoTelefono || '',
  });

  const [estadosDisponibles, setEstadosDisponibles] = useState([]);
  const [sugerenciasDireccion, setSugerenciasDireccion] = useState([]);
  const [buscandoDireccion, setBuscandoDireccion] = useState(false);

  useEffect(() => {
    const paisSeleccionado = paises.find(p => p.codigo === formData.pais);
    if (paisSeleccionado) {
      setEstadosDisponibles(paisSeleccionado.estados);
      setFormData(prev => ({
        ...prev,
        prefijoTelefono: paisSeleccionado.prefijo,
        estado: prev.estado && paisSeleccionado.estados.includes(prev.estado) ? prev.estado : ''
      }));
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

    const requiredFields = ['correo', 'pais', 'nombre', 'apellido', 'direccion', 'ciudad', 'estado', 'codigoPostal', 'telefono'];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`Por favor completa el campo: ${field}`);
        return;
      }
    }

    
    setContactInfo({ correo: formData.correo });
    setShippingAddress({
      pais: formData.pais,
      nombre: formData.nombre,
      apellido: formData.apellido,
      direccion: formData.direccion,
      apartamento: formData.apartamento,
      ciudad: formData.ciudad,
      estado: formData.estado,
      codigoPostal: formData.codigoPostal,
      telefono: formData.telefono,
      prefijoTelefono: formData.prefijoTelefono,
    });

  
    if (onNextStep) onNextStep(formData);
  };

  return (
    <section className={styles.container}>
      <nav className={styles.breadcrumb}>
        <button type="button" onClick={toggleCartSidebar} className={styles.breadcrumbLink}>
          Carrito
        </button>
        <span className={styles.separator}>›</span>
        <span className={styles.breadcrumbCurrent}>Información</span>
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
          className={styles.input}
        />

        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="guardarDireccion" checked={formData.guardarDireccion} onChange={handleChange} />
          Enviarme un correo electrónico con noticias y ofertas.
        </label>

        <h2 className={styles.title}>Dirección de envío</h2>

        <select name="pais" value={formData.pais} onChange={handleChange} className={styles.select}>
          <option value="" disabled>País/Región</option>
          {paises.map(p => (
            <option key={p.codigo} value={p.codigo}>{p.nombre}</option>
          ))}
        </select>

        <div className={styles.row}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`${styles.input} ${styles.inputHalf}`}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={`${styles.input} ${styles.inputHalf}`}
          />
        </div>

        <div className={styles.inputSearchContainer}>
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleDireccionChange}
            className={`${styles.input} ${styles.inputSearch}`}
          />
          <span className={styles.searchIcon}>🔍</span>
          {sugerenciasDireccion.length > 0 && (
            <ul className={styles.sugerenciasList}>
              {sugerenciasDireccion.map((s, i) => (
                <li key={i} onClick={() => handleSugerenciaClick(s)}>{s}</li>
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
            className={`${styles.input} ${styles.inputThird}`}
          />

          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className={`${styles.select} ${styles.inputThird}`}
            disabled={!formData.pais}
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
            className={`${styles.input} ${styles.inputThird}`}
          />
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.inputGroupPrefix}>{formData.prefijoTelefono}</span>
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={toggleCartSidebar} className={styles.linkBack}>
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