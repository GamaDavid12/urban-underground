import React, { useState } from "react";
import Button from "../../../components/Button/Button.jsx";

const FormCategory = ({ onCancel, onSuccess }) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: categoryName.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Error al crear la categoría");
      }

      const data = await response.json();
      console.log("Categoría creada:", data);

      setCategoryName("");
      onSuccess(data);
    } catch (err) {
      console.error("Error al crear categoría:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-400 mb-2">
          Nombre
        </label>
        <input
          id="categoryName"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-[#FFCA1E] focus:border-[#FFCA1E] transition duration-150"
          placeholder="Ingresa el nombre de la categoría"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 mt-8">
        <Button
          type="button"
          text="Cancelar"
          variant="cancel"
          onClick={onCancel}
          className="!w-auto px-6"
          disabled={loading}
        />
        <Button
          type="submit"
          text={loading ? "Guardando..." : "Guardar"}
          variant="pay"
          className="!w-auto px-6"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default FormCategory;
