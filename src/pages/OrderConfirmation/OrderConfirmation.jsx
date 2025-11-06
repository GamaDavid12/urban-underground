import React, { useEffect, useState } from 'react';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      try {
        setOrder(JSON.parse(storedOrder));
      } catch (err) {
        console.error('Error al parsear la orden guardada:', err);
      }
    }
  }, []);

  if (!order) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>No se encontró ningún pedido reciente.</h2>
        <p className={styles.text}>
          Es posible que tu sesión haya expirado o que aún no hayas completado el pago.
        </p>
        <a href="/" className={styles.btnPrimary}>Volver al inicio</a>
      </div>
    );
  }

  const { id, contact, shipping, payment, items, totals, createdAt } = order;

  return (
    <section className={styles.confirmationSection}>
      <div className={styles.card}>
        <h1 className={styles.title}>¡Gracias por tu compra! 🎉</h1>
        <p className={styles.subtitle}>Tu pedido ha sido confirmado exitosamente.</p>

        <div className={styles.orderInfo}>
          <p><strong>Número de pedido:</strong> {id}</p>
          <p><strong>Fecha:</strong> {new Date(createdAt).toLocaleString()}</p>
          <p><strong>Estado:</strong> <span className={styles.statusPaid}>Pagado</span></p>
        </div>

        <hr className={styles.divider} />

        <h2 className={styles.sectionTitle}>Detalles del contacto</h2>
        <div className={styles.infoBlock}>
          <p><strong>Correo:</strong> {contact?.correo || 'No disponible'}</p>
        </div>

        <h2 className={styles.sectionTitle}>Dirección de envío</h2>
        <div className={styles.infoBlock}>
          <p>
            {shipping?.nombre ? (
              <>
                {shipping.nombre} {shipping.apellido}<br />
                {shipping.direccion}{shipping.apartamento ? `, ${shipping.apartamento}` : ''}<br />
                {shipping.ciudad}, {shipping.estado}, {shipping.codigoPostal}<br />
                {shipping.pais}<br />
                Tel: {shipping.prefijoTelefono}{shipping.telefono}
              </>
            ) : (
              'No disponible'
            )}
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Método de pago</h2>
        <div className={styles.infoBlock}>
          <p>
            {payment?.method === 'creditCard'
              ? `Tarjeta de crédito (terminada en ${payment?.last4 || 'XXXX'})`
              : payment?.method === 'shopPay'
              ? 'Shop Pay'
              : payment?.method === 'payPal'
              ? 'PayPal'
              : 'No especificado'}
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Resumen del pedido</h2>
        <div className={styles.itemsList}>
          {items && items.length > 0 ? (
            items.map((item, i) => (
              <div key={i} className={styles.itemRow}>
                <span className={styles.itemName}>{item.name || item.title || 'Producto'}</span>
                <span className={styles.itemQty}>x{item.quantity || 1}</span>
                <span className={styles.itemPrice}>${(item.price || 0).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p>No hay productos en el pedido.</p>
          )}
        </div>

        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span>Subtotal:</span>
            <span>${totals?.subtotal?.toFixed(2) || '0.00'}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Envío:</span>
            <span>${totals?.shipping?.toFixed(2) || '0.00'}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Descuento:</span>
            <span>-${totals?.discount?.toFixed(2) || '0.00'}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.totalFinal}`}>
            <strong>Total:</strong>
            <strong>${totals?.total?.toFixed(2) || '0.00'}</strong>
          </div>
        </div>

        <hr className={styles.divider} />

        <p className={styles.thanks}>Gracias por confiar en nosotros 💛</p>

        <div className={styles.actions}>
          <a href="/" className={styles.btnPrimary}>Seguir comprando</a>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
