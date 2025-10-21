// src/pages/Admin/ProductManagement/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg max-w-md w-[90%] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-[#FAC602] mb-2">
            {product.name}
          </h2>
          <p className="text-gray-300 mb-1 italic">{product.brand}</p>
          <p className="text-sm text-gray-400 mb-3">{product.category}</p>
          <p className="text-gray-200">{product.description}</p>
          <div className="flex justify-between mt-4 text-lg font-semibold">
            <span>${product.price}</span>
            <span>Stock: {product.stock}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
