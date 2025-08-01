import styles from './ClothingCategoryPage.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { FaTshirt } from 'react-icons/fa';

const productsData = [
  {
    id: 1,
    name: 'Retro',
    description: 'Divertida y colorida, esta remera muestra un diseño gráfico retro.',
    style: 'Vaporwave / Retro Y2K',
    colorBase: 'Marrón',
    gender: 'Unisex',
    image: '/retro.jpg',
    price: 35.00,
  },
  {
    id: 2,
    name: 'Tattoo Snake',
    description: 'Estilo inspirado en el arte del tatuaje, esta remera muestra una serpiente enroscada entre flores.',
    style: 'Streetwear alternativo',
    colorBase: 'Negro',
    gender: 'Unisex',
    image: '/tattoo-snake.jpg',
    price: 38.50,
  },
  {
    id: 3,
    name: 'Angry Smile',
    description: 'Estampa frontal de una carita sonriente estilo glitch, de ojos tachados y sonrisa torcida.',
    style: 'Streetwear alternativo',
    colorBase: 'Gris claro',
    gender: 'Unisex',
    image: '/angry-smile.jpg',
    price: 37.00,
  },
  {
    id: 4,
    name: 'Urban Devil',
    description: 'Kawaii y rebelde. Transmite energía, humor y rebeldía visual con un toque alternativo.',
    style: 'Unisex',
    colorBase: 'Blanco',
    gender: 'Unisex',
    image: '/urban-devil.jpg',
    price: 42.00,
  },
  {
    id: 5,
    name: 'Clean',
    description: 'Remera oversize clásica.',
    style: 'Unisex',
    colorBase: 'Blanco',
    gender: 'Unisex',
    size: 'L, XL, XXL',
    image: '/clean.jpg',
    price: 30.00,
  },
  {
    id: 6,
    name: 'Classic',
    description: 'Remera oversize clásica.',
    style: 'Unisex',
    colorBase: 'Beige',
    gender: 'Unisex',
    size: 'L, XL, XXL',
    image: '/classic.jpg',
    price: 30.00,
  },
];

const ClothingCategoryPage = () => {
  return (
    <div className={styles.clothingCategoryContainer}>
      <div className={styles.header}>
        <div className={styles.filtersSection}>
          <h1 className={styles.categoryTitle}>ROPA <FaTshirt /></h1>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>FILTROS</span>
            <span className={styles.subCategory}>Remeras</span>
          </div>
        </div>
      </div>
      <div className={styles.productGrid}>
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ClothingCategoryPage;