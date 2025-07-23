import styles from './Hotspot.module.css';

const Hotspot = ({ top, left, product, onClick }) => {
  return (
    <button
      className={styles.hotspot}
      style={{ top: `${top}%`, left: `${left}%` }}
      onClick={() => onClick(product)}
      title={`Ver ${product.name}`}
    >
      <span className={styles.hotspotInner}></span> 
    </button>
  );
};

export default Hotspot;