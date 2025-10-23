import { useState } from "react";
import useProductCrud from "./useProductCrud";

const useProductForm = () => {
  const { createProduct, updateProduct } = useProductCrud();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //  clic Editar
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  // Enviar el formulario (crear o editar)
const handleSubmit = async (values, { resetForm }) => {
  try {
    const payload = {
      ...values,
      categoryId: values.category,  // category ya es id numérico
    };
    delete payload.category; // eliminar para evitar conflicto

    if (isEditing && selectedProduct) {
      await updateProduct(selectedProduct.id, payload);
      alert("✅ Producto actualizado correctamente");
    } else {
      await createProduct(payload);
      alert("✅ Producto creado correctamente");
    }
    resetForm();
    setIsEditing(false);
    setSelectedProduct(null);
  } catch (error) {
    console.error("❌ Error en el formulario:", error);
    alert("Ocurrió un error al guardar el producto");
  }
};

  // Resetear form 
  const handleReset = (resetForm) => {
    resetForm();
    setIsEditing(false);
    setSelectedProduct(null);
  };

  return {
    handleSubmit,
    handleEdit,
    handleReset,
    isEditing,
    selectedProduct,
  };
};

export default useProductForm;
