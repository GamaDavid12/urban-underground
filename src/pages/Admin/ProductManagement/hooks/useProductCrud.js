// src/pages/Admin/ProductManagement/hooks/useProductCrud.js
import { useState, useEffect } from "react";
import { allProductsData } from "../../../../Mocks/productsMock";

const useProductCrud = () => {
  const [products, setProducts] = useState([]);

  // productos del mock 
  useEffect(() => {
  const allProducts = Object.values(allProductsData).flatMap((category) =>
    category.products.map((p) => ({
      ...p,
      brand: p.brand || "UrbanStyle", // valor por defecto
      category: category.title || "Sin categoría", 
      stock: p.stock || Math.floor(Math.random() * 30) + 1, // stock aleatorio
    }))
  );
  setProducts(allProducts);
}, []);


  const getProducts = () => products;

  const createProduct = (newProduct) => {
    const newId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    const imageUrl = newProduct.image
      ? URL.createObjectURL(newProduct.image)
      : "https://via.placeholder.com/150";

    const productToAdd = { id: newId, ...newProduct, image: imageUrl };
    setProducts((prev) => [...prev, productToAdd]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
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

  const deleteProduct = (id) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return { products, getProducts, createProduct, updateProduct, deleteProduct };
};

export default useProductCrud;

