import "./Navbar.css";
import { Menu, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = ({ toggleSidebar }) => {
  const { toggleCartSidebar, cartItems } = useCart();

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

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
        <Link to="registro" className="login">Ingresar</Link>
        

        <button onClick={toggleCartSidebar} className="cart-button">
          <ShoppingCart size={16} />
          <span>Mi Carrito</span>
          {totalItemsInCart > 0 && (
            <span className="cart-item-count">{totalItemsInCart}</span> 
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;