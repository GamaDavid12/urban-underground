import React from "react";
import "./Navbar.css";
import { Menu, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="menu-icon">
        <Menu size={24} color="#373434" />
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Buscar..." />
      </div>

      <div className="actions">
        <span className="login">Ingresar</span>
        <button className="cart-button">
          <ShoppingCart size={16} />
          <span>Mi Carrito</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;