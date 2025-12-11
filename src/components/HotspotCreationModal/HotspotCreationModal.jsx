import React, { useState } from 'react';

const HotspotCreationModal = ({ coords, allProducts, onClose, onCreate }) => {
    const [selectedProductId, setSelectedProductId] = useState('');

    const handleSave = () => {
        if (!selectedProductId) {
            alert("Por favor, selecciona un producto.");
            return;
        }
        onCreate({
            productId: selectedProductId,
            top: coords.top,
            left: coords.left
        });
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96 text-white">
                <h2 className="text-xl font-bold mb-4 text-yellow-400">Crear Nuevo Hotspot</h2>
                <p className="mb-4 text-sm">
                    **Posición:** Top: {coords.top}%, Left: {coords.left}%
                </p>
                
                <label htmlFor="productSelect" className="block mb-2">Seleccionar Producto:</label>
                <select
                    id="productSelect"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                >
                    <option value="">-- Elige un Producto --</option>
                    {allProducts.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.nombre} (ID: {product.id})
                        </option>
                    ))}
                </select>
                
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={onClose} 
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSave} 
                        disabled={!selectedProductId}
                        className={`py-2 px-4 rounded transition ${selectedProductId ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'}`}
                    >
                        Guardar Hotspot
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotspotCreationModal;