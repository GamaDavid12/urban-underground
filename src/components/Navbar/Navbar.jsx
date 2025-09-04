import "./Navbar.css";
import { Menu, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from "../Button/Button";

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
        <Link to="/registro" className="login">Ingresar</Link>
        
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