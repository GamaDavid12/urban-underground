import React, { useState } from 'react';
import Hotspot from "../../components/Hotspot/Hotspot.jsx";
import EditHotspotPanel from '../../components/EditHotspotPanel/EditHotspotPanel.jsx';
import { hotspotPositions as initialHotspotPositions } from '../../Mocks/hotspotsMock.js';
import { allProductsData } from '../../Mocks/productsMock.js';
import Button from "../../components/Button/Button.jsx";

const AdminHomePage = () => {
    const [hotspots, setHotspots] = useState(initialHotspotPositions);
    const [editingHotspot, setEditingHotspot] = useState(null);
    const allProducts = Object.values(allProductsData).flatMap(cat => cat.products);
    
    const getNextId = () => {
        const maxId = hotspots.reduce((max, spot) => Math.max(max, parseInt(spot.id.replace('spot', ''))), 0);
        return `spot${maxId + 1}`;
    };

    const handleHotspotAdminClick = (hotspotData) => {
        setEditingHotspot({ 
            ...hotspotData, 
            isNew: false 
        }); 
    };

    const handleNewHotspotClick = () => {
        const newHotspotId = getNextId();
        const tempHotspot = {
            id: newHotspotId,
            productId: null,
            top: 50,
            left: 50,
        };
        setEditingHotspot({ ...tempHotspot, isNew: true });
    };

    const handleImageClick = (e) => {
        if (editingHotspot) return; 

        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const topPercentage = Math.round((clickY / rect.height) * 100);
        const leftPercentage = Math.round((clickX / rect.width) * 100);

        const newHotspotId = getNextId();
        const tempHotspot = {
            id: newHotspotId,
            productId: allProducts[0].id,
            top: topPercentage,
            left: leftPercentage,
        };
        setEditingHotspot({ ...tempHotspot, isNew: true });
    };

    const saveHotspot = (hotspotToSave) => {
        const { isNew, ...data } = hotspotToSave;

        if (isNew) {
            console.log("Hotspot Creado:", data);
            setHotspots(prev => [...prev, data]);
        } else {
            console.log("Hotspot Actualizado:", data);
            setHotspots(prev => prev.map(h => h.id === data.id ? data : h));
        }

        setEditingHotspot(null);
        alert(`Hotspot ${isNew ? 'creado' : 'actualizado'} con éxito! (Simulación)`);
    };

    const deleteHotspot = (hotspotId) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el Hotspot ID ${hotspotId}?`)) {
            console.log("Hotspot Eliminado:", hotspotId);
            setHotspots(prev => prev.filter(h => h.id !== hotspotId));
            setEditingHotspot(null);
            alert(`Hotspot ID ${hotspotId} eliminado! (Simulación)`);
        }
    };
    
    const handleHotspotMove = (id, newTop, newLeft) => {
        if (editingHotspot && editingHotspot.id === id) {
            setEditingHotspot(prev => ({ 
                ...prev, 
                top: newTop, 
                left: newLeft 
            }));
        }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-900 text-white min-h-screen"> 
            
            <h1 className="text-3xl font-bold mb-6 text-yellow-400">
                Gestión de Hotspots de la Página de Inicio
            </h1>
            <p className="text-gray-400 mb-4">
                Haz clic en cualquier punto para editarlo, o haz clic en la imagen vacía para crear uno nuevo en esa posición.
            </p>
            <Button 
                    onClick={handleNewHotspotClick}
                    text="Nuevo Hotspot"
                    icon="➕"
                    variant="contained"
                    className="!w-auto"
                    disabled={!!editingHotspot} 
                />

            <div 
                className="relative w-full h-[75vh] border-4 border-red-500 overflow-hidden mx-auto shadow-2xl"
                onClick={handleImageClick}
            > 
                
                <img 
                    src="/HomePage.png" 
                    alt="Urban Underground Home Admin View" 
                    className="absolute top-0 left-0 w-full h-full object-cover z-0" 
                />
                
                {hotspots.map((hotspot) => {
                    const productData = allProducts.find(p => p.id === hotspot.productId);

                    const isBeingEdited = editingHotspot?.id === hotspot.id;

                    return (
                        <Hotspot 
                            key={hotspot.id} 
                            id={hotspot.id}
                            top={hotspot.top} 
                            left={hotspot.left} 
                            product={productData || { id: hotspot.productId, name: 'Producto Desconocido' }} 
                            onClick={() => handleHotspotAdminClick(hotspot)} 
                            onMove={isBeingEdited ? handleHotspotMove : undefined}
                            isEditing={isBeingEdited}
                        />
                    );
                })}

                {editingHotspot && editingHotspot.isNew && (
                    <Hotspot 
                        key={editingHotspot.id} 
                        id={editingHotspot.id}
                        top={editingHotspot.top} 
                        left={editingHotspot.left} 
                        product={allProducts.find(p => p.id === editingHotspot.productId) || { id: 0, name: 'SELECCIONAR PRODUCTO' }} 
                        onClick={() => {}}
                        onMove={handleHotspotMove}
                        isAdmin={true}
                        isEditing={true}
                        isNew={true}
                    />
                )}
            </div>
            
            {editingHotspot && (
                <EditHotspotPanel
                    hotspot={editingHotspot}
                    allProducts={allProducts}
                    onClose={() => setEditingHotspot(null)}
                    onSave={saveHotspot}
                    onDelete={deleteHotspot}
                    onProductChange={(productId) => setEditingHotspot(prev => ({ ...prev, productId: productId }))}
                />
            )}
            
        </div>
    );
};

export default AdminHomePage;