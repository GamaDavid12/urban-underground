import React, { useState } from 'react';
import styles from './PaymentForm.module.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ onPrevStep, contactData, shippingData, shippingMethod }) => {
  const { cartItems, getCartTotal, clearCart, shippingCost, discountValue } = useCart();
  const navigate = useNavigate();

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardDate: '',
    cardCVC: '',
    cardName: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
  const handleAddressCheckbox = (e) => setUseShippingAddress(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'creditCard' && (!cardData.cardNumber || !cardData.cardName)) {
      alert('Por favor completa los datos de la tarjeta.');
      return;
    }

    setLoading(true);

    try {
      const subtotal = getCartTotal ? getCartTotal() : cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
      const shipping = shippingCost || 0;
      const discount = discountValue || 0;
      const total = subtotal + shipping - discount;

      // ✅ Asegurar que los IDs sean numéricos y válidos
      const items = cartItems.map((item) => ({
        productId: Number(item.id || item.productId || item._id || item.product?.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      // ✅ REFORMATEO del payload para que el backend lo acepte correctamente
      const orderData = {
        contact: {
          correo: contactData.correo || contactData.email || '',
        },
        shipping: {
          pais: contactData.pais || shippingData.pais || 'AR',
          nombre: contactData.nombre || shippingData.nombre || '',
          apellido: contactData.apellido || shippingData.apellido || '',
          direccion: contactData.direccion || shippingData.direccion || '',
          apartamento: contactData.apartamento || shippingData.apartamento || '',
          ciudad: contactData.ciudad || shippingData.ciudad || '',
          estado: contactData.estado || shippingData.estado || '',
          codigoPostal: contactData.codigoPostal || shippingData.codigoPostal || '',
          telefono: contactData.telefono || shippingData.telefono || '',
          prefijoTelefono: contactData.prefijoTelefono || shippingData.prefijoTelefono || '+54',
        },
        payment: {
          method: paymentMethod,
          ...(paymentMethod === 'creditCard'
            ? {
                cardName: cardData.cardName,
                cardNumber: cardData.cardNumber,
              }
            : {}),
        },
        items,
        totals: {
          subtotal,
          shipping,
          discount,
          total,
        },
      };

      console.log('🧾 Enviando orden al backend:', JSON.stringify(orderData, null, 2));
      console.log('🛒 Items enviados al backend:', orderData.items);

      const res = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Error al crear la orden');

      const savedOrder = await res.json();

      // ✅ Guardar la orden completa en localStorage (incluye fecha e ID)
      localStorage.setItem('lastOrder', JSON.stringify({
        ...orderData,
        id: savedOrder?.compra?.id || Date.now(),
        createdAt: new Date(),
      }));

      clearCart();
      alert('✅ Pago procesado con éxito');

      // ✅ Redirigir correctamente a la ruta registrada
      navigate('/confirmacion', { state: { order: savedOrder } });

    } catch (err) {
      console.error('❌ Error al procesar el pago:', err);
      alert('Hubo un problema al procesar tu pago. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.paymentDetails}>
      <div className={styles.titleHeader}>
        <a href="#" className={styles.titleLink} onClick={() => onPrevStep('cart')}>Carrito</a>
        {' > '}
        <a href="#" className={styles.titleLink} onClick={() => onPrevStep('information')}>Información</a>
        {' > '}
        <a href="#" className={styles.titleLink} onClick={() => onPrevStep('shipping')}>Envío</a>
        {' > '}
        <span className={styles.titleCurrent}>Pago</span>
      </div>

      <h2 className={styles.sectionTitle}>Contacto</h2>
      <div className={styles.summaryBlock}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Correo</span>
          <span className={styles.infoValue}>{contactData?.correo || 'correo@ejemplo.com'}</span>
          <a href="#" className={styles.changeLink} onClick={() => onPrevStep('information')}>Cambiar</a>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Envío a</h2>
      <div className={styles.summaryBlock}>
        <div className={styles.infoRow}>
          <span className={styles.infoValue}>
            {shippingData?.nombre
              ? `${shippingData.nombre} ${shippingData.apellido}, ${shippingData.direccion}${shippingData.apartamento ? `, ${shippingData.apartamento}` : ''}, ${shippingData.ciudad}, ${shippingData.estado || 'Sin provincia'}, ${shippingData.codigoPostal}, ${shippingData.pais} | Tel: ${shippingData.prefijoTelefono || ''}${shippingData.telefono || ''}`
              : 'Tu dirección completa'}
          </span>
          <a href="#" className={styles.changeLink} onClick={() => onPrevStep('information')}>Cambiar</a>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Método de envío</h2>
      <div className={styles.summaryBlock}>
        <div className={styles.infoRow}>
          <span className={styles.infoValue}>
            {shippingMethod === 'standard' && 'Envío estándar · $12.00'}
            {shippingMethod === 'express' && 'Envío exprés · $25.00'}
            {shippingMethod === 'premium' && 'Envío Premium · $14.00'}
            {!shippingMethod && 'No seleccionado'}
          </span>
          <a href="#" className={styles.changeLink} onClick={() => onPrevStep('shipping')}>Cambiar</a>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Pago</h2>
      <p className={styles.sectionDescription}>Todas las transacciones son seguras y están encriptadas.</p>

      <div className={styles.paymentOptions}>
        <div className={`${styles.paymentOption} ${paymentMethod === 'creditCard' ? styles.active : ''}`}>
          <label className={styles.paymentMethodLabel}>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={handlePaymentMethodChange}
            />
            <div className={styles.paymentMethodInfo}>
              <span className={styles.paymentMethodName}>Tarjeta de crédito</span>
              <div className={styles.cardLogos}>
                <svg viewBox="0 0 50 20"><rect width="50" height="20" fill="#1a1f71"/><text x="25" y="14" fill="white" fontSize="10" textAnchor="middle">VISA</text></svg>
                <svg viewBox="0 0 50 20"><circle cx="15" cy="10" r="8" fill="#EB001B"/><circle cx="35" cy="10" r="8" fill="#F79E1B"/><circle cx="25" cy="10" r="8" fill="#FF5F00"/></svg>
                <svg viewBox="0 0 50 20"><rect width="50" height="20" fill="#2E77BC"/><text x="25" y="14" fill="white" fontSize="8" textAnchor="middle">AMEX</text></svg>
                <svg viewBox="0 0 50 20"><rect width="50" height="20" fill="#86B817"/><text x="25" y="14" fill="white" fontSize="8" textAnchor="middle">DISCOVER</text></svg>
              </div>
            </div>
          </label>

          {paymentMethod === 'creditCard' && (
            <div className={styles.creditCardForm}>
              <form>
                <div className={styles.formGroup}>
                  <input type="text" name="cardNumber" value={cardData.cardNumber} onChange={handleChange} placeholder="Número de tarjeta" />
                </div>
                <div className={styles.formGroupRow}>
                  <input type="text" name="cardDate" value={cardData.cardDate} onChange={handleChange} placeholder="MM / YY" />
                  <input type="text" name="cardCVC" value={cardData.cardCVC} onChange={handleChange} placeholder="CVC" />
                </div>
                <div className={styles.formGroup}>
                  <input type="text" name="cardName" value={cardData.cardName} onChange={handleChange} placeholder="Nombre en la tarjeta" />
                </div>
              </form>
            </div>
          )}
        </div>

        <div className={`${styles.paymentOption} ${paymentMethod === 'shopPay' ? styles.active : ''}`}>
          <label className={styles.paymentMethodLabel}>
            <input type="radio" name="paymentMethod" value="shopPay" checked={paymentMethod === 'shopPay'} onChange={handlePaymentMethodChange} />
            <span className={styles.paymentMethodName}>Shop Pay</span>
          </label>
        </div>

        <div className={`${styles.paymentOption} ${paymentMethod === 'payPal' ? styles.active : ''}`}>
          <label className={styles.paymentMethodLabel}>
            <input type="radio" name="paymentMethod" value="payPal" checked={paymentMethod === 'payPal'} onChange={handlePaymentMethodChange} />
            <span className={styles.paymentMethodName}>PayPal</span>
          </label>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Dirección de facturación</h2>
      <p className={styles.sectionDescription}>Selecciona la dirección que coincida con tu tarjeta o método de pago.</p>
      <div className={styles.billingAddress}>
        <div className={`${styles.addressOption} ${useShippingAddress ? styles.active : ''}`}>
          <label>
            <input type="radio" name="billingAddress" checked={useShippingAddress} onChange={handleAddressCheckbox} />
            <span className={styles.addressName}>Misma que la dirección de envío</span>
          </label>
        </div>
        <div className={`${styles.addressOption} ${!useShippingAddress ? styles.active : ''}`}>
          <label>
            <input type="radio" name="billingAddress" checked={!useShippingAddress} onChange={() => setUseShippingAddress(false)} />
            <span className={styles.addressName}>Usar una dirección de facturación diferente</span>
          </label>
        </div>
      </div>

      <div className={styles.formActions}>
        <a href="#" className={styles.linkButton} onClick={() => onPrevStep('shipping')}>{'<'} Volver a Envío</a>
        <button type="button" className={styles.btnPrimary} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Procesando...' : 'Pagar ahora'}
        </button>
      </div>

      <div className={styles.termsLinks}>
        <a href="#">Política de reembolso</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Términos del servicio</a>
      </div>
    </section>
  );
};

export default PaymentForm;
