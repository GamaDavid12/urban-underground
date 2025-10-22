// src/pages/Admin/ProductManagement/ProductManagementPage.jsx
import { useState } from "react";
import useProductCrud from "./hooks/useProductCrud";
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/ProductModal";
import ProductCard from "./components/ProductCard";

export const ProductManagementPage = () => {
  const { products, createProduct, updateProduct, deleteProduct } =
    useProductCrud();

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
      </header>

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
    </div>
  );
};

export default ProductManagementPage;

