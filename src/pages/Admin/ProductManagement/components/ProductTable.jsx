// src/pages/Admin/ProductManagement/components/ProductTable.jsx
import React from "react";

const ProductTable = ({ products, onEdit, onDelete, onView }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-gray-400 text-center py-10">
        No hay productos registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-[#1a1a1a] text-sm text-gray-300 border border-[#2a2a2a] rounded-lg">
        <thead className="bg-[#2a2a2a] text-[#FAC602] uppercase text-xs">
          <tr>
            <th className="py-3 px-4 text-left">Imagen</th>
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Marca</th>
            <th className="py-3 px-4 text-left">Categoría</th>
            <th className="py-3 px-4 text-left">Precio</th>
            <th className="py-3 px-4 text-left">Stock</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className="border-b border-[#2f2f2f] hover:bg-[#222222] transition"
            >
              <td className="py-3 px-4">
                <img
                  src={p.image || "https://via.placeholder.com/60"}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="py-3 px-4 font-medium text-white">{p.name}</td>
              <td className="py-3 px-4">{p.brand}</td>
              <td className="py-3 px-4 capitalize">{p.category}</td>
              <td className="py-3 px-4">${p.price}</td>
              <td className="py-3 px-4">{p.stock}</td>
              <td className="py-3 px-4 text-center flex gap-2 justify-center">
                <button
                  onClick={() => onView(p)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Ver
                </button>
                <button
                  onClick={() => onEdit(p)}
                  className="bg-[#FAC602] text-black px-3 py-1 rounded hover:bg-[#F6BD00] transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;


