import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartSidebar.module.css';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CloseButton from '../Button/CloseButton';

const CartSidebar = () => {
  const {
    cartItems,
    isCartSidebarOpen,
    toggleCartSidebar,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    premiumShipping,
    setPremiumShipping
  } = useCart();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/categorias/verTodo');
    toggleCartSidebar();
  };

  const handleQuantityChange = (item, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleCheckout = () => {
    toggleCartSidebar();
    navigate('/checkout');
  };

  React.useEffect(() => {
    if (isCartSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartSidebarOpen]);

  const totalWithShipping = getCartTotal() + (premiumShipping ? 14 : 0);

  return (
    <>
      {isCartSidebarOpen && (
        <div className={styles.overlay} onClick={toggleCartSidebar}></div>
      )}

      <div className={`${styles.cartSidebar} ${isCartSidebarOpen ? styles.open : ''}`}>
        <div className={styles.cartHeader}>
          <h2>Mi Carrito</h2>
          <CloseButton onClick={toggleCartSidebar} />
        </div>

        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <>
              <p className={styles.emptyCartMessage}>¡Tu carrito está vacío!</p>
              <ShoppingCart className={styles.emptyCartIcon} size={100} color="#F8BD00" />
              <p className={styles.emptyCartPrompt}>
                Parece que todavía no agregaste ningún producto. ¡Explorá el catálogo y encontrá tu estilo!
              </p>
              <button className={styles.catalogButton} onClick={handleGoBack}>
                Volver al catálogo
              </button>
            </>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                  <div className={styles.itemQuantityControl}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, e)}
                      min="1"
                      className={styles.quantityInput}
                    />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.subtotal}>
              <span>Total:</span>
              <span>${totalWithShipping.toFixed(2)}</span>
            </div>

            <div className={styles.shippingInfo}>
              <label>
                <input
                  type="checkbox"
                  checked={premiumShipping}
                  onChange={(e) => setPremiumShipping(e.target.checked)}
                /> 
                Envío gratuito durante 1 año por solo $14.00
              </label>
            </div>

            <button className={styles.catalogButton} onClick={handleGoBack}>
              Volver al catálogo
            </button>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;