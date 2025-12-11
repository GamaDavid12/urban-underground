import React, { useState, useEffect } from 'react';
import Hotspot from "../../components/Hotspot/Hotspot.jsx";
import CategoryModal from '../../components/CategoryModal/CategoryModal.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { useAPI } from '../../hooks/useAPI.js';
import { API_ROUTES } from '../../api/APIRoutes/index.js';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  
  const { request, loading } = useAPI();

  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        const data = await request('GET', `/${API_ROUTES.HOTSPOTS}`);
        setHotspots(data);
      } catch (err) {
        console.error("Error cargando hotspots", err);
      }
    };
    fetchHotspots();
  }, [request]);

  const handleHotspotClick = async (hotspotData) => {
    if (hotspotData.productId) {
      try {
        const res = await request('GET', `/${API_ROUTES.PRODUCTS}/get/${hotspotData.productId}`);
        setSelectedProduct(res.product);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error cargando producto del hotspot", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img 
        src="/HomePage.png" 
        alt="Urban Underground Home" 
        className="absolute top-0 left-0 w-screen h-screen object-cover z-0" 
      />
    
      {!loading && hotspots.map(spot => (
        <Hotspot
          key={spot.id}
          top={spot.top}
          left={spot.left}
          product={{ name: spot.productName || 'Producto' }}
          onClick={() => handleHotspotClick(spot)}
        />
      ))}

      <CategoryModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={selectedProduct ? selectedProduct.nombre?.toUpperCase() : "DETALLE"}
      >
        {selectedProduct ? (
          <ProductCard product={selectedProduct} />
        ) : (
          <p className="text-center text-gray-400">Cargando...</p>
        )}
      </CategoryModal>
    </div>
  );
};

export default HomePage;