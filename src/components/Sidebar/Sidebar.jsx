import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import CloseButton from "../Button/CloseButton";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <CloseButton onClick={toggleSidebar} />
      </div>
      <ul className={styles.sidebarMenu}>
        <li className={styles.menuItem} onClick={toggleSidebar}>
          <Link to="/categorias/remeras">REMERAS</Link>
        </li>
        <li className={styles.menuItem} onClick={toggleSidebar}>
          <Link to="/categorias/buzos-camperas">BUZOS / CAMPERAS</Link>
        </li>
        <li className={styles.menuItem} onClick={toggleSidebar}>
          <Link to="/categorias/zapatos">ZAPATOS</Link>
        </li>
        <li className={styles.menuItem} onClick={toggleSidebar}>
          <Link to="/categorias/accesorios">ACCESORIOS</Link>
        </li>
        <li className={styles.menuItem} onClick={toggleSidebar}>
          <Link to="/categorias/jeans">JEANS</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
