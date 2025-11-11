import React, { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import { API_ROUTES, PRODUCTS_ROUTES } from "../../api/APIRoutes/index.js";
import { axiosAPI } from "../../api/api.js";

const EditHotspotPanel = ({
  hotspot,
  onClose,
  onSave,
  onDelete,
  onProductChange,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    axiosAPI
      .get(`${API_ROUTES.PRODUCTS}${PRODUCTS_ROUTES.LIST}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoadingProducts(false);
      });
  };
  
  useEffect(() => {
    // const fetchProducts = async () => {
    //   setIsLoadingProducts(true);
    //   try {
    //     const response = await fetch(API_PRODUCTS);
    //     if (!response.ok)
    //       throw new Error(`Error al cargar productos: ${response.statusText}`);
    //     const data = await response.json();
    //     setProducts(data);
    //   } catch (err) {
    //     console.error("Error al cargar productos:", err);
    //     setError(err.message);
    //   } finally {
    //     setIsLoadingProducts(false);
    //   }
    // };
    fetchProducts();
  }, []);

  const handleSaveClick = () => {
    if (!hotspot.productId) {
      alert("Por favor selecciona un producto antes de guardar.");
      return;
    }
    onSave(hotspot);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg shadow-xl p-6 w-96 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          Editar Hotspot
        </h2>

        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Posición (Top %)</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={hotspot.top}
            onChange={(e) =>
              onSave({ ...hotspot, top: Number(e.target.value) })
            }
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Posición (Left %)</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={hotspot.left}
            onChange={(e) =>
              onSave({ ...hotspot, left: Number(e.target.value) })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Producto Enlazado</label>

          {isLoadingProducts ? (
            <div className="text-gray-400 text-sm">Cargando productos...</div>
          ) : error ? (
            <div className="text-red-400 text-sm">⚠️ {error}</div>
          ) : (
            <select
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={hotspot.productId || ""}
              onChange={(e) => onProductChange(e.target.value)}
            >
              <option value="">Seleccionar producto...</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.nombre || prod.name} (ID: {prod.id})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            text="Guardar"
            onClick={handleSaveClick}
            variant="contained"
            className="bg-yellow-500 hover:bg-yellow-600"
          />
          {!hotspot.isNew && (
            <Button
              text="Eliminar"
              onClick={() => onDelete(hotspot.id)}
              variant="outlined"
              className="border-red-600 text-red-400 hover:bg-red-800"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHotspotPanel;