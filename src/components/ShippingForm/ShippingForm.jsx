import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './ShippingForm.module.css';

const ShippingForm = ({ onNextStep, onPrevStep }) => {
  const { premiumShipping, setShippingCost, setShippingMethod } = useCart();
  const [selectedShipping, setSelectedShipping] = useState('standard');

  useEffect(() => {
    if (premiumShipping) {
      setSelectedShipping('premium');
      setShippingMethod('premium');
      setShippingCost(14);
    } else {
      setSelectedShipping('standard');
      setShippingMethod('standard');
      setShippingCost(12);
    }
  }, [premiumShipping, setShippingMethod, setShippingCost]);

  const handleShippingChange = (e) => {
    if (premiumShipping) return; 

    const value = e.target.value;
    setSelectedShipping(value);
    setShippingMethod(value);

    let cost = 0;
    if (value === 'standard') cost = 12;
    if (value === 'express') cost = 25;

    setShippingCost(cost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (premiumShipping) {
      onNextStep({
        shippingMethod: 'premium',
        shippingCost: 14,
      });
      return;
    }

    let cost = 0;
    if (selectedShipping === 'standard') cost = 12;
    if (selectedShipping === 'express') cost = 25;

    onNextStep({
      shippingMethod: selectedShipping,
      shippingCost: cost,
    });
  };

  return (
    <section className={styles.shippingMethods}>
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
          <label className={`${styles.shippingOption} ${selectedShipping === 'standard' ? styles.active : ''}`}>
            <input
              type="radio"
              name="shippingMethod"
              value="standard"
              checked={selectedShipping === 'standard'}
              onChange={handleShippingChange}
              disabled={premiumShipping} 
            />
            <div className={styles.shippingInfo}>
              <span className={styles.shippingName}>Envío estándar</span>
              <span className={styles.shippingDetails}>5-7 días hábiles</span>
            </div>
            <span className={styles.shippingPrice}>$12.00</span>
          </label>

          <label className={`${styles.shippingOption} ${selectedShipping === 'express' ? styles.active : ''}`}>
            <input
              type="radio"
              name="shippingMethod"
              value="express"
              checked={selectedShipping === 'express'}
              onChange={handleShippingChange}
              disabled={premiumShipping} 
            />
            <div className={styles.shippingInfo}>
              <span className={styles.shippingName}>Envío exprés</span>
              <span className={styles.shippingDetails}>2-3 días hábiles</span>
            </div>
            <span className={styles.shippingPrice}>$25.00</span>
          </label>

          {premiumShipping && (
            <label className={`${styles.shippingOption} ${selectedShipping === 'premium' ? styles.active : ''}`}>
              <input
                type="radio"
                name="shippingMethod"
                value="premium"
                checked={selectedShipping === 'premium'}
                onChange={handleShippingChange}
                disabled={true} 
              />
              <div className={styles.shippingInfo}>
                <span className={styles.shippingName}>Envío Premium</span>
                <span className={styles.shippingDetails}>1 año de envíos gratis</span>
              </div>
              <span className={styles.shippingPrice}>$14.00</span>
            </label>
          )}
        </div>

        <div className={styles.formActions}>
          <a href="#" className={styles.linkButton} onClick={onPrevStep}>{'<'} Volver a Información</a>
          <button type="submit" className={styles.btnPrimary}>Continuar con el pago</button>
        </div>
      </form>

      <div className={styles.termsLinks}>
        <a href="#">Política de reembolso</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Términos del servicio</a>
      </div>
    </section>
  );
};

export default ShippingForm;