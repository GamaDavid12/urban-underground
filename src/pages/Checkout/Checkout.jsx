import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import FormEnvios from '../../components/FormEnvios/FormEnvios';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import ShippingForm from '../../components/ShippingForm/ShippingForm';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import styles from './Checkout.module.css';

const Checkout = () => {
    const {
        cartItems,
        premiumShipping,
        shippingMethod,
        discountValue
    } = useCart();

    const [checkoutStep, setCheckoutStep] = useState('information');


    const [contactData, setContactData] = useState(null);
    const [shippingData, setShippingData] = useState(null);

   const { shippingAddress, contactInfo } = useCart();
   const { setShippingMethod } = useCart();



    const orderData = useMemo(() => {
        const subtotal = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        let envio = 0;
        if (premiumShipping) {
            envio = 14.00;
        } else if (shippingMethod === 'standard') {
            envio = 12.00;
        } else if (shippingMethod === 'express') {
            envio = 25.00;
        }

        const impuestos = subtotal * 0.10;
        const totalSinDescuento = subtotal + envio + impuestos;
        const total = Math.max(totalSinDescuento - discountValue, 0);

        return {
            items: cartItems,
            subtotal,
            envio,
            impuestos,
            total
        };
    }, [cartItems, premiumShipping, shippingMethod, discountValue]);

    const handleNextStep = (data) => {
        if (checkoutStep === 'information') {
            setContactData(data);
            setCheckoutStep('shipping');
        } else if (checkoutStep === 'shipping') {
            setShippingData(data);
            setShippingMethod(data.shippingMethod);
            setCheckoutStep('payment');
        }
    };

    const handlePrevStep = () => {
        if (checkoutStep === 'shipping') {
            setCheckoutStep('information');
        } else if (checkoutStep === 'payment') {
            setCheckoutStep('shipping');
        }
    };

    const renderStep = () => {
        switch (checkoutStep) {
            case 'information':
                return <FormEnvios onNextStep={handleNextStep} />;
            case 'shipping':
                return <ShippingForm onNextStep={handleNextStep} onPrevStep={handlePrevStep} />;
            case 'payment':
                return (
                   <PaymentForm
                      onPrevStep={handlePrevStep}
                     order={orderData}
                     contactData={contactInfo}
                      shippingData={shippingAddress}
                      shippingMethod={shippingMethod}
                   />

                );
            default:
                return <FormEnvios onNextStep={handleNextStep} />;
        }
    };

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.formColumn}>
                    <div className={styles.logo}>
                        <a href="/">URBAN UNDERGROUND</a>
                    </div>
                    {renderStep()}
                </div>
                <div className={styles.summaryColumn}>
                    <div className={styles.summarySticky}>
                        <OrderSummary order={orderData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

