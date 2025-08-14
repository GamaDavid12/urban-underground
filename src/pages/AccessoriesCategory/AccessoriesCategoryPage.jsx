import styles from './AccessoriesCategoryPage.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { FaHatCowboy } from 'react-icons/fa';

const productsData = [
  {
    id: 1,
    name: 'Gorra Night',
    description: 'Gorra de visera plana con estampado de figuras abstractas en colores negro y blanco sobre fondo gris, ideal para un look alternativo.',
    style: 'Streetwear / Alternativo',
    colorBase: 'Blanca y detalles en negro, rojo y verde',
    gender: 'Unisex',
    image: '/gopla.jpg',
    price: 20.00,
  },
  {
    id: 2,
    name: 'Gorra Comic',
    description: 'Estilo inspirado en el arte del tatuaje, esta remera muestra una serpiente enroscada entre flores.',
    style: 'Streetwear / Retro',
    colorBase: 'Blanco, azul y rojo',
    gender: 'Unisex',
    image: '/gorra comic.jpg',
    price: 15.50,
  },
  {
    id: 3,
    name: 'Gorra Blanco',
    description: 'Gorra de béisbol completamente blanca de diseño minimalista y limpio, versátil para cualquier ocasión. Visera curva.',
    style: 'Minimalista / Clásico',
    colorBase: 'Blanco',
    gender: 'Unisex',
    image: '/gorrablanco.jpg',
    price: 10.00,
  },
  {
    id: 4,
    name: 'Gorra DeadPool',
    description: 'Gorra de visera plana con un llamativo estampado de varios colores, ideal para los amantes del streetwear y diseños atrevidos.',
    style: 'Streetwear / Alternativo',
    colorBase: 'Multicolor',
    gender: 'Unisex',
    image: '/gorradpool.jpg',
    price: 12.00,
  },
  {
    id: 5,
    name: 'Gorra Marley',
    description: 'Gorra de visera plana con estampado de camuflaje en tonos verde y negro, con el logo de un rastafari al frente. Perfecta para un estilo urbano.',
    style: 'Streetwear',
    colorBase: 'Multicolor',
    gender: 'Unisex',
    image: '/gorramarley.jpg',
    price: 10.00,
  },
  {
    id: 6,
    name: 'Gorra Urban',
    description: 'Gorra de visera curva en color negro con un logo circular en blanco y rojo, un clásico para un look urbano y casual..',
    style: 'Urbano / Casual',
    colorBase: 'Negro',
    gender: 'Unisex',
    image: '/gorras planas.jpg',
    price: 30.00,
  },
    {
    id: 7,
    name: 'Gorra Flowers',
    description: 'Gorra de visera curva con un colorido estampado de flores y el logo de "Urban" al frente. Para un estilo fresco y desenfadado.',
    style: 'Casual / Estampado',
    colorBase: 'Negro / Estampado',
    gender: 'Unisex',
    image: '/gorras.jpg',
    price: 15.00,
  },
  {
    id: 8,
    name: 'Piluso UnderGround',
    description: 'Gorro estilo pescador (piluso) en color negro, con un estampado minimalista de una persona. Accesorio ideal para un look moderno y vanguardista..',
    style: 'Streetwear / Urbano',
    colorBase: 'Negro',
    gender: 'Unisex',
    image: '/gorraunder.jpg',
    price: 30.00,
  },
  {
    id: 9,
    name: 'Gorra Urban Underground',
    description: 'Gorra de béisbol con visera curva en color beige, con un logo bordado que le da un toque clásico y sofisticado.',
    style: 'Clásico / Casual',
    colorBase: 'Beige',
    gender: 'Unisex',
    image: '/gorraurban.jpg',
    price: 30.00,
  },
  {
    id: 10,
    name: 'Gorra Classic',
    description: 'Gorra de béisbol de dos tonos: la parte frontal es blanca con la letra "E" en rojo, y la parte trasera es negra. Un estilo deportivo y atemporal.',
    style: 'Unisex',
    colorBase: 'Blanco, negro y detalles en rojo',
    gender: 'Unisex',
    image: '/gorrita.jpg',
    price: 10.00,
  },
  {
    id: 11,
    name: 'Gorra Unden',
    description: 'Gorra de béisbol en tono beige con la inscripción "Unden" bordada en un estilo distintivo, perfecta para un look casual y con personalidad..',
    style: 'Urbano / Casual',
    colorBase: 'Beige',
    gender: 'Unisex',
    image: '/gp.jpg',
    price: 15.00,
  },
];

const AccessoriesCategoryPage = () => {
  return (
    <div className={styles.accessoriesCategoryContainer}>
      <div className={styles.header}>
        <div className={styles.filtersSection}>
          <h1 className={styles.categoryTitle}>ACCESORIOS <FaHatCowboy /></h1>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>FILTROS</span>
            <span className={styles.subCategory}>Gorras</span>
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

export default AccessoriesCategoryPage;