import React from 'react';
import Button from '../Button/Button.jsx';

const EditHotspotPanel = ({ hotspot, allProducts, onClose, onSave, onDelete, onProductChange }) => {
    if (!hotspot) return null;

    const handlePositionChange = (e) => {
        const { name, value } = e.target;
        onSave({ ...hotspot, [name]: parseFloat(value) }, false);
    };
    
    const handleSave = () => {
        onSave(hotspot);
    };

    const isNew = hotspot.isNew;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md border border-yellow-400 relative">
                
                <div className="absolute top-2 right-2">
                    <Button 
                        onClick={onClose}
                        text="✕" 
                        variant="icon"
                        className="!p-0"
                    />
                </div>

                <h2 className="text-2xl font-bold mb-6 text-yellow-400">
                    {isNew ? 'Crear Nuevo Hotspot' : `Editar Hotspot ID: ${hotspot.id}`}
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Posición (Top %)</label>
                    <input
                        type="number"
                        name="top"
                        value={hotspot.top.toFixed(2)}
                        onChange={handlePositionChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        step="0.01"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Posición (Left %)</label>
                    <input
                        type="number"
                        name="left"
                        value={hotspot.left.toFixed(2)}
                        onChange={handlePositionChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        step="0.01"
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-gray-300 mb-2">Producto Enlazado</label>
                    <select
                        value={hotspot.productId}
                        onChange={(e) => onProductChange(parseInt(e.target.value))}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                    >
                        {allProducts.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name} (ID: {product.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between gap-4">
                    
                    <div className="flex-1">
                        <Button
                            onClick={handleSave}
                            text={isNew ? 'Crear Hotspot' : 'Guardar Cambios'}
                            variant="contained"
                            className="w-full"
                        />
                    </div>
                    
                    {!isNew && (
                        <div className="flex-1">
                            <Button
                                onClick={() => onDelete(hotspot.id)}
                                text="Eliminar"
                                variant="cancel"
                                className="w-full"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditHotspotPanel;