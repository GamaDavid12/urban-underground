import React, { useState } from "react";
import CreateCategoryModal from "../../../components/CreateCategoryModal/CreateCategoryModal.jsx";
import FormCategory from "../../../components/FormCategory/FormCategory.jsx";

const CategoryManagementPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSuccess = () => {
        alert("Categoría creada exitosamente.");
        setIsModalOpen(false);
    };
    
    return (
        <div className="p-4 sm:p-8 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-yellow-400">Gestión de Categorías</h1>

            <Button
                onClick={() => setIsModalOpen(true)}
                text="Crear Nueva Categoría"
                variant="gradient"
                className="mb-8 !w-auto"
            />

            <div className="text-white border border-dashed border-gray-700 p-8 text-center">
                ... Aquí iría la tabla de categorías y otras herramientas de gestión ...
            </div>

            <CreateCategoryModal 
                isOpen={isModalOpen}
                onClose={handleCancel} 
            >
                <FormCategory 
                    onCancel={handleCancel}
                    onSuccess={handleSuccess}
                />
            </CreateCategoryModal>
        </div>
    );
};

export default CategoryManagementPage;