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

const [shippingMethod, setShippingMethod] = useState(null);


  const [shippingCost, setShippingCost] = useState(0);

useEffect(() => {
  if (premiumShipping) {
    setShippingMethod('premium');
    setShippingCost(14);
    } else {
    setShippingMethod(null);
    setShippingCost(0);
  }
  setDiscountCode('');
  setDiscountValue(0);
}, [premiumShipping]);


  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);

  const [contactInfo, setContactInfo] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

const addToCart = (product) => {
    const normalizedPrice = product.precio || product.price;

    const normalizedProduct = {
      ...product,
      price: parseFloat(normalizedPrice),
      image: product.imagenURL || product.image,
    };

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === normalizedProduct.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === normalizedProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...normalizedProduct, quantity: 1 }];
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
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price || item.precio) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;

      return total + price * quantity;
    }, 0);
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
        setShippingAddress
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);