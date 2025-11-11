import React, { useState, useEffect } from "react";
import CategoryModal from "../../../components/CategoryModal/CategoryModal.jsx";
import FormCategory from "./FormCategory.jsx";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle.jsx";
import Button from '../../../components/Button/Button.jsx';
import CategoryTable from './CategoryTable.jsx';

const CategoryManagementPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:3000/categories/list");
    if (!response.ok) {
      throw new Error("Error al obtener las categorías");
    }

    const data = await response.json();
    const formatted = data.categories.map(cat => ({
      id: cat.id,
      name: cat.titulo,
      path: cat.path,
    }));

    setCategories(formatted);
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
};

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSuccess = () => {
        fetchCategories();
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
                <CategoryTable categories={categories} />
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
