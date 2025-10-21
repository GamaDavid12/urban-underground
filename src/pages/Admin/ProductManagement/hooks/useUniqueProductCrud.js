import { useState } from "react";

const useUniqueProductCrud = () => {
  const [uniqueProducts, setUniqueProducts] = useState([]);

  const createUniqueProduct = (newProduct) => {
    const newId = uniqueProducts.length
      ? Math.max(...uniqueProducts.map((p) => p.id)) + 1
      : 1;
    const imageUrl = newProduct.image
      ? URL.createObjectURL(newProduct.image)
      : "https://via.placeholder.com/150";
    const productToAdd = { id: newId, ...newProduct, image: imageUrl };
    setUniqueProducts((prev) => [...prev, productToAdd]);
  };

  const updateUniqueProduct = (id, updatedData) => {
    setUniqueProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedData,
              image:
                updatedData.image instanceof File
                  ? URL.createObjectURL(updatedData.image)
                  : p.image,
            }
          : p
      )
    );
  };

  const deleteUniqueProduct = (id) => {
    if (confirm("¿Seguro que deseas eliminar este producto único?")) {
      setUniqueProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return { uniqueProducts, createUniqueProduct, updateUniqueProduct, deleteUniqueProduct };
};

export default useUniqueProductCrud;
