import styles from './ShoesCategoryPage.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { GiRunningShoe } from 'react-icons/gi';

const productsData = [
  {
    id: 1,
    name: 'Jordan, Retro Vibe',
    description: ' Zzapatillas caña inspiradas en el diseño clásico de los 80 y 90.',
    style: 'Retro urbano',
    colorBase: 'Roja, blanca y negra.',
    gender: 'Unisex',
    talle: '38, 40, 42, 44, 46',
    image: '/jordan.jpg',
    price: 100.00,
  },
  {
    id: 2,
    name: 'Doble Raya',
    description: 'Diseño clásico de corte bajo, estilo limpio, minimalista y atemporal',
    style: 'Urbano atemporal',
    colorBase: 'Base blanca con detalles de doble raya en rojo y negro',
    gender: 'Unisex',
    talle: '38, 40, 42, 44, 46',
    image: '/zapa.jpg',
    price: 70.50,
  },
  {
    id: 3,
    name: 'Urban Clean',
    description: 'Estética minimalista y de corte alto en diseño completamente blanco y sus texturas sutiles las hacen increíblemente versátiles, perfectas para un estilo "clean" y sofisticado.',
    style: 'Urbano sofisticado',
    talle: '38, 40, 42, 44, 46',
    colorBase: 'Blanco',
    gender: 'Unisex',
    image: '/air.jpg',
    price: 37.00,
  },
  {
    id: 4,
    name: 'Dark Soul',
    description: 'Calzado robusto y de estilo "streetwear" que destaca por su diseño monocromático en negro. El acabado mate y los detalles de textura en la suela.',
    style: 'Streetwear alternativo',
    talle: '38, 40, 42, 44, 46',
    colorBase: 'Negro',
    gender: 'Unisex',
    image: '/za.jpg',
    price: 42.00,
  },
  {
    id: 5,
    name: 'Shadow Walker',
    description: 'Zapatillas bajo perfil que combinan la elegancia del negro con detalles en blanco en la suela y los cordones, creando un contraste moderno y sutil. .',
    style: 'Urbano casual',
    talle: '38, 40, 42, 44, 46',
    colorBase: 'Negro y detalles blancos.',
    gender: 'Unisex',
    image: '/urbanito.jpg',
    price: 30.00,
  },
  {
    id: 6,
    name: 'Caramel High',
    description: 'Estilo de caña alta y una paleta de colores cálida en tonos marrones, estas zapatillas evocan un aire clásico y robusto. El distintivo logo en color naranja aporta un toque de contraste y modernidad..',
    style: 'Urbano clásico',
    talle: '38, 40, 42, 44, 46',
    colorBase: 'Tonos marrones. multicolor',
    gender: 'Unisex',
    image: '/cheto.jpg',
    price: 30.00,
  },
];

const ShoesCategoryPage = () => {
  return (
    <div className={styles.shoesCategoryContainer}>
      <div className={styles.header}>
        <div className={styles.filtersSection}>
          <h1 className={styles.categoryTitle}>ZAPATOS<GiRunningShoe /></h1>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>FILTROS</span>
            <span className={styles.subCategory}>Zapatos y Zapatillas</span>
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

export default ShoesCategoryPage;