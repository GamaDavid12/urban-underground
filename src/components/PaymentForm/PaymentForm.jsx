import React, { useState } from 'react';
import styles from './PaymentForm.module.css';

const PaymentForm = ({ onPrevStep }) => {
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardDate: '',
        cardCVC: '',
        cardName: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [useShippingAddress, setUseShippingAddress] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleAddressCheckbox = (e) => {
        setUseShippingAddress(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Pago procesado!');
    };

    return (
        <section className={styles.paymentDetails}>
            {/* Breadcrumb */}
            <div className={styles.titleHeader}>
                <a href="#" className={styles.titleLink} onClick={onPrevStep}>Carrito</a>
                {' > '}
                <a href="#" className={styles.titleLink} onClick={onPrevStep}>Información</a>
                {' > '}
                <a href="#" className={styles.titleLink} onClick={onPrevStep}>Envío</a>
                {' > '}
                <span className={styles.titleCurrent}>Pago</span>
            </div>

            {/* Información de contacto (después tengo que componentizar) */}
            <h2 className={styles.sectionTitle}>Contacto</h2>
            <div className={styles.summaryBlock}>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Contacto</span>
                    <span className={styles.infoValue}>tu_correo@ejemplo.com</span>
                    <a href="#" className={styles.changeLink} onClick={onPrevStep}>Cambiar</a>
                </div>
            </div>

            {/* Información resumida del envio  (después tengo que componentizar) */}
            <h2 className={styles.sectionTitle}>Envío a</h2>
            <div className={styles.summaryBlock}>
                <div className={styles.infoRow}>
                    <span className={styles.infoValue}>Tu dirección completa</span>
                    <a href="#" className={styles.changeLink} onClick={onPrevStep}>Cambiar</a>
                </div>
            </div>

            {/* Info del Método de envio que seleccioné anteriormente */}
            <h2 className={styles.sectionTitle}>Método de envío</h2>
            <div className={styles.summaryBlock}>
                <div className={styles.infoRow}>
                    <span className={styles.infoValue}>Envío estándar · $12.00</span>
                    <a href="#" className={styles.changeLink} onClick={onPrevStep}>Cambiar</a>
                </div>
            </div>

            {/* Pago */}
            <h2 className={styles.sectionTitle}>Pago</h2>
            <p className={styles.sectionDescription}>Todas las transacciones son seguras y están encriptadas.</p>

            <div className={styles.paymentOptions}>
                {/* Tarjeta de crédito */}
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
                                {/* Logos de las tarjetas Inline SVG */}
                                <svg viewBox="0 0 50 20"><rect width="50" height="20" fill="#1a1f71"/><text x="25" y="14" fill="white" fontSize="10" textAnchor="middle">VISA</text></svg>
                                <svg viewBox="0 0 50 20"><circle cx="15" cy="10" r="8" fill="#EB001B"/><circle cx="35" cy="10" r="8" fill="#F79E1B"/><circle cx="25" cy="10" r="8" fill="#FF5F00"/></svg>
                                <svg viewBox="0 0 50 20"><rect width="50" height="20" fill="#2E77BC"/><text x="25" y="14" fill="white" fontSize="8" textAnchor="middle">AMEX</text></svg>
                                <svg viewBox="0 0 50 20"><rect width="50" height="20" fill="#86B817"/><text x="25" y="14" fill="white" fontSize="8" textAnchor="middle">DISCOVER</text></svg>
                            </div>
                        </div>
                    </label>
                    {paymentMethod === 'creditCard' && (
                        <div className={styles.creditCardForm}>
                            <form onSubmit={handleSubmit}>
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

                {/* Opción de pagar con Pay */}
                <div className={`${styles.paymentOption} ${paymentMethod === 'shopPay' ? styles.active : ''}`}>
                    <label className={styles.paymentMethodLabel}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="shopPay"
                            checked={paymentMethod === 'shopPay'}
                            onChange={handlePaymentMethodChange}
                        />
                        <span className={styles.paymentMethodName}>Shop Pay</span>
                    </label>
                </div>

                {/* 
                {/* Opción de pagar con PayPal */}
                <div className={`${styles.paymentOption} ${paymentMethod === 'payPal' ? styles.active : ''}`}>
                    <label className={styles.paymentMethodLabel}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="payPal"
                            checked={paymentMethod === 'payPal'}
                            onChange={handlePaymentMethodChange}
                        />
                        <span className={styles.paymentMethodName}>PayPal</span>
                    </label>
                </div>
            </div>

            {/* Confirmar la dirección de envío */}
            <h2 className={styles.sectionTitle}>Dirección de facturación</h2>
            <p className={styles.sectionDescription}>Selecciona la dirección que coincida con tu tarjeta o método de pago.</p>
            <div className={styles.billingAddress}>
                <div className={`${styles.addressOption} ${useShippingAddress ? styles.active : ''}`}>
                    <label>
                        <input
                            type="radio"
                            name="billingAddress"
                            checked={useShippingAddress}
                            onChange={handleAddressCheckbox}
                        />
                        <span className={styles.addressName}>Misma que la dirección de envío</span>
                    </label>
                </div>
                <div className={`${styles.addressOption} ${!useShippingAddress ? styles.active : ''}`}>
                    <label>
                        <input
                            type="radio"
                            name="billingAddress"
                            checked={!useShippingAddress}
                            onChange={() => setUseShippingAddress(false)}
                        />
                        <span className={styles.addressName}>Usar una dirección de facturación diferente</span>
                    </label>

                    {!useShippingAddress && (
                        <div className={styles.billingForm}>
                            <div className={styles.formGroup}>
                                <select>
                                    <option value="">País/Región</option>
                                    <option value="US">Estados Unidos</option>
                                </select>
                            </div>
                            <div className={styles.formGroupRow}>
                                <input type="text" placeholder="Nombre de pila" />
                                <input type="text" placeholder="Apellido" />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="text" placeholder="Dirección" />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="text" placeholder="Apartamento, suite, etc. (opcional)" />
                            </div>
                            <div className={styles.formGroupRow}>
                                <input type="text" placeholder="Ciudad" />
                                <input type="text" placeholder="Estado" />
                                <input type="text" placeholder="Código postal" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmar la compra */}
            <div className={styles.formActions}>
                <a href="#" className={styles.linkButton} onClick={onPrevStep}>{'<'} Volver a Envío</a>
                <button type="submit" className={styles.btnPrimary}>Pagar ahora</button>
            </div>

            {/* Acá los links de los Términos */}
            <div className={styles.termsLinks}>
                <a href="#">Política de reembolso</a>
                <a href="#">Política de privacidad</a>
                <a href="#">Términos del servicio</a>
            </div>
        </section>
    );
};

export default PaymentForm;
