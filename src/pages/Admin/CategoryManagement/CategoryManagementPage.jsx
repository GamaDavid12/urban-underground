import React, { useState } from "react";
import CategoryModal from "../../../components/CategoryModal/CategoryModal.jsx";
import FormCategory from "./FormCategory.jsx";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle.jsx";
import Button from '../../../components/Button/Button.jsx';
import CategoryTable from './CategoryTable.jsx';

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
    <div className="p-4 sm:p-8 bg-[#010000] flex flex-col h-full"> 
            
            <HeaderTitle
                title="Gestión de Categorías"
                actions={
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        text="Crear Nueva Categoría"
                        variant="grey"
                        className="!w-auto"
                    />
                }
            />

            <div className="flex-1 overflow-auto"> 
                <CategoryTable />
            </div>

            <CategoryModal 
                isOpen={isModalOpen}
                onClose={handleCancel} 
            >
                <FormCategory 
                    onCancel={handleCancel}
                    onSuccess={handleSuccess}
                />
            </CategoryModal>
        </div>
    );
};

export default CategoryManagementPage;