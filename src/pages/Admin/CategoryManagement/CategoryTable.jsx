import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import CategoryModal from '../../../components/CategoryModal/CategoryModal.jsx';
import { useAPI } from '../../../hooks/useAPI.js';

const CategoryTable = ({ categories, onCategoryUpdated, onCategoryDeleted }) => { 
    const { request, loading, error } = useAPI();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleEdit = (category) => {
        setModalTitle('EDITAR CATEGORÍA');
        setSelectedCategory(category);
        setNewCategoryName(category.name);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalTitle('');
        setSelectedCategory(null);
        setNewCategoryName('');
    };

    const handleSaveEdit = async () => {
        if (!selectedCategory || newCategoryName.trim() === '' || newCategoryName.trim() === selectedCategory.name) {
            return;
        }

        const categoryId = selectedCategory.id;
        const oldName = selectedCategory.name;
        const newName = newCategoryName.trim();

        handleCloseModal();

        try {
            const res = await request('PUT', `/categorias/${categoryId}`, { 
                nombre: newName 
            });
            
            if (onCategoryUpdated) {
                 onCategoryUpdated(categoryId, { name: newName }); 
            }
            alert(`Categoría "${oldName}" actualizada a "${newName}".`);
        } catch (error) {
            console.error("Error al editar la categoría:", error);
            alert(`Error al guardar la edición de "${oldName}". Revisa el backend.`);
        }
    };

    const handleDelete = async (category) => {
        const categoryId = category.id;
        const categoryName = category.name;

        const confirmation = window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoryName}" (ID: ${categoryId})?`);
        
        if (!confirmation) return;

        try {
            await request('DELETE', `/categorias/${categoryId}`);

            if (onCategoryDeleted) {
                onCategoryDeleted(categoryId);
            }
            alert(`Categoría "${categoryName}" eliminada correctamente.`);
        } catch (error) {
            console.error("Error al borrar categoría:", error)
            alert(`Error al borrar la categoría "${categoryName}". Revisa el backend.`);
        }
    };

    return (
        <>
            <div className="overflow-x-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                CATEGORÍAS
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                PRODUCTOS
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {categories.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-800 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {category.productCount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex justify-center gap-3">
                                        <Button
                                            icon={<FaPencilAlt />}
                                            variant="icon"
                                            onClick={() => handleEdit(category)}
                                            className="text-yellow-400 hover:text-white"
                                        />
                                        <Button
                                            icon={<FaTrash />}
                                            variant="icon"
                                            onClick={() => handleDelete(category)}
                                            className="text-red-500 hover:text-red-400"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end p-4 text-gray-400 text-sm border-t border-gray-700">
                    &lt;1 / 10&gt;
                </div>
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalTitle}
            >
                <div className="space-y-4">
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-300">
                        Nombre
                    </label>
                    <input
                        id="categoryName"
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Ingresa el nuevo nombre"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    />
                    <div className="pt-4 flex justify-end">
                        <Button
                            text="Guardar Cambios"
                            variant="primary"
                            onClick={handleSaveEdit}
                            disabled={!newCategoryName.trim() || newCategoryName.trim() === selectedCategory?.name}
                            className="w-full sm:w-auto"
                        />
                    </div>
                </div>
            </CategoryModal>
        </>
    );
};

export default CategoryTable;