import React, { useState, useMemo } from 'react';
import Hotspot from '..Hotspot/Hotspot.jsx';
import CategoryModal from '..CategoryModal/CategoryModal.jsx';
import ProductCard from '..ProductCard/ProductCard.jsx';
import { allProductsData } from '../../Mocks/productsMock.js';
import { hotspotPositions } from '../../Mocks/hotspotsMock.js';

const getAllProductsFlat = (data) => {
  const all = [];
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key].products) {
      all.push(...data[key].products);
    }
  }
  return all;
};

const ImageMap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const flatProducts = useMemo(() => {
    return getAllProductsFlat(allProductsData).reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }, []);

  const handleHotspotClick = (hotspot) => {
    const product = flatProducts[hotspot.productId];
    
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      console.error(`Producto con ID ${hotspot.productId} no encontrado.`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="relative w-full h-auto max-w-4xl mx-auto">
      
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
        title={selectedProduct ? selectedProduct.name : "Detalle del Producto"}
      >
        {selectedProduct ? (
          <ProductCard product={selectedProduct} />
        ) : (
          <p className="text-center">Cargando producto...</p>
        )}
      </CategoryModal>
    </div>
  );
};

export default ImageMap;