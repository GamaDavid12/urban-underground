import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';
import Button from '../Button/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.productImage} />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{`"${product.name}"`}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        <ul className={styles.productDetails}>
          <li><span className={styles.detailLabel}>Estilo:</span> {product.style}</li>
          <li><span className={styles.detailLabel}>Color base:</span> {product.colorBase}</li>
          <li><span className={styles.detailLabel}>Género:</span> {product.gender}</li>
          {product.size && <li><span className={styles.detailLabel}>Talle:</span> {product.size}</li>}
        </ul>

        <Button onClick={handleAddToCart} text={"Agregar al Carrito"}/>
      </div>
    </div>
  );
};

export default ProductCard;