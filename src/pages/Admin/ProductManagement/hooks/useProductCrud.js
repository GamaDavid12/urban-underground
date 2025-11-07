import { useState, useEffect } from "react";
import { API_ROUTES } from "../../../../api/APIRoutes";

const API_URL = (`${API_ROUTES.PRODUCTS}`)

const useProductCrud = () => {
  const [products, setProducts] = useState([]);

  // Función para obtener productos desde backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/list`);
      if (!response.ok) throw new Error("Error al cargar productos");
      const data = await response.json();

      // Mapear campos para frontend
      const formatted = data.products.map((p) => ({
        id: p.id,
        name: p.nombre,
        brand: p.marca,
        description: p.descripcion,
        price: p.precio,
        image: p.imagenURL,
        category: p.categoria?.nombre || "",
        stock: p.stock,
      }));

      setProducts(formatted);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Crear producto
// en useProductCrud.js

const createProduct = async (newProduct) => {
  try {
    const formData = new FormData();
    formData.append("nombre", newProduct.name);
    formData.append("marca", newProduct.brand);
    formData.append("descripcion", newProduct.description || "");
    formData.append("precio", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("categoriaId", newProduct.categoryId || "1"); // Ajusta según tus categorías

    if (newProduct.image instanceof File) {
      formData.append("imagen", newProduct.image);
    }

    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear producto");
    }

    await fetchProducts();
  } catch (error) {
    console.error("Error creando producto:", error);
  }
};


  // Actualizar producto
  const updateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: updatedData.name,
          marca: updatedData.brand,
          descripcion: updatedData.description,
          precio: updatedData.price,
          imagenURL: updatedData.image, // Ajustar según backend
          categoriaId: updatedData.categoryId,
          stock: updatedData.stock,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar producto");
      }

      await fetchProducts();
    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar producto");
      }

      await fetchProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return { products, fetchProducts, createProduct, updateProduct, deleteProduct };
};

export default useProductCrud;
