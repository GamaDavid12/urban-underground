import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './OrderSummary.module.css';

const OrderSummary = ({ order }) => {
  const {
    premiumShipping,
    shippingMethod,
    shippingCost,
    discountCode,
    setDiscountCode,
    discountValue,
    setDiscountValue,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const getShippingLabel = () => {
    if (premiumShipping && shippingMethod === 'premium') return 'Envío Premium (1 año)';
    if (shippingMethod === 'standard') return 'Envío estándar';
    if (shippingMethod === 'express') return 'Envío exprés';
    return 'Envío';
  };

  const applyDiscount = () => {
    const code = inputCode.trim().toUpperCase();
    setDiscountCode(code);

    if (code === 'DESCUENTO10') {
      setDiscountValue((order.subtotal || 0) * 0.10);
      alert('Se aplicó un 10% de descuento');
    } else {
      setDiscountValue(0);
      alert('Código inválido');
    }
  };

  const subtotal = order?.subtotal || 0;
  const envio = shippingCost || 0;
const impuestos = order?.impuestos ?? (subtotal * 0.10);
  const descuento = discountValue || 0;

  const totalBase = subtotal + envio + impuestos;
  const totalConDescuento = Math.max(totalBase - descuento, 0).toFixed(2);

  return (
    <aside className={styles.orderSummary}>
      <div className={styles.itemsList}>
        {order.items?.map((item, index) => (
          <div key={index} className={styles.summaryItem}>
            <div className={styles.productInfo}>
              <div className={styles.productImage}>
                <img src={item.image} alt={item.name} />
                {item.quantity > 1 && (
                  <span className={styles.quantityBadge}>x{item.quantity}</span>
                )}
              </div>
              <div className={styles.productDetails}>
                <span className={styles.productName}>
                  {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                </span>
                {item.size && item.color && (
                  <span className={styles.productVariant}>
                    {item.size} / {item.color}
                  </span>
                )}
              </div>
            </div>
            <span className={styles.productPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>


      <div className={styles.summaryBlock}>
        <div className={styles.summaryItem}>
          <input
            type="text"
            className={styles.discountInput}
            placeholder="Código de descuento"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button
            className={styles.applyButton}
            type="button"
            onClick={applyDiscount}
          >
            Aplicar
          </button>
        </div>
      </div>

      <div className={styles.summaryBlock}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
        </div>

        {(premiumShipping && shippingMethod === 'premium') || (shippingMethod && shippingMethod !== 'premium') ? (
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>{getShippingLabel()}</span>
            <span className={styles.summaryValue}>${envio.toFixed(2)}</span>
          </div>
        ) : null}

        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Impuestos (IVA 10%)</span>
          <span className={styles.summaryValue}>${impuestos.toFixed(2)}</span>
      </div>

        {descuento > 0 && (
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Descuento</span>
            <span className={styles.summaryValue}>- ${descuento.toFixed(2)}</span>
          </div>
        )}
      </div>


      <div className={`${styles.summaryItem} ${styles.totalRow}`}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>USD ${totalConDescuento}</span>
      </div>
    </aside>
  );
};

export default OrderSummary;
