import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return [];
    }
  });

  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [premiumShipping, setPremiumShipping] = useState(false);

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingCost, setShippingCost] = useState(0);

  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);

  const [contactInfo, setContactInfo] = useState({
    correo: '',
    nombre: '',
    apellido: '',
  });

  const [shippingAddress, setShippingAddress] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    apartamento: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    pais: '',
    telefono: '',
    prefijoTelefono: '+54',
    shippingMethod: 'standard',
  });


  useEffect(() => {
    if (premiumShipping) {
      setShippingMethod('premium');
      setShippingCost(14);
    } else if (shippingMethod === 'standard') {
      setShippingCost(12);
    } else if (shippingMethod === 'express') {
      setShippingCost(25);
    } else if (shippingMethod === 'premium') {
      setShippingCost(14);
    } else {
      setShippingMethod('standard');
      setShippingCost(12);
    }

    setDiscountCode('');
    setDiscountValue(0);
  }, [premiumShipping, shippingMethod]);

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setIsCartSidebarOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCartSidebar = () => {
    setIsCartSidebarOpen((prevState) => !prevState);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartSidebarOpen,
        toggleCartSidebar,
        getCartTotal,
        premiumShipping,
        setPremiumShipping,
        shippingMethod,
        setShippingMethod,
        shippingCost,
        setShippingCost,
        discountCode,
        setDiscountCode,
        discountValue,
        setDiscountValue,
        contactInfo,
        setContactInfo,
        shippingAddress,
        setShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
