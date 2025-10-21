import React, { useState } from "react";

const UniqueProductModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [product, setProduct] = useState(
    productToEdit || { name: "", description: "", price: "", image: null }
  );

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">
          {productToEdit ? "Editar Producto Único" : "Nuevo Producto Único"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            className="w-full p-2 rounded bg-gray-800"
            required
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full p-2 rounded bg-gray-800"
            required
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Precio"
            className="w-full p-2 rounded bg-gray-800"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded"
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniqueProductModal;
