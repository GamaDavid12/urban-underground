import React, { useState, useEffect } from "react";
import Hotspot from "../../components/Hotspot/Hotspot.jsx";
import EditHotspotPanel from "../../components/EditHotspotPanel/EditHotspotPanel.jsx";
import { API_ROUTES, PRODUCTS_ROUTES } from "../../api/APIRoutes/index.js";
import { axiosAPI } from "../../api/api.js";

const API_URL_HOTSPOTS = (`${API_ROUTES.HOTSPOTS}`)

const AdminHomePage = () => {
  const [hotspots, setHotspots] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [editingHotspot, setEditingHotspot] = useState(null);
  const [isLoadingHotspots, setIsLoadingHotspots] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    axiosAPI
      .get(`${API_ROUTES.PRODUCTS}${PRODUCTS_ROUTES.LIST}`)
      .then((response) => {
        console.log(response)
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoadingProducts(false);
      });
  };

  const fetchHotspots = async () => {
    setIsLoadingHotspots(true);
    setError(null);
    axiosAPI
      .get(`${API_ROUTES.HOTSPOTS}`)
      .then((response) => {
        setHotspots(response.data);
      })
      .catch((err) => {
      console.error("Error en la carga inicial de hotspots:", err);
      setError(`Error de la API (Hotspots): ${err.message}`);
      })
      .finally(() => {
        setIsLoadingHotspots(false);
      });
  };

//   const fetchProducts = async () => {
//     setIsLoadingProducts(true);
//     try {
//       const response = await fetch(API_URL_PRODUCTS);
//       if (!response.ok) {
//         throw new Error(
//           `Fallo al obtener los productos: ${response.statusText}`
//         );
//       }

//       const result = await response.json();

