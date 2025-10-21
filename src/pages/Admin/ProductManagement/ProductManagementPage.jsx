// src/pages/Admin/ProductManagement/ProductManagementPage.jsx
import { useState } from "react";
import useProductCrud from "./hooks/useProductCrud";
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/ProductModal";
import ProductCard from "./components/ProductCard";
import useUniqueProductCrud from "./hooks/useUniqueProductCrud";
import UniqueProductModal from "../../Admin/UniqueProductModal";

export const ProductManagementPage = () => {
  const { products, createProduct, updateProduct, deleteProduct } =
    useProductCrud();

 const { uniqueProducts, createUniqueProduct, deleteUniqueProduct } = useUniqueProductCrud();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  

  const handleOpen = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (values) => {
    if (selectedProduct) updateProduct(selectedProduct.id, values);
    else createProduct(values);
    setIsModalOpen(false);
  };

  const handleView = (product) => setViewProduct(product);

  return (
    <div className="p-8 space-y-6 bg-[#0d0d0d] min-h-screen text-white">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FAC602]">
          Gestión de Productos
        </h1>
        <button
          onClick={() => handleOpen()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Nuevo producto
        </button>

           <button
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg"
      >
        + Producto Único
      </button>
      
      </header>

        <UniqueProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={createUniqueProduct}
      />

      <ProductTable
        products={products}
        onEdit={handleOpen}
        onDelete={deleteProduct}
        onView={handleView}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={deleteProduct}
        product={selectedProduct}
      />

      <ProductCard
        product={viewProduct}
        onClose={() => setViewProduct(null)}
      />

           <div className="mt-6">
        {uniqueProducts.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between bg-gray-800 p-3 rounded-xl mb-2"
          >
            <div className="flex items-center space-x-3">
              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-sm text-gray-400">${p.price}</p>
              </div>
            </div>
            <button
              onClick={() => deleteUniqueProduct(p.id)}
              className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagementPage;

