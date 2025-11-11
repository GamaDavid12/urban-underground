import React, { useState, useMemo } from 'react'; 
import { useCart } from '../../context/CartContext';
import FormEnvios from '../../components/FormEnvios/FormEnvios';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import ShippingForm from '../../components/ShippingForm/ShippingForm';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import styles from './Checkout.module.css';

const TAX_RATE = 0.10; // IVA 10%

const Checkout = () => {
    const {
        cartItems,
        premiumShipping,
        shippingMethod,
        discountValue,
        shippingAddress,
        contactInfo,
        setShippingMethod
    } = useCart();

    const [checkoutStep, setCheckoutStep] = useState('information');
    const [contactData, setContactData] = useState({});
    const [shippingData, setShippingData] = useState({});

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

        const impuestos = subtotal * TAX_RATE; // IVA 10%

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
            if (data.shippingMethod) setShippingMethod(data.shippingMethod);
            setCheckoutStep('payment');
        }
    };

    const handlePrevStep = (step) => {
        if (checkoutStep === 'shipping') {
            setCheckoutStep('information');
        } else if (checkoutStep === 'payment') {
            setCheckoutStep('shipping');
        } else if (step) {
            setCheckoutStep(step);
        }
    };

    const renderStep = () => {
        switch (checkoutStep) {
            case 'information':
                return <FormEnvios onNextStep={handleNextStep} />;
            case 'shipping':
                return <ShippingForm onNextStep={handleNextStep} onPrevStep={() => handlePrevStep('information')} />;
            case 'payment':
                return (
                   <PaymentForm
                      onPrevStep={() => handlePrevStep('shipping')}
                      contactData={contactData || contactInfo}
                      shippingData={shippingData || shippingAddress}
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
