import React, { useState, useMemo } from 'react';
import Hotspot from "../../components/Hotspot/Hotspot.jsx";
import CategoryModal from '../../components/CategoryModal/CategoryModal.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { allProductsData } from '../../Mocks/productsMock.js'; 
import { hotspotPositions } from '../../Mocks/hotspotsMock.js'; 


const getAllProductsFlat = (data) => {
  const all = {};
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key].products) {
      data[key].products.forEach(product => {
        all[product.id] = product; 
      });
    }
  }
  return all;
};

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const flatProducts = useMemo(() => {
    return getAllProductsFlat(allProductsData);
  }, []);

  const handleHotspotClick = (hotspotData) => {
    const product = flatProducts[hotspotData.productId];
    
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      console.error(`Producto con ID ${hotspotData.productId} no encontrado.`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      
      {/* Imagen de Fondo */}
      <img 
        src="/HomePage.png" 
        alt="Urban Underground Home" 
        className="absolute top-0 left-0 w-screen h-screen object-cover z-0" 
      />
    
      {hotspotPositions.map(spot => (
        <Hotspot
          key={spot.id}
          top={spot.top}
          left={spot.left}
          product={spot} 
          onClick={handleHotspotClick}
        />
      ))}

      <CategoryModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={selectedProduct ? selectedProduct.name.toUpperCase() : "DETALLE"}
      >
        {selectedProduct ? (
          <ProductCard product={selectedProduct} />
        ) : (
          <p className="text-center text-gray-400">Selecciona un punto para ver el producto.</p>
        )}
      </CategoryModal>
    </div>
  );
};

export default HomePage;