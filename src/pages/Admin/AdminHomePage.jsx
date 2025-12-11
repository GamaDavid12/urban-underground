import Hotspot from "../../components/Hotspot/Hotspot.jsx";
import { useEffect, useState } from 'react';
import { useAPI } from '../../hooks/useAPI.js'; 
import { API_ROUTES, PRODUCTS_ROUTES } from '../../api/APIRoutes/index.js';
import HotspotCreationModal from '../../components/HotspotCreationModal/HotspotCreationModal.jsx';

const AdminHomePage = () => {
    const [hotspots, setHotspots] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newHotspotCoords, setNewHotspotCoords] = useState(null); 
    const [showCreateModal, setShowCreateModal] = useState(false); 
    const [hotspotToEdit, setHotspotToEdit] = useState(null); 
    
    const { request, loading, error } = useAPI();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const hotspotsRes = await request('GET', `/${API_ROUTES.HOTSPOTS}`);
                setHotspots(hotspotsRes.hotspots || hotspotsRes); 
                const productsRes = await request('GET', `/${API_ROUTES.PRODUCTS}${PRODUCTS_ROUTES.LIST}`);
                setAllProducts(productsRes.products || []); 
            } catch (err) {
                console.error("Error cargando datos del Admin:", err);
            }
        };
        fetchAdminData();
    }, [request]);

    const handleDeleteHotspot = async (hotspotId) => {
        const confirmation = window.confirm(`¿Estás seguro de que quieres eliminar el Hotspot ID ${hotspotId}? Esta acción es irreversible.`);
        
        if (!confirmation) return;

        const oldHotspot = hotspots.find(h => h.id === hotspotId);

        setHotspots(prevHotspots => prevHotspots.filter(h => h.id !== hotspotId));
        
        try {
            await request('DELETE', `/${API_ROUTES.HOTSPOTS}/${hotspotId}`);
            console.log(`Hotspot ID ${hotspotId} eliminado exitosamente.`);
        } catch (err) {
            console.error(`Error al eliminar el Hotspot ID ${hotspotId}:`, err);
            alert("Error al eliminar el Hotspot. Se revertirá el cambio.");
            
            if (oldHotspot) {
                setHotspots(prevHotspots => [...prevHotspots, oldHotspot]);
            }
        }
    };

    const handleHotspotAdminClick = (hotspotData) => {
        const product = allProducts.find(p => p.id === hotspotData.productId);
        
        const action = prompt(`Hotspot ID: ${hotspotData.id}\nProducto: ${product?.nombre || 'Desconocido'}\n\nEscribe 'BORRAR' para eliminarlo, o 'EDITAR' para modificar el producto asociado.`);
        
        if (action?.toUpperCase() === 'BORRAR') {
            handleDeleteHotspot(hotspotData.id);
        } else if (action?.toUpperCase() === 'EDITAR') {
            const fullHotspotData = hotspots.find(h => h.id === hotspotData.id);
            
            setHotspotToEdit(fullHotspotData); 
            setNewHotspotCoords({ top: fullHotspotData.top, left: fullHotspotData.left });
            setShowCreateModal(true);
        }
    };
    
    const handleSaveHotspot = async (dataFromModal) => {
        const hotspotId = hotspotToEdit ? hotspotToEdit.id : null;
        const isEditing = !!hotspotToEdit;
        
        setShowCreateModal(false); 
        setNewHotspotCoords(null); 
        setHotspotToEdit(null);

        const { productId, top, left } = dataFromModal;
        const endpoint = isEditing ? `/${API_ROUTES.HOTSPOTS}/${hotspotId}` : `/${API_ROUTES.HOTSPOTS}`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await request(method, endpoint, { productId, top, left });
            const savedHotspot = res.hotspot || res; 
            
            if (isEditing) {
                setHotspots(prevHotspots => prevHotspots.map(h => 
                    h.id === hotspotId ? { ...h, ...savedHotspot } : h
                ));
                console.log(`Hotspot ID ${hotspotId} editado exitosamente.`);
            } else {
                setHotspots(prevHotspots => [...prevHotspots, savedHotspot]);
                console.log(`Hotspot creado exitosamente.`);
            }
        } catch (err) {
            console.error(`Error al ${isEditing ? 'editar' : 'crear'} el Hotspot:`, err);
            alert(`Error al guardar el Hotspot. Revisa la consola y el backend.`);
        }
    };

    const handleHotspotDragEnd = async ({ id, newTop, newLeft }) => {
        const oldHotspot = hotspots.find(h => h.id === id);

        setHotspots(prevHotspots => prevHotspots.map(h => 
            h.id === id ? { ...h, top: newTop, left: newLeft } : h
        ));

        try {
            await request('PUT', `/${API_ROUTES.HOTSPOTS}/${id}`, { 
                top: newTop, 
                left: newLeft 
            });
        } catch (err) {
            console.error("Error al actualizar la posición del Hotspot:", err);
            alert("Error al guardar la nueva posición. Se revirtió el cambio.");
            
            if (oldHotspot) {
                setHotspots(prevHotspots => prevHotspots.map(h => 
                    h.id === id ? oldHotspot : h
                ));
            }
        }
    };
    
    const handleImageClick = (e) => {
        if (!isCreating || e.target.closest('.HotspotAdmin')) return; 
        
        const imageContainer = e.currentTarget;
        const rect = imageContainer.getBoundingClientRect();

        const xInside = e.clientX - rect.left;
        const yInside = e.clientY - rect.top;

        const leftPercent = (xInside / rect.width) * 100;
        const topPercent = (yInside / rect.height) * 100;

        setNewHotspotCoords({ top: topPercent.toFixed(2), left: leftPercent.toFixed(2) });
        setShowCreateModal(true);
        setIsCreating(false); 
    };

    return (
        <div className="p-4 md:p-8 bg-gray-900 text-white min-h-screen"> 
            <div 
                className={`relative w-full h-[75vh] border-4 ${isCreating ? 'border-green-500 cursor-crosshair' : 'border-red-500'} overflow-hidden mx-auto shadow-2xl`}
                onClick={handleImageClick} 
            > 
                
                <img 
                    src="/HomePage.png" 
                    alt="Urban Underground Home Admin View" 
                    className="absolute top-0 left-0 w-full h-full object-cover z-0" 
                />
                
                {hotspots.map((hotspot) => {
                    const productData = allProducts.find(p => p.id === hotspot.productId);

                    return (
                        <Hotspot 
                            key={hotspot.id} 
                            hotspotId={hotspot.id}
                            top={String(hotspot.top)} 
                            left={String(hotspot.left)} 
                            product={productData ? { id: productData.id, name: productData.nombre } : { id: hotspot.productId, name: 'Producto Desconocido' }} 
                            onClick={() => handleHotspotAdminClick(hotspot)} 
                            isAdmin={true}
                            onDragEnd={handleHotspotDragEnd} 
                        />
                    );
                })}
            </div>
            
            <div className="mt-8">
                <button 
                    onClick={() => {
                        setIsCreating(!isCreating);
                        setNewHotspotCoords(null); 
                        setShowCreateModal(false); 
                    }}
                    className={`font-bold py-2 px-4 rounded transition duration-200 ${isCreating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                    {isCreating ? 'Cancelar Creación de Hotspot' : '+ Crear Nuevo Hotspot'}
                </button>
            </div>
            
            {showCreateModal && newHotspotCoords && (
                <HotspotCreationModal 
                    initialProductId={hotspotToEdit ? hotspotToEdit.productId : null} 
                    coords={newHotspotCoords} 
                    allProducts={allProducts}
                    isEditing={!!hotspotToEdit} 
                    
                    onClose={() => {
                        setShowCreateModal(false);
                        setNewHotspotCoords(null); 
                        setHotspotToEdit(null);
                    }}
                    onCreate={handleSaveHotspot}
                />
            )}
        </div>
    );
};

export default AdminHomePage;