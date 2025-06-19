import React from 'react';
import styles from './Navbar.module.css';
import { FaSearch, FaSignInAlt, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className="flex items-center gap-4">
        <div className={styles.menuButton}>
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
        </div>

        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.loginBtn}>
          <FaSignInAlt style={{ marginRight: '0.4rem' }} />
          Ingresar
        </button>
        <button className={styles.cartBtn}>
          <FaShoppingCart className={styles.cartIcon} />
          Mi Carrito
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

