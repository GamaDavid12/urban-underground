
import Hotspot from "../../components/Hotspot/Hotspot.jsx";

const HomePage = () => {
  const products = [
    { id: 'prod1', name: 'Zapatillas Urbanas', description: 'Las más cómodas para tu día a día.' },
    { id: 'prod2', name: 'Remera Gráfica Edición Limitada', description: 'Diseño exclusivo para ti.' },
    { id: 'prod3', name: 'Buzo Con Capucha8 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod4', name: 'Buzo Con Capucha7 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod5', name: 'Buzo Con Capucha6 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod6', name: 'Buzo Con Capucha5 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod7', name: 'Buzo Con Capucha4 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod8', name: 'Buzo Con Capucha3 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod9', name: 'Buzo Con Capucha2 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod10', name: 'Buzo Con Capucha1 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod11', name: 'Buzo Con Capucha9 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod12', name: 'Buzo Con Capucha10 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod13', name: 'Buzo Con Capucha11 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod14', name: 'Buzo Con Capucha12 Minimalista', description: 'Calidez y estilo.' },
    { id: 'prod15', name: 'Buzo Con Capucha13 Minimalista', description: 'Calidez y estilo.' },
  ];

  const handleHotspotClick = (product) => {
    console.log("Hotspot clicado para el producto:", product);
    alert(`Clic en: ${product.name}\n${product.description}`);
  };

  return (
       <div className="relative w-screen h-screen overflow-hidden"> 
       <img src="/HomePage.png" alt="Urban Underground Home" className="absolute top-0 left-0 w-screen h-screen object-cover z-0" />
       <Hotspot 
         top={51} 
         left={24} 
         product={products[0]} 
         onClick={handleHotspotClick} 
       /> 
      <Hotspot
        top={97}
        left={71}
        product={products[1]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={15}
        left={40}
        product={products[2]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={36}
        left={5}
        product={products[3]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={60}
        left={10}
        product={products[4]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={69}
        left={45}
        product={products[5]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={85}
        left={87}
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
        top={32}
        left={43}
        product={products[8]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={24}
        left={32}
        product={products[9]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={39}
        left={36}
        product={products[10]}
        onClick={handleHotspotClick}
      />
      <Hotspot
        top={15}
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
        top={26}
        left={9}
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