//       if (Array.isArray(result.products)) {
//         setAllProducts(result.products);
//         console.log(`Productos cargados: ${result.products.length}`);
//       } else {
//         throw new Error(
//           "La respuesta de /api/products no contiene una matriz 'products' válida."
//         );
//       }
//     } catch (err) {
//       console.error("Error en la carga inicial de productos:", err);
//       setError((prev) =>
//         prev
//           ? prev + ` | Error de la API (Productos): ${err.message}`
//           : `Error de la API (Productos): ${err.message}`
//       );
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   };

  useEffect(() => {
    fetchHotspots();
    fetchProducts();
  }, []);

  const isAppReady = !isLoadingHotspots && !isLoadingProducts;
  const isLoading = isLoadingHotspots || isLoadingProducts;

  const getNextTempId = () => {
    const maxId = hotspots.reduce((max, spot) => {
      const currentId = String(spot.id).startsWith("temp_")
        ? parseInt(String(spot.id).substring(5))
        : 0;
      return Math.max(max, currentId);
    }, 0);
    return `temp_${maxId + 1}`;
  };

  const handleHotspotAdminClick = (hotspotData) => {
    setEditingHotspot({
      ...hotspotData,
      isNew: false,
    });
  };

  const handleNewHotspotCreation = (top, left) => {
    if (editingHotspot || !isAppReady || allProducts.length === 0) return;

    const newHotspotId = getNextTempId();
    const tempHotspot = {
      id: newHotspotId,
      productId: allProducts.length > 0 ? allProducts[0].id : null,
      top: top,
      left: left,
    };
    setEditingHotspot({ ...tempHotspot, isNew: true });
  };

  const handleNewHotspotClick = () => {
    handleNewHotspotCreation(50, 50);
  };

  const handleImageClick = (e) => {
    if (editingHotspot) return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const topPercentage = Math.round((clickY / rect.height) * 1000) / 10;
    const leftPercentage = Math.round((clickX / rect.width) * 1000) / 10;

    handleNewHotspotCreation(topPercentage, leftPercentage);
  };

  const saveHotspot = async (hotspotToSave) => {
    setError(null);

    const { isNew, id, ...dataToSend } = hotspotToSave;

    const hotspotId = String(id).startsWith("temp_") ? undefined : id;

    const payload = {
      top: Number(dataToSend.top),
      left: Number(dataToSend.left),
      productId: Number(dataToSend.productId),
    };

    const method = isNew ? "POST" : "PUT";
    const url = isNew ? API_URL_HOTSPOTS : `${API_URL_HOTSPOTS}/${hotspotId}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (e) {
          /* ignored */
        }
        throw new Error(
          `Fallo ${method}: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }

      const savedHotspot = await response.json();

      if (isNew) {
        setHotspots((prev) => [...prev, savedHotspot]);
      } else {
        setHotspots((prev) =>
          prev.map((h) => (String(h.id) === String(id) ? savedHotspot : h))
        );
      }

      setEditingHotspot(null);
      console.log(
        `Hotspot ${isNew ? "creado" : "actualizado"} con éxito.`,
        savedHotspot
      );
    } catch (err) {
      console.error("Error al guardar hotspot:", err);
      setError(`Error de la API al guardar: ${err.message}`);
    }
  };

  const deleteHotspot = async (hotspotId) => {
    setError(null);
    if (String(hotspotId).startsWith("temp_")) {
      setEditingHotspot(null);
      return;
    }

    const url = `${API_URL_HOTSPOTS}/${hotspotId}`;

    try {
      const response = await fetch(url, { method: "DELETE" });

      if (response.status !== 204 && response.status !== 200) {
        let errorMessage = response.statusText;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || response.statusText;
        } catch (e) {
          /* ignored */
        }
        throw new Error(`Fallo DELETE: ${response.status} - ${errorMessage}`);
      }

      setHotspots((prev) =>
        prev.filter((h) => String(h.id) !== String(hotspotId))
      );
      setEditingHotspot(null);
      console.log(`Hotspot ID ${hotspotId} eliminado con éxito.`);
    } catch (err) {
      console.error("Error al eliminar hotspot:", err);
      setError(`Error de la API al eliminar: ${err.message}`);
    }
  };

  const handleHotspotMove = (id, newTop, newLeft) => {
    if (editingHotspot) {
      setEditingHotspot((prev) => ({
        ...prev,
        top: newTop,
        left: newLeft,
      }));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">
        Gestión de Hotspots de la Página de Inicio
      </h1>
      <p className="text-gray-400 mb-4">
        Haz clic en cualquier punto para editarlo. Un Hotspot temporal se puede
        arrastrar en el panel de edición.
      </p>

      {isLoading && (
        <div className="bg-blue-600 p-3 rounded mb-4 text-center">
          Cargando {isLoadingHotspots ? "Hotspots" : ""}{" "}
          {isLoadingProducts ? "Productos" : ""}...
        </div>
      )}

      {error && (
        <div className="bg-red-700 p-3 rounded mb-4 font-bold">
          ⚠️ Error de la API: {error}
        </div>
      )}

      {!isLoadingProducts && allProducts.length === 0 && (
        <div className="bg-orange-500 p-3 rounded mb-4 font-bold">
          🚨 Advertencia: No se encontraron productos en el backend. Asegúrate
          de que el seeder de productos se ha ejecutado y la ruta /api/products
          funciona correctamente.
        </div>
      )}

      <Button
        onClick={handleNewHotspotClick}
        text="Nuevo Hotspot"
        icon="➕"
        variant="contained"
        className="!w-auto mb-4"
        disabled={!isAppReady || allProducts.length === 0 || !!editingHotspot}
      />

      <div
        className="relative w-full h-[75vh] border-4 border-red-500 overflow-hidden mx-auto shadow-2xl"
        onClick={handleImageClick}
      >
        <img
          src="/HomePage.png"
          alt="Urban Underground Home Admin View"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1200x800/222/FFF?text=FALTA IMAGEN DE INICIO";
          }}
        />

        {hotspots.map((hotspot) => {
          const productData = allProducts.find(
            (p) => String(p.id) === String(hotspot.productId)
          );
          const isBeingEdited =
            editingHotspot && String(editingHotspot.id) === String(hotspot.id);

          return (
            <Hotspot
              key={hotspot.id}
              id={hotspot.id}
              top={hotspot.top}
              left={hotspot.left}
              product={
                productData || {
                  id: hotspot.productId,
                  name: `Producto ID ${hotspot.productId} (No encontrado)`,
                }
              }
              onClick={(e) => {
                e.stopPropagation();
                handleHotspotAdminClick(hotspot);
              }}
              onMove={handleHotspotMove}
              isEditing={isBeingEdited}
              isAdmin={true}
            />
          );
        })}

        {editingHotspot && editingHotspot.isNew && (
          <Hotspot
            key={editingHotspot.id}
            id={editingHotspot.id}
            top={editingHotspot.top}
            left={editingHotspot.left}
            product={
              allProducts.find(
                (p) => String(p.id) === String(editingHotspot.productId)
              ) || { id: 0, name: "SELECCIONAR PRODUCTO" }
            }
            onClick={() => {}}
            onMove={handleHotspotMove}
            isAdmin={true}
            isEditing={true}
            isNew={true}
          />
        )}
      </div>

      {editingHotspot && (
        <EditHotspotPanel
          hotspot={editingHotspot}
          allProducts={allProducts}
          onClose={() => setEditingHotspot(null)}
          onSave={saveHotspot}
          onDelete={deleteHotspot}
          onProductChange={(productId) =>
            setEditingHotspot((prev) => ({ ...prev, productId: productId }))
          }
        />
      )}
    </div>
  );
};

export default AdminHomePage;

const Button = ({
  text,
  variant = "contained",
  className,
  icon,
  iconSide = "left",
  children,
  ...props
}) => {
  const baseClasses =
    "flex w-full justify-center font-bold items-center border rounded-md p-2 max-h-40 p3 gap-x-2 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    based:
      "border-[#FFCA1E] text-[#FFCA1E] bg-inherit hover:bg-[#FFCA1E] hover:text-gray-950",
    icon: "!w-auto border-none text-[#FFCA1E] text-2xl bg-inherit hover:text-white",
    outlined:
      "border-[#FFCA1E] text-[#FFCA1E] bg-inherit hover:bg-[#FFCA1E] hover:text-gray-950",
    contained:
      "bg-[#FFCA1E] border-[#FFCA1E] text-gray-950 hover:bg-yellow-500",
    cancel: "bg-red-500 border-red-500 text-white hover:bg-red-600",
    pay: "bg-green-500 border-green-500 text-white hover:bg-green-600",
    grey: "border-neutral-700 bg-neutral-700 text-white hover:bg-neutral-600",
    gradient:
      "bg-gradient-to-r from-[#FFCA1E] to-black border-none text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-gray-800",
  };

  const finalClasses = `${baseClasses} ${
    variants[variant] || variants.contained
  } ${className} ${iconSide === "rigth" ? "flex-row-reverse" : ""}`;

  return (
    <button className={finalClasses} {...props}>
      {icon && <span>{icon}</span>}
      {text || children}
    </button>
  );
};
