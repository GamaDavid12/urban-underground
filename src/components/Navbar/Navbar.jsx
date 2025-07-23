import "./Navbar.css";
import { Menu, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom'; 

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="left-group">
        <div className="menu-icon" onClick={toggleSidebar}>
          <Menu size={24} color="#ffffff" />
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
        </div>
      </div>

      <div className="actions">
        <Link to="/registro" className="login">Ingresar</Link>
        <button className="cart-button">
          <ShoppingCart size={16} />
          <span>Mi Carrito</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;