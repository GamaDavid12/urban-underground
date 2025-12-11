import "./Navbar.css";
import { Menu, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from "../Button/Button";
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const Navbar = ({ toggleSidebar }) => {
  const { toggleCartSidebar, cartItems } = useCart();
  const { userEmail, isAuthenticated, logout } = useAuth(); 
  
  const [showDropdown, setShowDropdown] = useState(false);
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  let authContent;
  
  if (isAuthenticated) {
    const maxEmailLength = 15;
    const displayEmail = userEmail.length > maxEmailLength 
      ? userEmail.substring(0, maxEmailLength) + '...' 
      : userEmail;

    authContent = (
      <div className="user-menu-container">
        <span className="login authenticated-email" onClick={handleUserClick}> 
          {displayEmail}
        </span>
        
        {showDropdown && (
          <div className="dropdown-menu"> 
            <Link to="/perfil" className="dropdown-item" onClick={() => setShowDropdown(false)}>
              Mi Perfil
            </Link>
            <button className="dropdown-item logout-button" onClick={handleLogout}>
              Cerrar Sesión 🚪
            </button>
          </div>
        )}
      </div>
    );
  } else {
    authContent = (
      <Link to="/registro" className="login">Ingresar</Link>
    );
  }

  return (
    <nav className="navbar">
      <div className="left-group">
        <div className="menu-icon" onClick={toggleSidebar}>
          <Menu size={24} color="#ffffff" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
        </div>


        <Link to="/" className="navbar-logo">
          Urban Underground
        </Link>
      </div>

      <div className="actions">
        {authContent}
        
        <Button className={"px-5 py-1"} onClick={toggleCartSidebar} variant="grey" text={"Mi Carrito"} icon={ <ShoppingCart size={16} />}>
          {totalItemsInCart > 0 && (
            <span className="absolute -top-1 right-2 bg-[#FFCA1E] text-black rounded-full px-2 py-1 font-bold text-center">{totalItemsInCart}</span> 
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;