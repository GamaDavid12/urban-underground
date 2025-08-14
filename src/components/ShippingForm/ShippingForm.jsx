import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './ShippingForm.module.css';

const ShippingForm = ({ onNextStep, onPrevStep }) => {
  const { shippingMethod, setShippingMethod } = useCart();

  const handleShippingChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep();
  };

  return (
    <section className={styles.shippingMethods}>
      {/* Pasos del formulario */}
      <div className={styles.titleHeader}>
        <a href="#" className={styles.titleLink} onClick={onPrevStep}>Carrito</a>
        {' > '}
        <a href="#" className={styles.titleLink} onClick={onPrevStep}>Información</a>
        {' > '}
        <span className={styles.titleCurrent}>Envío</span>
        {' > '}
        <span className={styles.titleNext}>Pago</span>
      </div>

      <h2 className={styles.sectionTitle}>Método de envío</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.shippingOptions}>
          <label className={`${styles.shippingOption} ${shippingMethod === 'standard' ? styles.active : ''}`}>
            <input
              type="radio"
              name="shippingMethod"
              value="standard"
              checked={shippingMethod === 'standard'}
              onChange={handleShippingChange}
            />
            <div className={styles.shippingInfo}>
              <span className={styles.shippingName}>Envío estándar</span>
              <span className={styles.shippingDetails}>5-7 días hábiles</span>
            </div>
            <span className={styles.shippingPrice}>$12.00</span>
          </label>

          <label className={`${styles.shippingOption} ${shippingMethod === 'express' ? styles.active : ''}`}>
            <input
              type="radio"
              name="shippingMethod"
              value="express"
              checked={shippingMethod === 'express'}
              onChange={handleShippingChange}
            />
            <div className={styles.shippingInfo}>
              <span className={styles.shippingName}>Envío exprés</span>
              <span className={styles.shippingDetails}>2-3 días hábiles</span>
            </div>
            <span className={styles.shippingPrice}>$25.00</span>
          </label>
        </div>

        {/* Botones */}
        <div className={styles.formActions}>
          <a href="#" className={styles.linkButton} onClick={onPrevStep}>{'<'} Volver a Información</a>
          <button type="submit" className={styles.btnPrimary}>Continuar con el pago</button>
        </div>
      </form>

      {/* Links de los términos */}
      <div className={styles.termsLinks}>
        <a href="#">Política de reembolso</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Términos del servicio</a>
      </div>
    </section>
  );
};

export default ShippingForm;
