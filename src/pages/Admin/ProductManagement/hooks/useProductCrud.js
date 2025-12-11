import React, { useState, useEffect, useCallback } from 'react';
import { API_ROUTES, PRODUCTS_ROUTES } from "../../../../api/APIRoutes/index.js";
import { axiosAPI } from "../../../../api/api.js";

const useProductCrud = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosAPI.get(`/${API_ROUTES.PRODUCTS}${PRODUCTS_ROUTES.LIST}`);
      
      const formatted = res.data.products.map((p) => ({
        id: p.id,
        name: p.nombre,
        description: p.descripcion,
        price: p.precio,
        image: p.imagenURL,
        category: p.categoria?.nombre || "",
        categoryId: p.categoriaId,
        stock: p.stock,
      }));
      setProducts(formatted);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (newProduct) => {
    try {
      const formData = new FormData();
      formData.append("nombre", newProduct.name);
      formData.append("descripcion", newProduct.description || "");
      formData.append("precio", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("categoriaId", newProduct.categoryId);

      if (newProduct.image instanceof File) {
        formData.append("imagen", newProduct.image);
      }

      await axiosAPI.post(`/${API_ROUTES.PRODUCTS}${PRODUCTS_ROUTES.CREATE}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      await fetchProducts();
    } catch (err) {
      console.error("Error creando producto:", err);
      throw err;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const formData = new FormData();
      formData.append("nombre", updatedData.name);
      formData.append("descripcion", updatedData.description || "");
      formData.append("precio", updatedData.price);
      formData.append("stock", updatedData.stock);
      formData.append("categoriaId", updatedData.categoryId);

      if (updatedData.image instanceof File) {
        formData.append("imagen", updatedData.image);
      } else {
      }

      const url = `/${API_ROUTES.PRODUCTS}/update/${id}`;

      await axiosAPI.put(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchProducts();
    } catch (err) {
      console.error("Error actualizando producto:", err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

    try {
      const url = `/${API_ROUTES.PRODUCTS}/delete/${id}`;
      
      await axiosAPI.delete(url);
      
      await fetchProducts();
    } catch (err) {
      console.error("Error eliminando producto:", err);
      alert("Error al eliminar el producto. Verifica la consola.");
    }
  };

  return { 
    products, 
    loading, 
    error, 
    fetchProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
  };
};

export default useProductCrud;