import styles from './HoodiesCategoryPage.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { GiHoodie } from 'react-icons/gi';

const productsData = [
  {
    id: 7,
    name: 'Hoodie oversize',
    description: 'Color crema, con textura suave y diseño relajado. Las mangas son anchas y el corte amplio lo hace muy cómodo.',
    colorBase: 'Beige',
    gender: 'Unisex',
    image: '/Hoodie oversize.jpg',
    price: 55.00,
  },
  {
    id: 8,
    name: 'Hoodie de invierno oversize',
    description: 'Textura afelpada y diseño voluminoso. De estilo urbano, sin detalles visibles y muy abrigado.',
    colorBase: 'Azul Marino',
    gender: 'Unisex',
    image: '/Hoodie de invierno oversize.jpg',
    price: 58.50,
  },
  {
    id: 9,
    name: 'Hoodie futurista',
    description: 'Hoodie de invierno oversize. De estilo urbano.',
    colorBase: 'Gris claro (con detalles de color).',
    gender: 'Unisex',
    image: '/Hoodie futurista.jpg',
    price: 60.00,
  },
  {
    id: 10,
    name: 'Buzo lady oversize',
    description: 'Color crema, con textura suave y diseño relajado. Las mangas son anchas y el corte amplio lo hace muy cómodo.',
    colorBase: 'Marron',
    gender: 'F',
    image: '/Buzo lady oversize.jpg',
    price: 42.00,
  },
  {
    id: 11,
    name: 'Buzo clásico',
    description: 'En un tono neutro claro, de corte oversize. La prenda tiene una caída natural, ideal para el uso diario en temporada de frío.',
    colorBase: 'Marron',
    gender: 'Unisex',
    size: 'L, XL, XXL',
    image: '/Buzo clásico.jpg',
    price: 50.00,
  },
  {
    id: 12,
    name: 'Oversize con capucha',
    description: 'Diseño acolchado. Su color blanco cálido y su corte holgado transmiten calidez y confort.',
    colorBase: 'Gris Claro',
    gender: 'Unisex',
    size: 'L, XL, XXL',
    image: '/Oversize con capucha.jpg',
    price: 30.00,
  },
];

const HoodiesCategoryPage = () => {
  return (
    <div className={styles.hoodiesCategoryContainer}>
      <div className={styles.header}>
        <div className={styles.filtersSection}>
          <h1 className={styles.categoryTitle}>
            BUZOS / CAMPERAS <GiHoodie />
          </h1> 
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>FILTROS</span>
            <span className={styles.subCategory}>BUZOS / CAMPERAS</span>
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

export default HoodiesCategoryPage;