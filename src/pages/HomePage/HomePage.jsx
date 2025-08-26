import Hotspot from '../../components/Hotspot/Hotspot.jsx';
import styles from './HomePage.module.css';

const HomePage = () => {
  const products = [
    { id: 'prod1', name: 'Zapatillas Urbanas', description: 'Las más cómodas para tu día a día.' },
    { id: 'prod2', name: 'Remera Gráfica Edición Limitada', description: 'Diseño exclusivo para ti.' },
    { id: 'prod3', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod4', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod5', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod6', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod7', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod8', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod9', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod10', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod11', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod12', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod13', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod14', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod15', name: 'Buzo Con Capucha Minimalista', description: 'Calidez y estilo.' },
  ];

  const handleHotspotClick = (product) => {
    console.log('Hotspot clicado para el producto:', product);
    alert(`Clic en: ${product.name}\n${product.description}`);
  };

  return (
    <div className={styles.homePageContainer}>
      <img src="/HomePage.png" alt="Urban Underground Home" className={styles.homeImage} />

      <Hotspot
        top={51}
        left={24}
        product={products[0]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={90}
        left={71}
        product={products[1]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={21}
        left={40}
        product={products[2]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={38}
        left={5}
        product={products[3]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={58}
        left={10}
        product={products[4]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={67}
        left={45}
        product={products[5]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={80}
        left={86}
        product={products[6]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={48}
        left={62}
        product={products[7]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={35}
        left={43}
        product={products[8]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={27}
        left={32}
        product={products[9]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={41}
        left={36}
        product={products[10]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={6}
        left={30}
        product={products[11]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={56}
        left={92}
        product={products[12]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={23}
        left={8}
        product={products[13]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={20}
        left={36}
        product={products[14]}
        onClick={handleHotspotClick}
      />
    </div>
  );
};

export default HomePage;